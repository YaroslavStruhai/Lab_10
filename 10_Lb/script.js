const images = ["apple.png", "pear.png", "lemon.png", "cherry.png", "peach.png"];
let attempts = 1;
const maxAttempts = 3;
const username = prompt("Введіть ваше ім'я:");
document.getElementById("username").textContent = `Гравець: ${username}`;
function generateRandomImages() {
  const columns = [[], [], []];

  for (let col = 0; col < 3; col++) {
    while (columns[col].length < 3) {
      const randomImage = images[Math.floor(Math.random() * images.length)];
      if (!columns[col].includes(randomImage)) {
        columns[col].push(randomImage);
      }
    }
  }
  return columns;
}
function updateSlots(columns) {
  for (let col = 0; col < 3; col++) {
    const columnDiv = document.getElementById(`col-${col + 1}`);
    columnDiv.innerHTML = ""; 
    columns[col].forEach((img) => {
      const imgElement = document.createElement("img");
      imgElement.src = `${img}`; 
      columnDiv.appendChild(imgElement);
    });
  }
}
function checkWin(columns) {
  for (let row = 0; row < 3; row++) {
    if (
      columns[0][row] === columns[1][row] &&
      columns[1][row] === columns[2][row]
    ) {
      return true;
    }
  }
  return false;
}
function resetGame() {
  attempts = 1;
  document.getElementById("attempts").textContent = `Спроба ${attempts} з ${maxAttempts}`;
  document.getElementById("message").textContent = "";
  document.getElementById("generate-btn").disabled = false;
  document.getElementById("reset-btn").style.display = "none";
}
document.getElementById("generate-btn").addEventListener("click", () => {
  const columns = generateRandomImages();
  updateSlots(columns);

  if (checkWin(columns)) {
    document.getElementById("message").textContent = "Ви виграли!";
    document.getElementById("generate-btn").disabled = true;
    document.getElementById("reset-btn").style.display = "inline-block";
  } else {
    attempts++;
    if (attempts > maxAttempts) {
      document.getElementById("message").textContent = "Гру завершено. Ви програли.";
      document.getElementById("generate-btn").disabled = true;
      document.getElementById("reset-btn").style.display = "inline-block";
    } else {
      document.getElementById("attempts").textContent = `Спроба ${attempts} з ${maxAttempts}`;
    }
  }
});
document.getElementById("reset-btn").addEventListener("click", () => {
  resetGame();
});
