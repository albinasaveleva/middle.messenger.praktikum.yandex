import tpl from './tpl.hbs?raw';
import Component from '../../utils/component';

export default class ButtonAction extends Component {
  render() {
    return this.compile(tpl);
  }
}

