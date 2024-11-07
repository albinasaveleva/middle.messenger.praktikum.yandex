import { isEqual } from "./utils";

const render = (query, block) => {
    const root = document.querySelector(query);
    root.innerHTML = '';
    root.appendChild(block.getContent())
    return root;
}

export default class Route {
    _pathname;
    _blockClass;
    _block;
    _props;

  constructor(path, view, props) {
    this._pathname = path;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(path) {
    console.log('navigate')
    if (this.match(path)) {
      this._pathname = path;
      this.render();
    }
  }

  leave() {
    console.log('leave')
  }

  match(path) {
    console.log('match')
    return isEqual(path, this._pathname);
  }

  render() {
    console.log('render');
    this._block = new this._blockClass();
    render(this._props.rootQuery, this._block);
    return;
  }
}
