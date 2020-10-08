function SignUpUser(){
    let username = document.getElementById('username').value;
    let email =document.getElementById('email').value;
    let password =document.getElementById('password').value;
    let confirmPassword =document.getElementById('confirm-password').value;
    let error = document.querySelector('.error')

    // alert(username+" "+email+" "+password+" "+confirmpassword);
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user)=>{
        let signedUpUser = firebase.auth().currentUser;
        if(signedUpUser){
            signedUpUser.updateProfile({
                displayName: username
            }).then(()=>{
                window.location.href="Dashboard.html";
                error.style.display= 'flex'
                error.innerHTML = 'user created';
            })
        }
      
    }).catch((err) => {
        error.style.display= 'flex'
        error.innerHTML = err.message;
    })
}

function logInUser(){
    let email =document.getElementById('Email').value;
    let password =document.getElementById('Password').value;

    firebase.auth().signInWithEmailAndPassword(email, password).then((LogedUser)=>{
        window.location.href="Dashboard.html";
        error.style.display= 'flex'
        error.innerHTML = 'login successful';
    }).catch((err) => {
        error.style.display= 'flex'
        error.innerHTML = err.message;
})
}
let error = document.querySelector('.error')




