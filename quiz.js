const quizData = [
  {
    question: "What is the capital of India?",
    options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
    answer: "New Delhi",
  },
  {
    question: "What is the capital of Uttar Pradesh?",
    options: ["Lucknow", "Kanpur", "Varanasi", "Agra"],
    answer: "Lucknow",
  },
  {
    question: "What is the capital of Maharashtra?",
    options: ["Mumbai", "Pune", "Nagpur", "Thane"],
    answer: "Mumbai",
  },
  {
    question: "What is the capital of Rajasthan?",
    options: ["Ajmer", "Jaipur", "Jodhpur", "Udaipur"],
    answer: "Jaipur",
  },
  {
    question: "What is the capital of Bihar?",
    options: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur"],
    answer: "Patna",
  },
  {
    question: "What is the capital of Gujarat?",
    options: ["Ahmedabad", "Surat", "Gandhinagar", "Rajkot"],
    answer: "Gandhinagar",
  },
  {
    question: "What is the capital of Punjab?",
    options: ["Ludhiana", "Amritsar", "Chandigarh", "Patiala"],
    answer: "Chandigarh",
  },
  {
    question: "What is the capital of Assam?",
    options: ["Dibrugarh", "Silchar", "Dispur", "Tezpur"],
    answer: "Dispur",
  },
  {
    question: "What is the capital of Tamil Nadu?",
    options: ["Madurai", "Coimbatore", "Chennai", "Salem"],
    answer: "Chennai",
  },
  {
    question: "What is the capital of West Bengal?",
    options: ["Kolkata", "Darjeeling", "Siliguri", "Durgapur"],
    answer: "Kolkata",
  },
];

function _handleOptionChange(questionIndex, selectedOption) {
  const question = quizData[questionIndex];
  question.selectedOption = selectedOption;

  console.log(
    `Question ${questionIndex + 1} selected option: ${selectedOption}`,
  );
}

const quizContainer = document.getElementById("quizContainer");
const result = document.getElementById("result");
const timer = document.getElementById("timer");
function _submitQuiz() {
  let score = 0;

const welcomeSection = document.getElementById("welcomeSection");
const quizSection = document.getElementById("quizSection");
const userName = document.getElementById("userName");

// Quiz page hidden by default
quizSection.style.display = "none";

let timeLeft = 120;
let timerInterval;
let quizSubmitted = false;

function startQuiz() {
  if (userName.value.trim() == "") {
    Swal.fire({
      title: "Enter Your Name",
      text: "Please enter your name before starting the quiz.",
      icon: "warning",
    });

    return;
  }

  welcomeSection.style.display = "none";
  quizSection.style.display = "block";

  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);

  timer.innerHTML = "Time Left: " + timeLeft + " seconds";

  timerInterval = setInterval(function () {
    timer.innerHTML = "Time Left: " + timeLeft + " seconds";

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timerInterval);

      Swal.fire({
        title: "Time's Up!",
        text: "Quiz submitted automatically.",
        icon: "warning",
      }).then(function () {
        submitQuiz();
      });
    }
  }, 1000);
}

function handleOptionChange(questionIndex, selectedOption) {
  quizData[questionIndex].selectedOption = selectedOption;

  console.log(
    "Question " + (questionIndex + 1) + " Selected : " + selectedOption,
  );
}

function resetQuiz() {
  quizData.forEach(function (question) {
    delete question.selectedOption;
  });

  document.querySelectorAll('input[type="radio"]').forEach(function (radio) {
    radio.checked = false;
  });
  function _resetQuiz() {
    // Selected options remove
    quizData.forEach((question) => {
      delete question.selectedOption;
    });

  result.innerHTML = "";

  clearInterval(timerInterval);

  timeLeft = 120;

  quizSubmitted = false;

  timer.innerHTML = "Time Left: 120 seconds";

  startTimer();
}

function submitQuiz() {
  if (quizSubmitted) {
    return;
  }

  quizSubmitted = true;

  clearInterval(timerInterval);

  let score = 0;

  quizData.forEach(function (item) {
    if (item.selectedOption === item.answer) {
      score++;
    }
  });

  let percentage = (score / quizData.length) * 100;

  result.innerHTML = `
        <h2>${userName.value}, Quiz Completed!</h2>

        <p>
            You scored
            <strong>${score}</strong>
            out of
            <strong>${quizData.length}</strong>.
        </p>
    `;

  if (percentage >= 80) {
    Swal.fire({
      title: "Congratulations!",
      text: "Excellent Performance!",
      icon: "success",
    });
  } else if (percentage >= 60) {
    Swal.fire({
      title: "Good Job!",
      text: "You did well!",
      icon: "info",
    });
  } else {
    Swal.fire({
      title: "Keep Trying!",
      text: "Better luck next time!",
      icon: "warning",
    }).then(function () {
      resetQuiz();
      confirmButtonText: "Try Again",
    }).then(() => {
      _resetQuiz();
    });
  }
}

quizContainer.innerHTML = quizData
  .map(function (item, index) {
    return `

    <div class="quiz-item">

        <h3>
            Q${index + 1}: ${item.question}
        </h3>

        ${item.options
          .map(function (option, optionIndex) {
            return `

                <input
                    type="radio"
                    id="option${optionIndex + 1}-${index}"
                    name="question${index}"
                    value="${option}"
                    onchange="handleOptionChange(${index}, '${option}')"
                >

                <label for="option${optionIndex + 1}-${index}">
                    ${option}
                </label>

                <br>

            `;
          })
          .map(
            (option, optionIndex) => `
              <input
                type="radio"
                id="option${optionIndex + 1}-${index}"
                name="question${index}"
                value="${option}"
                onchange="_handleOptionChange(${index}, '${option}')"
              />
              <label for="option${optionIndex + 1}-${index}">
                ${option}
              </label>
              <br>
            `,
          )
          .join("")}

    </div>

    `;
  })
  .join("");
