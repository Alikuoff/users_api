const allUsers = document.getElementById("all-users");
const userSurati = document.getElementById("user-surati");
const userIsmi = document.getElementById("user-ismi");
const userUsername = document.getElementById("user-username");
const userParoli = document.getElementById("user-paroli");

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("add-user-name")) {
        setupAddUserForm();
    } else {
        setupAddUserButton();
        getUser();
    }
});

function setupAddUserButton() {
    const addUserButton = document.getElementById("add-user-button");
    if (addUserButton) {
        addUserButton.addEventListener("click", () => {
            window.location.href = "addUser.html";
        });
    }
}

function setupAddUserForm() {
    const addUserButton = document.getElementById("add-user-button");
    addUserButton.addEventListener("click", () => {
        const name = document.getElementById("add-user-name").value;
        const username = document.getElementById("add-user-username").value;
        const password = document.getElementById("add-user-password").value;
        const avatar = document.getElementById("add-user-surati").value;

        axios.post(`https://675f9ebd1f7ad2426998c8d7.mockapi.io/416/users`, {
            name: name,
            username: username,
            password: password,
            avatar: avatar
        }).then((res) => {
            console.log("User added:", res.data);
            window.location.href = "index.html";
        }).catch((error) => {
            console.error("Error adding user:", error);
        });
    });
}

function getUser() {
    axios.get(`https://675f9ebd1f7ad2426998c8d7.mockapi.io/416/users`).then((res) => {
        res.data.forEach((user) => {
            const userCard = document.createElement("div");
            userCard.classList.add("user-card");

            const userAvatar = document.createElement("img");
            userAvatar.src = user.avatar;
            userCard.appendChild(userAvatar);

            const userIsmi = document.createElement("div");
            userIsmi.innerHTML = `<strong>Name:</strong> ${user.name}`;
            userCard.appendChild(userIsmi);

            const userUsername = document.createElement("div");
            userUsername.innerHTML = `<strong>Username:</strong> ${user.username}`;
            userCard.appendChild(userUsername);

            const userParoli = document.createElement("div");
            userParoli.innerHTML = `<strong>Password:</strong> ${user.password}`;
            userCard.appendChild(userParoli);

            const deleteUserButton = document.createElement("button");
            deleteUserButton.textContent = "Delete User";
            deleteUserButton.classList.add("delete-user-button");
            userCard.appendChild(deleteUserButton);

            deleteUserButton.addEventListener("click", () => {
                deleteUser(user.id, userCard);
            });

            allUsers.appendChild(userCard);
        });
    });
}

function deleteUser(id, userCard) {
    axios.delete(`https://675f9ebd1f7ad2426998c8d7.mockapi.io/416/users/${id}`).then(() => {
        console.log(`User with ID ${id} deleted.`);
        userCard.remove();
    }).catch((error) => {
        console.error("Error deleting user:", error);
    });
}


