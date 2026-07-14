import { htmlQuestions } from "./Data/htmlQuestions.js";
import { cssQuestions } from "./Data/cssQuestions.js";
import { javascriptQuestions } from "./Data/javaScript_Questions.js";

let quizData = [];
const quizCategories = {
  html: htmlQuestions,
  css: cssQuestions,
  javascript: javascriptQuestions,
};

globalThis.handleOptionChange = function (questionIndex, selectedOption) {
  const question = quizData[questionIndex];
  question.selectedOption = selectedOption;
  console.log(`Question ${questionIndex + 1} selected option: ${selectedOption}`);
};

const category = document.getElementById("category");
const selectedCategory = document.getElementById("selectedCategory");
const quizContainer = document.getElementById("quizContainer");
const result = document.getElementById("result");
const timer = document.getElementById("timer");
const welcomeSection = document.getElementById("welcomeSection");
const quizSection = document.getElementById("quizSection");
const userName = document.getElementById("userName");
const submitBtn = document.getElementById("submitBtn");

quizSection.style.display = "none"; // hide quiz section initially

document.getElementById("startBtn").addEventListener("click", startQuiz);
document.getElementById("submitBtn").addEventListener("click", submitQuiz);

let selectedQuizCategory = "";
let timeLeft = 120;
let timerInterval;
let quizSubmitted = false;

function startQuiz() {
  if (userName.value.trim() === "") {
    Swal.fire("Enter Your Name", "Please enter your name before starting the quiz.", "warning");
    return;
  }
  document.getElementById("userNameDisplay").textContent = ` ${userName.value}!`;

  if (category.value === "") {
    Swal.fire("Select Category", "Please select a quiz category.", "warning");
    return;
  }

  selectedQuizCategory = category.value;
  quizData = quizCategories[selectedQuizCategory];

  if (!quizData || quizData.length === 0) {
    Swal.fire("Coming Soon!", "Questions for this category will be added soon.", "info");
    return;
  }

  renderQuiz();
  selectedCategory.textContent = `Category: ${category.options[category.selectedIndex].text}`;

  welcomeSection.style.display = "none";
  quizSection.style.display = "block";

  resetTimer();
}

function startTimer() {
  clearInterval(timerInterval);
  timer.innerHTML = `Time Left: ${timeLeft} seconds`;

  timerInterval = setInterval(() => {
    timer.innerHTML = `Time Left: ${timeLeft} seconds`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timerInterval);
      Swal.fire("Time's Up!", "Quiz submitted automatically.", "warning").then(submitQuiz);
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 120;
  timer.innerHTML = "Time Left: 120 seconds";
  startTimer();
}

function resetQuiz() {
  quizData.forEach(q => delete q.selectedOption);
  document.querySelectorAll('input[type="radio"]').forEach(radio => (radio.checked = false));
  result.innerHTML = "";
  quizSubmitted = false;
  resetTimer();
}

function goToHome() {
  resetQuiz();
  welcomeSection.style.display = "block";
  quizSection.style.display = "none";
}

function submitQuiz() {
  if (quizSubmitted) return;
  quizSubmitted = true;
  clearInterval(timerInterval);

  let score = quizData.filter(q => q.selectedOption === q.answer).length;
  let percentage = (score / quizData.length) * 100;

  result.innerHTML = `
    <h2>${userName.value}, Quiz Completed!</h2>
    <p>You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong>.</p>
  `;

  let title, message, icon;
  if (percentage >= 80) {
    title = "Congratulations!";
    message = "Excellent Performance!";
    icon = "success";
  } else if (percentage >= 60) {
    title = "Good Job!";
    message = "You did well!";
    icon = "info";
  } else {
    title = "Keep Trying!";
    message = "Better luck next time!";
    icon = "warning";
  }

  Swal.fire({
    title,
    icon,
    html: `
      <h3>${userName.value}, Quiz Completed! 🎉</h3>
      <p>You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong></p>
      <p>Percentage: <strong>${percentage.toFixed(0)}%</strong></p>
      <p>${message}</p>
    `,
    showCancelButton: true,
    confirmButtonText: "🔄 Retake",
    cancelButtonText: "➡️ Home",
  }).then(response => {
    if (response.isConfirmed) {
      resetQuiz();
    } else {
      goToHome();
    }
  });
}

function renderQuiz() {
  quizContainer.innerHTML = quizData
    .map((item, index) => `
      <div class="quiz-item">
        <h3>Q${index + 1}: ${item.question}</h3>
        ${item.options
          .map((option, optionIndex) => `
            <input
              type="radio"
              id="option${optionIndex + 1}-${index}"
              name="question${index}"
              value="${option}"
              onchange="handleOptionChange(${index}, '${option}')"
            >
            <label for="option${optionIndex + 1}-${index}">${option}</label><br>
          `)
          .join("")}
      </div>
    `)
    .join("");
}
