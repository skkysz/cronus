document.addEventListener('DOMContentLoaded', function() {
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const daysContainer = document.getElementById('days');
    const monthElement = document.getElementById('month');
    const yearElement = document.getElementById('year');
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Renderiza o calendário para o mês e ano fornecidos
    function renderCalendar(month, year) {
        daysContainer.innerHTML = '';
        monthElement.textContent = monthNames[month];
        yearElement.textContent = year;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Preenche os dias vazios antes do primeiro dia do mês
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('day');
            daysContainer.appendChild(emptyDiv);
        }

        // Preenche os dias do mês
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            dayDiv.classList.add('day');
            dayDiv.addEventListener('click', function() {
                document.getElementById('selectedDate').textContent = `${i} de ${monthNames[month]} de ${year}`;
                document.getElementById('noteModal').style.display = 'block';
                document.getElementById('noteDate').value = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            });

            // Verifica se há anotações para esta data
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            const noteForDay = notes.find(note => note.date === `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`);
            if (noteForDay) {
                const noteIndicator = document.createElement('span');
                noteIndicator.textContent = noteForDay.text;
                dayDiv.appendChild(noteIndicator);
            }

            daysContainer.appendChild(dayDiv);
        }
    }

    // Navega para o mês anterior
    function prevMonth() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    }

    // Navega para o próximo mês
    function nextMonth() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    }

    // Mostra o calendário e esconde o cronograma
    window.showCalendar = function() {
        document.getElementById('cronograma').style.display = 'none';
        document.getElementById('calendario').style.display = 'block';
    }

    // Fecha o modal de anotações
    window.closeModal = function() {
        document.getElementById('noteModal').style.display = 'none';
    }

    // Alterna a exibição do seletor de data
    window.toggleDateInput = function() {
        const dateInput = document.getElementById('noteDate');
        dateInput.style.display = dateInput.style.display === 'none' ? 'block' : 'none';
    }

    // Salva a anotação
    window.saveNote = function() {
        const noteText = document.getElementById('noteText').value;
        const attachDate = document.getElementById('attachDateCheckbox').checked;
        const noteDate = document.getElementById('noteDate').value;
        const notes = JSON.parse(localStorage.getItem('notes')) || [];

        if (attachDate && noteDate) {
            notes.push({ text: noteText, date: noteDate });
        } else {
            notes.push({ text: noteText });
        }

        localStorage.setItem('notes', JSON.stringify(notes));
        alert('Anotação salva!');
        closeModal();
        renderCalendar(currentMonth, currentYear); // Re-renderiza o calendário para mostrar a nova anotação
    }

    // Renderiza o calendário para o mês e ano atuais
    renderCalendar(currentMonth, currentYear);

    // Adiciona eventos aos botões de navegação do calendário
    document.querySelector('.calendar-header .btn-link:first-child').addEventListener('click', prevMonth);
    document.querySelector('.calendar-header .btn-link:last-child').addEventListener('click', nextMonth);
});

function showCalendar() {
    document.getElementById("calendario").style.display = "block";
    document.getElementById("cronograma").style.display = "none";
}

function showSchedule() {
    document.getElementById("calendario").style.display = "none";
    document.getElementById("cronograma").style.display = "block";
}