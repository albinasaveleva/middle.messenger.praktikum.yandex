import tpl from './tpl.tmpl';
import Component from '../../utils/component';
import Input from '../../components/input';
import ButtonAction from '../../components/button-action';
import AvatarForm from '../../forms/avatar-form';
import connect from '../../utils/connect';
import userController from '../../controllers/user-controller';

class AvatarModal extends Component {
  constructor() {
    super({
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
          submit: (event: Event) => {
            event.preventDefault();

            const inputs = (event.target as HTMLElement).querySelectorAll('input');
            const formData = new FormData();
            formData.append('avatar', inputs[0].value);

            userController.updateAvatar(formData);

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
export default connect(AvatarModal);
