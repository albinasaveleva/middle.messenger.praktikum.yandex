import Route from "./route";

class Router {

    routes;
    history;
    _rootQuery;
    static __instance: Router | null;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(path: string, block: any) {
        const route = new Route(path, block, {rootQuery: this._rootQuery});
        this.routes?.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event: PopStateEvent) => {
            this._onRoute((event.currentTarget as Window).location.pathname);
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

        route.render(route, path);
    }

    getRoute(path: string) {
        return this.routes?.find((route: Route) => route.match(path));
    }
}

export default Router;
