import tpl from './tpl.hbs?raw';
import Component from '../../utils/component';

export default class MainPage extends Component {
  render() {
    return this.compile(tpl);
  }
}

