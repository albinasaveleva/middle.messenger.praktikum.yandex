import tpl from './tpl.hbs?raw';
import Component from '../../utils/component';

export default class ChatPage extends Component {
  render() {
    return this.compile(tpl);
  }
}

