import tpl from './tpl.tmpl';
import Component from '../../utils/component';
import StartPage from '../start-page';

export default class MainPage extends Component {
  constructor() {
    super('main', {
      content: new StartPage((content: {[key: string]: any}): void =>{this.setProps(content)})
    })
  }
  render() {
    return this.compile(tpl);
  }
}

