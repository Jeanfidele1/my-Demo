firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
      return  window.location.href="../index.html";
    }
    let userName = document.getElementById('user-name');
    userName.innerHTML = user.displayName
    
    let mail = document.getElementById('mail');
    mail.innerHTML = user.email 
    // console.log(user)
    
})

function Logout(){
    firebase.auth().signOut().then(()=>{
        window.location.href ="../index.html";
    }
    )
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  // function updateProfile(){
  //   let username =document.getElementById("username").value;
  //   let firstname =docuemnt.getElementById("firstname").value;
  // }

  var userId= sessionStorage.getItem("userId")
  db.collection("RegisteredUser").doc(userId).get().then(function (snapshot) {
    var childData = snapshot.data();
    console.log(childData);
    document.getElementById("editProfile").username.value = childData.Username;
    document.getElementById("editProfile").email.value = childData.Email;
  })

  const form = document.querySelector('#editProfile');
        const pError = document.querySelector('#pError');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = form['username'].value;
            const firstname= form['firstname'].value;
            const lastname= form['lastname'].value;
            const email = form['email'].value;
            const phone= form['phone'].value;
            console.log(phone)
            // const password = form['password'].value;
            // const confirmpassword = form['confirmpassword'].value;
            db.collection("RegisteredUser").doc(userId).update({
              User_id: uid,
              Username: username,
              Email: email,
              firstname: firstname,
              lastname: lastname,
              phone: phone
          })
            .then(result => {
                    window.location.href = "Dashboard.html";
                });
            });

