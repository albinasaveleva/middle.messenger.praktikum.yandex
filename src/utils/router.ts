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
        console.log('use')
        const route = new Route(path, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this;
    }

    start() {
        console.log('start')
        // Реагируем на изменения в адресной строке и вызываем перерисовку
        window.onpopstate = (event) => {
            this._onRoute(event.currentTarget.location.pathname);
        };

        this._onRoute(window.location.pathname);

    }      // запустить роутер

    go(path: string) {
        console.log('go')
        this.history.pushState({}, "", path);
        this._onRoute(path);
    }

    back() {
        console.log('back')
        window.history.back();

    }       // переход назад по истории браузера
    forward() {
        console.log('forward')
        window.history.forward();
    }    // переход вперёд по истории браузера

    _onRoute(path) {
        console.log('_onRoute')
        const route = this.getRoute(path);
        console.log(route)
        if (!route) {
            console.log('!route')
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        route.render(route, path);
    }

    getRoute(path) {
        console.log('getRoute')
        return this.routes.find(route => route.match(path));
    }
}

export default Router;
