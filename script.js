document.addEventListener('DOMContentLoaded', function() {
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const daysContainer = document.getElementById('days');
    const monthElement = document.getElementById('month');
    const yearElement = document.getElementById('year');
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let selectedDateKey = '';

    function renderCalendar(month, year) {
        daysContainer.innerHTML = '';
        monthElement.textContent = monthNames[month];
        yearElement.textContent = year;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Adicionar células vazias no início
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('day', 'empty');
            daysContainer.appendChild(emptyDiv);
        }

        // Adicionar células com os dias do mês
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.innerHTML = `<span class="day-number">${i}</span>`;
            dayDiv.addEventListener('click', function() {
                selectedDateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
                document.getElementById('selectedDate').textContent = `${i} de ${monthNames[month]} de ${year}`;
                document.getElementById('noteModal').style.display = 'block';
            });

            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            if (!Array.isArray(notes)) {
                console.error('Notas armazenadas não são um array:', notes);
                continue;
            }
            const notesForDay = notes.filter(note => note.date === `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`);
            notesForDay.forEach(note => {
                const noteDiv = document.createElement('div');
                noteDiv.classList.add('note');
                noteDiv.textContent = note.text;
                noteDiv.style.backgroundColor = note.color;

                const removeBtn = document.createElement('span');
                removeBtn.classList.add('remove-note');
                removeBtn.textContent = 'x';
                removeBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    removeNote(note.date, note.text);
                });

                noteDiv.appendChild(removeBtn);
                dayDiv.appendChild(noteDiv);
            });

            daysContainer.appendChild(dayDiv);
        }

        // Adicionar células vazias no final para completar a última linha
        const totalCells = firstDay + daysInMonth;
        const remainingCells = (7 - (totalCells % 7)) % 7;
        for (let i = 0; i < remainingCells; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('day', 'empty');
            daysContainer.appendChild(emptyDiv);
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

    window.closeModal = function() {
        document.getElementById('noteModal').style.display = 'none';
    }

    window.saveNote = function() {
        const noteText = document.getElementById('noteText').value;
        const noteColor = document.getElementById('noteColor').value;
        const notes = JSON.parse(localStorage.getItem('notes')) || [];

        if (!Array.isArray(notes)) {
            console.error('Notas armazenadas não são um array:', notes);
            return;
        }

        notes.push({ text: noteText, date: selectedDateKey, color: noteColor });

        localStorage.setItem('notes', JSON.stringify(notes));
        closeModal();
        renderCalendar(currentMonth, currentYear);
    }

    function removeNote(date, text) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        if (!Array.isArray(notes)) {
            console.error('Notas armazenadas não são um array:', notes);
            return;
        }
        notes = notes.filter(note => !(note.date === date && note.text === text));
        localStorage.setItem('notes', JSON.stringify(notes));
        renderCalendar(currentMonth, currentYear);
    }

    renderCalendar(currentMonth, currentYear);

    document.querySelector('.calendar-header .btn-link:first-child').addEventListener('click', prevMonth);
    document.querySelector('.calendar-header .btn-link:last-child').addEventListener('click', nextMonth);
});