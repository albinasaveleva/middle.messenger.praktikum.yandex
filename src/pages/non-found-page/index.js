import tpl from './tpl.tmpl';
import Component from '../../utils/component';
import Link from '../../components/link';

export default class NonFoundPage extends Component {
  render() {
    return this.compile(tpl)
  }
}

