import tpl from './tpl.hbs?raw';
import Component from '../../utils/component';

export default class AvatarInput extends Component {
  render() {
    return this.compile(tpl);
  }
}

