export const inputValidation = (input) => {
  const form = input.closest('.form');
  const formButton = form.querySelector('.button-action');
  const formInput = input.closest('.form-input')
  const inputField = input;
  const inputError = formInput.querySelector('.input-error');

  const addError = () => {
    inputError.style.opacity = "0";
    formButton.disabled = false;
  }

  const removeError = () => {
    inputError.style.opacity = "1";
    formButton.disabled = true;
  }

  switch (inputField.name) {
    case 'login':
      if (/(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}/.test(inputField.value)) {
        addError();
      } else {
        removeError();
      }
      break;
    case 'password':
      if (/(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,40}/.test(inputField.value)) {
        addError();
      } else {
        removeError();
      }
      break;
    case 'email':
      if (/[a-zA-Z_-]{1,}@{1}[a-zA-Z]{1,}[.]{1}[a-zA-Z]{1,}/.test(inputField.value)) {
        addError();
      } else {
        removeError();
      }
      break;
    case 'first_name':
      if (/[A-ZА-Я]{1}[a-zа-я-]/.test(inputField.value)) {
        addError();
      } else {
        removeError();
      }
      break;
    case 'second_name':
      if (/[A-ZА-Я]{1}[a-zа-я-]/.test(inputField.value)) {
        addError();
      } else {
        removeError();
      }
      break;
    case 'phone':
      if (/[+]{0,1}[0-9]{10,15}/.test(inputField.value)) {
        addError();
      } else {
        removeError();
      }
      break;
    case 'message':
      if (/.{1,}/.test(inputField.value)) {
        addError();
      } else {
        removeError();
      }
      break;
    default:
      break;
  }
}
