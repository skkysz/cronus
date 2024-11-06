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
    const apiKey = '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';  // Substitua com sua chave da API da OpenAI
    console.log('Enviando solicitação para a API...');

    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: message,
            max_tokens: 150,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro na API:', errorData);
        throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Dados recebidos da API:', data);

    if (!data.choices || data.choices.length === 0) {
        throw new Error('Resposta inesperada da API');
    }

    return data.choices[0].text.trim();
}