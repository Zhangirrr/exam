let btn = document.querySelector("#btn")
let verifyBtn = document.querySelector("#verify_btn")
let registerDiv = document.querySelector("#register_window")
let modal = document.querySelector("#modal")
let userEmail = document.querySelector("#email_input")
let userPassword = document.querySelector("#password_input")

const sendEmail = (email, subject, message) => {
    const templateParams = {
        message: message,
        subject: subject,
        to_email: email,
    };
    
    emailjs.send('service_aozbob6', 'template_42ducdk', templateParams)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
        console.log('FAILED...', error);
    });
}


btn.addEventListener("click", () => {
        if(userEmail.value !== "" && userPassword.value !== ""){
        modal.style="display: block;"

        let randomCode = Math.floor(Math.random() *999)
        let code = document.querySelector("#verify_input")

        verifyBtn.addEventListener("click", () => {

            let user = {
                email: userEmail.value,
                password: userPassword.value
            }
            
            if(code.value == randomCode){
                alert("Поздравляю")

                let allUsers = JSON.parse(localStorage.getItem("users")) || [];
                allUsers.push(user);
                localStorage.setItem("users", JSON.stringify(allUsers));
                
                location.href = "login.html"    

                
                
            }else{
                alert("Не совпадает")
            }
        })
        console.log(randomCode);
        sendEmail(userEmail.value,"Код подтверждения",randomCode)
    }else{
        alert("Заполните все поля")
    }
})


