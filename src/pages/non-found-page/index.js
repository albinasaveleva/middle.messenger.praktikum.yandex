import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import Error from "../../components/error";
import ButtonLink from "../../components/button-link";

export default class NonFoundPage extends Component {
  constructor() {
    super('div', {
      attr: {
        title: '404',
        subtitle: 'Не туда попали',
      },
      error: new Error('div', {
        attr: {
          class: ''
        },
        title: '404',
        subtitle: 'Не туда попали',
        buttonLink: new ButtonLink('a', {
          attr: {
            href: '/chats',
            class: 'button-link'
          },
          action: 'Назад к чатам'
        })
      })
    })
  }
  render() {
    return this.compile(tpl)
  }
}

