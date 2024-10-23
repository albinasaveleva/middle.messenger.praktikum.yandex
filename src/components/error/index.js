import tpl from './tpl.hbs?raw';
import Block from '../../utils/Block';
import Handlebars from 'handlebars';

export default class Error extends Block {
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
