import store, { StoreEvents } from "../store";
import Component from "./component";

export default function Connect(Component, mapStateToProps) {
    return class extends Component {
        constructor(props?: any, tag?: string) {
            super({ ...props, ...mapStateToProps(store.getState())}, tag);

            store.on(StoreEvents.Updated, () => {
                this.setProps({...mapStateToProps(store.getState())});
            });
        }
      }
}
