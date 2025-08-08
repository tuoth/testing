// Générateur de quiz utilisant l'API Gemini
// Cette version utilise des données simulées pour éviter d'exposer une clé API.

const courseText = document.getElementById('course-text');
const questionCount = document.getElementById('question-count');
const generateBtn = document.getElementById('generate-btn');
const quizContainer = document.getElementById('quiz-container');
const scoreSection = document.getElementById('score-section');
const folderSelect = document.getElementById('folder-select');
const folderList = document.getElementById('folder-list');
const newFolderBtn = document.getElementById('new-folder-btn');

let currentQuiz = null;
let score = 0;

// Chargement des dossiers depuis le stockage local
function loadFolders() {
  const folders = JSON.parse(localStorage.getItem('folders') || '{}');
  folderSelect.innerHTML = '<option value="">(aucun)</option>';
  folderList.innerHTML = '';
  Object.keys(folders).forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    folderSelect.appendChild(opt);

    const li = document.createElement('li');
    li.textContent = `${name} (${folders[name].length} quiz)`;
    folderList.appendChild(li);
  });
}

// Création d'un nouveau dossier
newFolderBtn.addEventListener('click', () => {
  const name = prompt('Nom du dossier :');
  if (!name) return;
  const folders = JSON.parse(localStorage.getItem('folders') || '{}');
  if (!folders[name]) folders[name] = [];
  localStorage.setItem('folders', JSON.stringify(folders));
  loadFolders();
});

// Simulation d'appel à l'API Gemini
async function generateQuiz() {
  const text = courseText.value.trim();
  if (!text) {
    alert('Veuillez coller un texte de cours.');
    return;
  }
  const count = parseInt(questionCount.value, 10);

  // Exemple d'appel réel :
  // const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=VOTRE_CLE', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ prompt: `Transforme ce texte en quiz de ${count || 'max'} questions: ${text}` })
  // });
  // const data = await response.json();

  // Données simulées pour démonstration
  const data = {
    questions: [
      {
        q: 'Quel est le sujet principal du cours ?',
        options: ['Sujet A', 'Sujet B', 'Sujet C'],
        answer: 0
      },
      {
        q: 'Quelle année est mentionnée ?',
        options: ['2023', '2024', '2025'],
        answer: 2
      }
    ]
  };

  if (count && count < data.questions.length) {
    data.questions = data.questions.slice(0, count);
  }
  currentQuiz = data.questions;
  score = 0;
  renderQuiz();
}

generateBtn.addEventListener('click', generateQuiz);

// Affichage du quiz interactif
function renderQuiz() {
  quizContainer.innerHTML = '';
  currentQuiz.forEach((q, idx) => {
    const div = document.createElement('div');
    div.className = 'bg-white p-4 rounded shadow transition transform hover:scale-[1.01]';
    div.innerHTML = `
      <p class="font-medium mb-2">${idx + 1}. ${q.q}</p>
      ${q.options.map((opt, i) => `
        <label class="block">
          <input type="radio" name="q${idx}" value="${i}" class="mr-2">${opt}
        </label>`).join('')}
      <button class="mt-2 bg-blue-500 text-white px-2 py-1 rounded" data-idx="${idx}">Valider</button>
      <p class="mt-2 text-sm hidden" id="feedback-${idx}"></p>
    `;
    quizContainer.appendChild(div);
  });

  const buttons = quizContainer.querySelectorAll('button');
  buttons.forEach(btn => btn.addEventListener('click', checkAnswer));
}

function checkAnswer(e) {
  const idx = parseInt(e.target.dataset.idx, 10);
  const q = currentQuiz[idx];
  const selected = document.querySelector(`input[name="q${idx}"]:checked`);
  const feedback = document.getElementById(`feedback-${idx}`);
  if (!selected) {
    alert('Choisissez une réponse');
    return;
  }
  const isCorrect = parseInt(selected.value, 10) === q.answer;
  if (isCorrect) {
    score++;
    feedback.textContent = 'Correct !';
    feedback.className = 'mt-2 text-sm text-green-600';
  } else {
    feedback.textContent = `Incorrect. Réponse attendue : ${q.options[q.answer]}`;
    feedback.className = 'mt-2 text-sm text-red-600';
  }
  feedback.classList.remove('hidden');
  e.target.disabled = true;
  if ([...quizContainer.querySelectorAll('button')].every(b => b.disabled)) {
    showScore();
    saveQuiz();
  }
}

function showScore() {
  scoreSection.textContent = `Score final : ${score} / ${currentQuiz.length}`;
  scoreSection.classList.remove('hidden');
}

// Sauvegarde du quiz dans un dossier choisi
function saveQuiz() {
  const folder = folderSelect.value;
  if (!folder) return;
  const folders = JSON.parse(localStorage.getItem('folders') || '{}');
  if (!folders[folder]) folders[folder] = [];
  folders[folder].push({ date: new Date().toISOString(), quiz: currentQuiz });
  localStorage.setItem('folders', JSON.stringify(folders));
  loadFolders();
}

// Initialisation
loadFolders();
