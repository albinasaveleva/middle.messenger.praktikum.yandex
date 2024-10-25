import Error from "../../components/error";
import Link from "../../components/link";

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
      link: new Link('a', {
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
