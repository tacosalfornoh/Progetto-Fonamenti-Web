const img = document.querySelector('#user-logo');
const navBar = document.querySelector('#user-navigation');

img.addEventListener('click', () => {
  if (navBar.hasAttribute('visibile')) {
    navBar.removeAttribute('visibile');
  } else {
    navBar.setAttribute('visibile', '');
  }
});

document.addEventListener('click', (event) => {
// Controlla se il clic è avvenuto all'interno dell'immagine o della navbar
if (!event.target.closest('#user-logo') && !event.target.closest('#user-navigation')) {
  navBar.removeAttribute('visibile');
}
});
