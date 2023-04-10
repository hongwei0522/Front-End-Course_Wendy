
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
  
  // 導回 index.html 與 article.html
  
  const logoBtn = document.querySelector('.logo');
  
  logoBtn.addEventListener('click', function(){
    window.location.href = 'index.html';
  });
  
  const searchButton = document.getElementById('search-button');

  searchButton.addEventListener('click', function() {
    window.location.href = 'article.html';
  });

  // Top Button
  
  const scrollBtn = document.getElementById("topwrap");
  
  scrollBtn.addEventListener("click", function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
  
  
// get id parameter on the URL

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


// 選取所有要改變內容的 DOM 元素
const navUpper = document.getElementById('nav-upper');
const navUpperBackground = navUpper.querySelector('.nav-upper-background') 
const className = navUpper.querySelector('.className') 
const mainTitle = document.getElementById('mainTitle');
const mainContent = document.getElementById('mainContentText').querySelector('p') 
const boxTable = document.getElementById('boxTable')
const city = boxTable.querySelector('.city') 
const classType = boxTable.querySelector('.classType') 
const teachWay = boxTable.querySelector('.teachType') 
const totalDay = boxTable.querySelector('.totalDay') 
const weekHour = boxTable.querySelector('.weekHour') 
const tech = boxTable.querySelector('.tech') 
const mail = boxTable.querySelector('.mail') 
const phone = boxTable.querySelector('.phone') 

// 獲得 articles
  let articles = [];
  const url = '../json/front-enter-export.json';
  
  fetch(url)
    .then(res => res.json())
    .then(res => res.article)
    .then(res => Object.values(res))
    .then(data => {
      articles = data.map(object => {
      return {cityName: object.city, squareUrl: object.squareUrl, classroomName: object.name, preface: object.preface, classType: object.classType, teachWay: object.teachWay, id: object.creatTime, topic: object.topic, content: object.content, rectangleUrl: object.rectangleUrl, totalDay: object.totalDay, weekHour: object.weekHour, technology: object.technology, mail: object.mail, phone: object.phone};  

      })
      // show content dynamically based on URL.
      const object = articles.find(article => article.id === parseInt(id)); // 將一個字符串轉換成整數

      navUpperBackground.setAttribute('src', object.rectangleUrl);
      className.textContent = object.classroomName;
      mainTitle.textContent = object.topic;
      mainContent.innerHTML = object.content;
      city.textContent = object.cityName;
      classType.textContent = object.classType;
      teachWay.textContent = object.teachWay;
      totalDay.textContent = `${object.totalDay}天`;
      weekHour.textContent = `${object.weekHour}小時`;
      tech.textContent = `${object.technology}小時`;
      mail.textContent = object.mail;
      phone.textContent = object.phone;
    })

  // left side clickable

  let leftImgs = document.querySelectorAll('.leftImg');
  const leftImgOne = document.querySelector('.leftImgOne');
  const leftImgTwo = document.querySelector('.leftImgTwo');
  const leftImgThree = document.querySelector('.leftImgThree');
  const leftImgFour = document.querySelector('.leftImgFour');
  const leftImgFive = document.querySelector('.leftImgFive');
  let popUpImgContainer = document.querySelector('.popUpImgContainer');
  let popUpImgBackgroud = document.querySelector('.popUpImgBackgroud');
  let triLeft = document.querySelector('.TriLeft');
  let popUpImg = document.querySelector('.popUpImg');
  let triRight = document.querySelector('.TriRight');

  
  var imageUrls = [
    'https://frankyeah.github.io/Front-Enter/images/2.jpg',
    'https://frankyeah.github.io/Front-Enter/images/13.jpg',
    'https://frankyeah.github.io/Front-Enter/images/15.jpg',
    'https://frankyeah.github.io/Front-Enter/images/7.jpg',
    'https://frankyeah.github.io/Front-Enter/images/AppWorksShool-rectangle.jpg'
  ]
  
  // 加入圖片
  const leftImages = [leftImgOne, leftImgTwo, leftImgThree, leftImgFour, leftImgFive];

  leftImages.forEach((leftImg, index) => {
    leftImg.style.background = `url('${imageUrls[index]}') 50% / cover no-repeat`;
  });
  

  // 按下圖片時會跳出大圖片
  leftImgs.forEach((leftImg, index) => {
    leftImg.addEventListener('click', function(){
      currentImageIndex = index;
      popUpImgContainer.style.display = 'flex';
      popUpImg.style.background = this.style.background;
    })
  })

  popUpImg.addEventListener('click', function(event){
    event.stopPropagation();
  });

  popUpImgBackgroud.addEventListener('click', function(){
    popUpImgContainer.style.display = 'none';
  })
  

 // 綁定點擊TriLeft事件
 let currentImageIndex = null;

triLeft.addEventListener('click', () => {
  event.stopPropagation();
  if (currentImageIndex !== null) {
    currentImageIndex--;
    if (currentImageIndex < 0) {
      currentImageIndex = imageUrls.length - 1;
    }
    popUpImg.style.background = `url('${imageUrls[currentImageIndex]}') 50% / cover no-repeat`;
  }
});

 // 綁定點擊TriRight事件
  triRight.addEventListener('click', function(event){
    event.stopPropagation();
    if (currentImageIndex !== null) {
      currentImageIndex++;
      if (currentImageIndex >= imageUrls.length) {
        currentImageIndex = 0;
      }
      popUpImg.style.background = `url('${imageUrls[currentImageIndex]}') 50% / cover no-repeat`;
    }
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
