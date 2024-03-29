import isValidData from "./validation.js";

const tg = window.Telegram.WebApp;
const authorizationButton = document.getElementById('authorization');
const registrationButton = document.getElementById('registration');

if (authorizationButton) {
    authorizationButton.addEventListener('click', () => dispatch('/authorization'));
} else if (registrationButton) {
    registrationButton.addEventListener('click', () => dispatch('/registration'));
}

if (tg) {
    console.log('Telegram.WebApp загружен!');
}

async function dispatch(endpoint) {
    if (isValidData()) {
        const data = getData();

        const response = await axios.post(endpoint, data);
        await tg.sendData(JSON.stringify(response.data));
    }
}

function getData() {
    let data = {};

    const form = document.querySelector('form');
    const fields = form.querySelectorAll('input, select, textarea');

    Array.from(fields).map(field => {
        const fieldName = field.getAttribute('name');
        const fieldValue = field.value.trim();

        data[fieldName] = fieldValue;
    });

    return data;
}