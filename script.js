document.addEventListener('DOMContentLoaded', function () {
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const daysContainer = document.getElementById('days');
    const monthElement = document.getElementById('month');
    const yearElement = document.getElementById('year');
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const notes = {}; // Armazena anotações por data no formato "yyyy-mm-dd"

    function renderCalendar(month, year) {
        daysContainer.innerHTML = '';
        monthElement.textContent = monthNames[month];
        yearElement.textContent = year;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('day');
            daysContainer.appendChild(emptyDiv);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;
            dayDiv.classList.add('day');
            const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            dayDiv.addEventListener('click', () => openNotesModal(dateKey));
            daysContainer.appendChild(dayDiv);
        }
    }

    function prevMonth() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    }

    function nextMonth() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    }

    function openNotesModal(dateKey) {
        const noteText = prompt("Digite sua anotação:");
        if (noteText) {
            if (!notes[dateKey]) {
                notes[dateKey] = [];
            }
            notes[dateKey].push(noteText);
            renderCalendar(currentMonth, currentYear);
            alert(`Anotação adicionada para ${dateKey}`);
        }
    }

    function removeNote(dateKey, index) {
        if (notes[dateKey]) {
            notes[dateKey].splice(index, 1);
            if (notes[dateKey].length === 0) {
                delete notes[dateKey];
            }
            renderCalendar(currentMonth, currentYear);
        }
    }

    renderCalendar(currentMonth, currentYear);

    document.querySelector('.calendar-header .btn-link:first-child').addEventListener('click', prevMonth);
    document.querySelector('.calendar-header .btn-link:last-child').addEventListener('click', nextMonth);
});
