import Error from "../../components/error";
import ButtonLink from "../../components/button-link";

const errorPageProps = [
  'main',
  {
    attr: {
      class: 'error-page',
      id: 'error-page'
    },
    error: new Error('div', {
      attr: {
        class: ''
      },
      title: '500',
      subtitle: 'Мы уже фиксим',
      buttonLink: new ButtonLink('a', {
        attr: {
          href: '/chats',
          class: 'button-link'
        },
        action: 'Назад к чатам'
      })
    })
  }
];

export default errorPageProps;
