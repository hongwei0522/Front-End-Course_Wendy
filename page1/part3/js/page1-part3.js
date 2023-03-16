//loading effect


window.addEventListener('load', function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

let logo = document.getElementById('animation-logo');

const logoJump = logo.animate([
  { top: '20vh' },
  { top: '25vh' },
  { top: '20vh' }
], {
  duration: 1000,
  iterations: 3,
  easing: 'linear',
  direction: 'alternate', 
});

let animation = document.getElementById('animation');

const animationOut = animation.animate(
[
  { transform: 'translateY(0%)' },
  { transform: 'translateY(-120vh)' },
], {
  duration: 800,
  iterations: 1,
  easing: 'linear',
  delay: 1500
});




animationOut.onfinish = () => {
  animation.style.display = 'none';
};


// Top Button


const scrollBtn = document.getElementById("topwrap");

scrollBtn.addEventListener("click", function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});


// search-button

let searchBox = document.getElementById('search-box');

let blackBox = document.getElementById('black-box');

let clickGlass = document.getElementById('click-glass');

let clickCount = 0;

clickGlass.addEventListener('click', function() {
  clickCount += 1;
  if (clickCount === 1) {
  searchBox.style.display = 'flex';
  blackBox.style.display = 'flex';}
  if (clickCount === 2) {
  searchBox.style.display = 'none';
  blackBox.style.display = 'none';
  clickCount = 0;}
});

blackBox.onclick = () => {
  searchBox.style.display = 'none';
  blackBox.style.display = 'none';
};

