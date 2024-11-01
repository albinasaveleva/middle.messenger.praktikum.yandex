export const inputValidation = (input: HTMLInputElement): boolean => {
  switch (input.name) {
    case 'login':
      return /(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}/.test(input.value);
    case 'password':
      return /(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,40}/.test(input.value);
    case 'email':
      return /[a-zA-Z_-]{1,}@{1}[a-zA-Z]{1,}[.]{1}[a-zA-Z]{1,}/.test(input.value);
    case 'first_name':
      return /[A-ZА-Я]{1}[a-zа-я-]/.test(input.value);
    case 'second_name':
      return /[A-ZА-Я]{1}[a-zа-я-]/.test(input.value);
    case 'phone':
      return /[+]{0,1}[0-9]{10,15}/.test(input.value);
    case 'display_name':
      return /[A-ZА-Я]{1}[a-zа-я-]/.test(input.value);
    case 'message':
      return /.{1,}/.test(input.value.trim());
    default:
      return false;
  }
}
