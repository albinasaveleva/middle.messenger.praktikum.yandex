import Route from "./route";

class Router {

    routes;
    history;
    _currentRoute;
    _rootQuery;
    __instance;

    constructor(rootQuery) {
        if (Router.__instance) {
          return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(path: string, block: Block) {
        const route = new Route(path, block, {rootQuery: this._rootQuery});

        this.routes.push(route);

        return this;
    }

    start() {
        // Реагируем на изменения в адресной строке и вызываем перерисовку
        window.onpopstate = event => {
        this._onRoute(event.currentTarget.location.pathname);
        };

        this._onRoute(window.location.pathname);

    }      // запустить роутер

    go(path: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        window.history.back();

    }       // переход назад по истории браузера
    forward() {
        window.history.forward();
    }    // переход вперёд по истории браузера

    _onRoute(pathname) {
        const route = this.getRoute(pathname);
        if (!route) {
          return;
        }

        if (this._currentRoute) {
          this._currentRoute.leave();
        }

        route.render(route, pathname);
    }

    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}

export default Router;
