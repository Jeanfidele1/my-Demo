function displayPost(){
    let blogId = sessionStorage.getItem('blogId');
    db.collection('blogpost').doc(`${blogId}`).get().then((blog)=>{
        let data = blog.data();
        
        storage.ref(data.imageURL).getDownloadURL().then((imageURL)=>{
           let postContainer = document.getElementById('post');

           postContainer.innerHTML+=`
           <div class="welcome-text">
    
           <h1>${data.Title}</h1>
           <BR>
           <img src="${imageURL}" id="Postimage">
           <p>${data.subject}</p>
         </div>
         <div class="action">
       </div>
       <br>
       <div id="notLoggedInWrapper">
         <button>Login to comment</button>
       </div>
       <div class="comment" id="commentWrapper">
       <h4>Comment</h4>
       
       <textarea id="Comment" name="Comment" placeholder="Type your Comment.."></textarea>
       <button id="button" onclick="sendComment()">Send</button>
      </div>
           `

        }).catch((downlaodImageError)=>{
            // alert("Image: ***"+downlaodImageError)
        })
    }).catch((blogError)=>{
        // alert("........... "+blogError);
    })
}

displayPost();
function disableComment(){
    let auth = firebase.auth().currentUser;
    let commentWrapper = document.getElementById('commentWrapper');
    let notLoggedWrapper = document.getElementById('notLoggedInWrapper');
    if(auth){
       commentWrapper.style.display="block";
       notLoggedWrapper.style.display="none";
    }
    else{
        notLoggedWrapper.style.display="block";
    }
  
}


function sendComment(){
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();

    let currentUser =  firebase.auth().currentUser;
    if(currentUser){
        let commenterName = currentUser.displayName;
        let comment = document.getElementById('Comment').value;
        let blogId = sessionStorage.getItem('blogId');
        
        firebase.firestore().collection('comments').add({
            userId: currentUser.uid,
            blogId: blogId,
            user: commenterName,
            comment: comment,
            date: date+'  '+time
        }).then(()=>{
            comment.value = "";
            alert("Comment sent successfully");
            window.location.reload();
        }).catch(error=>{
            alert(error)
        })
    }
}

setTimeout(()=>{
    disableComment();

},4000)

async function readComments(){
    const bodyContainer = document.getElementById('bodyContainer');
     let blogComment = [];
    blogId = sessionStorage.getItem('blogId')
    await db.collection('comments').where('blogId','==',blogId).get().then(comments => {
       comments.forEach(comment => {
           console.log("Got comment: "+comment.data().userId)
           db.collection('RegisteredUser').doc(`${comment.data().userId}`).get().then(user => {
               console.log("Commented user: "+comment.data().date);
                blogComment.push({
                    commentId: comment.id,
                    comment: comment.data().comment,
                    username: user.data().Username,
                    date: comment.data().date,

                })
           })
       });
    })
setTimeout(()=>{
   blogComment.forEach(comment => {
       bodyContainer.innerHTML+= `
            <div class="comment">
            <div class="head">
                <ul>
                    <li><img src="../asset/image/person.svg" alt="person"></li> 
                </ul>
            </div>
            <h4 id="header">${comment.username}</h4>
            <small id="date">${comment.date}</small>
            <br> 
            <p id="body">
            ${comment.comment}
            </p>
            <div class="Reply">
                <button>Delete comment</button>
                <button>Reply</button>
            </div>
        </div>
       `
   })
},4000)

}

readComments();
