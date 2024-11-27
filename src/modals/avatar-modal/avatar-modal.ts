import tpl from './tpl.tmpl';
import Component from '../../utils/component';
import Input from '../../components/input/index';
import ButtonAction from '../../components/button-action/index';
import AvatarForm from '../../forms/avatar-form/index';
import userController from '../../controllers/user-controller';

class AvatarModal extends Component {
  constructor(props?: any) {
    super({
        ...props,
        attr: {
            class: 'modal-content'
        },
        form: new AvatarForm({
            attr: {
            class: 'form',
            name: "avatar-form",
            id: "avatar-form"
            },
            avatarInput: new Input({
            attr: {
                class: 'input-field',
                type: 'file',
                name: 'avatar'
            }
            }, 'input'),
            changeButton: new ButtonAction({
            attr: {
                class: 'button-action',
                type: 'submit',
                form: 'avatar-form'
            },
            action: 'Поменять'
            }, 'button'),
            events: {
            submit: async (event: Event) => {
                event.preventDefault();

                const input = (event.target as HTMLElement).querySelector('input') as HTMLInputElement;
                const file = (input.files as FileList)[0];

                const formData = new FormData();
                formData.append('avatar', file);

                const request = async() => {
                    try {
                        await userController.updateAvatar(formData);
                        // await userController.getAvatar(props.user.avatar);
                    } catch (error) {
                        console.log(error)
                    }
                };
                await request();

                (document.querySelector('#avatar-modal') as HTMLElement).style.display = 'none';
            }
            }
        }, 'form'),
    }, 'div')
  }
  render() {
    return this.compile(tpl);
  }
}
export default AvatarModal;
