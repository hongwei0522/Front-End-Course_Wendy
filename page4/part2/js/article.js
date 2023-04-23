

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


// 顯示班別

const blockTemplate = document.querySelector('[data-classroom-block]');

const blockContainer = document.querySelector('.navCenter');

const allClass = document.getElementById('allClass');
const smallClass = document.getElementById('smallClass');
const freeRange = document.getElementById('freeRange');
const oneOnOne = document.getElementById('oneOnOne');

const blue = '#1ad8d3';
const grey = '#737373';

// let articles = [];

window.addEventListener('DOMContentLoaded', allBlock);

// const url = '../json/front-enter-export.json';

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
    const className = block.querySelector('.className');
    const preface = block.querySelector('.preface');    
    cityName.textContent = object.city;
    squareInner.setAttribute('src', object.squareUrl);
    className.textContent = object.name;
    preface.textContent = object.preface;
    blockContainer.append(block);
    return {
        cityName: object.city, 
        squareUrl: object.squareUrl, 
        className: object.name, 
        preface: object.preface, 
        classType: object.classType, 
        teachWay: object.teachWay, 
        id: object.creatTime, 
        element: block};  
    })
    allClassClick();
    smallClassClick();
    freeRangeClick();
    oneOnOneClick();
    
    taipeiClickFunction();
    kaoshiungClickFunction();
    remoteClickFunction();
    contentLink();
  })
}




function allClassClick(){ // 全部
  allClass.addEventListener('click', function(){
    articles.forEach((article)=>{
    article.element.style.display = 'flex'})

    allClass.style.color = blue;
    [smallClass, freeRange, oneOnOne].forEach(el => el.style.color = grey);
})
}


function smallClassClick(){ // 小班制
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


function freeRangeClick(){ // 放養制
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


function oneOnOneClick(){ // 一對一
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


function taipeiClick(){
  articles.forEach((article)=>{ // 台北
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

function kaoshiungClick(){ // 高雄
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

function remoteClick(){// 各地
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



// take id parameter on the URL and link to content.html

function contentLink(){
  const contentLinks = document.querySelectorAll('.lowerBlock ');
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

  searchBarText();
  searchBarVoice();

function searchBarText(value){
  searchInput.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      searchBox.style.display = 'none';
      blackBox.style.display = 'none';
      const value = e.target.value.toLowerCase().trim();
      articles.forEach(object => {
        // 若為空白則全部顯示
        const isVisible = (object.cityName.toLowerCase().includes(value) || object.className.toLowerCase().includes(value) || object.preface.toLowerCase().includes(value)) && (value.length > 0);
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
      const isVisible = (object.cityName.toLowerCase().includes(value) || object.className.toLowerCase().includes(value) || object.preface.toLowerCase().includes(value)) && (value.length > 0);
      object.element.style.display = isVisible ? 'flex' : 'none';
      })
  })



// search bar audio to text

const micIcon = document.querySelector('.voice');
const speechRecognition = window.webkitSpeechRecognition;

function searchBarVoice(value){
  if(value){
    searchBox.style.display = 'none';
    blackBox.style.display = 'none';
    searchInput.value = '';
    micIcon.style.display = 'flex';
    const value = searchInput.value.toLowerCase().trim();
    articles.forEach(object => {
      const isVisible = (object.cityName.toLowerCase().includes(value) || object.className.toLowerCase().includes(value) || object.preface.toLowerCase().includes(value)) && (value.length > 0);
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
      searchInput.value = transcript;
      setTimeout(function() {
        searchBarVoice(transcript);
      }, 1000); 
    });
  }else{
    micIcon.addEventListener('click', function(){ 
    alert('您的瀏覽器不支援語音辨識功能，請切換瀏覽器')
  })
}

