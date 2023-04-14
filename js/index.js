// Preloader
function hidePreloader() {
  // Selecting DOM element
  const preloader = document.getElementById('preloader');

  //Update UI
  preloader.style.display = 'block';

  // use setTimeout to hide preloader element after 1 second
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 1000);
}

hidePreloader();

// Selecting DOM elements
const form = document.getElementById('form');
const greeting = document.getElementById('greeting');
const logOutBtn = document.getElementById('logOut');
const logOutWrapper = document.getElementById('logOutWrapper');
const userName = document.getElementById('userName');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const scoreElement = document.getElementById('score');
const lvlElement = document.getElementById('lvl');
const clickBtn = document.getElementById('earnPoint');
const restart = document.getElementById('restart');
const enemyWrapper = document.getElementById('enemy');
const title = document.getElementById('mainTitle');

// Game variables
let score = 0;
let lvl = 1;
let clicks = 0;

// Enemy images and maximum clicks per level
const enemyPic = ['1.png', '2.png', '3.png', '4.png', '5.png'];
const maxClicksPerLvl = [5, 10, 15, 20, 25];

//Helper function to capitalize first letter
const capitalizeName = (n) => n[0].toUpperCase() + n.slice(1);

// Function to handle form
function createUser(e) {
  e.preventDefault();

  // Get input values and trim whitespace
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  // Store user data in local storage
  localStorage.setItem('user', JSON.stringify({ name, email }));
  hidePreloader();

  // Update UI to show user is logged in
  form.style.display = 'none';
  title.style.display = 'none';
  userName.innerText = capitalizeName(name);
  greeting.style.display = 'flex';
  logOutBtn.style.display = 'block';
  logOutWrapper.style.display = 'flex';
  document.body.style.backgroundImage = 'url("./images/bg-theme.jpg")';
}

// Function to logout
function logoutUser() {
  resetGame();

  // Remove user data from local storage
  localStorage.removeItem('user');

  hidePreloader();
  // Update UI to show user is logged out
  title.style.display = 'block';
  form.style.display = 'block';
  greeting.style.display = 'none';
  logOutBtn.style.display = 'none';
  logOutWrapper.style.display = 'none';
  document.body.style.backgroundImage = 'url("./images/bg.png")';
  // Clear input values
  nameInput.value = '';
  emailInput.value = '';
}

// Check if user is already logged in and update UI
function checkLoggedInUser() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    const { name } = user;
    title.style.display = 'none';
    form.style.display = 'none';
    userName.innerText = capitalizeName(name);
    greeting.style.display = 'flex';
    logOutBtn.style.display = 'block';
    logOutWrapper.style.display = 'flex';
    document.body.style.backgroundImage = 'url("./images/bg-theme.jpg")';
  } else {
    logOutWrapper.style.display = 'none';
  }
}

// Event listener for form
form.addEventListener('submit', createUser);

// Event listener for log out button
logOutBtn.addEventListener('click', logoutUser);

// Call function to check for logged in user on page load
checkLoggedInUser();

//Function for updating score
function updateScore() {
  scoreElement.textContent = score;
}

//Function for updating level
function updateLvl() {
  lvlElement.textContent = lvl;
}

//Function for updating enemy
function updateEnemy() {
  const enemyIndex = Math.floor(clicks / 5);

  if (enemyIndex < enemyPic.length) {
    const enemyUrl = `./images/${enemyPic[enemyIndex]}`;
    enemyWrapper.style.backgroundImage = `url('${enemyUrl}')`;
    enemyWrapper.style.backgroundSize = 'contain';
    enemyWrapper.style.backgroundRepeat = 'no-repeat';
  }
}

//Function for updating clicks
function updateClicks() {
  clicks++;
  if (clicks % maxClicksPerLvl[lvl - 1] === 0) {
    lvl++;
    if (lvl <= maxClicksPerLvl.length) {
      updateLvl();
      updateEnemy();
      alert(
        `Congratulations! You have reached level: ${lvl} with ${clicks} clicks!`
      );
      hidePreloader();
    } else {
      alert(`Congratulations! You have won the game with ${clicks} clicks!`);
      clickBtn.style.display = 'none';
      enemyWrapper.removeEventListener('click', updateClicks);
    }
  }
  score++;
  updateScore();
}

//Listener for updating clicks
clickBtn.addEventListener('click', updateClicks);
enemyWrapper.addEventListener('click', updateClicks);

//Function for reset game
function resetGame() {
  hidePreloader();
  score = 0;
  lvl = 1;
  clicks = 0;
  updateScore();
  updateLvl();
  clickBtn.style.display = 'block';
  enemyWrapper.addEventListener('click', updateClicks);
  title.style.display = 'none';
  enemyWrapper.style.backgroundImage = `url('/images/1.png')`;
  enemyWrapper.style.backgroundSize = 'cover';
}

//Listener for reset btn
restart.addEventListener('click', resetGame);
