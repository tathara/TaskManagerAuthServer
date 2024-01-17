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

if (document.getElementById('authorization')) {
    const submitButton = document.getElementById('authorization');
    submitButton.addEventListener('click', dispatch('/authorization'));
}
else if (document.getElementById('registration')) {
    const submitButton = document.getElementById('registration');
    submitButton.addEventListener('click', dispatch('/registration'));
}

function dispatch(endpoint) {
    if (isValidData()) {
        const data = getData();

        axios.post(endpoint, data).then(res => tg.sendData(res.data)).catch(error => console.log('Ошибка при выполнении POST запроса на эдпоинт ' + endpoint + '\n' + error));
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