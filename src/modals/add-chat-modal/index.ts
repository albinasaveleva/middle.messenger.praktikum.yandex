import tpl from './tpl.tmpl';
import Component from '../../utils/component';
import Input from '../../components/input';
import ButtonAction from '../../components/button-action';
import connect from '../../utils/connect';
import userController from '../../controllers/user-controller';
import addChatForm from '../../forms/add-chat-form';
import chatController from '../../controllers/chat-controller';

class AddChatModal extends Component {
    constructor() {
        super({
            attr: {
                class: 'modal-content'
            },
            form: new addChatForm({
                attr: {
                    class: 'form',
                    name: "add-chat-form",
                    id: "add-chat-form"
                },
                titleInput: new Input({
                    attr: {
                        class: "input-field",
                        name: "title",
                        type: "text",
                        placeholder: "Название чата",
                        value: 'Новый чат'
                    },
                }, 'input'),
                buttonAction: new ButtonAction({
                    attr: {
                        class: "button-action",
                        type: "submit",
                        form: 'add-chat-form'
                    },
                    action: "Добавить",
                }, 'button'),
                events: {
                    submit: async (event: Event) => {
                        event.preventDefault();

                        const input = (event.target as HTMLElement).querySelector('input') as HTMLInputElement;
                        const data: {[key: string]: string} = { title: input.value };

                        const request = async() => {
                            try {
                                await chatController.addChat(data);
                                await chatController.getChats();
                            } catch (error) {
                                console.log(error)
                            }
                        };
                        await request();

                        (document.querySelector('#add-chat-modal') as HTMLElement).style.display = 'none';
                    }
                }
            }, 'form'),
        }, 'div')
    }
    render() {
        return this.compile(tpl);
    }
}
export default connect(AddChatModal);
