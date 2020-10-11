let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes();
let blogImage;
function getImage(event){
        if(event.target.files[0] != null){
            blogImage = event.target.files[0];
        }
    }

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // console.log(">>>>>>>"+user.displayName);
        const blog =document.querySelector("#blog");
        blog.addEventListener('submit',(e)=>{
            e.preventDefault();
            let blogTitle = blog['Title'].value;
            let blogSubject= blog['subject'].value;
            let blogId = uniqueId();
            let blogAuthor=user.displayName;
            storage.ref(`/blogs/${blogId}/blogImage.jpg`).put(blogImage).then(()=>{
                var blogdb={
                    Title:blogTitle,
                    author: blogAuthor,
                    subject: blogSubject,
                    date: date+' '+time,
                    imageURL: `/blogs/${blogId}/blogImage.jpg`
                }
        
               db.collection('blogpost').doc(blogId).set(blogdb).then(function(){
                   let form = document.getElementById('blog');
                   form.reset();
                   alert("Blog created successfully");

                }).catch((createBlogError)=>{
                    alert(createBlogError)
                })
            }).catch((storageError)=>{
                alert(storageError);
            })
        
        });
     } else {
     window.location.href="../index.html"
    }
  });

 
  function uniqueId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }