// {{#> PageForm name="login-form" id="login-form" }}
//   <p class="title">Регистрация</p>
//   <div class="form-inputs">
//     {{> FormInput name="email" type="email" placeholder="Почта" }}
//     {{> FormInput name="login" type="text" placeholder="Логин" }}
//     {{> FormInput name="first_name" type="text" placeholder="Имя" }}
//     {{> FormInput name="second_name" type="text" placeholder="Фамилия" }}
//     {{> FormInput name="phone" type="text" placeholder="Телефон" }}
//     {{> FormInput name="password" type="password" placeholder="Пароль" }}
//     {{> FormInput name="password" type="password" placeholder="Пароль" }}
//   </div>
//   {{> ButtonAction action="Зарегистрироваться" }}
//   {{> ButtonLink href="./login-page" action="Войти" }}
// {{/PageForm}}

export default `
  {{{pageForm}}}
`;
