const paragraph = `Books are portals to different worlds, offering a temporary refuge from our routine lives. They allow us to explore new ideas, cultures, and eras, broadening our horizons and enhancing our understanding of the world. The excitement of discovering what happens next keeps us hooked, while the rich narratives offer a sense of fulfillment and joy. Every book is a new adventure waiting to be experienced. We can embark on thrilling quests, solve complex puzzles, or dive into the depths of human emotions. The diversity of genres ensures there is always something for everyone, catering to our varied interests and moods. This variety keeps our reading experience fresh and engaging.`;

const maxCharsPerLine = 50;
const words = paragraph.split(' ');
let lines = [];
let currentLine = '';

words.forEach(word => {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
        currentLine += (currentLine ? ' ' : '') + word;
    } else {
        lines.push(currentLine.trim());
        currentLine = word;
    }
});
if (currentLine) {
    lines.push(currentLine.trim());
}

let currentIndex = 0;
const linesDisplayed = 5;
const textDisplay = document.getElementById('textDisplay');
let userInput = '';
let correctChars = 0;
let totalChars = 0;
let timer = 60;
let interval;

function updateDisplay() {
    textDisplay.innerHTML = '';
    correctChars = 0; // Reset correct characters count for this update
    for (let i = 0; i < linesDisplayed; i++) {
        const lineIndex = currentIndex + i;
        if (lineIndex < lines.length) {
            const lineDiv = document.createElement('div');
            const lineText = lines[lineIndex];

            if (i === 0) {
                // Highlight the current line being typed
                for (let j = 0; j < lineText.length; j++) {
                    const charSpan = document.createElement('span');
                    charSpan.textContent = lineText[j];
                    if (j < userInput.length) {
                        charSpan.className = lineText[j] === userInput[j] ? 'char-correct' : 'char-wrong';
                        if (lineText[j] === userInput[j]) correctChars++;
                    }
                    lineDiv.appendChild(charSpan);
                }
            } else {
                // Display other lines normally
                lineDiv.textContent = lineText;
            }

            textDisplay.appendChild(lineDiv);
        }
    }
}

function endSession() {
    clearInterval(interval);
    const accuracy = (correctChars / totalChars) * 100;
    const wpm = (correctChars / 5) / (60 / timer);
    console.log(`Accuracy: ${accuracy.toFixed(2)}%`);
    console.log(`Words Per Minute: ${wpm.toFixed(2)}`);
    alert(`Time's up!\nAccuracy: ${accuracy.toFixed(2)}%\nWords Per Minute: ${wpm.toFixed(2)}`);
}

function startTimer() {
    interval = setInterval(() => {
        timer--;
        document.getElementById('timer').innerText = timer;
        if (timer === 0) {
            endSession();
        }
    }, 1000);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
        if (userInput.length > 0) {
            userInput = userInput.slice(0, -1);
        }
    } else if (event.key.length === 1) {
        userInput += event.key;
    }

    const currentLine = lines[currentIndex];
    if (userInput.length >= maxCharsPerLine || userInput === currentLine) {
        if (userInput === currentLine) {
            correctChars += currentLine.length;
        }
        userInput = '';
        currentIndex++;
    } else if (userInput.length === 0 && currentIndex > 0) {
        currentIndex--;
        userInput = lines[currentIndex];
    }

    totalChars = correctChars + userInput.length;
    updateDisplay();
});

updateDisplay();
startTimer();
