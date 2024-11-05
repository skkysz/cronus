document.addEventListener('DOMContentLoaded', function() {
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const daysContainer = document.getElementById('days');
    const monthElement = document.getElementById('month');
    const yearElement = document.getElementById('year');
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

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

        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            dayDiv.classList.add('day');
            dayDiv.addEventListener('click', function() {
                document.getElementById('selectedDate').textContent = `${i} de ${monthNames[month]} de ${year}`;
                document.getElementById('noteModal').style.display = 'block';
            });
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

    window.showCalendar = function() {
        document.getElementById('cronograma').style.display = 'none';
        document.getElementById('calendario').style.display = 'block';
    }

    window.closeModal = function() {
        document.getElementById('noteModal').style.display = 'none';
    }

    window.saveNote = function() {
        const noteText = document.getElementById('noteText').value;
        // Salvar a anotação (você pode usar localStorage, enviar para um servidor, etc.)
        alert('Anotação salva: ' + noteText);
        closeModal();
    }

    renderCalendar(currentMonth, currentYear);
});