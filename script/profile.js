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
