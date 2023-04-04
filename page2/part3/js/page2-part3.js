
// loading effect

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



// slide effect

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementById("nav-center-upper").getElementsByTagName("img");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.opacity = 0;
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.opacity = 1;
  setTimeout(showSlides, 6000); 
};


// interactive effect page2-part2

const blockTemplate = document.querySelector('[data-classroom-block]');

const blockContainer = document.querySelector('.navCenter');

const allClass = document.getElementById('allClass');
const smallClass = document.getElementById('smallClass');
const freeRange = document.getElementById('freeRange');
const oneOnOne = document.getElementById('oneOnOne');

let articles = [];

window.addEventListener('DOMContentLoaded', allBlock);

const url = '../json/front-enter-export.json';

// 全部顯示
function allBlock(){
fetch(url)
  .then(res => res.json())
  .then(res => res.article)
  .then(res => Object.values(res))
  .then(data => {
    articles = data.map(object => {
    const block = blockTemplate.content.cloneNode(true).children[0];
    const cityName = block.querySelector('.cityName');
    const squareInner = block.querySelector('.squareInner');
    const classroomName = block.querySelector('.classroomName');
    const preface = block.querySelector('.preface');    
    cityName.textContent = object.city;
    squareInner.setAttribute('src', object.squareUrl);
    classroomName.textContent = object.name;
    preface.textContent = object.preface;
    blockContainer.append(block);
    return {cityName: object.city, squareUrl: object.squareUrl, classroomName: object.name, preface: object.preface, classType: object.classType, teachWay: object.teachWay, element: block};  
    })

    allClassClick();
    smallClassClick();
    freeRangeClick();
    oneOnOneClick();
    
    const taipeiCities = articles.filter(article => article.cityName === '台北').map(article => article.element.querySelector('.cityName'));
    taipeiCities.forEach(ele =>{
      ele.addEventListener('click', taipeiClick);
    })
    
    const kaoshiungCities = articles.filter(article => article.cityName === '高雄').map(article => article.element.querySelector('.cityName'));
    kaoshiungCities.forEach(ele =>{
      ele.addEventListener('click', kaoshiungClick);
    })

    const remoteCities = articles.filter(article => article.cityName === '各地').map(article => article.element.querySelector('.cityName'));
    remoteCities.forEach(ele =>{
      ele.addEventListener('click', remoteClick);
    })    
  
    })
  }

// 全部
function allClassClick(){
  allClass.addEventListener('click', function(){
    articles.forEach((article)=>{
      article.element.style.display = 'flex'})
})
}

// 小班制
function smallClassClick(){
    smallClass.addEventListener("click", function(){
      articles.forEach((article)=>{
        article.element.style.display = 'flex';
        if(article.classType !== '小班制'){
          article.element.style.display = 'none';}
      });
    })
}



// 放養制
function freeRangeClick(){
  freeRange.addEventListener("click", function(){
    articles.forEach((article)=>{
      article.element.style.display = 'flex';
      if(article.teachWay !== '放養制'){
        article.element.style.display = 'none';}
    })
  })
}

// 一對一
function oneOnOneClick(){
  oneOnOne.addEventListener("click", function(){
    articles.forEach((article)=>{
      article.element.style.display = 'flex';
    if(article.classType !== '一對一'){
        article.element.style.display = 'none';}
    })
  })
}

// 台北
function taipeiClick(){
  articles.forEach((article)=>{
    article.element.style.display = 'flex';
  if(article.cityName !== '台北'){
      article.element.style.display = 'none'}
  })
}

// 高雄
function kaoshiungClick(){
  articles.forEach((article)=>{
    article.element.style.display = 'flex';
  if(article.cityName !== '高雄'){
      article.element.style.display = 'none'}
  })
}

// 各地

function remoteClick(){
  articles.forEach((article)=>{
    article.element.style.display = 'flex';
  if(article.cityName !== '各地'){
      article.element.style.display = 'none'}
  })
}
