import { 
  ChatPage,
  ErrorPage,
  LoginPage,
  MainPage,
  NonFoundPage,
  ProfilePage,
  SignupPage
} from './pages/index';

import nonFoundPageProps from './pages/non-found-page/componentProps'
import errorPageProps from './pages/error-page/componentProps';
import signupPageProps from './pages/signup-page/componentProps';
import loginPageProps from './pages/login-page/componentProps';
import profilePageProps from './pages/profile-page/componentProps';
import chatPageProps from './pages/chat-page/componentProps';

export default class App {
  constructor() {
    // this.currentPage = 'MainPage';
    this.appElement = document.getElementById('app');
  }
  render() {
    let template;

    switch (location.pathname) {
      case '/':
        template = new MainPage(
          'main',
          {
            attr: {
              class: 'main-page',
              id: 'main-page'
            }
          }
        );
        break;
      case '/login':
        template = new LoginPage(...loginPageProps);
        break;
      case '/signup':
        template = new SignupPage(...signupPageProps);
        break;
      case '/chats':
        template = new ChatPage(...chatPageProps);
        break;
      case '/profile':
        template = new ProfilePage(...profilePageProps);
        break;
      case '/error':
        template = new ErrorPage(...errorPageProps);
        break;
      default:
        template = new NonFoundPage(...nonFoundPageProps);
        break;
    }
    
    this.appElement.innerHTML = '';
    this.appElement.appendChild(template.getContent())

    this.attachEventListeners();
  }
  attachEventListeners() {
    document.querySelectorAll('a[data-page-link]').forEach(item => {
      item.addEventListener('click', (event)=>{
        event.preventDefault();
        const href = event.target.attributes.href.value;
        history.pushState(null, null, href);
      })
    })
  }
};
 