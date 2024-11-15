import store, { StoreEvents } from "../store";

export default function connect(Component) {
    return class extends Component {
        constructor(props?, tag?) {
            super({ ...props, ...store.getState()}, tag);

            store.on(StoreEvents.Updated, () => {
                this.setProps({...store.getState()});
            });
        }
      }
}
