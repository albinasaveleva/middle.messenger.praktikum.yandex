import EventBus from "./event-bus";
import Handlebars from "handlebars";
import { v4 as makeUUID } from "uuid";
import { TProps } from "../types/data";

export default class Component {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  _props: TProps;
  _children: { [key: string]: any };
  _lists: { [key: string]: any };
  _id: string;
  _element: HTMLElement | null = null;
  _meta: { [key: string]: any };
  _eventBus: EventBus;
  _setUpdate: boolean = false;

  constructor(tag: string = "div", componentProps: { [key: string]: any } = {}) {
    const { props, children, lists } = this.getProps(componentProps);

    this._children = this.makePropsProxy(children);
    this._lists = this.makePropsProxy(lists);
    this._id = makeUUID();
    this._props = this.makePropsProxy({ ...props, _id: this._id })
    this._meta = { tag, props };
    this._eventBus = new EventBus();

    this.registerEvents();
    this._eventBus.emit(Component.EVENTS.INIT);
  }

  registerEvents(): void {
    this._eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init(): void {
    this._element = this.createElement(this._meta.tag);
    this._eventBus.emit(Component.EVENTS.FLOW_RENDER);
  }

  createElement(tag: string): HTMLElement {
    const element: HTMLElement = document.createElement(tag);

    element.setAttribute('data-id', `${this._id}`);
    return element;
  }

  _render(): void {
    const block = this.render();
    this.removeEvents();
    (this._element as HTMLElement).innerHTML = '';
    (this._element as HTMLElement).appendChild(block);
    this.addAttributes();
    this.addEvents();
  }

  render(): DocumentFragment {
    return document.createDocumentFragment()
  }

  addAttributes(): void {
    const { attr = {} } = this._props;

    Object.entries(attr).forEach(([key,  value]) => {
        (this._element as HTMLElement).setAttribute(key, value);
    })
  }

  addEvents(): void {
    const { events = {} } = this._props;

    Object.keys(events).forEach((event) => {
        (this._element as HTMLElement).addEventListener(event, events[event]);
    })
  }

  removeEvents(): void {
    const { events = {} } = this._props;

    Object.keys(events).forEach((event) => {
        (this._element as HTMLElement).removeEventListener(event, events[event]);
    })
  }

  getProps(componentProps: {[key: string]: any}) {
    const props: { [key: string]: any } = {};
    const children: { [key: string]: any } = {};
    const lists: { [key: string]: any } = {};

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

  compile(template: string, props?: { [key: string]: any }) {
    if (typeof(props) == 'undefined') {
      props = this._props;
    }

    const propsAndStuds = { ...props };

    Object.entries(this._children).forEach(([key, child]) => {
      propsAndStuds[key] = `<div data-id="${child._id}"></div>`;
    })

    Object.entries(this._lists).forEach(([key, ]) => {
      propsAndStuds[key] = `<div data-id="__l_${key}"></div>`;
    })

    const fragment = this.createElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(propsAndStuds);

    Object.values(this._children).forEach((child) => {
      const stud = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stud) {
        stud.replaceWith(child.getContent());
      }
    })

    Object.entries(this._lists).forEach(([key, child]) => {
      const stud = fragment.content.querySelector(`[data-id="__l_${key}"]`);

      if (!stud) {
        return;
      }

      const listContent = this.createElement('template') as HTMLTemplateElement;
      child.forEach((item: any) => {
        if (item instanceof Component) {
          listContent.content.append(item.getContent() as Node)
        } else {
          listContent.content.append(`${item}`)
        }
      })

      stud.replaceWith(listContent.content);
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
    this._eventBus.emit(Component.EVENTS.FLOW_CDM);
    if (Object.keys(this._children).length) {
      this._children._eventBus.emit(Component.EVENTS.FLOW_RENDER)
    }
  }

  _componentDidUpdate() {
    const isRerender = this.componentDidUpdate();
    if (isRerender) {
      this._eventBus.emit(Component.EVENTS.FLOW_RENDER)
    }
  }

  componentDidUpdate() {
    return true;
  }

  setProps = (newProps: { [key: string]: any }) => {
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

  makePropsProxy(props: { [key: string]: any }) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as string];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldValue = { ...target };
        target[prop as string] = value;
        self._eventBus.emit(Component.EVENTS.FLOW_CDU, oldValue, target)
        return true;
      },
    });
  }

  getContent() {
    return this._element;
  }
}
