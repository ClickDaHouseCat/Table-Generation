// Глобальные переменные для хранения общего количества строк и количества строк с зеленым цветом в первом столбце
var totalRowCount = 0;
var greenRowCount = 0;

function generateTable() {
    var inputText = document.getElementById("inputText").value.trim();
    var checkboxes = document.querySelectorAll("#checkboxes input[type=checkbox]");
    var tableContainer = document.getElementById("tableContainer");
    var counterContainer = document.getElementById("counterContainer");

    // Подготовка заголовков столбцов на основе выбранных опций
    var headers = [];
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            headers.push(checkbox.name);
        }
    });

    // Создание таблицы
    var tableHTML = "<table border='1'><thead><tr>";
    headers.forEach(function(header) {
        tableHTML += "<th>" + header + "</th>";
    });
    tableHTML += "</tr></thead><tbody>";

    // Заполнение строк таблицы данными из inputText
    var rows = inputText.split("\n");
    totalRowCount = rows.length; // Общее количество строк
    rows.forEach(function(row) {
        var rowData = row.split("|");
        tableHTML += "<tr>";
        
        // Заполнение первого столбца данными из inputText
        tableHTML += "<td>" + rowData[0] + "</td>";
        
        // Заполнение остальных столбцов на основе выбранных опций
        headers.slice(1).forEach(function(header) {
            if (rowData.includes(header)) {
                tableHTML += "<td>" + header + "</td>";
            } else {
                tableHTML += "<td></td>";
            }
        });
        tableHTML += "</tr>";
    });

    tableHTML += "</tbody></table>";
    tableContainer.innerHTML = tableHTML;

    // Обновляем отображение счетчика строк
    counterContainer.innerHTML = "Количество зеленых строк: " + greenRowCount + " из " + totalRowCount;

    // Добавляем обработчик события click для каждой ячейки таблицы
    var cells = document.querySelectorAll("#tableContainer td");
    cells.forEach(function(cell) {
        cell.addEventListener("click", function() {
            // Получаем текущий цвет ячейки
            var currentColor = this.style.backgroundColor;
            switch (currentColor) {
                case "":
                case "white":
                    this.style.backgroundColor = "yellow";
                    break;
                case "yellow":
                    this.style.backgroundColor = "green";
                    // Если первый столбец стал зеленым, увеличиваем счетчик зеленых строк
                    if (this.cellIndex === 0) {
                        greenRowCount++;
                    }
                    break;
                case "green":
                    this.style.backgroundColor = "red";
                    // Если первый столбец стал красным, уменьшаем счетчик зеленых строк
                    if (this.cellIndex === 0) {
                        greenRowCount--;
                    }
                    break;
                case "red":
                    this.style.backgroundColor = "white";
                    break;
                default:
                    this.style.backgroundColor = "white";
                    break;
            }
            // Обновляем отображение счетчика строк
            counterContainer.innerHTML = "Количество зеленых строк: " + greenRowCount + " из " + totalRowCount;
        });
    });
}


// Функция для сброса состояния страницы и локального хранилища
function resetPageState() {
    localStorage.clear(); // Очищаем локальное хранилище
    document.getElementById("inputText").value = ""; // Очищаем поле ввода
    var checkboxes = document.querySelectorAll("#checkboxes input[type=checkbox]"); // Снимаем все галочки с чекбоксов
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
    document.getElementById("tableContainer").innerHTML = ""; // Очищаем содержимое таблицы
    document.getElementById("counterContainer").innerHTML = ""; // Очищаем информацию о количестве строк
    totalRowCount = 0; // Сбрасываем счетчик общего количества строк
    greenRowCount = 0; // Сбрасываем счетчик количества зеленых строк
}

// Добавляем обработчик события click для кнопки сброса
document.getElementById("resetButton").addEventListener("click", function() {
    resetPageState();
});


// Функция для копирования таблицы в буфер обмена
function copyTableToClipboard() {
    var tableContainer = document.getElementById("tableContainer");
    var range = document.createRange();
    range.selectNode(tableContainer);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
}

// Добавляем кнопку для копирования таблицы в HTML
var copyButton = document.getElementById("copyButton");
copyButton.textContent = "Копировать таблицу";
copyButton.addEventListener("click", function() {
    copyTableToClipboard();
});

