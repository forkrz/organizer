const slider = document.querySelector('.slider-elements');

const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');

var sectionIndex = 0;

rightArrow.addEventListener('click', function() {
    sectionIndex = (sectionIndex < 3) ? sectionIndex + 1 : 0;
    slider.style.transform = 'translate(' + (sectionIndex) * -25 + '%)';
});
leftArrow.addEventListener('click', function() {
    sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 3;
    slider.style.transform = 'translate(' + (sectionIndex) * -25 + '%)';
});