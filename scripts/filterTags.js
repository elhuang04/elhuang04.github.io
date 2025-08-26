function filterCards(tag, clickedButton) {
// Filter cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.style.display = (tag === 'all' || card.classList.contains(tag)) ? 'block' : 'none';
});

// Reset all buttons to outline style
const buttons = document.querySelectorAll('#filter-buttons button');
buttons.forEach(button => {
    button.classList.remove('bg-gray-200', 'text-gray-900');
    button.classList.add('bg-transparent', 'text-gray-700');
});

// Apply filled style to the clicked button
clickedButton.classList.remove('bg-transparent', 'text-gray-700');
clickedButton.classList.add('bg-gray-200', 'text-gray-900');
}

// Set default active on page load
window.onload = () => {
const defaultButton = document.querySelector('#filter-buttons button');
if (defaultButton) defaultButton.click();
};