import tpl from './tpl.tmpl';
import Component from '../../utils/component';
import Input from '../../components/input';
import ButtonAction from '../../components/button-action';
import connect from '../../utils/connect';
import userController from '../../controllers/user-controller';
import addChatForm from '../../forms/add-chat-form';
import chatController from '../../controllers/chat-controller';
import deleteUserForm from '../../forms/delete-user-form';

class DeleteUserModal extends Component {
    constructor() {
        super({
            attr: {
                class: 'modal-content'
            },
            form: new deleteUserForm({
                attr: {
                    class: 'form',
                    name: "delete-user-form",
                    id: "delete-user-form"
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
                        form: 'delete-user-form'
                    },
                    action: "Удалить",
                }, 'button'),
                events: {
                    submit: async (event: Event) => {
                        event.preventDefault();

                        // {
                        //     "users": [
                        //       0
                        //     ],
                        //     "chatId": 0
                        //   }

                        // const input = (event.target as HTMLElement).querySelector('input') as HTMLInputElement;
                        // const data: {[key: string]: string} = { title: input.value };

                        // const request = async() => {
                        //     try {
                        //         await chatController.addChat(data);
                        //         await chatController.getChats();
                        //     } catch (error) {
                        //         console.log(error)
                        //     }
                        // };
                        // await request();

                        (document.querySelector('#delete-user-modal') as HTMLElement).style.display = 'none';
                    }
                }
            }, 'form'),
        }, 'div')
    }
    render() {
        return this.compile(tpl);
    }
}
export default connect(DeleteUserModal);
