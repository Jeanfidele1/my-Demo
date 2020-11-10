const form = document.querySelector('#registerForm');
        const pError = document.querySelector('#pError');
        // form.addEventListener('submit', (e) => {
        //     e.preventDefault();
            

async function SignUpUser(){
    const username = form['username'].value;
    const email = form['email'].value;
    const password = form['password'].value;
    const confirmpassword = form['confirmpassword'].value;


    auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + " - " + errorMessage);
    })
    .then(user => {
        let regUser = auth.currentUser;
        console.log("regUser"+regUser);
        db.collection("RegisteredUser").doc(regUser.uid).set({
            // User_id: uid,
            role: "StandardUser",
            Username: username,
            Email: email,
        }).then(result => {
             init();
        });
        // const uid = cred.user.uid;
        // console.log(uid); sessionStorage.setItem("userId",uid)
        // init();
    });
    
}
           
async function init(){
    auth.onAuthStateChanged((user) => {
        let regUser = auth.currentUser;
        db.collection("RegisteredUser").doc(regUser.uid).get().then((snapShot)=>{
            console.log("JHere"+snapShot.data().role)
            if (snapShot.data().role=='Admin'){
                window.location.href = "Dashboard.html";
            }
            else{
                window.location.href = "standardUser.html";
            }
        }).catch(error => {
            console.log("//////"+error)
        })
        // if (user) {
        //     console.log(`User logged in as: ${user}`);
        //     //  ------------- redirect a user    --------------
        //     window.location.href = "standardUser.html";
        // }
    });
}

   // function SignUpUser(){
//     let username = document.getElementById('username').value;
//     let email =document.getElementById('email').value;
//     let password =document.getElementById('password').value;
//     let confirmPassword =document.getElementById('confirm-password').value;
//     let error = document.querySelector('.error')

//     // alert(username+" "+email+" "+password+" "+confirmpassword);

//     auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         alert(errorCode + " - " + errorMessage);
//     }).then(cred => {
//         const uid = cred.user.uid;
//         console.log(uid);
//         db.collection("RegisteredUser").doc(uid).set({
//             User_id: uid,
//             Username: username,
//             Email: email,
//             Role: 'guest',
//             Password: password,
//             photo: '',
//         }).then(result => {
//             sessionStorage.setItem("username", username);
//             console.log("Successfull Sign up ", username);
//             window.location.href = "guest/dashboard.html";
//             password.reset();
//         });
//     });

// //     firebase.auth().createUserWithEmailAndPassword(email, password).then((user)=>{
// //         let signedUpUser = firebase.auth().currentUser;
// //         if(signedUpUser){
// //             const userID=user.uid
// //             console.log(userID)
// //             // // db.collection("ProfileData").doc(userID).set({
// //             // //     username:username,
// //             // //     email:email
// //             // // })
// //             // // signedUpUser.updateProfile({
// //             // //     displayName: username
// //             // })
// //             .then(()=>{
// //                 window.location.href="Dashboard.html";
// //                 error.style.display= 'flex'
// //                 error.innerHTML = 'user created';
// //             })
// //         }
      
// //     }).catch((err) => { 
// //         error.style.display= 'flex'
// //         error.innerHTML = err.message;
// //     }).then(Cred=>{
      
// //     })
// }

function logInUser(){
    let email =document.getElementById('Email').value;
    let password =document.getElementById('Password').value;

    firebase.auth().signInWithEmailAndPassword(email, password).then((LogedUser)=>{
        // window.location.href="standardUser.html";
        error.style.display= 'flex'
        error.innerHTML = 'login successful';
        init();
    }).catch((err) => {
        error.style.display= 'flex'
        error.innerHTML = err.message;
})
}
let error = document.querySelector('.error')

