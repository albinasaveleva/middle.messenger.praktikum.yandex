import PageForm from "../../components/page-form";
import Title from "../../components/title";

const signupPageProps = [
  'main',
  {
    attr: {
      class: 'signup-page',
      id: 'signup-page'
    },
    pageForm: new PageForm('div', {
      attr: {
        class: 'page-form',
      },
      name: 'signup-form',
      id: 'signup-form',
      content: 'Регистрация'
    }),
    
  }
];

export default signupPageProps;
