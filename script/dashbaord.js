firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
      return  window.location.href="../index.html";
    }
    // let userName = document.getElementById('user-name');
    // userName.innerHTML = user.userName
    
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


  function displayContacts(){
    let table = document.getElementById('contactTable');

    db.collection("contact").get().then((contacts)=>{
      contacts.forEach((contact) => {
        table.innerHTML+=`
            <tr>
              <td>${contact.data().fname}</td>
              <td>${contact.data().sname}</td>
              <td>${contact.data().email}</td>
              <td>${contact.data().message}</td>
              <td><img src="../asset/image/delete-icon.svg" alt=""></td>
            </tr>
        `
      })
    }).catch(err => {
      // alert(err)
    })

  //   db.collection("contact").get().then(function(querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //         // doc.data() is never undefined for query doc snapshots
  //         console.log(doc.id, " => ", doc.data());
  //     });
  // });
  
  }
  displayContacts();