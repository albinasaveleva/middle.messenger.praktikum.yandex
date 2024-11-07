// import isEqual from './isEqual';

function isEqual(lhs, rhs) {
    return lhs === rhs;
  }

function render(query, block) {
    const root = document.querySelector(query);
    root.innerHTML = '';
    root.appendChild(block.getContent())
    return root;
}

//   const route = new Route('/buttons', Button, {
//     rootQuery: '.app',
//   });

//   route.render();

export default class Route {
  constructor(path, view, props) {
    this._pathname = path;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(path) {
    if (this.match(path)) {
      this._pathname = path;
      this.render();
    }
  }

  leave() {
    // if (this._block) {
    //   this._block.hide();
    // }
  }

  match(path) {
    return isEqual(path, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block);
      return;
    }

    // this._block.show();
  }
}
