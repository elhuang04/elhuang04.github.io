const showHideButton = document.getElementById("showHideButton");
showHideButton.addEventListener('click', function() {
    document.getElementById("galleryWrapper").classList.toggle("hideGallery");
    showHideButton.innerHTML = showHideButton.innerHTML === 'Show More' ? 'Show Less' : 'Show More';
});