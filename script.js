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
