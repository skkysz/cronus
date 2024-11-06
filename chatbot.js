document.getElementById('send-button').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    const chatBox = document.getElementById('chat-box');
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    try {
        const response = await getChatbotResponse(userInput);
        const botMessage = document.createElement('div');
        botMessage.className = 'bot-message';
        botMessage.textContent = response;
        chatBox.appendChild(botMessage);
    } catch (error) {
        console.error('Erro ao obter resposta do chatbot:', error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'bot-message';
        errorMessage.textContent = 'Desculpe, ocorreu um erro ao obter a resposta.';
        chatBox.appendChild(errorMessage);
    }

    document.getElementById('user-input').value = '';
});

async function getChatbotResponse(message) {
    const apiKey = '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';
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: message,
            max_tokens: 150
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro na API:', errorData);
        throw new Error(`Erro na API: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.choices || data.choices.length === 0) {
        throw new Error('Resposta inesperada da API');
    }

    return data.choices[0].text.trim();
}