// 在 profile.html 頁面的 JavaScript 中
const profileEmail = document.getElementById('profileEmail');
const profileName = document.getElementById('profileName');
const profilePhone = document.getElementById('profilePhone');

const modifyData = document.querySelector('.modifyData');
const modified = document.querySelector('.modified');
const cancel = document.querySelector('.cancel');

const profileUl = document.getElementById('profile')
const profileInputList = profileUl.querySelectorAll('input')
const logoutBtn = document.querySelector('.logout');

const inputPhoto = document.getElementById('inputPhoto')

// console.log(modifyBtnList);

// 檢查使用者的登入狀態
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // 使用者已登入
    profileEmail.value = user.email;
    inputPhoto.style.background = `url(${user.photoURL}) center/cover no-repeat`;
    const userId = user.uid; // 取得使用者的 uid
    const userRef = firebase.database().ref('users/' + userId); // 建立資料庫參考
    userRef.once('value').then(function(snapshot) {
      const userData = snapshot.val(); // 從快照中取得資料
      if (userData) {

        profileName.value = userData.name; // 顯示使用者的 name
        profilePhone.value = userData.phone; // 顯示使用者的 phone
      }}).catch(function(error) {
        console.error("讀取使用者資料時發生錯誤: ", error);
      });

    profileInputList.forEach((btn) => {btn.readOnly = true})
    console.log("使用者已登入:", user.uid, user.name, user.photoURL);
  } else {
    // 使用者未登入
    console.log("使用者未登入");
    profileInputList.forEach((btn)=>{btn.value = ''})
    window.location.href = 'index.html';
  }
});

// edit profile



modifyData.addEventListener('click', function(){
    this.style.display = 'none';
    modified.style.display = 'flex'
    cancel.style.display = 'flex'
    profileName.readOnly = false;
    profilePhone.readOnly = false;
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
})

cancel.addEventListener('click', function(){
    this.style.display = 'none';
    modified.style.display = 'none'
    modifyData.style.display = 'flex'
    profileInputList.forEach((btn) => {btn.readOnly = true});
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