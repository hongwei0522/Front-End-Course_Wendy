
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
  
  
  // interactive effect page2-part2
  
  const blockContainer = document.querySelector('.navCenter');
  
  const blue = '#1ad8d3';
  const grey = '#737373';
  
  let articles = [];
  
  const url = '../json/front-enter-export.json';
  
//   // 全部顯示

  // page2-part3 search bar Text 
  
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
  
  
  
  // page2-part3 search bar audio to text
  
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