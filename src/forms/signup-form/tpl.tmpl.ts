export default `
  <p class="title">Регистрация</p>
  <div class="inputs">
    <div class="form-input">
      <span class="input-label">Почта</span>
      {{{emailInput}}}
      <span class="input-error">Ошибка</span>
    </div>
    <div class="form-input">
      <span class="input-label">Логин</span>
      {{{loginInput}}}
      <span class="input-error">Ошибка</span>
    </div>
    <div class="form-input">
      <span class="input-label">Имя</span>
      {{{firstNameInput}}}
      <span class="input-error">Ошибка</span>
    </div>
    <div class="form-input">
      <span class="input-label">Фамилия</span>
      {{{secondNameInput}}}
      <span class="input-error">Ошибка</span>
    </div>
    <div class="form-input">
      <span class="input-label">Телефон</span>
      {{{phoneInput}}}
      <span class="input-error">Ошибка</span>
    </div>
    <div class="form-input">
      <span class="input-label">Пароль</span>
      {{{passwordInput}}}
      <span class="input-error">Ошибка</span>
    </div>
    <div class="form-input">
      <span class="input-label">Пароль (ещё раз)</span>
      {{{doublePasswordInput}}}
      <span class="input-error">Ошибка</span>
    </div>
  </div>
  <div class="buttons">
    {{{buttonAction}}}
    {{{buttonLink}}}
  </div>
`;