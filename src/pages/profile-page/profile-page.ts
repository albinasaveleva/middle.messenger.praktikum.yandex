import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import ProfileInfo from '../../components/profile-info';
import ButtonLink from '../../components/button-link';
import Modal from '../../components/modal';
import AvatarModal from '../../modals/avatar-modal';
import { inputValidation } from '../../utils/formValidation';
import Router from '../../utils/router';

const router = new Router("#app");

export const blur = (target: HTMLInputElement) => {
    const profileInput = target.closest('.profile-input');
    const inputLabel = profileInput?.querySelector('.input-label');

    if (inputValidation(target)) {
      (inputLabel as HTMLElement).style.color = "inherit";
    } else {
      (inputLabel as HTMLElement).style.color = "red";
    }
}

class ProfilePage extends Component {
    constructor(props: any) {
        super({
            ...props,
            attr: {
                class: 'profile-page',
                id: 'profile-page'
            },
            buttonLink: new ButtonLink({
                attr: {
                    class: 'button-back',
                },
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        router.go('/messenger');
                    }
                }
            }, 'a'),
            // content: new ProfileInfo({
            //     changeProfileContent: (content: {[key: string]: any}) => this.setProps(content)
            // }),
            modal: new Modal({
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
            }, 'div')
        }, 'div')
    }
    render() {
        return this.compile(tpl);
    }
}
export default ProfilePage;
