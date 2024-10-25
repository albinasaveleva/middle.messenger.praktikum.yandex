import tpl from './tpl.hbs?raw';
import Component from '../../utils/component';
import Handlebars from 'handlebars';

export default class Error extends Component {
  constructor(props) {
    super('div', props);
  }

  render() {
    const template = Handlebars.compile(tpl);
    return template({
      title: this.props.title,
      subtitle: this.props.subtitle
    });
  }
}
