const profilePage = document.querySelector('#profile-page');

const inputs = profilePage.querySelectorAll('.profile-input .input-field');

const avatarWrapper = profilePage.querySelector('.avatar-wrapper');
const [ avatar, avatarHover ] = avatarWrapper.children;

const modal = document.querySelector('.modal');

inputs.forEach(input => input.readOnly = true)

avatarWrapper.addEventListener('mouseover', () => {
  avatarHover.style.display = "flex";
});
avatarWrapper.addEventListener('mouseout', () => {
  avatarHover.style.display = "none";
});
avatarWrapper.addEventListener('click', () => {
  modal.style.display = 'flex';
});

modal.addEventListener('click', (event) => {
  if (event.target.classList.contains("modal")) {
    modal.style.display = 'none';
  }
});
