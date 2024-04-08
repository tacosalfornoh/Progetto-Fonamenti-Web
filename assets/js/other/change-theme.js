// Update selection for themeSelector to select a single element
const themeSelector = document.querySelector('#theme-selector');
const body = document.querySelector('body');

// Check if themeSelector and section exist before adding the event listener
if (themeSelector) {
    themeSelector.addEventListener('click', function() {
        body.setAttribute('data-theme', body.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
        themeSelector.classList.toggle('fe-sun');
    });
} else {
    console.error('Theme button element not found.');
}
