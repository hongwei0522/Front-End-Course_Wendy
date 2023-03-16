
window.addEventListener('load', function () {
  const animation = document.querySelector('#animation');
  const animationBlue = document.querySelector('.animation-blue');
  const testGoRound = document.querySelector('.test-go-round');
  animation.style.transition = 'transform 1.5s';
  animation.style.transform = 'translateY(-120vh)';
  animation.style.transition = 'transform 1.7s';
  animation.style.transform = 'translateY(-120vh)';
  testGoRound.style.transition = 'bottom 1.3s';
  testGoRound.style.bottom = '20%';
});


const scrollBtn = document.getElementById("topwrap");

scrollBtn.addEventListener("click", function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});


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

