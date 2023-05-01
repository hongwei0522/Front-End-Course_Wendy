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


  
// keyvisual rotate
let storePhoto = [];
let icount=1;  
let keyvisualImg;
let keyvisualImg_len;
app.rotateKeyvisual = (keyBlock, keyNone1, keyNone2) => {
    app.get(keyBlock).style.display  =  'block';
    app.get(keyNone1).style.display  =  'none';
    app.get(keyNone2).style.display  =  'none';
    app.get(keyBlock).style.animation = 'opacityOut 5s ease 0s 1 alternate both';
    app.get(keyBlock).style.backgroundPositionX = 'center';
}
database.ref('article').orderByChild('skill').on('child_added', (snapshot) => {
    storePhoto.push(snapshot.val().rectangleUrl);
});
setInterval('app.article.changeKevisual()',5000);
app.article.changeKevisual = () => {
    keyvisualImg = [storePhoto[0],storePhoto[1],storePhoto[2]];
    keyvisualImg_len = keyvisualImg.length; 
    app.get('#keyvisual0').style.background = "url('" + keyvisualImg[0] + "') 50% / cover no-repeat";    
    app.get('#keyvisual0').style.backgroundPositionY = 'center';
    app.get('#keyvisual1').style.background = "url('" + keyvisualImg[1] + "') 50% / cover no-repeat";    
    app.get('#keyvisual1').style.backgroundPositionY = 'center';
    app.get('#keyvisual2').style.background = "url('" + keyvisualImg[2] + "') 50% / cover no-repeat";    
    app.get('#keyvisual2').style.backgroundPositionY = 'center';
    if(icount == 0){
        app.rotateKeyvisual('#keyvisual0', '#keyvisual1', '#keyvisual2');
    }else if(icount == 1){
        app.rotateKeyvisual('#keyvisual1', '#keyvisual0', '#keyvisual2');
    }else if(icount == 2){
        app.rotateKeyvisual('#keyvisual2', '#keyvisual0', '#keyvisual1');
    }
    icount++;
    if(icount>=keyvisualImg_len) { icount=0;}
}

// get firebase json to deal with search
let x = 0;
let getAllData = database.ref('article');
let allData;
let articleId = (new URL(document.location)).searchParams.get('id');  // get url id
let isBuild = 'false';
app.search.judgeId = (keyWord, allKey) => {
    app.get('#mainId').innerHTML = '';
    isBuild = 'true';
    getAllData.orderByChild(keyWord).equalTo(allKey).on('child_added', (snapshot) => {
        let data;
        data = snapshot.val();  createLayout(data);
    });  
    return
}

getAllData.orderByChild('skill').on('child_added', (snapshot) => {
    allData = snapshot.val(); 
    if(isBuild === 'false'){
        if(allData.name.match(articleId) != null){
            app.search.judgeId('name', allData.name);
        }else if(allData.city.match(articleId) != null){
            app.search.judgeId('city', allData.city);
        }else if(allData.teachWay.match(articleId) != null){
            app.search.judgeId('teachWay', allData.teachWay);
        }else if(allData.classType.match(articleId) != null){
            app.search.judgeId('classType', allData.classType);
        }else if(allData.skill.match(articleId) != null){
            app.search.judgeId('skill', allData.skill);
        }else{
            createLayout(snapshot.val());
        }
    }
});

// get firebase json to deal with search
 createLayout = (data) =>{
    app.createElement('article', '', 'article' + x, 'mainId', '', '');
    if(userLogin){
        app.article.collectionSchool(data);
    }
    app.createElement('div', '', 'locationDiv' + x, 'article' + x , '', '');
    app.createElement('div', 'location-img-born', 'locationImgBorn' + x, 'locationDiv' + x , '', '');
    app.createElement('a', '', 'aLocation' + x, 'locationDiv' + x , '', '');
    app.article.createPLocation(data);
    app.article.createContentA(data);
    app.createElement('div', 'article-div', 'imgDiv' + x, 'contentA' + x , '', '');
    app.article.createArticleImg(data);
    app.createElement('p', 'article-head', '', 'contentA' + x , data.name, '');
    app.article.createArticlePreface(data);
    app.createElement('div', 'read-more-out', 'readMoreOut' + x, 'contentA' + x , '', '');
    app.createElement('div', 'read-more-word', 'readMoreWord', 'readMoreOut' + x , 'read more', '');
    app.createElement('div', 'read-more-div', 'readMoreDiv', 'readMoreOut' + x , '', '');
    app.createElement('div', 'tag-line', '', 'article' + x , '', '');
    x ++;
}

// display collected
if(window.localStorage.getItem(`collection`)){
    let displayMyCollection;
    displayMyCollection = JSON.parse(window.localStorage.getItem(`collection`));
    getAllData.orderByChild('skill').on('child_added', (snapshot) => {
        for(let i=0 ; i<displayMyCollection.length ; i++){
            if(displayMyCollection[i].name == snapshot.val().name){
                document.getElementById('collectionSchool' + snapshot.val().creatTime).style.background = 'url(../Front-Enter/images/star-background.svg)';
                document.getElementById('collectionSchool' + snapshot.val().creatTime).style.backgroundSize = 'cover';
            }
        }    
    })
}

// local storage collection 
let collection = [{
    name: ''
  }]

app.article.collectionSchool = (data) => {
    let newElement = document.createElement('div');
    newElement.id = 'collectionSchool' + data.creatTime;
    newElement.className = 'collection-school';
    document.getElementById('article' + x).appendChild(newElement);
    newElement.onclick = () => {
        // after collect，get name & url from createtime
        getAllData.orderByChild('creatTime').equalTo(Number(newElement.id.replace(/[^0-9]+/g, ''))).on('child_added', (snapshot) => {
            // if localstorage empty
            if(!window.localStorage.getItem(`collection`)){
                newElement.style.background = 'url(../Front-Enter/images/star-background.svg)';
                newElement.style.backgroundSize = 'cover';
                let collectionData = [{name:snapshot.val().name, 
                                       photo:snapshot.val().rectangleUrl,
                                       creatTime:snapshot.val().creatTime
                                    }];                                              
                localStorage.setItem(`collection`, JSON.stringify(collectionData)); 
            }else{
                let myStorageCollect = {name:snapshot.val().name,
                                        photo:snapshot.val().rectangleUrl,
                                        creatTime:snapshot.val().creatTime
                                        };                                       
                    let getLocal;
                    getLocal = JSON.parse(window.localStorage.getItem(`collection`));
                    for(let i=0 ; i<getLocal.length ; i++){
                        if(getLocal[i].name == snapshot.val().name){
                            newElement.style.background = 'url(../Front-Enter/images/star-border.svg)';
                            newElement.style.backgroundSize = 'cover';
                            getLocal.splice(i, 1);
                            localStorage.setItem(`collection`, JSON.stringify(getLocal)); 
                            return
                        }else{
                            newElement.style.background = 'url(../Front-Enter/images/star-background.svg)';
                            newElement.style.backgroundSize = 'cover';
                        }
                    }
                    getLocal.push(myStorageCollect);
                    localStorage.setItem(`collection`, JSON.stringify(getLocal)); 
                }
        });    
    }
}

app.article.createPLocation = (data) => {
    let newElement = document.createElement('p');
    newElement.className = 'article-location';
    newElement.textContent = data.city;
    document.getElementById('aLocation' + x).appendChild(newElement);
    newElement.onclick = (e) => {
        app.article.clearContent(newElement.textContent);
    }
}

// clear layout
app.article.clearContent = (city) => {
    app.get('#mainId').innerHTML = '';
    getAllData.orderByChild('city').equalTo(city).on('child_added', (snapshot) => {
        data = snapshot.val();
        createLayout(data);
    });    
}

app.article.createContentA = (data) => {
    let newElement = document.createElement('a');
    newElement.id = 'contentA' + x; 
    newElement.setAttribute('href', '/Front-Enter/content.html?id=' + data.creatTime);
    document.getElementById('article' + x).appendChild(newElement);
}

app.article.createArticleImg = (data) => {
    let newElement = document.createElement('img');
    newElement.className = 'article-img';
    newElement.src = data.squareUrl;
    document.getElementById('imgDiv' + x).appendChild(newElement);
}

app.article.createArticlePreface = (data) => {
    let newElement = document.createElement('p');
    newElement.innerHTML = data.preface;
    document.getElementById('contentA' + x).appendChild(newElement);
}

// all tag
app.tag = (all, smallClass, letGo, oneByOne) => {
    app.get('#getAllArticle').style.color = all;
    app.get('#smallClass').style.color = smallClass;
    app.get('#letItGo').style.color = letGo;
    app.get('#oneByOne').style.color = oneByOne;
    app.get('#mainId').innerHTML = '';
}

app.get('#getAllArticle').onclick = () => {
    app.tag('rgb(26, 216, 211)', 'rgb(128, 128, 128)','rgb(128, 128, 128)', 'rgb(128, 128, 128)');
    getAllData.orderByChild('skill').on('child_added', (snapshot) => {
        data = snapshot.val();
        createLayout(data);
        });
}

app.get('#smallClass').onclick = () => {
    app.tag('rgb(128, 128, 128)', 'rgb(26, 216, 211)','rgb(128, 128, 128)', 'rgb(128, 128, 128)');
    getAllData.orderByChild('classType').equalTo('小班制').on('child_added', (snapshot) => {
        data = snapshot.val();
        createLayout(data);
    });   
}

app.get('#letItGo').onclick = () => {
    app.tag('rgb(128, 128, 128)', 'rgb(128, 128, 128)', 'rgb(26, 216, 211)','rgb(128, 128, 128)');
    getAllData.orderByChild('teachWay').equalTo('放養制').on('child_added', (snapshot) => {
        data = snapshot.val();
        createLayout(data);
    });   
}

app.get('#oneByOne').onclick = () => {
    app.tag('rgb(128, 128, 128)', 'rgb(128, 128, 128)','rgb(128, 128, 128)', 'rgb(26, 216, 211)');
    getAllData.orderByChild('classType').equalTo('一對一').on('child_added', (snapshot) => {
        data = snapshot.val();
        createLayout(data);
    });   
}

// alert 
app.get('#alertBigBox').style.display = 'none';
app.get('#alertButton').addEventListener('click', ()=>{
    app.get('#alertBigBox').style.display = 'none';
});

// close loading
setTimeout(() => {
    app.loading();
}, 1000);