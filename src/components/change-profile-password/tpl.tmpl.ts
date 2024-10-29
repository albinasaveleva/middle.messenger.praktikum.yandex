export default `
  <div class="avatar-wrapper">
    {{{avatar}}}
  </div>
  <span class="name">Иван</span>
  <form class="form" name="profile-form" id="profile-form">
    <div class="inputs">
      <div class="profile-input">
        <span class="input-label">Старый пароль</span>
        {{{oldPasswordInput}}}
      </div>
      <div class="profile-input">
        <span class="input-label">Новый пароль</span>
        {{{newPasswordInput}}}
      </div>
      <div class="profile-input">
        <span class="input-label">Повторите новый пароль</span>
        {{{doubleNewPasswordInput}}}
      </div>
    </div>
    <div class="buttons">
      {{{saveButton}}}
    </div>
  </form>
`;
