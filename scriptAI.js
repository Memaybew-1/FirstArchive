let brain = {
    question: "Nó có biết bay không?",
    yes: { answer: "Con chim" }, // Lá (Đáp án)
    no: { answer: "Con chó" }    // Lá (Đáp án)
};
function play(node) {
    // 1. Nếu là câu hỏi, hỏi người dùng
    if (node.question) {
        let answer = confirm(node.question); // Hiện hộp thoại Yes/No
        if (answer) {
            play(node.yes); // Đi theo nhánh Yes
        } else {
            play(node.no);  // Đi theo nhánh No
        }
    } 
    // 2. Nếu là đáp án, kiểm tra đúng/sai
    else {
        let isCorrect = confirm("Có phải là " + node.answer + " không?");
        if (!isCorrect) {
            learn(node); // Gọi hàm học nếu đoán sai
        } else {
            alert("Tôi thắng rồi!");
        }
    }
}
function learn(wrongNode) {
    let newObject = prompt("Tiếc quá, đó là con gì?");
    let newQuestion = prompt("Câu hỏi gì để phân biệt " + newObject + " với " + wrongNode.answer + "?");
    
    // Lưu đáp án cũ vào một nhánh
    let oldAnswer = wrongNode.answer;
    
    // Biến node cũ thành câu hỏi mới
    wrongNode.question = newQuestion;
    wrongNode.yes = { answer: newObject };
    wrongNode.no = { answer: oldAnswer };
    
    alert("Cảm ơn! Tôi đã thông minh hơn rồi.");
}
// Tìm nút bấm trong HTML
const btn = document.getElementById('btnStart'); 

// Khi bấm vào, AI sẽ chào bạn
btn.addEventListener('click', () => {
    alert("Xin chào! Tớ là MiniminiAI, tớ đã sẵn sàng để học hỏi!");
});

