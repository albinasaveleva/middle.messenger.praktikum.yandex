import Route from "./route";

class Router {

    routes;
    history;
    _currentRoute;
    _rootQuery;
    __instance;

    constructor(rootQuery) {
        if (this.__instance) {
          return this.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        this.__instance = this;
    }

    use(path: string, block: any) {
        const route = new Route(path, block, {rootQuery: this._rootQuery});
        this.routes?.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event) => {
            this._onRoute(event.currentTarget?.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    go(path: string) {
        this.history?.pushState({}, "", path);
        this._onRoute(path);
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }

    _onRoute(path: string) {
        const route = this.getRoute(path);
        if (!route) {
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        route.render(route, path);
    }

    getRoute(path: string) {
        return this.routes?.find(route => route.match(path));
    }
}

export default Router;
