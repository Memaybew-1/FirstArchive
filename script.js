// Memory system (sử dụng localStorage)
const memory = {
    load() {
        const saved = localStorage.getItem('chatbot-memory');
        return saved ? JSON.parse(saved) : {};
    },
    
    save(data) {
        localStorage.setItem('chatbot-memory', JSON.stringify(data));
    },
    
    add(key, value) {
        const data = this.load();
        data[key] = value;
        this.save(data);
    },
    
    get(key) {
        const data = this.load();
        return data[key] || null;
    }
};

// Knowledge base - câu trả lời bot
const knowledge = {
    "xin chào": "Xin chào! Rất vui gặp bạn! 😊",
    "chào": "Chào bạn! Có gì tôi giúp được không?",
    "tên bạn là gì": "Tôi là Chatbot Memory - một bot có khả năng nhớ! 🤖",
    "bạn tên gì": "Tôi là Chatbot Memory - một bot có khả năng nhớ! 🤖",
    "tôi tên": "Tôi đã ghi nhớ rồi! Tên bạn là",
    "tên tôi": "Bạn tên",
    "bạn khỏe không": "Tôi khỏe lắm! Còn bạn thì sao? 😄",
    "có ai không": "Chỉ có chúng mình thôi! 👋",
    "chúc mừng": "Cảm ơn bạn! Bạn cũng may mắn lắm! 🎉",
    "tạm biệt": "Tạm biệt bạn! Hẹn gặp lại! 👋",
    "bye": "Bye bye! 👋",
    "hôm nay": "Hôm nay là một ngày tuyệt vời! ☀️",
    "thời tiết": "Tôi không thể biết thời tiết, nhưng hy vọng hôm nay bạn có ngày tốt lành! 🌤️",
    "yêu thích": "Bạn có sở thích hay! Hãy cho tôi biết thêm! 😊",
    "giúp": "Tôi có thể giúp bạn! Hãy hỏi tôi gì đó, hoặc hãy nói cho tôi biết tên bạn!"
};

// DOM elements
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const memoryBtn = document.getElementById('memoryBtn');
const clearBtn = document.getElementById('clearBtn');

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    const p = document.createElement('p');
    p.textContent = text;
    messageDiv.appendChild(p);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Bot response logic
function getBotResponse(userMessage) {
    const msg = userMessage.toLowerCase().trim();
    
    // Kiểm tra xem user muốn lưu tên
    if (msg.includes("tên tôi là") || msg.includes("tôi tên")) {
        const parts = msg.split("là");
        if (parts.length > 1) {
            const name = parts[1].trim();
            memory.add('name', name);
            return `Tôi đã ghi nhớ! Bạn tên ${name}. Rất vui gặp bạn! 😊`;
        }
    }
    
    // Kiểm tra xem user hỏi tên
    if (msg.includes("tên tôi") || msg.includes("tôi tên gì")) {
        const savedName = memory.get('name');
        if (savedName) {
            return `Theo tôi nhớ, bạn tên ${savedName}! 🎯`;
        } else {
            return "Tôi chưa biết tên bạn. Hãy nói cho tôi tên của bạn nhé!";
        }
    }
    
    // Tìm kiếm trong knowledge base
    for (const [key, value] of Object.entries(knowledge)) {
        if (msg.includes(key)) {
            return value;
        }
    }
    
    // Câu trả lời mặc định
    return "Tôi chưa hiểu. Bạn có thể nói lại không? 🤔";
}

// Send message
function sendMessage() {
    const text = userInput.value.trim();
    
    if (!text) return;
    
    // Add user message
    addMessage(text, 'user');
    userInput.value = '';
    
    // Simulate bot typing
    setTimeout(() => {
        const response = getBotResponse(text);
        addMessage(response, 'bot');
    }, 500);
}

// Show memory
memoryBtn.addEventListener('click', () => {
    const data = memory.load();
    const memoryText = Object.keys(data).length > 0 
        ? JSON.stringify(data, null, 2)
        : "Memory trống!";
    
    alert('📝 Memory của Chatbot:\n\n' + memoryText);
});

// Clear memory
clearBtn.addEventListener('click', () => {
    if (confirm('Bạn chắc chắn muốn xóa hết memory không? 🗑️')) {
        memory.save({});
        addMessage('Memory đã được xóa sạch! ✨', 'bot');
    }
});

// Event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Focus input on load
userInput.focus();
