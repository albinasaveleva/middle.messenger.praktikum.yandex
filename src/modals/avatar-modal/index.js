import tpl from './tpl.tmpl';
import Component from '../../utils/component';
import Input from '../../components/input';
import ButtonAction from '../../components/button-action';
import AvatarForm from '../../forms/avatar-form';

export default class AvatarModal extends Component {
  constructor() {
    super('div', {
      attr: {
        class: 'modal-content'
      },
      form: new AvatarForm('form', {
        attr: {
          class: 'form',
          name: "avatar-form",
          id: "avatar-form"
        },
        avatarInput: new Input('input', {
          attr: {
            class: 'input-field',
            type: 'file',
            name: 'avatar'
          }
        }),
        changeButton: new ButtonAction('button', {
          attr: {
            class: 'button-action',
            type: 'submit',
            form: 'avatar-form'
          },
          action: 'Поменять'
        }),
        events: {
          submit: (event) => {
            event.preventDefault();
            
            const formData = new FormData(event.target);

            for (let pair of formData.entries()) {
              console.log(`${pair[0]}: ${pair[1]}`);
            }

            event.target.closest('#avatar-modal').style.display = 'none';
          }
        }
      }),
    })
  }
  render() {
    return this.compile(tpl);
  }
}
