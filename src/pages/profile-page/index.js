import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import ProfileInfo from '../../components/profile-info';
import ButtonLink from '../../components/button-link';
import ChatPage from '../chat-page';
import Modal from '../../components/modal';
import AvatarModal from '../../components/avatar-modal';

export default class ProfilePage extends Component {
  constructor(changePageContent) {
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
          click: (event) => {
            event.preventDefault();
            // const href = event.target.attributes.href.value;
            // history.pushState(null, null, href);
            changePageContent({
              content: new ChatPage(changePageContent)
            });
          }
        }
      }),
      content: new ProfileInfo(changePageContent, (content)=>{this.setProps(content)}),
      modal: new Modal('div', {
        attr: {
          class: 'modal',
          id: 'avatar-modal'
        },
        content: new AvatarModal()
      })
    })
  }
  render() {
    return this.compile(tpl);
  }
}
