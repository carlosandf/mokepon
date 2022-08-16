import getRandomNumber from "./utils/getRandomNumber.js";
import petsData from "./utils/petsData.js";

const player = {
  lives: 3,
};
const opponent = {
  lives: 3,
};



function combat(player, opponent) {
  const playerLivesMessage = document.querySelector('#playerLives');
  const opponentLivesMessage = document.querySelector('#opponentLives');
  
  let result;
  if (player.attack === opponent.attack) {
    result = 'EMPATE';
  }
  else if ((player.attack === 'FUEGO' && opponent.attack === 'TIERRA') || (player.attack === 'AGUA' && opponent.attack === 'FUEGO') || (player.attack === 'TIERRA' && opponent.attack === 'AGUA')) {
    opponent.lives--;
    result = 'GANASTE!!!';
  }
  else {
    player.lives--;
    result = 'PERDISTE :(';
  }
  playerLivesMessage.innerText = player.lives;
  opponentLivesMessage.innerText = opponent.lives;

  
  return result;
}


// SELECCIONAR MASCOTA DEL USUARIO
function selectPlayerPet() {
  const playerPet = document.querySelector('#playerPet');
  
  const petsNodesList = document.getElementsByName('pet');
  const petsList = [...petsNodesList];

  const selectPet = petsList.find(pet => pet.checked);
  
  if (selectPet) {
    playerPet.innerText = selectPet.id.toUpperCase()
    opponent.name = selectOpponentPet();
    return selectPet.id.toUpperCase();
  }
  alert('No has seleccionado una mascota');
}


// ATAQUE ALEATORIO DEL OPONENTE
function opponentAttack() {
  const attackRandom = getRandomNumber(1, 3);
  switch (attackRandom) {
    case 1:
      return 'FUEGO';
    case 2:
      return 'AGUA';
    default:
      return 'TIERRA';
  }
}


// ATAQUES DEL JUGADOR
function attackPlayer(attack) {
  player.attack = attack;
  opponent.attack = opponentAttack();
  createMessage();
}


// SELECCIONAR MASCOTA ALEATORIA
function selectOpponentPet() {
  const opponentPet = document.querySelector('#opponentPet');

  const random = getRandomNumber(0, 5);

  const randomPet = petsData.slice(random, random + 1);
  
  opponentPet.innerText = randomPet[0].name.toUpperCase();
  return randomPet[0].name.toUpperCase();
}


// MOSTRAR MENSAJE
function createMessage() {
  const messageContainer = document.querySelector('#messages');
  messageContainer.innerHTML = '';

  const result = combat(player, opponent);

  const message = document.createElement('p');
  
  if (player.lives > 0 && opponent.lives > 0) {
    message.innerText = `Tu mascota atacó con ${player.attack}
      la mascota de tu oponente atacó con ${opponent.attack}
      ${result}
    `;
  } else {
    message.innerText = combatResult();
  }

  messageContainer.appendChild(message);
}


// VERIFICACION DEL RESULTADO DELCOMBATE
function combatResult() {
  const btnAttackFire = document.querySelector('#buttonAttackFire');
  const btnAttackWater = document.querySelector('#buttonAttackWater');
  const btnAttackEarth = document.querySelector('#buttonAttackEarth');

  if (opponent.lives === 0 || player.lives === 0) {
    btnAttackFire.disabled = true;
    btnAttackWater.disabled = true;
    btnAttackEarth.disabled = true;
  }
  
  if (opponent.lives === 0) {
    return 'GANASTE!!! 🎉';
  } else if (player.lives === 0) {
    return 'Lo siento, perdiste :(';
  }
}

// REINICIAR JUEGO
function restartGame() {
  location.reload();
}

// INICIO DEL JUEGO
function startGame() {
  const btnSelectPet = document.querySelector('#buttonSelectPet');
  const btnRestart = document.querySelector('#buttonRestart');
  const btnAttackFire = document.querySelector('#buttonAttackFire');
  const btnAttackWater = document.querySelector('#buttonAttackWater');
  const btnAttackEarth = document.querySelector('#buttonAttackEarth');

  btnSelectPet.onclick = () => player.name = selectPlayerPet();

  btnAttackFire.onclick = () => attackPlayer('FUEGO');
  btnAttackWater.onclick = () => attackPlayer('AGUA');
  btnAttackEarth.onclick = () => attackPlayer('TIERRA');

  btnRestart.onclick = restartGame;
}

window.onload = startGame;