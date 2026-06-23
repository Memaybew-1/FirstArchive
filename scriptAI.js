let brain = { question: "Nó có biết bay không?", yes: { answer: "Con chim" }, no: { answer: "Con chó" } };

function display(text) {
    document.getElementById('aiResponse').innerText = "AI: " + text;
}

function play() {
    let node = brain;
    // Đi theo câu hỏi cho đến khi gặp đáp án (node không còn question)
    while (node.question) {
        node = confirm(node.question) ? node.yes : node.no;
    }
    
    // Đoán đáp án cuối cùng
    if (confirm("Có phải là " + node.answer + " không?")) {
        display("Tôi thắng rồi! Đó là " + node.answer);
    } else {
        // Dạy AI
        let newAnimal = prompt("Tiếc quá, đó là con gì?");
        let newQuestion = prompt("Câu hỏi để phân biệt " + newAnimal + " với " + node.answer + "?");
        
        let oldAnswer = node.answer;
        // Biến node đáp án thành câu hỏi
        node.question = newQuestion;
        node.yes = { answer: newAnimal };
        node.no = { answer: oldAnswer };
        delete node.answer;
        
        display("Cảm ơn! Tôi đã ghi nhớ thêm về " + newAnimal);
    }
}

document.getElementById('btnStart').addEventListener('click', play);

