// Quiz Questions - 12 questions sur le développement web
const quizQuestions = [
  {
    question: "Quel framework frontend est utilisé dans le projet Doctime?",
    options: ["React", "Angular", "Vue.js", "Svelte"],
    correct: 1,
  },
  {
    question: "Quelle technologie est utilisée pour le scraping automatisé?",
    options: ["Selenium", "Playwright", "Puppeteer", "BeautifulSoup"],
    correct: 1,
  },
  {
    question: "Quel CMS est mentionné dans les compétences?",
    options: ["WordPress", "Drupal", "Magento", "Joomla"],
    correct: 2,
  },
  {
    question:
      "Quelle base de données vectorielle est utilisée pour le chatbot RAG?",
    options: ["MongoDB", "Qdrant", "Redis", "Elasticsearch"],
    correct: 1,
  },
  {
    question: "Quel framework backend est utilisé pour l'application Sendex?",
    options: ["Express", "Laravel", "Django", "Spring"],
    correct: 1,
  },
  {
    question: "Quelle est la principale différence entre HTML et CSS?",
    options: [
      "HTML structure le contenu, CSS le style",
      "HTML est un langage de programmation, CSS non",
      "CSS structure le contenu, HTML le style",
      "Ils sont identiques",
    ],
    correct: 0,
  },
  {
    question: "Qu'est-ce que REST API?",
    options: [
      "Un protocole de communication réseau",
      "Un style d'architecture pour les services web",
      "Un framework JavaScript",
      "Un langage de programmation",
    ],
    correct: 1,
  },
  {
    question: "Quel outil est utilisé pour la gestion de versions de code?",
    options: ["Git", "Docker", "NPM", "Composer"],
    correct: 0,
  },
  {
    question: "Qu'est-ce que Docker?",
    options: [
      "Un système de gestion de base de données",
      "Une plateforme de conteneurisation",
      "Un framework frontend",
      "Un langage de programmation",
    ],
    correct: 1,
  },
  {
    question: "Quel langage est principalement utilisé avec Laravel?",
    options: ["JavaScript", "PHP", "Python", "Java"],
    correct: 1,
  },
  {
    question: "Qu'est-ce que CI/CD?",
    options: [
      "Continuous Integration / Continuous Deployment",
      "Code Integration / Code Deployment",
      "Computer Interface / Computer Design",
      "Content Integration / Content Delivery",
    ],
    correct: 0,
  },
  {
    question: "Quelle méthode agile est mentionnée dans les compétences?",
    options: ["Kanban", "Scrum", "Waterfall", "Lean"],
    correct: 1,
  },
];

let currentQuestion = 0;
let score = 0;
let selectedAnswers = [];

// Quiz Functions
function startQuiz() {
  document.getElementById("quiz-start").classList.add("hidden");
  document.getElementById("quiz-content").classList.remove("hidden");
  currentQuestion = 0;
  score = 0;
  selectedAnswers = [];
  loadQuestion();
}

function loadQuestion() {
  const question = quizQuestions[currentQuestion];
  const questionText = document.getElementById("question-text");
  const quizOptions = document.getElementById("quiz-options");
  const currentQuestionSpan = document.getElementById("current-question");
  const totalQuestionsSpan = document.getElementById("total-questions");
  const progressBar = document.getElementById("progress-bar");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");

  // Update question number
  currentQuestionSpan.textContent = currentQuestion + 1;
  totalQuestionsSpan.textContent = quizQuestions.length;

  // Update progress bar
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  progressBar.style.width = progress + "%";

  // Set question text
  questionText.textContent = question.question;

  // Clear and populate options
  quizOptions.innerHTML = "";
  question.options.forEach((option, index) => {
    const optionDiv = document.createElement("div");
    optionDiv.className = "quiz-option";
    optionDiv.textContent = option;
    optionDiv.onclick = () => selectOption(index, optionDiv);
    quizOptions.appendChild(optionDiv);
  });

  // Show/hide buttons
  nextBtn.classList.add("hidden");
  submitBtn.classList.add("hidden");

  // Reset selected state
  if (selectedAnswers[currentQuestion] !== undefined) {
    const prevSelected = quizOptions.children[selectedAnswers[currentQuestion]];
    if (prevSelected) {
      prevSelected.classList.add("selected");
    }
  }
}

function selectOption(index, element) {
  // Remove previous selection
  const options = document.querySelectorAll(".quiz-option");
  options.forEach((opt) => opt.classList.remove("selected"));

  // Add selection to clicked option
  element.classList.add("selected");

  // Store answer
  selectedAnswers[currentQuestion] = index;

  // Show next/submit button
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");

  if (currentQuestion < quizQuestions.length - 1) {
    nextBtn.classList.remove("hidden");
  } else {
    submitBtn.classList.remove("hidden");
  }
}

function nextQuestion() {
  if (currentQuestion < quizQuestions.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
}

function submitQuiz() {
  // Calculate score
  score = 0;
  quizQuestions.forEach((question, index) => {
    if (selectedAnswers[index] === question.correct) {
      score++;
    }
  });

  // Show results
  showResults();
}

function showResults() {
  document.getElementById("quiz-content").classList.add("hidden");
  document.getElementById("quiz-results").classList.remove("hidden");

  const scoreSpan = document.getElementById("score");
  const maxScoreSpan = document.getElementById("max-score");
  const scoreBar = document.getElementById("score-bar");
  const resultsDetails = document.getElementById("results-details");

  scoreSpan.textContent = score;
  maxScoreSpan.textContent = quizQuestions.length;

  const percentage = (score / quizQuestions.length) * 100;
  scoreBar.style.width = percentage + "%";
  scoreBar.textContent = Math.round(percentage) + "%";

  // Show detailed results
  resultsDetails.innerHTML = "";
  quizQuestions.forEach((question, index) => {
    const resultItem = document.createElement("div");
    resultItem.className = "result-item";

    const isCorrect = selectedAnswers[index] === question.correct;
    if (isCorrect) {
      resultItem.classList.add("correct");
    } else {
      resultItem.classList.add("incorrect");
    }

    const questionDiv = document.createElement("div");
    questionDiv.className = "result-question";
    questionDiv.textContent = `${index + 1}. ${question.question}`;

    const answerDiv = document.createElement("div");
    answerDiv.className = "result-answer";

    if (isCorrect) {
      answerDiv.innerHTML = `✓ Votre réponse: <strong>${
        question.options[selectedAnswers[index]]
      }</strong> (Correct)`;
      answerDiv.style.color = "#10b981";
    } else {
      answerDiv.innerHTML = `✗ Votre réponse: <strong>${
        question.options[selectedAnswers[index]]
      }</strong><br>
                                   ✓ Bonne réponse: <strong>${
                                     question.options[question.correct]
                                   }</strong>`;
      answerDiv.style.color = "#ef4444";
    }

    resultItem.appendChild(questionDiv);
    resultItem.appendChild(answerDiv);
    resultsDetails.appendChild(resultItem);
  });
}

function restartQuiz() {
  document.getElementById("quiz-results").classList.add("hidden");
  document.getElementById("quiz-start").classList.remove("hidden");
  currentQuestion = 0;
  score = 0;
  selectedAnswers = [];
}
