import tpl from './tpl.hbs?raw';
import Component from '../../utils/component';

export default class ButtonBack extends Component {
  render() {
    return this.compile(tpl);
  }
}
