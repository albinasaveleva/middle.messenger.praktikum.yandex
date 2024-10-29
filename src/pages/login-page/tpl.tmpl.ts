export default `
  <div class="page-form">
    <form class="form" name="login-form" id="login-form" onsubmit="return false;">
      <p class="title">Вход</p>
      <div class="inputs">
        <div class="form-input">
          <span class="input-label">Логин</span>
            {{{loginInput}}}
          <span class="input-error">Ошибка</span>
        </div>
        <div class="form-input">
          <span class="input-label">Пароль</span>
            {{{passwordInput}}}
          <span class="input-error">Ошибка</span>
        </div>
      </div>
      <div class="buttons">
        {{{buttonAction}}}
        {{{buttonLink}}}
      </div>
    </form>
  </div>
`;
