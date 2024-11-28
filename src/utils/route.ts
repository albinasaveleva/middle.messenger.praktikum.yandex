import Component from "./component";
import { isEqual } from "./utils";

const render = (query: string, block: Component) => {
    const root = document.querySelector(query) as HTMLElement;
    root.innerHTML = '';
    root.appendChild(block.getContent() as Node)
    return root;
}

export default class Route {
    _pathname;
    _blockClass;
    _block: Component | null;
    _props;

  constructor(path: any, view: any, props: any) {
    this._pathname = path;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(path: string) {
    if (this.match(path)) {
      this._pathname = path;
      this.render();
    }
  }

  leave() {
  }

  match(path: any) {
    return isEqual(path, this._pathname);
  }

  render() {
    this._block = new this._blockClass();
    render(this._props.rootQuery, this._block as Component);
    return;
  }
}
