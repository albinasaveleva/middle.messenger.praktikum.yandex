const avatarWrapper = document.querySelector('.avatar-wrapper');
const [ avatar, avatarHover ] = avatarWrapper.children;
const modal = document.querySelector('.modal');

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
