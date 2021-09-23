const text = document.getElementById("mailValidInfo");


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

function deleteCookie(name, path, domain) {
    if (getCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}


async function deleteCookieCheck() {
    await eraseCookie('jwt');
    const cookie = getCookie('jwt');
    if (!cookie) {
        text.innerHTML = 'You are logged out. You will be automaticly redirect in 5 seconds.'
    } else {
        text.innerHTML = 'Something went wrong, please try again.'
    }

}

deleteCookieCheck();