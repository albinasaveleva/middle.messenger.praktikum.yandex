import { 
  ChatPage,
  ErrorPage,
  LoginPage,
  MainPage,
  NonFoundPage,
  ProfilePage,
  SignupPage
} from './pages/index';

// import Avatar from './components/avatar/index';
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

// Handlebars.registerPartial('Avatar', Avatar);
// Handlebars.registerPartial('AvatarInput', AvatarInput);
// Handlebars.registerPartial('ButtonAction', ButtonAction);
// Handlebars.registerPartial('ButtonBack', ButtonBack);
// Handlebars.registerPartial('ButtonLink', ButtonLink);
// Handlebars.registerPartial('ButtonSend', ButtonSend);
// Handlebars.registerPartial('Chat', Chat);
// Handlebars.registerPartial('ChatFeed', ChatFeed);
// Handlebars.registerPartial('Chats', Chats);
// Handlebars.registerPartial('EmptyChatFeed', EmptyChatFeed);
// Handlebars.registerPartial('Error', Error);
// Handlebars.registerPartial('FormInput', FormInput);
// Handlebars.registerPartial('IncomingMessage', IncomingMessage);
// Handlebars.registerPartial('MessageInput', MessageInput);
// Handlebars.registerPartial('Modal', Modal);
// Handlebars.registerPartial('OutcomingMessage', OutcomingMessage);
// Handlebars.registerPartial('PageForm', PageForm);
// Handlebars.registerPartial('ProfileInput', ProfileInput);
// Handlebars.registerPartial('SearchInput', SearchInput);
// Handlebars.registerPartial('Timestamp', Timestamp);

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
        template = new SignupPage(
          'main',
          {
            attr: {
              class: 'signup-page',
              id: 'signup-page'
            }
          }
        );
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
        template = new ErrorPage(
          'main',
          {
            attr: {
              class: 'error-page',
              id: 'error-page'
            }
          }
        );
        break;
      default:
        template = new NonFoundPage(
          'main',
          {
            attr: {
              class: 'non-found-page',
              id: 'non-found-page'
            }
          }
        );
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
 