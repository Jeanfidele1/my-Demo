// selectors
const form = document.getElementById('edit-blog');
editBlog.addEventListener('click', (e) => {
    localStorage.setItem('dataId',e.target.getAttribute('data-id'));

    window.location.href = 'edit-blog.html';
});


// ------------- variables -------------
let files = [];

let title = form.title,
    content = form.content;


let dataId = localStorage.getItem('dataId');

        // window.onload = () => {
//     console.log(dataId);
// }

db.collection('blogs').doc(dataId).get().then((blog) => {
    console.log(blog.data());
    title.value = blog.data().title,
    content.innerHTML = blog.data().content
});

// ------------- selection process ------------
document.getElementById('upload-image').onclick = function(e) {

    let input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {
        files = e.target.files;
    }
    input.click();
};


//  ----------- get users  --------------
const user = auth.currentUser;
console.log(user);

// ------------- send blog ------------
document.getElementById('submit-image').onclick = () => {
    ImgName = dataId;
    let title = form.title.value,
        content = form.content.value;
        
    let uploadTask = firebase.storage().ref('images/'+ImgName+'.png').put(files[0]);
            
    uploadTask.on('state_changed', function() {
        db.collection('blogs').doc(`${ImgName}`).update({
            title: title,
            imageUrl: 'images/'+ImgName+'.png',
            content: content
        }).then(() => {
            console.log('Blog edited');
        })
    },
    );
};