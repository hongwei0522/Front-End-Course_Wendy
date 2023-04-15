//loading effect

let logo = document.getElementById('animation-logo');
let animation = document.getElementById('animation');

window.addEventListener('load', function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

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

// .test-go 測驗
  const testGo = document.querySelectorAll('.test-go')
  const testContainer = document.querySelector('.testContainer ');
  
  const testBackground = document.querySelector('.testBackground');
  const boxContainer = document.querySelectorAll('.boxContainer');

  const startBtn = document.querySelector('.startBtn');

  const testHeader = document.querySelector('.testHeader');
  const testIntro = document.querySelector('.testIntro');

  const testQuestion = document.querySelector('.testQuestion');
  const testNumber = document.querySelector('.testNumber');
  let ul = document.querySelector('ul');
  let answerEls = document.querySelectorAll(".answer");
  let oneText = document.getElementById("1-text");
  let twoText = document.getElementById("2-text");
  let threeText = document.getElementById("3-text");
  let fourText = document.getElementById("4-text");
  let fiveText = document.getElementById("5-text");
   
  let pieContainer = document.querySelector('.pieContainer');
  var pieChart = document.querySelector('.pieChart');
  let pieNum = document.querySelector('.pieNum');
  let urlButton = document.getElementById("newURL");

  let quizData = [
    {
      question: "選擇在哪座城市學習",
      questionNum: '1/5',
      1: "台北",
      2: "台中",
      3: "高雄",
      4: "各地",
      5: '不重要',
    },
    {
      question: "每月能撥出多少費用學習？",
      questionNum: '2/5',
      1: "3,000元以下",
      2: "6,000元內",
      3: "10,000元內",
      4: "10,0001元以上",
      5: "不重要"
    },
    {
      question: "每周能撥出多少時間學習？",
      questionNum: '3/5',
      1: "16小時以下",
      2: "30小時內",
      3: "45小時內",
      4: "46小時以上",
      5: "不重要"
    },
    {
      question: "對班制的需求是？",
      questionNum: '4/5',
      1: "大班制",
      2: "小班制",
      3: "一對一",
      4: "不重要",
      5: "",
    },
    {
    question: "喜歡什麼樣的教學方式？",
    questionNum: '5/5',
    1: "放養制",
    2: "手把手教制",
    3: "不重要",
    4: "",
    5: "",
  },
  ];

  
const url = '../json/front-enter-export.json';
let articles = {};

  fetch(url)
  .then(res => res.json())
  .then(res => res.article)
  .then(res => Object.values(res))
  .then(data => {
    articles = data.map(object => {
      return {
        className: object.name,
        cityName: object.city,
        fee: object.fee, 
        weekHour: object.weekHour, 
        classType: object.classType, 
        teachWay: object.teachWay,
        id: object.creatTime,
      };  
    });
    localStorage.setItem('articles', JSON.stringify(articles));
  });

  const storedArticles = localStorage.getItem('articles');
  if (storedArticles) {
    articles = JSON.parse(storedArticles);
  }
  console.log(articles);

  compareSchools(quizData, articles);
  let answerData = compareSchools(quizData, articles);
  console.log(answerData);
  
  
function compareSchools(quizData, articles) {
  let answerData = [];
  articles.forEach(school => {
    let answers = []; // 用來存放符合的選項的陣列
    // 比較 cityName
    quizData.forEach(question => {
      if (question.questionNum === '1/5') {
        let option = Object.keys(question).find(key => question[key] === school.cityName);
        answers.push(option);
      }
    });
    // 比較 fee
    quizData.forEach(question => {
      if (question.questionNum === '2/5') {
        let option;
        let fee = parseInt(school.fee);
        if (fee<= 3000) {
          option = "1";
        } else if (fee > 3000 && fee <= 6000) {
          option = "2";
        } else if (fee > 6000 && fee <= 10000) {
          option = "3";
        } else {
          option = "4";
        }
          answers.push(option);
        }
    });
    
    // 比較 weekHour
    quizData.forEach(question => {
      if (question.questionNum === '3/5') {
        let option;
        let weekHour = parseInt(school.weekHour);
        if (weekHour<= 16) {
          option = "1";
        } else if (weekHour > 16 && weekHour <= 30) {
          option = "2";
        } else if (weekHour > 30 && weekHour <= 45) {
          option = "3";
        } else {
          option = "4";
        }
          answers.push(option);
        }
});
    // 比較 class type
    quizData.forEach(question => {
      if (question.questionNum === '4/5') {
        let option = Object.keys(question).find(key => question[key] === school.classType);
        answers.push(option);
      }
    });
      // 比較 teach way
    quizData.forEach(question => {
      if (question.questionNum === '5/5') {
        let option = Object.keys(question).find(key => question[key] === school.teachWay);
        answers.push(option);
      }
    });
    // 將結果加入 answerData
    answerData.push({ className: school.className, options: answers });
  });
  return answerData;
}




  let pageNum = 0;
  console.log(pageNum)

  if(pageNum === 0){
    testGo.forEach((e)=>{
    e.addEventListener('click', function(){
      testContainer.style.display = 'flex';
      testHeader.style.display = 'flex';
      testIntro.style.display = 'flex';
      ul.style.display = 'none';
      pageNum = 1;
      console.log(pageNum);
    })
    
  })
  }

  testBackground.addEventListener('click', function(event){
    if (event.target === testBackground) {
      setTimeout(function() {
        testContainer.style.display = 'none';
        testQuestion.style.display = 'none';
        pieContainer.style.display = 'none';
        urlButton.style.display = 'none'
        pageNum = 0;
        console.log(pageNum);
      }, 0);
    }
  });
  

  

let currentQuiz = 0; //當前測驗
let score = 0;


function loadQuiz() {
  deselectAnswer();
  let currentQuizData = quizData[currentQuiz];
  testQuestion.innerText = currentQuizData.question;
  testNumber.innerText = currentQuizData.questionNum; 
  oneText.innerText = currentQuizData[1];
  twoText.innerText = currentQuizData[2];
  threeText.innerText = currentQuizData[3];
  fourText.innerText = currentQuizData[4];
  fiveText.innerText = currentQuizData[5];
}

function deselectAnswer() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

let answers = [];

// 檢查哪一個選項被選中
function getSelected() {
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answers.push(answerEl.id);
    }
  });
  return answers;
}

let percentage;
var beforeRotation; 
var afterRotation;
var lightBlue = '#1ad8d3';
var darkBlue = '#1cb5e0';
var beforeBackgroundColor = lightBlue;
var afterBackgroundColor = lightBlue;

pieChart.style.setProperty('--before-background-color', beforeBackgroundColor);
pieChart.style.setProperty('--after-background-color', afterBackgroundColor);

// 依照 percentage 設定旋轉度數 
  function rotateDeg(){
      if(percentage === 20){
        beforeRotation = 60;
        afterRotation = 186;
  }else if(percentage === 40){
        beforeRotation = 130;
        afterRotation = 180;
  }else if(percentage === 60){
        beforeRotation = 40;
        afterRotation = 0;
        pieChart.style.backgroundColor = lightBlue;
        beforeBackgroundColor = darkBlue;
        afterBackgroundColor = darkBlue;
  }else if(percentage === 80){
        beforeRotation = 40;
        afterRotation = -50;
        pieChart.style.backgroundColor = lightBlue;
        beforeBackgroundColor = darkBlue;
        afterBackgroundColor = darkBlue;
  }else if(percentage === 100){
        beforeRotation = 0;
        afterRotation = 0;
        beforeBackgroundColor = darkBlue;
        afterBackgroundColor = darkBlue;
}
  pieChart.style.setProperty('--before-rotation', beforeRotation + 'deg');
  pieChart.style.setProperty('--after-rotation', afterRotation + 'deg');
  pieChart.style.setProperty('--before-background-color', beforeBackgroundColor);
  pieChart.style.setProperty('--after-background-color', afterBackgroundColor);
}

// 隨機動畫
    let updatePieCount = 1;
    function updatePieNum() {
      if (updatePieCount <= 9) {
        const randomNum = Math.floor(Math.random() * 101);
        const randomClassNum = Math.floor(Math.random() * articles.length); 
        pieNum.textContent = randomNum + '%';
        urlButton.textContent = articles[randomClassNum].className;
        updatePieCount++;
        setTimeout(updatePieNum, 300);
      } else {
        pieNum.textContent = `${percentage}%`; 
      }
    }


startBtn.addEventListener('click', function(){
  testHeader.style.display = 'none';
  testIntro.style.display = 'none';
  this.style.display = 'none';
  testQuestion.style.display = 'flex';
  testNumber.style.display = 'flex';
  ul.style.display = 'flex';

  loadQuiz();

  answerEls.forEach(e=>e.addEventListener("click", (event) => {
    event.stopPropagation();
    let answers = getSelected(); 
    console.log(answers);
    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      let maxScore = 0;
      let matchedSchool = '';


      answerData.forEach((school) => {
        let score = 0;
        for (let i = 0; i < answers.length; i++) {
          if (answers[i] === school.options[i]) {
            score++;
          }
        }
          if (score > maxScore) {
          maxScore = score;
          matchedSchool = school.className;
          percentage = (score / answers.length) * 100;
        }
      });

      updatePieNum();
      setTimeout(updatePieNum, 0);

      testQuestion.innerText = '你有多適合下列學校呢？';
      testNumber.style.display = 'none';
      ul.style.display = 'none';
      pieContainer.style.display = 'flex'
      urlButton.style.display = 'flex'
      rotateDeg();
      urlButton.textContent = `${matchedSchool}`;
    }  
  }))

})



// 轉到 article.html

const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', function() {
  window.location.href = 'article.html';
});

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

// 

