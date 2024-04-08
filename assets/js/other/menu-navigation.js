// Update selection for navButton to select a single element
const navButton = document.querySelector('.fe-menu');
const section = document.getElementById('menu-navigation');

// Check if navButton and section exist before adding the event listener
if (navButton) {
    navButton.addEventListener('click', function() {
        section.setAttribute('aria-expanded', section.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
} else {
    console.error('Nav button or section element not found.');
}
