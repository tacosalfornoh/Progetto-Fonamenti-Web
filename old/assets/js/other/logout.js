const icon = document.getElementById('icona-logout');
const logoutWritten = document.getElementById('logout');

icon.addEventListener('mouseenter', () => {
    logoutWritten.setAttribute('visibile', 'true');
});

icon.addEventListener('mouseleave', () => {
    logoutWritten.removeAttribute('visibile');
});
