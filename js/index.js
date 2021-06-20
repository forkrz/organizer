const slider = document.querySelector('.slider-elements');

const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');
const indicatorParents = document.querySelector('.controls ul');

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.navigation');

let isMenuOpen = nav.classList.contains('navigation_open');


let sectionIndex = 0;

document.querySelectorAll('.controls li').forEach(function(indicator, ind) {
    indicator.addEventListener('click', function() {
        sectionIndex = ind;
        document.querySelector('.controls .selected').classList.remove('selected');
        indicator.classList.add('selected');
        slider.style.transform = 'translate(' + (sectionIndex) * -25 + '%)';
    });
});

rightArrow.addEventListener('click', function() {
    sectionIndex = (sectionIndex < 3) ? sectionIndex + 1 : 0;
    document.querySelector('.controls .selected').classList.remove('selected');
    indicatorParents.children[sectionIndex].classList.add('selected');
    slider.style.transform = 'translate(' + (sectionIndex) * -25 + '%)';
});
leftArrow.addEventListener('click', function() {
    sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 3;
    document.querySelector('.controls .selected').classList.remove('selected');
    indicatorParents.children[sectionIndex].classList.add('selected');
    slider.style.transform = 'translate(' + (sectionIndex) * -25 + '%)';
});

function changeImg() {
    if (sectionIndex < 3) {
        sectionIndex++;
    } else {
        sectionIndex = 0;
    }
    document.querySelector('.controls .selected').classList.remove('selected');
    indicatorParents.children[sectionIndex].classList.add('selected');
    slider.style.transform = 'translate(' + (sectionIndex) * -25 + '%)';
    setTimeout("changeImg()", 2000);
}

function hamburgerDisplay() {
    nav.classList.toggle('navigation_open');
    isMenuOpen = !isMenuOpen
}


window.onload = changeImg();



function hideMenu() {
    if (isMenuOpen) {
        nav.classList.remove("navigation_open");
        isMenuOpen = !isMenuOpen
    }
}

const toggleMenu = (e) => {
    if (['button', 'i'].includes(e.target.tagName.toLowerCase())) {
        nav.classList.toggle('navigation_open')
        isMenuOpen = !isMenuOpen
        console.log(e)
    } else {
        if (isMenuOpen) {
            nav.classList.remove('navigation_open')
            isMenuOpen = false
        }
    }
}

document.addEventListener('click', toggleMenu);