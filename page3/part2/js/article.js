
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


// interactive effect page2-part2

const blockTemplate = document.querySelector('[data-classroom-block]');

const blockContainer = document.querySelector('.navCenter');

const allClass = document.getElementById('allClass');
const smallClass = document.getElementById('smallClass');
const freeRange = document.getElementById('freeRange');
const oneOnOne = document.getElementById('oneOnOne');

const blue = '#1ad8d3';
const grey = '#737373';

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

    return {cityName: object.city, squareUrl: object.squareUrl, classroomName: object.name, preface: object.preface, classType: object.classType, teachWay: object.teachWay, id: object.creatTime,element: block};  
    
    })
    // console.log(articles[2].id);

    allClassClick();
    smallClassClick();
    freeRangeClick();
    oneOnOneClick();
    
    taipeiClickFunction();
    kaoshiungClickFunction();
    remoteClickFunction();

    searchBarText();
    searchBarVoice();
    contentLink();
  })
}

// 全部
function allClassClick(){
  allClass.addEventListener('click', function(){
    articles.forEach((article)=>{
    article.element.style.display = 'flex'})

    allClass.style.color = blue;
    [smallClass, freeRange, oneOnOne].forEach(el => el.style.color = grey);
})
}

// 小班制
function smallClassClick(){
    smallClass.addEventListener("click", function(){
      articles.forEach((article)=>{
        article.element.style.display = 'flex';
        if(article.classType !== '小班制'){
          article.element.style.display = 'none';}
      })
      smallClass.style.color = blue;

      [freeRange, oneOnOne, allClass].forEach(el => el.style.color = grey);
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
    freeRange.style.color = blue;
    [smallClass, oneOnOne, allClass].forEach(el => el.style.color = grey);
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
    oneOnOne.style.color = blue;
    [smallClass, freeRange, allClass].forEach(el => el.style.color = grey);
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
function taipeiClickFunction(){
  const taipeiCities = articles.filter(article => article.cityName === '台北').map(article => article.element.querySelector('.cityName'));

  taipeiCities.forEach(ele =>{
    ele.addEventListener('click', taipeiClick);
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
function kaoshiungClickFunction(){
  const kaoshiungCities = articles.filter(article => article.cityName === '高雄').map(article => article.element.querySelector('.cityName'));
  kaoshiungCities.forEach(ele =>{
    ele.addEventListener('click', kaoshiungClick);
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

function remoteClickFunction(){
  const remoteCities = articles.filter(article => article.cityName === '各地').map(article => article.element.querySelector('.cityName'));
  remoteCities.forEach(ele =>{
    ele.addEventListener('click', remoteClick);
  })    
  }

// take id parameter on the URL

function contentLink(){
  const contentLinks = document.querySelectorAll('.readmore')

  console.log(contentLinks);

  contentLinks.forEach(link => {
    link.addEventListener( 'click', () => {
      const linkIndex = Array.from(contentLinks).indexOf(link);
      const linkId = articles[linkIndex].id;
      console.log(linkId);
      const url = `content.html?id=${linkId}`;
      console.log(url);
      window.location.href = url;
    }
    )
  }
  )
}


// search bar Text 
const searchInput = document.querySelector('[data-search]'); 
const searchGlass = document.querySelector('.search-glass');


function searchBarText(value){
  searchInput.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      // 避免頁面重新整理
      e.preventDefault();
      searchBox.style.display = 'none';
      blackBox.style.display = 'none';
      const value = e.target.value.toLowerCase().trim();
      articles.forEach(object => {
        // 若為空白則全部顯示
        const isVisible = (object.cityName.toLowerCase().includes(value) || object.classroomName.toLowerCase().includes(value) || object.preface.toLowerCase().includes(value)) && (value.length > 0);
        object.element.style.display = isVisible ? 'flex' : 'none';
        });
      }
  })
}

  searchGlass.addEventListener('click', e => {
    e.preventDefault();
    searchBox.style.display = 'none';
    blackBox.style.display = 'none';
    const value = searchInput.value.toLowerCase().trim();
    articles.forEach(object => {
      const isVisible = (object.cityName.toLowerCase().includes(value) || object.classroomName.toLowerCase().includes(value) || object.preface.toLowerCase().includes(value)) && (value.length > 0);
      object.element.style.display = isVisible ? 'flex' : 'none';
      })
  })



// search bar audio to text

const micIcon = document.querySelector('.voice');

const speechRecognition = window.webkitSpeechRecognition;

// 因為有用 articles 所以要傳到 fetch 裡面使用
function searchBarVoice(value){
  if(value){
    searchBox.style.display = 'none';
    blackBox.style.display = 'none';
    searchInput.value = '';
    micIcon.style.display = 'flex';
    const value = searchInput.value.toLowerCase().trim();
    articles.forEach(object => {
      // 若為空白則全部顯示
      const isVisible = (object.cityName.toLowerCase().includes(value) || object.classroomName.toLowerCase().includes(value) || object.preface.toLowerCase().includes(value)) && (value.length > 0);
      object.element.style.display = isVisible ? 'flex' : 'none';
        })
      }
  }

  if (speechRecognition){
    console.log('my browser supports speech Recognition');
    const recognition = new speechRecognition();
    micIcon.addEventListener('click', function micIconClick(){
      micIcon.style.display = 'none'
      recognition.start();
    })
    recognition.addEventListener('end', function() {
      recognition.stop();
    });

    recognition.addEventListener('result', function(event) {
      const transcript = event.results[0][0].transcript;
      console.log('Transcript:', transcript);
      // 處理識別結果
      searchInput.value = transcript;
      setTimeout(function() {
        searchBarVoice(transcript);
      }, 1000); // 延遲1秒後
    });
  }else{
    micIcon.addEventListener('click', function(){ 
    alert('您的瀏覽器不支援語音辨識功能，請切換瀏覽器')
  })
}


// 導回主頁

const logoBtn = document.querySelector('.logo');

logoBtn.addEventListener('click', function() {
  window.location.href = 'index.html';
});


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
  blackBox.style.display = 'flex';
  document.getElementById('search').focus();}
  if (clickCount === 2) {
  searchBox.style.display = 'none';
  blackBox.style.display = 'none';
  clickCount = 0;}
});

blackBox.onclick = () => {
  searchBox.style.display = 'none';
  blackBox.style.display = 'none';
};


// page2-part2 slide effect

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

