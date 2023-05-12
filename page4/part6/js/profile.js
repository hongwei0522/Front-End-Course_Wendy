// 在 profile.html 頁面的 JavaScript 中

const profileHeader = document.getElementById('profileHeader')

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

const postManageBtn = document.querySelector('.postManageBtn')

const collectTemplate = document.querySelector('[data-collection]');

const postBtn = document.querySelector('.postBtn')
const postTitle = document.querySelector('.postTitle')

const postArea = document.querySelector('.postArea')


var lightBlue = '#1ad8d3';

postBtn.style.display = 'none';
// postTitle.style.display = 'none'
postArea.style.display = 'none';

//  profile display
personalData.addEventListener('click', ()=>{
  inputPhoto.style.display = 'flex';
  profileUl.style.display = 'flex';
  modifyBtn.style.display = 'flex';
  
  postBtn.style.display = 'none';
  // postTitle.style.display = 'none'
  profileHeader.textContent = '會員中心';
  profileHeader.style.backgroundColor = '#737373'
  dataCollection.style.display = 'none';
  postArea.style.display = 'none';
  
})


collection.addEventListener('click', ()=>{
  inputPhoto.style.display = 'none';
  profileUl.style.display = 'none';
  modifyBtn.style.display = 'none';
  
  postBtn.style.display = 'none';
  // postTitle.style.display = 'none';
  profileHeader.textContent = '會員中心';
  profileHeader.style.backgroundColor = '#737373'
  dataCollection.style.display = 'flex';
  postArea.style.display = 'none';
})


// 只有管理員才會出現管理文章按鈕

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//   const userId = user.uid;
//   firebase.database().ref('users/' + userId).on('value', (snapshot) => {
//     const userData = snapshot.val(); 
//     if(userData.isAdmin === true){
//       console.log('管理員')
//       postManageBtn.style.display = 'block'
//     }else{
//       console.log('非管理員')
//       postManageBtn.style.display = 'none'
//     }
//   })
//   }
// })



// blog post system

postManageBtn.addEventListener('click', ()=>{
  inputPhoto.style.display = 'none';
  profileUl.style.display = 'none';
  modifyBtn.style.display = 'none';
  dataCollection.style.display = 'none';
  collectTemplate.style.display = 'none';
  profileHeader.textContent = '後台文章管理'
  profileHeader.style.backgroundColor = lightBlue
  postSystem.style.display = 'flex';
  createPostArea.style.display = 'none'
  postBtn.style.display = 'flex';
  postArea.style.display = 'flex';
  delBtn.style.display = 'flex'
})


        

// 顯示所有已存在的文章

const managePostTemplate = document.getElementById('managePost')

      //  首列名稱列
      function firstCol(){
      const postBlock = managePostTemplate.content.cloneNode(true).children[0];
      postBlock.style.display = 'flex'
      const postHeader = postBlock.querySelector('.postHeader');
      const postPreface = postBlock.querySelector('.postPreface');
      const postTimeStamp = postBlock.querySelector('.postTimeStamp')

      const divs = postBlock.querySelectorAll('div')

      postHeader.textContent = '文章標題'
      postPreface.textContent = '文章引言'
      postTimeStamp.textContent = '文章建立時間'
      postBlock.style.backgroundColor = '#737373'

      divs.forEach(div => {
        div.style.color = '#fff';
      });
      postArea.append(postBlock);
    }
                


    // 顯示管理文章列表
    
    firebase.database().ref('front-enter-json/article/').on('value', (snapshot) => { 
      const articles = Object.values(snapshot.val());
      // 所有點選紀錄先清除
      articles.forEach((a)=>{
        a.postClicked = false
      })
      // 所有文章先清除
      postArea.innerHTML = '';  
      firstCol();
      for (let i = 0; i < articles.length; i++) {
        const object = articles[i];
        const postBlock = managePostTemplate.content.cloneNode(true).children[0]; // postUl
        postBlock.style.display = 'flex'
        const postHeader = postBlock.querySelector('.postHeader');
        const postPreface = postBlock.querySelector('.postPreface');
        const postTimeStamp = postBlock.querySelector('.postTimeStamp')
        postHeader.textContent = object.name;
        postPreface.textContent = object.preface
        postBlock.style.color = '#5f5f5f'
        const date = new Date(object.creatTime);
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false,
        };
        const formattedDate = date.toLocaleString('en-US', options);
        const trimmedDate = formattedDate.replace(' GMT+0800 (台北標準時間)', '\n');
        postTimeStamp.textContent = trimmedDate;
        postArea.append(postBlock);
      } 
      const Ulist = postArea.querySelectorAll('.postUl') 

      let clickedPostUl = null; 

      // 設定 postClciked 及顏色
      Ulist.forEach((postUl) => {
        postUl.addEventListener('click', (event) => {
          if (clickedPostUl !== null) {
            clickedPostUl.style.backgroundColor = 'white';
            const index = Array.from(Ulist).indexOf(clickedPostUl);
            const article = articles[index-1];
            Object.assign(article, { postClicked: false });
          }
          clickedPostUl = event.target.parentNode;
          clickedPostUl.style.backgroundColor = lightBlue;
          const index = Array.from(Ulist).indexOf(clickedPostUl);
          const article = articles[index-1]; 
          Object.assign(article, { postClicked: true });
          // console.log(article.name)
          // console.log(article.postClicked)
          // console.log(articles)
          // postClicked 存到 firebase
          firebase.database().ref('front-enter-json/article/').set(articles)
        })
      })

    
});

  // remind Box
  let remindPostContent = '儲存文章成功!'

  function postRemind(){
    loginContainer.style.display = 'flex';
    loginBackground.style.display = 'none';
    remindBackground.querySelector('.content').textContent = remindPostContent
    remindBackground.querySelector('.header').style.display = 'none';
    remindBackground.querySelector('.content').style.fontWeight = '600'
    remindBox.style.justifyContent = 'center'


    buttonOK.addEventListener('click', function(event){
      if (event.target === buttonOK) {
        loginContainer.style.display = 'none';
        // 自動返回上一頁
        setTimeout(() => {
          profileHeader.style.backgroundColor = lightBlue
          postSystem.style.display = 'flex';
          postBtn.style.display = 'flex';
          postArea.style.display = 'flex';
          postBtnList.style.display = 'none';
          createPostPage.style.display = 'none';
          delBtn.style.display = 'flex'
        }, 10);          
      }
    })

  }


// create Post, edit post, delete post 

  const createBtn = document.querySelector('.createBtn')
  const changeBtn = document.querySelector('.changeBtn')
  const delBtn = document.querySelector('.delBtn')
  const postSystem = document.querySelector('.postSystem')
  const createPostArea = document.querySelector('.createPost')
  const cName = document.getElementById('cName');
  const cCity = document.getElementById('cCity');
  const cSkill = document.getElementById('cSkill');
  const cTech = document.getElementById('cTech');
  const cFee = document.getElementById('cFee');
  const cTotalDay = document.getElementById('cTotalDay');
  const cWeekHour = document.getElementById('cWeekHour');
  const cClassType = document.getElementById('cClassType');
  const cTeachWay = document.getElementById('cTeachWay');
  const cTeacherNum = document.getElementById('cTeacherNum');
  const cFoundYear = document.getElementById('cFoundYear');
  const cTopic = document.getElementById('cTopic');
  const cPreface = document.getElementById('cPreface');
  const cContent = document.getElementById('cContent');
  const cPhone = document.getElementById('cPhone');
  const cMail = document.getElementById('cMail');
  const cRecUrl = document.getElementById('cRecUrl');
  const cSqUrl = document.getElementById('cSqUrl');
  const saveBtn = document.querySelector('.saveBtn')
  const returnBtn = document.querySelector('.returnBtn')


  const postBtnList = document.querySelector('.postBtnList')
  const createPostPage = document.getElementById('createPostPage')

  createPostArea.style.display = 'none'


  // 創造新文章按鈕　

  createBtn.addEventListener('click', ()=>{
    postSystem.style.display = 'none'
    createPostArea.style.display = 'flex'
    postBtnList.style.display = 'flex';
    createPostPage.style.display = 'flex'
    delBtn.style.display = 'none'
    saveBtn.textContent = '新增文章'

    cName.value = ''
    cCity.value = ''
    cSkill.value = ''
    cTech.value = ''
    cFee.value = ''   
    cTotalDay.value = ''
    cWeekHour.value = ''
    cClassType.value = ''
    cTeachWay.value = ''
    cTeacherNum.value = ''
    cFoundYear.value = ''
    cTopic.value = ''
    cPreface.value = ''
    cContent.value = ''
    cPhone.value = ''
    cMail.value = ''
    cSqUrl.value = ''
    cRecUrl.value = ''

      // 移除 saveBtn 監聽器
    saveBtn.removeEventListener('click', onSaveBtnClick);

    // 綁定 createBtn 監聽器，避免重複存取
      saveBtn.addEventListener('click', onSaveBtnClick);
    })

    function onSaveBtnClick() {
      saveBtn.disabled = true;

      firebase.database().ref('front-enter-json/article').once('value')
      .then(snapshot => {

      const articles = Object.values(snapshot.val());
      // 清除 postclicked
      articles.forEach((a)=>{
        a.postClicked = false
      })

      const articleCount = snapshot.numChildren();
      const newArticleName = articleCount.toString();
      const timestamp = Date.now();  

       
        firebase.database().ref(`front-enter-json/article/${newArticleName}`).set({
          name: cName.value,
          city: cCity.value,
          skill: cSkill.value,
          technology: cTech.value,
          fee: cFee.value,   
          totalDay: cTotalDay.value,
          weekHour: cWeekHour.value,
          classType: cClassType.value,
          teachWay: cTeachWay.value,
          teacherNum: cTeacherNum.value,
          foundYear: cFoundYear.value,
          topic: cTopic.value,
          preface: cPreface.value,
          content: cContent.value,
          phone: cPhone.value,
          mail: cMail.value,
          squareUrl: cSqUrl.value,
          rectangleUrl: cRecUrl.value,          
          creatTime: timestamp
        });
      }).then(() => {
        saveBtn.disabled = false;
        
      }).then(()=>{
        remindPostContent = '新增文章成功'
        postRemind() 
        buttonOK.textContent = 'OK'
        noButton.style.display = 'none'

      }); 

    }


  // 返回上頁
  returnBtn.addEventListener('click', ()=>{
    profileHeader.style.backgroundColor = lightBlue
    postSystem.style.display = 'flex';
    postBtn.style.display = 'flex';
    postArea.style.display = 'flex';
    postBtnList.style.display = 'none';
    createPostPage.style.display = 'none';
    delBtn.style.display = 'flex'
  })


  // 編輯文章按鈕
  changeBtn.addEventListener('click', ()=>{
    postSystem.style.display = 'none'
    createPostArea.style.display = 'flex'
    postBtnList.style.display = 'flex';
    createPostPage.style.display = 'flex'
    delBtn.style.display = 'flex'
    saveBtn.textContent = '儲存修改'

    firebase.database().ref('front-enter-json/article/').on('value', (snapshot) => { 
      const articles = snapshot.val();
      for (const key in articles) {
        if (Object.hasOwnProperty.call(articles, key)) {
          const article = articles[key]; 
          if (article.postClicked === true) {
            console.log(key); // 取得 article 的 key 值
            cName.value = article.name;
            cCity.value = article.city;
            cSkill.value = article.skill;
            cTech.value = article.technology;
            cFee.value = article.fee;
            cTotalDay.value = article.totalDay;
            cWeekHour.value = article.weekHour;
            cClassType.value = article.classType;
            cTeachWay.value = article.teachWay;
            cTeacherNum.value = article.teacherNum;
            cFoundYear.value = article.foundYear;
            cTopic.value = article.topic;
            cPreface.value = article.preface;
            cContent.value = article.content.replace(/<br>/g, '');
            cPhone.value = article.phone;
            cMail.value = article.mail;
            cSqUrl.value = article.squareUrl;
            cRecUrl.value = article.rectangleUrl;

          saveBtn.addEventListener('click', function() {
            firebase.database().ref('front-enter-json/article/'+ key).update({
              name: cName.value,
              city: cCity.value,
              skill: cSkill.value,
              technology: cTech.value,
              fee: cFee.value,
              totalDay: cTotalDay.value,
              weekHour: cWeekHour.value,
              classType: cClassType.value,
              teachWay: cTeachWay.value,
              teacherNum: cTeacherNum.value,
              foundYear: cFoundYear.value,
              topic: cTopic.value,
              preface: cPreface.value,
              content: cContent.value,
              phone: cPhone.value,
              mail: cMail.value,
              squareUrl: cSqUrl.value,
              rectangleUrl: cRecUrl.value
             })
              // 跳出儲存確認框
              remindPostContent = '儲存文章成功'
               postRemind()
               buttonOK.textContent = 'ok'
               noButton.style.display = 'none'
            })

          // 刪除文章
          delBtn.addEventListener('click', () => {
            remindPostContent = '確定要刪除文章？'
            postRemind()
            buttonOK.textContent = '確認刪除'
            if (!remindBox.querySelector('.noButton')) { // 判斷 remindBox 是否已經有 noButton
              const noButton = document.createElement('button');
              noButton.textContent = '取消';
              noButton.classList.add('okButton'); 
              noButton.classList.add('noButton'); 
              remindBox.appendChild(noButton);
          
              noButton.addEventListener('click', function(event){
                if (event.target === noButton) {
                  loginContainer.style.display = 'none';          
                }
              });
            }
            // 警告欄位，點選 YES
            buttonOK.addEventListener('click', function(event){
              if (event.target === buttonOK) {
                loginContainer.style.display = 'none';      
                firebase.database().ref('front-enter-json/article/'+ key).remove();  
                // 動畫及return  
                setTimeout(() => {
                  profileHeader.style.backgroundColor = lightBlue
                  postSystem.style.display = 'flex';
                  postBtn.style.display = 'flex';
                  postArea.style.display = 'flex';
                  postBtnList.style.display = 'none';
                  createPostPage.style.display = 'none';
                  delBtn.style.display = 'flex'
                }, 10);

              }
            });

          }) // 刪除文章結束


          }
        }
      }
    })
  })
            



  // 開另一個 firebase 專案，開啟 firebase storage 來測試看看圖片上傳的功能
  // 只有管理者才有貼文管理按鈕
  


// 檢查使用者的登入狀態
firebase.auth().onAuthStateChanged(function(user) {
  const userId = user.uid; 
    if (user) {
    // 使用者已登入
    firebase.database().ref('users/' + userId).on('value', (snapshot) => {
    const userData = snapshot.val(); 
    profileEmail.value = user.email;
    profileName.value = userData.name;
    profilePhone.value = userData.phone;
    // 顯示照片
    if(user.photoURL){
    inputPhoto.style.background = `url(${user.photoURL}) center/cover no-repeat`;
    }else{
      inputPhoto.style.background = `url(https://frankyeah.github.io/Front-Enter/images/profile-user-img.svg) center/cover no-repeat`;  
    }
    firebase.database().ref('users/' + userId).update({
      name: profileName.value, 
      phone: profilePhone.value
      }).then(() => {
        console.log("名字和電話儲存成功");
      }).catch((error) => {
        console.error("名字和電話儲存失敗", error);
      });
      profileInputList.forEach((btn) => {btn.readOnly = true})
    
      console.log("使用者已登入:", user.uid);
  })
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
        window.location.href = 'index.html';
    }).catch((error) => {
        // 登出失敗
        console.error('登出失敗:', error);
    });
});



firebase.auth().onAuthStateChanged(function(user) {
  if (user) { 
    const userId = user.uid;

    firebase.database().ref('users/' + userId + '/user-article/').on('value', (snapshot) => { 
      const displayCollect = snapshot.val(); 
      dataCollection.innerHTML = '';  // 先清除

      // 顯示文章
      for (let i = 0; i < displayCollect.length; i++) {
        const object = displayCollect[i];
        const displayBlock = collectTemplate.content.cloneNode(true).children[0];

        displayBlock.style.display = object.starClicked ? 'flex' : 'none';
        const collectionImg = displayBlock.querySelector('.collectionImg');
        const collectionName = displayBlock.querySelector('.collectionName');
        collectionImg.style.background = `url(${object.squareUrl}) 0% 0% / cover`;
        collectionName.textContent = object.name;
        dataCollection.append(displayBlock);
        // link
        collectLink(displayCollect)
        // 移除蒐藏
        const removeBtn = displayBlock.querySelector('.removeBtn');

        removeBtn.addEventListener('click', (e) => {
          e.target.parentNode.remove();
          object.starClicked = !object.starClicked;

          console.log(object.starClicked);

          firebase.database().ref('users/' + userId + '/user-article/' + i + '/starClicked/' ).set(object.starClicked);
          
        });
      }
    });
  }
});



// take id parameter on the URL and link to content.html

function collectLink(displayCollect){
  const collectionImg = document.querySelectorAll('.collectionImg ');
  collectionImg.forEach(Img => {
    Img.addEventListener( 'click', () => {
      const linkIndex = Array.from(collectionImg).indexOf(Img);
      const linkId = displayCollect[linkIndex].creatTime;
      console.log(linkId);
      const url = `content.html?id=${linkId}`;
      console.log(url);
      window.location.href = url;
    }
    )
  }
  )
}

  


blackBox.onclick = () => {
  searchBox.style.display = 'none';
  blackBox.style.display = 'none';
};
      
