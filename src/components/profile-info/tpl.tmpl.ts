export default `
  <div class="avatar-wrapper">
    {{{avatar}}}
    <div class="avatar-hover">
      <span>Поменять<br/>аватар</span>
    </div>
  </div>
  <span class="name">Иван</span>
  <form class="form" name="profile-form" id="profile-form" onsubmit="return false;">
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
`;
