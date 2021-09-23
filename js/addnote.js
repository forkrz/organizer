const AddNoteButton = document.getElementById('AddNoteButton');
const noteFieldTitle = document.getElementById('noteFieldTitle');
const noteFieldText = document.getElementById('noteFieldText');


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

function checkToken() {

    const data = {
        jwt: getCookie('jwt')
    }
    fetch('http://org.localhost/php/api/tokenValidation.php', {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(res => {
        if (ApiTokenMessageHandler(res.message) == true) {
            addNote();
        } else {
            console.log(res.message);
            console.log('nope');
        }
    })
};

function ApiTokenMessageHandler(message) {
    if (message = "Access granted.") {
        return true;
    } else {
        return false;
    }
}

function addNote() {
    const data = {
        NOTE_TITLE: noteFieldTitle.value,
        NOTE_TEXT: noteFieldText.value,
        jwt: getCookie('jwt')
    }
    fetch('http://org.localhost/php/api/addNote.php', {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(resp => resp.json()).then(resp => {
        console.log(resp);
    })
}


AddNoteButton.addEventListener('click', checkToken);