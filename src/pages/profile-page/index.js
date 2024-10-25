import tpl from './tpl.tmpl';
import Component from '../../utils/component';

export default class ProfilePage extends Component {
  render() {
    return this.compile(tpl);
  }
}
