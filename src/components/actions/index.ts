import tpl from './tpl.tmpl';
import Component from '../../utils/component';
import connect from '../../utils/connect';

class Actions extends Component {
  render() {
    return this.compile(tpl);
  }
}

export default connect(Actions);
