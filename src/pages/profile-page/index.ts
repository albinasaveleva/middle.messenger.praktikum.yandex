import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import ProfileInfo from '../../components/profile-info';
import ButtonLink from '../../components/button-link';
import ChatPage from '../chat-page';
import Modal from '../../components/modal';
import AvatarModal from '../../modals/avatar-modal';
import { inputValidation } from '../../utils/formValidation';

export const blur = (event: Event) => {
    const profileInput = (event.target as HTMLElement).closest('.profile-input');
    const inputLabel = profileInput?.querySelector('.input-label');

    if (inputValidation(event.target as HTMLInputElement)) {
      (inputLabel as HTMLElement).style.color = "inherit";
    } else {
      (inputLabel as HTMLElement).style.color = "red";
    }
}

export default class ProfilePage extends Component {
  constructor(changePageContent: ({}) => {}) {
    super('div', {
      attr: {
        class: 'profile-page',
        id: 'profile-page'
      },
      buttonLink: new ButtonLink('a', {
        attr: {
          class: 'button-back',
          href: '/chats'
        },
        events: {
          click: (event: Event) => {
            event.preventDefault();
            // const href = event.target.attributes.href.value;
            // history.pushState(null, null, href);
            changePageContent({
              content: new ChatPage(changePageContent)
            });
          }
        }
      }),
      content: new ProfileInfo(changePageContent, (content: {[key: string]: any})=>{this.setProps(content)}),
      modal: new Modal('div', {
        attr: {
          class: 'modal',
          id: 'avatar-modal'
        },
        content: new AvatarModal(),
        events: {
          click: (event: Event) => {
            if ((event.target as HTMLElement).classList.contains("modal")) {
              (event.target as HTMLElement).style.display = 'none';
            }
          }
        }
      })
    })
  }
  render() {
    return this.compile(tpl);
  }
}
