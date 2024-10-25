import Error from "../../components/error";
import ButtonLink from "../../components/button-link";

const nonFoundPageProps = [
  'main', 
  {
    attr: {
      class: 'non-found-page',
      id: 'non-found-page'
    },
    error: new Error('div', {
      attr: {
        class: ''
      },
      title: '404',
      subtitle: 'Не туда попали',
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

export default nonFoundPageProps;
