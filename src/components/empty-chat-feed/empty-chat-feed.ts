import tpl from './tpl.tmpl';
import Component from '../../utils/component';

class EmptyChatFeed extends Component {
    constructor(props?: any) {
        super({
            ...props,
            attr: {
                class: 'chat-feed'
            }
        }, 'div')
    }
    render() {
        return this.compile(tpl);
    }
}

export default EmptyChatFeed;
