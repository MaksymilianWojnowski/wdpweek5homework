// part2/script.js
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const countEl = document.getElementById("question-count");
const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("result");

fetch("questions.json")
  .then(res => {
    if (!res.ok) throw new Error("Failed to load questions");
    return res.json();
  })
  .then(data => {
    questions = data;
    renderQuestion();
  })
  .catch(err => {
    questionText.textContent = "Could not load quiz.";
    console.error(err);
  });

function renderQuestion() {
  clearOptions();
  const q = questions[currentQuestionIndex];
  countEl.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionText.textContent = q.question;

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(idx, btn);
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(selectedIdx, btnEl) {
  Array.from(optionsContainer.children).forEach((b, i) => {
     b.disabled = true;
    if (i === questions[currentQuestionIndex].answer) {
      b.style.color = "#0ca607"; // correct
    }
    if (i === selectedIdx && i !== questions[currentQuestionIndex].answer) {
      b.style.color = "red"; // wrong
    }
  });
  if (selectedIdx === questions[currentQuestionIndex].answer) score++;
  nextBtn.disabled = false;
}

function clearOptions() {
  optionsContainer.innerHTML = "";
  nextBtn.disabled = true;
  resultBox.textContent = "";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.querySelector(".card").innerHTML = `
    <h1>Quiz Complete!</h1>
    <div id="result">Your score: ${score} / ${questions.length}</div>
  `;
}
