firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
      return  window.location.href="../index.html";
    }
    let userName = document.getElementById('user-name');
    userName.innerHTML = user.displayName
    
    let mail = document.getElementById('mail');
    mail.innerHTML = user.email 
    
   
})

function Logout(){
    firebase.auth().signOut().then(()=>{
        window.location.href ="../index.html";
    }
    )
}
let flag = 1;
function getDropDown(value) {
    flag+=value;
   if(flag % 2 == 0){
      document.getElementsByClassName("dropdown-content")[0].style.display="block";
    }
    else{
        document.getElementsByClassName("dropdown-content")[0].style.display="none";
    }
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
