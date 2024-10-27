import { 
  ChatPage,
  ErrorPage,
  LoginPage,
  MainPage,
  NonFoundPage,
  ProfilePage,
  SignupPage
} from './pages/index';

export default class App {
  constructor() {
    // this.currentPage = 'MainPage';
    this.appElement = document.getElementById('app');
  }
  render() {
    let template;

    switch (location.pathname) {
      case '/':
        template = new MainPage();
        break;
      case '/login':
        template = new LoginPage();
        break;
      case '/signup':
        template = new SignupPage();
        break;
      case '/chats':
        template = new ChatPage();
        break;
      case '/profile':
        template = new ProfilePage();
        break;
      case '/error':
        template = new ErrorPage();
        break;
      default:
        template = new NonFoundPage();
        break;
    }
    
    this.appElement.innerHTML = '';
    this.appElement.appendChild(template.getContent())
  }
};
 