const questions = [
  {
    question: "Which language is used for web apps?",
    answers: ["Python", "JavaScript", "C++", "Java"],
    correct: "JavaScript"
  },

  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Multi Language",
      "Home Text Markup Language"
    ],
    correct: "Hyper Text Markup Language"
  },

  {
    question: "Which CSS framework are we using?",
    answers: ["Bootstrap", "Bulma", "Tailwind CSS", "Material UI"],
    correct: "Tailwind CSS"
  },

  {
    question: "Which keyword declares a variable?",
    answers: ["if", "loop", "let", "return"],
    correct: "let"
  }
];

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const result = document.getElementById("result");
const progress = document.getElementById("progress");
const timerElement = document.getElementById("timer");
const restartBtn = document.getElementById("restartBtn");

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

function startTimer() {
  clearInterval(timer);

  timeLeft = 15;
  timerElement.innerHTML = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerHTML = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function showQuestion() {
  const question = questions[currentQuestion];

  questionElement.innerHTML = question.question;

  answersElement.innerHTML = "";

  question.answers.forEach(answer => {
    const button = document.createElement("button");

    button.innerHTML = answer;

    button.className =
      "block w-full text-left bg-gray-200 hover:bg-blue-500 hover:text-white p-3 rounded";

    button.onclick = () => selectAnswer(answer);

    answersElement.appendChild(button);
  });

  updateProgress();
  startTimer();
}

function selectAnswer(answer) {
  const correctAnswer = questions[currentQuestion].correct;

  const buttons = answersElement.querySelectorAll("button");

  buttons.forEach(button => {
    button.disabled = true;

    if (button.innerHTML === correctAnswer) {
      button.classList.add("bg-green-500", "text-white");
    }

    if (
      button.innerHTML === answer &&
      answer !== correctAnswer
    ) {
      button.classList.add("bg-red-500", "text-white");
    }
  });

  if (answer === correctAnswer) {
    score++;
  }

  clearInterval(timer);
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function updateProgress() {
  const progressPercent =
    ((currentQuestion + 1) / questions.length) * 100;

  progress.style.width = `${progressPercent}%`;
}

function showResult() {
  questionElement.innerHTML = "Quiz Completed!";
  answersElement.innerHTML = "";
  nextBtn.classList.add("hidden");

  result.innerHTML = `
    <h2 class="text-2xl font-bold text-green-600">
      Your Score: ${score} / ${questions.length}
    </h2>
  `;

  restartBtn.classList.remove("hidden");
}

restartBtn.onclick = () => {
  currentQuestion = 0;
  score = 0;

  nextBtn.classList.remove("hidden");
  restartBtn.classList.add("hidden");

  result.innerHTML = "";

  showQuestion();
};

nextBtn.addEventListener("click", () => {
  nextQuestion();
});

showQuestion();