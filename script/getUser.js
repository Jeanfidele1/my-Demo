function getUsers(){
    db.collection("RegisteredUser").get().then((users) => {
        let usersTable = document.getElementById('contactTable');
        users.forEach(user => {
        console.log("Fine: "+user);

            usersTable.innerHTML+=`
            <tr>
            <th>${user.data().Username}</th>
            <th>${user.data().Email}</th>
            <th>${user.data().role}</th>
            <TH>
                <div class="dropdown">
                    <button class="dropbtn">Status</button>
                    <div class="dropdown-content">
                      <a onClick="changeRole(${user.id}, 'StandardUser')">STANDARD User</a>
                      <a href="#">Admin User</a>
                    </div>
                  </div>
            </TH>
            <td><img src="../asset/image/delete-icon.svg" alt=""></td>
        </tr>
            `
        });
    }).catch(error => {
        console.log("Error in getting "+error);
    })     
}

getUsers();

// function changeRole(userId, role){
//    alert("userId "+userId+" role: "+role)
// }