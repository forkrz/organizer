const urlParams = new URLSearchParams(window.location.search);
const hash = urlParams.get('hash');
const mailValidInfo = document.getElementById('mailValidInfo');

const mailActivator = async(x) => {
    const resp = await fetch('http://org.localhost/php/api/mailConfirmation.php', {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(x)
    });
    return resp.json();
}


async function sendData() {
    const data = {
        hash: hash
    }
    const resp = await mailActivator(data);
    console.log(resp.message);
    return resp.message;

}

async function ApiResponse() {
    const text = await sendData();
    mailValidInfo.innerHTML = text;

}

ApiResponse();