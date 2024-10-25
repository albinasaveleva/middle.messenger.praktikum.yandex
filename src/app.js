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

import Avatar from './components/avatar/index';
import Link from './components/link';
import errorPageProps from './pages/error-page/componentProps';
import signupPageProps from './pages/signup-page/componentProps';
// import AvatarInput from './components/avatar-input/index';
// import ButtonAction from './components/button-action/index';
// import ButtonBack from './components/button-back/index';
// import ButtonLink from './components/button-link/index';
// import ButtonSend from './components/button-send';
// import Chat from './components/chat/index';
// import ChatFeed from './components/chat-feed/index';
// import Chats from './components/chats';
// import EmptyChatFeed from './components/empty-chat-feed/index';
// import Error from './components/error/index';
// import FormInput from './components/form-input/index';
// import IncomingMessage from './components/incoming-message';
// import MessageInput from './components/message-input/index';
// import Modal from './components/modal/index';
// import OutcomingMessage from './components/outcoming-message/index';
// import PageForm from './components/page-form/index';
// import ProfileInput from './components/profile-input/index';
// import SearchInput from './components/search-input';
// import Timestamp from './components/timestamp/index';



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
        template = new LoginPage(
          'main',
          {
            attr: {
              class: 'login-page',
              id: 'login-page'
            }
          }
        );
        break;
      case '/signup':
        template = new SignupPage(...signupPageProps);
        break;
      case '/chats':
        template = new ChatPage(
          'main',
          {
            attr: {
              class: 'chat-page',
              id: 'chat-page'
            }
          }
        );
        break;
      case '/profile':
        template = new ProfilePage(
          'main',
          {
            attr: {
              class: 'profile-page',
              id: 'profile-page'
            }
          }
        );
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
 