import tpl from './tpl.tmpl';
import Component from '../../utils/component';
import Input from '../input';
import ButtonAction from '../button-action';

export default class AvatarModal extends Component {
  constructor() {
    super('div', {
      attr: {
        class: 'modal-content'
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
        },
        action: 'Поменять'
      })
    })
  }
  render() {
    return this.compile(tpl);
  }
}

