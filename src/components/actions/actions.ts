import tpl from './tpl.tmpl';
import Component from '../../utils/component';

class Actions extends Component {
    constructor(props: any, tag: string) {
        super({...props}, tag)
    }
    render() {
        return this.compile(tpl);
    }
}

export default Actions;
