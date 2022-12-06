let btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
    let userEmail = document.querySelector("#email_input").value;
    let userPassword = document.querySelector("#password_input").value;

    let allUsers = JSON.parse(localStorage.getItem("users")) || [];

    let index = allUsers.findIndex(item => item.email == userEmail && item.password == userPassword);
    if(index == -1){
        alert("User not found!");
    }else{
        alert("Authorization success!");
        localStorage.setItem("currentUserEmail", userEmail);
        location.href = "index.html";
    }
});

