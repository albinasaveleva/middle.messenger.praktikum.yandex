import store, { StoreEvents } from "../store";

export default function connect(Component) {
    return class extends Component {
        constructor(...props) {
            super(...props);

            store.on(StoreEvents.Updated, () => {
                this.setProps({...store.getState()});
            });
        }
      }
}
