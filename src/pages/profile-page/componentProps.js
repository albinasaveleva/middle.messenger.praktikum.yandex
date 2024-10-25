import { value } from "lodash-es";
import Avatar from "../../components/avatar";
import ButtonLink from "../../components/button-link";
import Input from "../../components/input";
import ButtonAction from "../../components/button-action";

const profilePageProps = [
  'main',
  {
    attr: {
      class: 'profile-page',
      id: 'profile-page'
    },
    buttonLink: new ButtonLink('a', {
      attr: {
        class: 'button-back',
        href: '/chats'
      }
    }),
    avatar: new Avatar('div', {
      attr: {
        class: 'avatar'
      }
    }),
    emailInput: new Input('input', {
      attr: {
        class: "input-field", 
        name: "email",
        type: "email",
        placeholder: "Почта",
        value: "pochta@yandex.ru"
      }
    }),
    loginInput: new Input('input', {
      attr: {
        class: "input-field", 
        name: "login",
        type: "text",
        placeholder: "Логин",
        value: "ivanivanov"
      }
    }),
    firstNameInput: new Input('input', {
      attr: {
        class: "input-field", 
        name: "first_name",
        type: "text",
        placeholder: "Имя",
        value: "Иван"
      }
    }),
    secondNameInput: new Input('input', {
      attr: {
        class: "input-field", 
        name: "second_name",
        type: "text",
        placeholder: "Фамилия",
        value: "Иванов"
      }
    }),
    displayNameInput: new Input('input', {
      attr: {
        class: "input-field", 
        name: "display_name",
        type: "text",
        placeholder: "Пароль",
        value: "Иван"
      }
    }),
    phoneInput: new Input('input', {
      attr: {
        class: "input-field", 
        name: "phone",
        type: "text",
        placeholder: "Телефон",
        value: '+7 (999) 999 99 99'
      }
    }),
    changeInfoButton: new ButtonLink('a', {
      attr: {
        class: "button-link", 
        href: "/profile/changeInfo"
      },
      action: 'Изменить данные'
    }),
    changePasswordButton: new ButtonLink('a', {
      attr: {
        class: "button-link", 
        href: "/profile/changePassword"
      },
      action: 'Изменить пароль'
    }),
    logoutButton: new ButtonLink('a', {
      attr: {
        class: "button-link", 
        href: "/profile"
      },
      action: 'Выйти'
    })
  }
];

export default profilePageProps;
