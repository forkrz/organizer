const slider = document.querySelector('.slider-elements');

const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');
const indicatorParents = document.querySelector('.controls ul');

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.navigation');



// let sectionIndex = 0;

// document.querySelectorAll('.controls li').forEach(function(indicator, ind) {
//     indicator.addEventListener('click', function() {
//         sectionIndex = ind;
//         document.querySelector('.controls .selected').classList.remove('selected');
//         indicator.classList.add('selected');
//         slider.style.transform = 'translate(' + (sectionIndex) * -25 + '%)';
//     });
// });

// rightArrow.addEventListener('click', function() {
//     sectionIndex = (sectionIndex < 3) ? sectionIndex + 1 : 0;
//     document.querySelector('.controls .selected').classList.remove('selected');
//     indicatorParents.children[sectionIndex].classList.add('selected');
//     slider.style.transform = 'translate(' + (sectionIndex) * -25 + '%)';
// });
// leftArrow.addEventListener('click', function() {
//     sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 3;
//     document.querySelector('.controls .selected').classList.remove('selected');
//     indicatorParents.children[sectionIndex].classList.add('selected');
//     slider.style.transform = 'translate(' + (sectionIndex) * -25 + '%)';
// });

// function changeImg() {
//     if (sectionIndex < 3) {
//         sectionIndex++;
//     } else {
//         sectionIndex = 0;
//     }
//     document.querySelector('.controls .selected').classList.remove('selected');
//     indicatorParents.children[sectionIndex].classList.add('selected');
//     slider.style.transform = 'translate(' + (sectionIndex) * -25 + '%)';
//     setTimeout("changeImg()", 2000);
// }

function hamburgerDisplay() {
    nav.classList.toggle('navigation_open');
}

hamburger.addEventListener("click", hamburgerDisplay)
    //window.onload = changeImg();