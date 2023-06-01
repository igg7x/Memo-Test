const tableroEl = document.querySelector("#tablero");
const modalEl = document.querySelector("#modal");
const closeModalEl = document.querySelector("#modal-close");
const intentosEl = document.querySelector("#intentos");
const btnNewGameEl = document.querySelector("#NewGame");
const btnSettingsEl = document.querySelector("#Settings");
const modalSettingsEl = document.querySelector("#modalSettings");
const pairsFoundElement = document.querySelector("#pairFound");
const btnSaveEl = document.querySelector("#Save");
const levels = document.querySelectorAll(".level");
const levelEl = document.querySelector("#levelSelected");
const modalSettingsClose = document.querySelector("#modalSettings-close");
const swt = document.querySelector(".switch");
const timerEl = document.querySelector("#timer");
const jsConfetti = new JSConfetti();

let icons = [];
let selected = "";
let clicks = true;
let i = 0;
let countIntentos = 0;
let checked = "";
let countEncontradas = 0;
let seg = 0;
let min = 0;
let time;
var TimerHandle = false;

function tick() {
  seg++;
  if (seg == 60) {
    seg = 0;
    min++;
  }
}
let iconsMedium = [
  '<i class="fa-brands fa-python fa-2xl"></i>',
  '<i class="fa-brands fa-python fa-2xl"></i>',
  '<i class="fa-brands fa-snapchat fa-2xl"></i>',
  '<i class="fa-brands fa-snapchat fa-2xl"></i>',
  '<i class="fa-brands fa-js fa-2xl"></i>',
  '<i class="fa-brands fa-js fa-2xl"></i>',
  '<i class="fa-brands fa-git-alt fa-2xl"></i>',
  '<i class="fa-brands fa-git-alt fa-2xl"></i>',
];
let iconsHard = [
  '<i class="fa-brands fa-php fa-2xl"></i>',
  '<i class="fa-brands fa-php fa-2xl"></i>',
  '<i class="fa-brands fa-ethereum fa-2xl"></i>',
  '<i class="fa-brands fa-ethereum fa-2xl"></i>',
  '<i class="fa-brands fa-btc fa-2xl"></i>',
  '<i class="fa-brands fa-btc fa-2xl"></i>',
];

levels.forEach((level) => {
  level.addEventListener("change", () => {
    checked = level.nextElementSibling.textContent;
  });
});

btnSaveEl.addEventListener("click", () => {
  clearInterval(TimerHandle);
  timerEl.textContent = "";
  levelEl.textContent = "";
  pairsFoundElement.textContent = "";
  icons = [];
  loadIcons();
  tableroEl.innerHTML = "";
  modalSettingsEl.classList.replace("modal-show", "modal-close");
  if (checked === "Medium😨") {
    tableroEl.classList.replace("tablero", "tablero-medium");
    icons.push(...iconsMedium);
    levelEl.textContent = "Level : Medium";
  } else if (checked === "Hard😈") {
    levelEl.textContent = "Level : Hard";
    tableroEl.classList.replace("tablero", "tablero-hard");
    icons.push(...iconsMedium);
    icons.push(...iconsHard);
  } else {
    levelEl.textContent = "Level : Easy";
    document.body.style.background =
      "rgb(29,53,87) linear-gradient(180deg, rgba(29,53,87,1) 0%, rgba(46,83,117,1) 36%, rgba(69,123,157,1) 81%, rgba(101,146,174,1) 100%, rgba(252,252,252,1) 100%);";
    tableroEl.removeAttribute("class");
    tableroEl.classList.add("tablero");
  }
});

const loadIcons = () => {
  icons = [
    '<i class="fa-brands fa-playstation fa-2xl"></i>',
    '<i class="fa-brands fa-playstation fa-2xl"></i>',
    '<i class="fa-brands fa-twitch fa-2xl"></i>',
    '<i class="fa-brands fa-twitch fa-2xl"></i>',
    '<i class="fa-brands fa-xbox fa-2xl"></i>',
    '<i class="fa-brands fa-xbox fa-2xl"></i>',
    '<i class="fa-brands fa-github fa-2xl"></i>',
    '<i class="fa-brands fa-github fa-2xl"></i>',
    '<i class="fa-brands fa-apple fa-2xl"></i>',
    '<i class="fa-brands fa-apple fa-2xl"></i>',
    '<i class="fa-brands fa-android fa-2xl"></i>',
    '<i class="fa-brands fa-android fa-2xl"></i>',
    '<i class="fa-brands fa-java fa-2xl"></i>',
    '<i class="fa-brands fa-java fa-2xl"></i>',
    '<i class="fa-brands fa-space-awesome fa-2xl"></i>',
    '<i class="fa-brands fa-space-awesome fa-2xl"></i>',
  ];
};
loadIcons();
function iniciarJuego() {
  tableroEl.innerHTML = "";
  icons = icons.sort((a, b) => 0.5 - Math.random());
  icons.forEach((icon) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.addEventListener("click", () => {
      if (!clicks) {
        return null;
      }
      if (card.classList.contains("equals")) {
        return null;
      }
      if (card.classList.contains("flipCard")) {
        return null;
      }
      clicks = false;
      card.classList.add("flipCard");
      if (selected === "") {
        selected = icon;
        clicks = true;
        if (!TimerHandle) {
          TimerHandle = setInterval(() => {
            tick();
            timerEl.textContent =
              (min > 9 ? min : "0" + min) + ":" + (seg > 9 ? seg : "0" + seg);
          }, 1000);
        }
        // Primera Card Seleccionada
      } else {
        //Segunda Card Seleccionada
        if (selected == icon) {
          //Comparo si son iguales
          countIntentos++;
          countEncontradas++;
          card.classList.replace("flipCard", "equals");
          document
            .querySelector(".flipCard")
            .classList.replace("flipCard", "equals");
          clicks = true;
          const acertadas = document.querySelectorAll(".equals");
          pairsFoundElement.textContent = `Pairs found : ${countEncontradas} / ${
            icons.length / 2
          }
           `;
          if (acertadas.length === icons.length) {
            clearInterval(TimerHandle);
            TimerHandle = false;
            resartGame = true;
            intentosEl.textContent = `Attempts : ${countIntentos}
            Time:${timerEl.textContent}
            `;
            modalEl.classList.replace("modal-close", "modal-show");
            jsConfetti.addConfetti();
          }
        } else {
          countIntentos++;
          setTimeout(() => {
            card.classList.remove("flipCard");
            document.querySelector(".flipCard").classList.remove("flipCard");
            clicks = true;
          }, 1550);
        }
        selected = "";
      }
    });
    card.innerHTML = `<div class="card-back" id="${i}">
    ${icon} 
    </div>
    <div class="card-front">
    '<i class="fa-solid fa-question fa-2xl "></i>'
    </div>`;
    i++;
    tableroEl.appendChild(card);
  });
  revealCards();
}

function revealCards() {
  const cardsReveals = document.querySelectorAll(".card");
  setTimeout(() => {
    cardsReveals.forEach((element) => {
      element.classList.add("equals");
    });
  }, 500);

  setTimeout(() => {
    cardsReveals.forEach((element) => {
      element.classList.remove("equals");
    });
  }, 2000);
}

closeModalEl.addEventListener("click", (e) => {
  e.preventDefault();
  modalEl.classList.replace("modal-show", "modal-close");
});

btnNewGameEl.addEventListener("click", (e) => {
  clearInterval(TimerHandle);
  TimerHandle = false;
  min = 0;
  seg = 0;
  timerEl.textContent = "";
  iniciarJuego();
  e.preventDefault();
  cardsToReset = document.querySelectorAll(".equals");
  cardsToReset.forEach((card) => {
    card.classList.remove("equals");
  });
  revealCards();
  countEncontradas = 0;
  countIntentos = 0;
  pairsFoundElement.textContent = "";
});

btnSettingsEl.addEventListener("click", (e) => {
  e.preventDefault();
  modalSettingsEl.classList.replace("modal-close", "modal-show");
});

modalSettingsClose.addEventListener("click", (e) => {
  e.preventDefault();
  modalSettingsEl.classList.replace("modal-show", "modal-close");
});

swt.addEventListener("change", () => {
  if (document.body.classList.contains("darkmode")) {
    document.body.classList.remove("darkmode");
  } else {
    document.body.classList.add("darkmode");
  }
});
