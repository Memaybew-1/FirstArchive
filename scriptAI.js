// 1. Cấu trúc AI (Cây quyết định)
let brain = {
    question: "Nó có biết bay không?",
    yes: { answer: "Con chim" },
    no: { answer: "Con chó" }
};

// 2. Hàm bắt đầu trò chơi
function play() {
    let currentNode = brain;

    // Duyệt qua cây câu hỏi
    while (currentNode.question) {
        let answer = confirm(currentNode.question);
        if (answer) {
            currentNode = currentNode.yes;
        } else {
            currentNode = currentNode.no;
        }
    }

    // Đến phần đoán đáp án
    let isCorrect = confirm("Có phải là " + currentNode.answer + " không?");
    if (!isCorrect) {
        learn(currentNode);
    } else {
        alert("Haha, tôi thắng rồi!");
    }
}

// 3. Hàm dạy AI (AI sẽ tự thêm nhánh vào cây brain)
function learn(wrongNode) {
    let newAnimal = prompt("Tiếc quá, đó là con gì?");
    let newQuestion = prompt("Câu hỏi gì để phân biệt " + newAnimal + " với " + wrongNode.answer + "?");
    
    // Lưu tạm đáp án cũ
    let oldAnswer = wrongNode.answer;
    
    // Biến node cũ thành câu hỏi mới (chuyển node từ đáp án thành câu hỏi)
    delete wrongNode.answer; 
    wrongNode.question = newQuestion;
    wrongNode.yes = { answer: newAnimal };
    wrongNode.no = { answer: oldAnswer };
    
    alert("Cảm ơn! Tớ đã ghi nhớ rồi.");
}

// 4. Kết nối với nút bấm trong HTML
document.getElementById('btnStart').addEventListener('click', play);

