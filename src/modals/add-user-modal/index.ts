import tpl from './tpl.tmpl';
import Component from '../../utils/component';
import Input from '../../components/input';
import ButtonAction from '../../components/button-action';
import connect from '../../utils/connect';
import userController from '../../controllers/user-controller';
import chatController from '../../controllers/chat-controller';
import addUserForm from '../../forms/add-user-form';
import store from '../../store';

class AddUserModal extends Component {
    constructor(props: any) {
        super({
            ...props,
            attr: {
                class: 'modal-content'
            },
            form: new addUserForm({
                attr: {
                    class: 'form',
                    name: "add-user-form",
                    id: "add-user-form"
                },
                loginInput: new Input({
                    attr: {
                        class: "input-field",
                        name: "login",
                        type: "text",
                        placeholder: "Логин",
                    },
                }, 'input'),
                buttonAction: new ButtonAction({
                    attr: {
                        class: "button-action",
                        type: "submit",
                        form: 'add-user-form'
                    },
                    action: "Добавить",
                }, 'button'),
                events: {
                    submit: async (event: Event) => {
                        event.preventDefault();

                        const { currentChat } = store.getState();

                        const input = (event.target as HTMLElement).querySelector('input') as HTMLInputElement;
                        const newUser = await userController.searchUser({ login: input.value });

                        const data = {
                            users: [
                                newUser[0].id
                            ],
                            chatId: currentChat?.id
                         };

                        const request = async() => {
                            try {
                                await chatController.addUser(data);
                            } catch (error) {
                                console.log(error)
                            }
                        };
                        await request();

                        (document.querySelector('#add-user-modal') as HTMLElement).style.display = 'none';
                    }
                }
            }, 'form'),
        }, 'div')
    }
    render() {
        return this.compile(tpl);
    }
}
export default connect(AddUserModal);
