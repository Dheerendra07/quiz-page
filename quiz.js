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
function handleOptionChange(questionIndex, selectedOption) {
  const question = quizData[questionIndex];
  question.selectedOption = selectedOption;

  console.log(
    `Question ${questionIndex + 1} selected option: ${selectedOption}`,
  );
}
function submitQuiz() {
  let score = 0;

  quizData.forEach((item) => {
    if (item.selectedOption === item.answer) {
      score++;
    }
  });

  console.log("Your total score is:", score);

  const percentage = (score / quizData.length) * 100;

  result.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>
      You scored <strong>${score}</strong> out of
      <strong>${quizData.length}</strong>.
    </p>
  `;

  if (percentage >= 80) {
    Swal.fire({
      title: "Congratulations!",
      text: `Your score is ${score} out of ${quizData.length}. You passed the quiz!`,
      icon: "success",
      confirmButtonText: "Awesome!",
    });
  } else if (percentage >= 60) {
    Swal.fire({
      title: "Good Job!",
      text: `Your score is ${score} out of ${quizData.length}. You did well!`,
      icon: "info",
      confirmButtonText: "Continue",
    });
  }
  Swal.fire({
    title: "Keep Trying!",
    text: `Your score is ${score} out of ${quizData.length}. Better luck next time!`,
    icon: "warning",
    confirmButtonText: "Try Again",
  }).then(() => {
    resetQuiz();
  });
}

function resetQuiz() {
  quizData.forEach((question) => {
    delete question.selectedOption;
  });

  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.checked = false;
  });

  result.innerHTML = "";
}

const quizContainer = document.getElementById("quizContainer");
const result = document.getElementById("result");

console.log("Quiz Data:", quizContainer);

quizContainer.innerHTML = quizData
  .map((item, index) => {
    return `
    <div class="quiz-item">
      <h3>Q${index + 1}: ${item.question}</h3>
      ${item.options
        .map(
          (option, optionIndex) => `
      <input type="radio" id="option${optionIndex + 1}-${index}" name="question${index}" value="${option}" onChange="handleOptionChange(${index}, '${option}')" />
      <label for="option${optionIndex + 1}-${index}">${option}</label><br>
      `,
        )
        .join("")}
    
      
    </div>
  `;
  })
  .join("");
