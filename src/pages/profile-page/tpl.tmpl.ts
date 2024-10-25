// {{!-- <div class="navigation">
//   {{> ButtonBack href="./chat-page" }}
// </div>
// <div class="profile">
  
//   <div class="info">
//     {{> ProfileInput label="Почта" name="email" type="email" placeholder="Почта" value="pochta@yandex.ru" }}
//     {{> ProfileInput label="Логин" name="login" type="text" placeholder="Логин" value="ivanivanov" }}
//     {{> ProfileInput label="Имя" name="first_name" type="text" placeholder="Имя" value="Иван" }}
//     {{> ProfileInput label="Фамилия" name="second_name" type="text" placeholder="Фамилия" value="Иванов" }}
//     {{> ProfileInput label="Имя в чате" name="display_name" type="text" placeholder="Имя в чате" value="Иван" }}
//     {{> ProfileInput label="Телефон" name="phone" type="text" placeholder="Телефон" value="+7(999)9999999" }}
//   </div>
//   <div class="buttons">
//     {{> ButtonLink href="./change-profile-info-page.html" action="Изменить данные" }}
//     {{> ButtonLink href="./change-profile-password-page.html" action="Изменить пароль" }}
//     {{> ButtonLink href="#" action="Выйти" }}
//   </div>
// </div> --}}
// {{!-- {{#> Modal }}
// {{#> PageForm name="avatar-form" id="avatar-form" }}
// <h2 class="title">Загрузите файл</h2>
// {{> AvatarInput }}
// {{> ButtonAction action="Поменять" }}
// {{/PageForm}}
// {{/Modal}} --}}

export default `
  <div class="navigation">
    {{{buttonLink}}}
  </div>
  <div class="profile">
    <div class="avatar-wrapper">
      {{{avatar}}}
      <div class="avatar-hover">
        <span>Поменять<br/>аватар</span>
      </div>
    </div>
    <span class="name">Иван</span>
    <form class="form" name="profile-form" id="profile-form">
      <div class="inputs">
        <div class="profile-input">
          <span class="input-label">Почта</span>
          {{{emailInput}}}
        </div>
        <div class="profile-input">
          <span class="input-label">Логин</span>
          {{{loginInput}}}
        </div>
        <div class="profile-input">
          <span class="input-label">Имя</span>
          {{{firstNameInput}}}
        </div>
        <div class="profile-input">
          <span class="input-label">Фамилия</span>
          {{{secondNameInput}}}
        </div>
        <div class="profile-input">
          <span class="input-label">Имя в чате</span>
          {{{displayNameInput}}}
        </div>
        <div class="profile-input">
          <span class="input-label">Телефон</span>
          {{{phoneInput}}}
        </div>
      </div>
      <div class="buttons">
        {{{changeInfoButton}}}
        {{{changePasswordButton}}}
        {{{logoutButton}}}
      </div>
    </form>
  </div>
  {{{modal}}}
`;
