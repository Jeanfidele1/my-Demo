
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
        }).catch(error=>{
            alert(error)
        })
    }
}

setTimeout(()=>{
    disableComment();

},4000)


async function readComments(){
     let blogComment = [];
    blogId = sessionStorage.getItem('blogId')
    await db.collection('comments').where('blogId','==',blogId).get().then(comments => {
       comments.forEach(comment => {
           db.collection('RegisteredUser').doc(comment.data().userId).get(user => {
                blogComment.push({
                    commentId: comment.id,
                    comment: comment.data().comment,
                    username: user.data().username,
                    date: comment.data().date
                })
           })
       });
    })
    console.log(blogComment);
}
readComments();
