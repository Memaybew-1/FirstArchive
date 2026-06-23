let brain = { question: "Nó có biết bay không?", yes: { answer: "Con chim" }, no: { answer: "Con chó" } };

function display(text) {
    document.getElementById('aiResponse').innerText = "AI: " + text;
}

function play() {
    let node = brain;
    while (node.question) {
        node = confirm(node.question) ? node.yes : node.no;
    }
    
    if (confirm("Có phải là " + node.answer + " không?")) {
        display("Tôi thắng rồi! Đó là " + node.answer);
    } else {
        let newAnimal = prompt("Tiếc quá, đó là con gì?");
        let newQuestion = prompt("Câu hỏi để phân biệt " + newAnimal + " với " + node.answer + "?");
        
        let oldAnswer = node.answer;
        node.question = newQuestion;
        node.yes = { answer: newAnimal };
        node.no = { answer: oldAnswer };
        delete node.answer;
        display("Cảm ơn, tôi đã học thêm được về " + newAnimal + "!");
    }
}

document.getElementById('btnStart').addEventListener('click', play);

