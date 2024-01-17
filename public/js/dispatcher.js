import axios from "axios";
import isValidData from "./validation.js";

const tg = window.Telegram.WebApp;

function dispatch(endpoint) {
    const data = getData();
    
    if (isValidData()) {
        axios.post(endpoint, data).then(res => tg.sendData(res.data)).catch('Ошибка при выполнении POST запроса на эдпоинт ' + endpoint);
    }
}

function getData() {
    let data;

    const form = document.querySelector('form');
    const fields = form.querySelectorAll('input, select, textarea');

    Array.from(fields).map(field => {
        data[field] = field.value;
    });

    return data;
}