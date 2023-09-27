const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("cntrlrBtn");
const promodoroButton = document.getElementById("promodoro");
const shortBreakButton = document.getElementById("shortBreak");
const longBreakButton = document.getElementById("longBreak");
const addTaskButton = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let timer;
let timeInSeconds = 1500;
let isTimerRunning = false;
const tasks = [];

function updateDisplay() {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")} : ${String(
    seconds
  ).padStart(2, "0")}`;
}

function startTimer() {
  if (!isTimerRunning) {
    isTimerRunning = true;
    startButton.textContent = "Pause";
    timer = setInterval(() => {
      if (timeInSeconds > 0) {
        timeInSeconds--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isTimerRunning = false;
        startButton.textContent = "Start";
      }
    }, 1000);
  } else {
    clearInterval(timer);
    isTimerRunning = false;
    startButton.textContent = "Start";
  }
}

startButton.addEventListener("click", startTimer);

promodoroButton.addEventListener("click", () => {
  if (!isTimerRunning) {
    timeInSeconds = 1500;
    updateDisplay();
  }
});

shortBreakButton.addEventListener("click", () => {
  if (!isTimerRunning) {
    timeInSeconds = 300;
    updateDisplay();
  }
});

longBreakButton.addEventListener("click", () => {
  if (!isTimerRunning) {
    timeInSeconds = 900;
    updateDisplay();
  }
});

addTaskButton.addEventListener("click", () => {
  const taskName = taskInput.value.trim();
  if (taskName) {
    tasks.push(taskName);
    taskInput.value = "";
    renderTaskList();
  }
});

function renderTaskList() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${task}`;
    listItem.addEventListener("click", () => {
      timeInSeconds = 1500;
      updateDisplay();
      startTimer();
    });
    taskList.appendChild(listItem);
  });
}

updateDisplay();
