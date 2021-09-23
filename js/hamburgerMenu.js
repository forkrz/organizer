const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.navigation');
const login = document.getElementById('login');
const logout = document.getElementById('logout');
const register = document.getElementById('register');
const settings = document.getElementById('settings');

let isMenuOpen = nav.classList.contains('navigation_open');

function hamburgerDisplay() {
    nav.classList.toggle('navigation_open');
    isMenuOpen = !isMenuOpen
}

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
    } else {
        if (isMenuOpen) {
            nav.classList.remove('navigation_open')
            isMenuOpen = false
        }
    }
}

function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function isLogged() {
    const cookie = getCookie('jwt');
    if (cookie) {
        login.remove();
        register.remove();

    } else {
        logout.remove();
        settings.remove();
    }
}

window.onload = isLogged();
document.addEventListener('click', toggleMenu);