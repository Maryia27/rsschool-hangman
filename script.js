const questions = [
    { question: "A device used to transmit sound over long distances.", answer: "telephone" },
    { question: "Capital of France?", answer: "paris" },
    { question: "Largest planet in our solar system?", answer: "jupiter" },
    { question: "Fastest land animal?", answer: "cheetah" },
    { question: "Who painted the Mona Lisa?", answer: "davinci" },
    { question: "Smallest country in the world?", answer: "vatican" },
    { question: "Tallest mountain on Earth?", answer: "everest" },
    { question: "Author of Harry Potter?", answer: "rowling" },
    { question: "Brightest star in the night sky?", answer: "sirius" },
    { question: "Chemical symbol for gold?", answer: "au" },
];

let currentQuestion;
let answer;
let maskedWord;
let incorrectGuesses;
const maxGuesses = 6;

const questionElement = document.querySelector('.question');
const wordElement = document.querySelector('.word');
const keyboardElement = document.querySelector('.keyboard');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const resultElement = document.querySelector('.result');
const revealWordElement = document.querySelector('.reveal-word');
const incorrectGuessesElement = document.querySelector('.incorrect-guesses');

function startGame() {
    modal.style.display = 'none';
    overlay.style.display = 'none';

    const randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[randomIndex];
    answer = currentQuestion.answer.toLowerCase();
    maskedWord = '_'.repeat(answer.length);
    incorrectGuesses = 0;

    questionElement.textContent = currentQuestion.question;
    updateWord();
    updateKeyboard();
    resetHangman();
}

function updateWord() {
    wordElement.textContent = maskedWord.split('').join(' ');
}

function updateKeyboard() {
    keyboardElement.innerHTML = '';
    for (let i = 0; i < 26; i++) {
        const letter = String.fromCharCode(97 + i);
        const key = document.createElement('div');
        key.textContent = letter.toUpperCase();
        key.className = 'key';
        key.onclick = () => handleGuess(letter);
        keyboardElement.appendChild(key);
    }
}

function handleGuess(letter) {
    const keys = Array.from(document.querySelectorAll('.key'));
    const key = keys.find(k => k.textContent.toLowerCase() === letter);
    if (key.classList.contains('disabled')) return;
    key.classList.add('disabled');

    if (answer.includes(letter)) {
        let newMaskedWord = '';
        for (let i = 0; i < answer.length; i++) {
            newMaskedWord += answer[i] === letter ? letter : maskedWord[i];
        }
        maskedWord = newMaskedWord;
        updateWord();
        checkWin();
    } else {
        incorrectGuesses++;
        updateHangmanImage();
        checkLoss();
    }
}

function resetHangman() {
    const bodyParts = document.querySelectorAll('.body-parts');
    bodyParts.forEach(part => (part.style.display = 'none'));
    incorrectGuessesElement.textContent = `Incorrect guesses: 0 / ${maxGuesses}`;
}

function updateHangmanImage() {
    const bodyParts = document.querySelectorAll('.body-parts');
    if (incorrectGuesses <= maxGuesses) {
        bodyParts[incorrectGuesses - 1].style.display = 'block'; // Показываем часть тела
    }
    incorrectGuessesElement.textContent = `Incorrect guesses: ${incorrectGuesses} / ${maxGuesses}`;
}

function checkWin() {
    if (maskedWord === answer) {
        resultElement.textContent = 'Congratulations! You guessed the word!';
        revealWordElement.textContent = `The word was: ${answer}`;
        showModal();
    }
}

function checkLoss() {
    if (incorrectGuesses === maxGuesses) {
        resultElement.textContent = 'You lost! Better luck next time.';
        revealWordElement.textContent = `The word was: ${answer}`;
        showModal();
    }
}

function showModal() {
    modal.style.display = 'block';
    overlay.style.display = 'block';
}

startGame();
