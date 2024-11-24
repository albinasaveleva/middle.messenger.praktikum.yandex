import store, { StoreEvents } from "../store";

export default function Connect(Component, mapStateToProps: (state: Indexed) => Indexed) {
    return class extends Component {
        constructor(props?: any, tag?: string) {
            super({ ...props, ...mapStateToProps(store.getState())}, tag);

            store.on(StoreEvents.Updated, () => {
                this.setProps({...mapStateToProps(store.getState())});
            });
        }
      }
}

function mapUserToProps(state) {
    return {
        user: state.user,
        chatList: state.chatList,
        currentChat: state.currentChat,
    };
}
