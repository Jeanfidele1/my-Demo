const deleteBlog = document.getElementById('deleteBlog');
deleteBlog.addEventListener('click', (e) => {
    e.stopPropagation();

    let dataId = e.target.getAttribute('data-id');

    db.collection('blogpost').doc(dataId).delete().then(function() {
        console.log("Document successfully deleted!");

    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
})
