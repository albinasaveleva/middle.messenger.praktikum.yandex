import {
  MainPage,
} from './pages/index';

export default class App {
  appElement: HTMLElement;

  constructor() {
    this.appElement = document.getElementById('app') as HTMLElement;
  }
  render() {
    let template = new MainPage();
    this.appElement.innerHTML = '';
    this.appElement.appendChild(template.getContent() as Node)
  }
};
