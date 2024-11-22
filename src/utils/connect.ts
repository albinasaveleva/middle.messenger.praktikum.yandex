import store, { StoreEvents } from "../store";

export default function connect(Component) {
    return class extends Component {
        constructor(props?: any, tag?: string) {
            super({ ...props, ...store.getState()}, tag);

            store.on(StoreEvents.Updated, () => {
                console.log(this)

                this.setProps({...store.getState()});
            });
        }
      }
}
