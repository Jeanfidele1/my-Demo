db.collection('blogpost').get().then(function(doc){
    var datahtml ="";
    doc.forEach(function(retrieveblog){
    var data = retrieveblog.data();
    var id =retrieveblog.id
    storage.ref(data.imageURL).getDownloadURL().then((imageURL)=>{
        let subSubject = data.subject.substr(1, 130);
        datahtml+=`
        <div class="pics bloge_card"> 
        <img src="${imageURL}" alt="blog pic1"> <small> ${data.date} by ${data.author}</small>
        <p>${subSubject}... <br> <a href="#retrieve" onclick="retrieve('${id}')">Read more</a></p>
    </div>
        `;
        document.getElementById('readblog').innerHTML=datahtml;
    }).catch((downloadImageError)=>{
        alert(downloadImageError);
    })
   
    
    })
})
 function retrieve(id){
    sessionStorage.setItem('blogId',id) 
    window.location.href="post.html";

 }
///
 function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

var postid = getUrlParameter("postid");
db.collection('blogpost').doc(postid).get().then(function(doc){
    storage.ref(doc.data().id).getDownloadURL().then((postImageURL)=>{
          
    }).catch((imageStorageError)=>{
        
    })
    var artical ="";
    var data = doc.data();
    artical+=`
    <div class="welcome-text">
    
                <h1>${data.Title}</h1>
                <BR>
                <img src='${imageURL}' id="postImage">
                <h2>Advantage of being software developer</h2>
                <p id= "edit-blog">${data.subject}</p>
            </div>
            <div class="action">
                <ul>
                  <li><a href="../pages/Contact.html"><img src="../asset/image/comm.svg"alt="comm"></a><h6>Comment</h6></li>
                  <li><a href="../pages/blog.html"><img src="../asset/image/back.PNG"alt="Back" id="back"></a><h6>Back</h6></li>
                </ul>
            </div>
            `;
document.getElementById("post").innerHTML=artical;
})

