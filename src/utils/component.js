import EventBus from "./event-bus";
import Handlebars from "handlebars";
import { v4 as makeUUID } from "uuid";

export default class Component {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  _props = null;
  _children = null;
  _lists = null;
  _id = null;
  _element = null;
  _meta = null;
  _eventBus = null;
  _setUpdate = false;

  constructor(tag = "div", componentProps = {}) {
    const { props, children, lists } = this.getProps(componentProps);
    
    this._children = this.makePropsProxy(children);
    this._lists = this.makePropsProxy({...lists});
    this._id = makeUUID();
    this._props = this.makePropsProxy({ ...props, _id: this._id })
    this._meta = { tag, props };
    this._eventBus = new EventBus();

    this.registerEvents();
    this._eventBus.emit(Component.EVENTS.INIT);
  }

  registerEvents() {
    this._eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this._element = this.createElement(this._meta.tag);
    this._eventBus.emit(Component.EVENTS.FLOW_RENDER);
  }

  createElement(tag) {
    const element = document.createElement(tag);

    element.setAttribute('data-id', `${this._id}`);
    return element;
  }

  _render() {
    const block = this.render();
    this.removeEvents();
    this._element.innerHTML = '';
    this._element.appendChild(block);
    this.addAttributes();
    this.addEvents();
  }

  render() {}

  addAttributes() {
    const { attr = {} } = this._props;

    Object.entries(attr).forEach(([key,  value]) => {
      this._element.setAttribute(key, value);
    })
  }

  addEvents() {
    const { events = {} } = this._props;

    Object.keys(events).forEach((event) => {
      this._element.addEventListener(event, events[event]);
    })
  }

  removeEvents() {
    const { events = {} } = this._props;

    Object.keys(events).forEach((event) => {
      this._element.removeEventListener(event, events[event]);
    })
  }

  getProps(componentProps) {
    const props = {};
    const children = {};
    const lists = {};

    Object.entries(componentProps).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    })

    return { props, children, lists };
  }

  compile(template, props) {
    if (typeof(props) == 'undefined') {
      props = this._props;
    }

    const propsAndStuds = { ...props };

    Object.entries(this._children).forEach(([key, child]) => {
      propsAndStuds[key] = `<div data-id="${child._id}"></div>`;
    })

    const fragment = this.createElement('template');
    fragment.innerHTML = Handlebars.compile(template)(propsAndStuds);

    Object.values(this._children).forEach((child) => {
      const stud = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stud) {
        stud.replaceWith(child.getContent());
      }
    })

    return fragment.content;
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this._children).forEach((child) => {
      child.dispatchComponentDidMount();
    })
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this._eventBus().emit(Component.EVENTS.FLOW_CDM);
    if (Object.keys(this._children).length) {
      this._children._eventBus.emit(Component.EVENTS.FLOW_RENDER)
    }
  }

  _componentDidUpdate(oldProps, newProps) {
    const isRerender = this.componentDidUpdate(oldProps, newProps);
    if (isRerender) {
      this._eventBus.emit(Component.EVENTS.FLOW_RENDER)
    }
  }

  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = (newProps) => {
    if (!newProps) {
      return;
    }

    const { children, props } = this.getProps(newProps);

    if (Object.values(children).length) {
      Object.assign(this._children, children);
    }
    if (Object.values(props).length) {
      Object.assign(this._props, props);
    }
  };

  setLists() {

  }

  makePropsProxy(props) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldValue = { ...target };
        target[prop] = value;
        self._eventBus.emit(Component.EVENTS.FLOW_CDU, oldValue, target)
        return true;
      },
    });
  }

  getContent() {
    return this._element;
  }
}
