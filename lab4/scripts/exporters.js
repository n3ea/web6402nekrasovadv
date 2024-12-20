const API_URL = "http://localhost:3000/exporters";

// Загрузка данных при старте
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Ошибка загрузки данных");
        const exporters = await response.json();
        populateTable(exporters);
    } catch (error) {
        alert(`Ошибка: ${error.message}`);
    }
});

// Добавление данных в таблицу
function populateTable(data) {
    const tableBody = document.querySelector("#exportersTable tbody");
    tableBody.innerHTML = "";
    data.forEach(exporter => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${exporter.name}</td>
            <td>${exporter.okved}</td>
            <td>${exporter.tnved}</td>
            <td class="center">${exporter.product}</td>
            <td class="center">${exporter.countries}</td>
            <td class="right">${exporter.inn}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Отправка POST-запроса
document.querySelector("#addExporterForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const exporter = {
        name: document.querySelector("#name").value,
        okved: document.querySelector("#okved").value,
        tnved: document.querySelector("#tnved").value,
        product: document.querySelector("#product").value,
        countries: document.querySelector("#countries").value,
        inn: document.querySelector("#inn").value,
    };

    // Проверка данных
    if (!validateForm(exporter)) {
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(exporter),
        });
        if (!response.ok) throw new Error("Ошибка добавления данных");
        const newExporter = await response.json();
        populateTable([newExporter]);
    } catch (error) {
        alert(`Ошибка: ${error.message}`);
    }
});

// Проверка данных формы
function validateForm(data) {
    // Проверка на заполнение всех полей
    if (!Object.values(data).every(value => value.trim() !== "")) {
        alert("Пожалуйста, заполните все поля!");
        return false;
    }

    // Проверка формата ИНН (должен содержать 10 цифр)
    if (!/^\d{10}$/.test(data.inn)) {
        alert("ИНН должен содержать 10 цифр!");
        return false;
    }

    // Проверка формата ОКВЭД (числовое значение с возможной точкой)
    if (!/^\d+(\.\d+)?$/.test(data.okved)) {
        alert("ОКВЭД должен быть числовым значением, например, 10.41!");
        return false;
    }


    return true;
}