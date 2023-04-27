// 在 profile.html 頁面的 JavaScript 中
const profileEmail = document.getElementById('profileEmail');
const profileName = document.getElementById('profileName');
const profilePhone = document.getElementById('profilePhone');

const modifyData = document.querySelector('.modifyData');
const modified = document.querySelector('.modified');
const cancel = document.querySelector('.cancel');

const profileUl = document.getElementById('profile')
// console.log(profileUl);
const profileInputList = profileUl.querySelectorAll('input')

const logoutBtn = document.querySelector('.logout');

const inputPhoto = document.getElementById('inputPhoto')

const line = document.querySelector('.line');
const personalData = document.querySelector('.personalData')

const collection = document.querySelector('.collectBtn')

const modifyBtn = document.querySelector('.modifyBtn');

const dataCollection = document.querySelector('.dataCollection')



//  profile display
personalData.addEventListener('click', ()=>{
  inputPhoto.style.display = 'flex';
  profileUl.style.display = 'flex';
  modifyBtn.style.display = 'flex';
  dataCollection.style.display = 'none';
})


collection.addEventListener('click', ()=>{
  inputPhoto.style.display = 'none';
  profileUl.style.display = 'none';
  modifyBtn.style.display = 'none';
  dataCollection.style.display = 'flex';
})

// 檢查使用者的登入狀態
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // 使用者已登入
    profileEmail.value = user.email;
    // 顯示照片
    if(user.photoURL){
    inputPhoto.style.background = `url(${user.photoURL}) center/cover no-repeat`;
    }else{
      inputPhoto.style.background = `url(https://frankyeah.github.io/Front-Enter/images/profile-user-img.svg) center/cover no-repeat`;  
    }

    const userId = user.uid; // 取得使用者的 uid
    
    // 更新資料
    firebase.database().ref('users/' + userId).update({
      name: profileName.value, 
      phone: profilePhone.value
      }).then(() => {
        console.log("名字和電話儲存成功");
      }).catch((error) => {
        console.error("名字和電話儲存失敗", error);
      });
      profileInputList.forEach((btn) => {btn.readOnly = true})
      
      console.log("使用者已登入:", user.uid, user.name, user.photoURL);
    } else {
      // 使用者未登入
      console.log("使用者未登入");
      profileInputList.forEach((btn)=>{btn.value = ''})
      window.location.href = 'index.html';
    }
  })

// edit profile

  profileName.addEventListener("focus", function() {
    this.style.outline = "none";
  });
  profilePhone.addEventListener("focus", function() {
    this.style.outline = "none";
  });

modifyData.addEventListener('click', function(){
    this.style.display = 'none';
    modified.style.display = 'flex'
    cancel.style.display = 'flex'
    profileName.readOnly = false;
    profilePhone.readOnly = false;
    profileName.style.border = "1px solid rgba(230, 230, 230, 0.7)"
    profilePhone.style.border = "1px solid rgba(230, 230, 230, 0.7)"
    profileName.addEventListener("focus", function() {
      this.style.outline = "";
    });
    profilePhone.addEventListener("focus", function() {
      this.style.outline = "";
    });
}) 

modified.addEventListener('click', function(){
    loginContainer.style.display = 'flex';
    loginBackground.style.display = 'none';
    remindBackground.style.display = 'flex';
    // 將資料存入 firebase
    const userId = firebase.auth().currentUser.uid; 
        firebase.database().ref('users/' + userId).update({
        name: profileName.value, 
        phone: profilePhone.value
  })
    remindBackground.style.display = 'flex';
    remindBoxContent.innerText = '資料修改成功';
    windowCloseOnly();
    this.style.display = 'none';
    modifyData.style.display = 'flex'
    cancel.style.display = 'none'
    profileInputList.forEach((btn) => {btn.readOnly = true});
    profileName.style.border = "none"
    profilePhone.style.border = "none"
    profileName.addEventListener("focus", function() {
      this.style.outline = "none";
    });
    profilePhone.addEventListener("focus", function() {
      this.style.outline = "none";
    });
})

cancel.addEventListener('click', function(){
    this.style.display = 'none';
    modified.style.display = 'none'
    modifyData.style.display = 'flex'
    profileInputList.forEach((btn) => {btn.readOnly = true});
    profileName.style.border = "none"
    profilePhone.style.border = "none"
    profileName.addEventListener("focus", function() {
      this.style.outline = "none";
    });
    profilePhone.addEventListener("focus", function() {
      this.style.outline = "none";
    });
})


// log out 

logoutBtn.addEventListener('click', function(){
    firebase.auth().signOut().then(() => {
        loginContainer.style.display = 'flex';
        loginBackground.style.display = 'none';
        remindBackground.style.display = 'flex';
        remindBoxContent.innerText = '登出成功';
        windowClose();
        console.log('使用者已登出');
    }).catch((error) => {
        // 登出失敗
        console.error('登出失敗:', error);
    });
});


// collection display

displayCollection();

function displayCollection(){
  const collectTemplate = document.querySelector('[data-collection]');
  const displayCollect = JSON.parse(localStorage.getItem('displayCollect'));

  displayCollect.forEach(object => {
    const displayBlock = collectTemplate.content.cloneNode(true).children[0];
    const collectionImg = displayBlock.querySelector('.collectionImg');
    const collectionName = displayBlock.querySelector('.collectionName');
    collectionImg.style.background = `url(${object.squareUrl}) 0% 0% / cover`;
    collectionName.textContent = object.className;
    dataCollection.append(displayBlock);
    object.element = displayBlock;
    // 依照星星 clicked 來顯示
    if(object.clicked === true){
      object.element.style.display = 'flex';
    }else{
      object.element.style.display = 'none';
    }
  });
}

  // 將 remove 後的資料傳回 article.html

  if (storedArticles) {
    articleObj = JSON.parse(storedArticles);
  }
  removeCollection()
  
  function removeCollection(){
      const removeBtnList = document.querySelectorAll('.removeBtn');
        articleObj.forEach((currentDisplay, index) => {
          const clicked = localStorage.getItem('clicked_' + index);          
          currentDisplay.clicked = clicked === 'true';
          const removeBtn = removeBtnList[index];
          removeBtn.addEventListener('click', (e) => {
            if (!currentDisplay.clicked) {
              e.target.parentNode.style.display = 'flex'
            } else { 
              e.target.parentNode.style.display = 'none'
            }
            currentDisplay.clicked = !currentDisplay.clicked;
            localStorage.setItem('clicked_' + index, currentDisplay.clicked); 
            localStorage.setItem('articles', JSON.stringify(articleObj)); 
          });
        });
      } 
