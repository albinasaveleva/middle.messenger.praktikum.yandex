import tpl from './tpl.tmpl';
import Component from '../../utils/component';
import connect from '../../utils/connect';

class Modal extends Component {
  render() {
    return this.compile(tpl);
  }
}
export default connect(Modal);
