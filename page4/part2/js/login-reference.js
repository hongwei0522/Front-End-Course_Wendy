// create log in layout
headerP3.addEventListener('click', function(){
    // judge if log in or not
    if(userLogin){
        if(userLogin.email == 'aaa24295234@gmail.com'){
            window.location = 'profile.html';
        }else{
            window.location = 'profile.html';
        }
    }else{
        app.log.loginFullDiv();
        app.log.loginDivWhite();
        app.createElement('div', 'login-div-logo', '', 'loginDivWhite', '', '');
        app.createElement('div', 'login-input-div', 'loginInputDiv', 'loginDivWhite', '', '');
        app.log.loginInputMail();
        app.log.loginInputCode();
        app.createElement('p', 'login-forget-code', '', 'loginDivWhite', '忘記密碼？', app.log.judgeForgetCode);
        app.createElement('div', 'register-login-div', 'registerLoginDiv', 'loginDivWhite', '', '');
        app.createElement('p', 'register-button-p', 'registerButtonP', 'registerLoginDiv', '註冊', app.log.createAccount);
        app.createElement('p', 'login-button-p', 'loginButtonP', 'registerLoginDiv', '登入', app.log.loginHere);
        app.createElement('p', 'gmail-login-button', 'gmailLoginButton', 'loginDivWhite', 'Log In With Gmail', app.log.letGmailLogin);
    }
}
);

app.log.loginFullDiv = function(){
let newElement = document.createElement('div');
newElement.className = 'login-full-div';
newElement.id = 'loginFullDiv';
document.body.appendChild(newElement);
newElement.onclick = function(){
    let child=document.getElementById('loginFullDiv');
    document.body.removeChild(child);
}
}

app.log.loginDivWhite = function(){
let newElement = document.createElement('div');
newElement.className = 'login-div-white';
newElement.id = 'loginDivWhite';
document.getElementById('loginFullDiv').appendChild(newElement);
newElement.onclick = function(event){
    event.stopPropagation();
}
}

app.log.loginInputMail = function(){
let newElement = document.createElement('input');
newElement.id = 'loginInputMail';
newElement.className = 'login-input-mail';
newElement.placeholder = 'Email';
document.getElementById('loginInputDiv').appendChild(newElement);
}

app.log.loginInputCode = function(){
let newElement = document.createElement('input');
newElement.id = 'loginInputCode';
newElement.className = 'login-input-code';
newElement.placeholder = '******';
newElement.type = 'password';
document.getElementById('loginInputDiv').appendChild(newElement);
}

// create account
app.log.createAccount = function(){
let createMail = document.getElementById('loginInputMail').value;
let createCode = document.getElementById('loginInputCode').value;
firebase.auth().createUserWithEmailAndPassword(createMail, createCode).then(detectLogin()).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMsg = error.message;
    alertBigBox.style.display = 'flex';
    alertWord.innerHTML = '電子郵件已註冊，或尚未確實填寫。';
  });      
}

// log in
app.log.loginHere = function(){
let userLoginMail = document.getElementById('loginInputMail').value;
let userLoginCode = document.getElementById('loginInputCode').value;
firebase.auth().signInWithEmailAndPassword(userLoginMail, userLoginCode).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    alertBigBox.style.display = 'flex';
    alertWord.innerHTML = '郵件或密碼輸入錯誤';
})
setTimeout(reloadLogin,5000)
}

function reloadLogin(){
alertBigBox.style.display = 'flex';
alertWord.innerHTML = '重新載入';
window.location.reload();
}

// detect user log in
let userLogin;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {userLogin = user;
        if(userLogin.emailVerified == true){
        // input data
        storeDataToFirebase();
    }else{
        firebase.auth().signOut().then(function() {
        }, function(error) {
        })
}
} else { // 登入成功，將會員兩字換成登入
    userLogin = null;
    headerP3.textContent ='登入';
    headerP3.style.cursor = 'pointer';
    headerP3.addEventListener('mouseenter', changeColor);
    headerP3.addEventListener('mouseleave', changeColorAgain)
    function changeColor(){
        headerP3.style.color = 'rgb(26, 216, 211)';
}
function changeColorAgain(){
    headerP3.style.color = 'rgb(128, 128, 128)';
}
}
});

// detect log in , write data to database
function storeDataToFirebase(){
// change user icon
if(userLogin.photoURL){
    headerP3.style.background = "url('" + userLogin.photoURL + "')"; // 登入後，更改頭貼
    headerP3.style.backgroundPosition= 'center';
    headerP3.style.backgroundSize= 'cover';
    headerP3.style.backgroundRepeat= 'no-repeat';
    headerP3.style.borderRadius= '50%';
    headerP3.style.height= '40px';
    headerP3.style.width= '40px';
}else{
    headerP3.textContent = '會員';
} // 如果沒有照片，則將登入顯示為"會員"

// judge user data have this people
let getAllMemberData = database.ref('member');

let dataExist;

getAllMemberData.orderByChild('mail').equalTo(userLogin.email).on('child_added', function(snapshot) {
    dataExist = snapshot.val();
});  

setTimeout(function(){
    if(dataExist == undefined){
        let newPostKey = firebase.database().ref().child('member').push().key;
        firebase.database().ref('member/'+newPostKey).set({
            name: userLogin.displayName,
            mail : userLogin.email,
            phone : userLogin.phoneNumber,
            photoUrl : userLogin.photoURL,
            creatTime: new Date().getTime(),
            uid : newPostKey
        });
    }else{
    }
} ,5000);
}

// create an account, detect login and send a verify mail
function detectLogin(){
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      userLogin = user;
      user.sendEmailVerification().then(function() {
        alertBigBox.style.display = 'flex';
        alertWord.innerHTML = '驗證信已寄出';
      }, function(error) {
      });
    }else{
      userLogin = null;
    }      
  });
}

// log out
function logoutHere(){
firebase.auth().signOut().then(function() {
    window.location.reload();
}, function(error) {
})
}

// forget code
app.log.judgeForgetCode = function(){
let userLoginMail = document.getElementById('loginInputMail').value;
if(userLoginMail == ''){
    alertBigBox.style.display = 'flex';
    alertWord.innerHTML = '請輸入電子郵件後，再次點選「忘記密碼」';
}else{
    firebase.auth().sendPasswordResetEmail(userLoginMail).then(function() {
        // Email sent.
        alertBigBox.style.display = 'flex';
        alertWord.innerHTML = '更改密碼 Email 已發送';
        userLoginMail = '';
      }, function(error) {
        // An error happened.
      });
}
}

// google log in
let provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().languageCode = 'pt';
app.log.letGmailLogin = function(){
firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    setTimeout(reloadLogin,1000)
}).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
});
}



  // Set the configuration for your app
  // TODO: Replace with your project's config object
  let config = {
    apiKey: 'AIzaSyAwCTQFoTPQ5C6rugWB1S7UhkCoeApeQRw',
    authDomain: 'front-enter.firebaseapp.com',
    databaseURL: 'https://front-enter.firebaseio.com',
    projectId: 'front-enter',
    storageBucket: 'front-enter.appspot.com',
    messagingSenderId: '1043952840433'
  };

  firebase.initializeApp(config);
  let database = firebase.database();
  let storage = firebase.storage();
  let storageRef = storage.ref();


