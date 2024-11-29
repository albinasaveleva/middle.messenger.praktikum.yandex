import store, { StoreEvents } from "../store";

export default function Connect(Component: any, mapStateToProps: any) {
    return class extends Component {
        constructor(props?: any, tag?: string) {
            super({ ...props, ...mapStateToProps(store.getState())}, tag);

            store.on(StoreEvents.Updated, () => {
                this.setProps({...mapStateToProps(store.getState())});
            });
        }
    }
}
