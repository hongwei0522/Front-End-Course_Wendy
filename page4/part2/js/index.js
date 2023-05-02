
// test go square

const testGoSquare = document.querySelector('.test-go-square')

testGoSquare.addEventListener('click', function(){
    currentQuiz = 0;
    testContainer.style.display = 'flex';
    testHeader.style.display = 'flex';
    testIntro.style.display = 'flex';
    startBtn.style.display = 'flex';
    ul.style.display = 'none';
    console.log(currentQuiz);
  })


// search-button
const searchInput = document.querySelector('[data-search]'); 

  searchInput.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      window.location.href = 'article.html';
      }
  })
  
  searchGlass.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = 'article.html';
  })
  
  

