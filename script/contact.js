function sendContact(){
    let firstname = document.getElementById('firstname').value;
    let secondname = document.getElementById('secondname').value;
    let email = document.getElementById('email').value;
    let message =document.getElementById('message').value;
    let formError = document.getElementById('formError');
    let form = document.getElementById('contactForm');
    
    db.collection('contact').doc().set({
        fname: firstname,
        sname: secondname,
        email:email,
        message:message,
   }).then(()=>{
       alert("Your inquiry sent successfully");
       form.reset();
   })
}

