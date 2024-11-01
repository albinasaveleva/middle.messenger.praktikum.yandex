import tpl from './tpl.tmpl';
import Component from '../../utils/component';

export default class LoginForm extends Component {
  render() {
    return this.compile(tpl);
  }
}

