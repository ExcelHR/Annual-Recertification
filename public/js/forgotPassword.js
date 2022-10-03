
const form = document.getElementById("myForm");
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    let email = document.getElementById("email").value.trim();
    console.log(email)
    let newPassword = document.getElementById("new_password").value.trim();
    let confirmNewPassword = document.getElementById("confirm_password").value.trim();
    if(newPassword!=confirmNewPassword){
            alert("Passwords do not match. Please try again")
    }
    // Validates email
    resp=await axios.get(`/user/validateEmail/?email=${email}`)
    if(resp.data.status=="Success"){
        body={userId:resp.data.userId,password:newPassword}
        console.log(body)

            resp2=await axios.post('/user/updatePassword/',body)
            console.log(resp2)
            if(resp2.data=="Success"){
                alert("Password Changed Sucessfully!!")
            }
            else{
                alert("Something went wrong.Please try again")
            }
            
    }
    else{
        alert("The email does exist. Please enter a valid email address")
        document.getElementById("confirmPasswordValidation").classList.remove("invisible")
        document.getElementById("confirmPasswordValidation").innerHTML="The email does exist. Please enter a valid email address"
    }

})

//Password Validation
const passwordValidation = (event) => {
    console.log(event.target.value)
    if (event.target.value.length >= 0 && event.target.value.length < 8) {
        document.getElementById("pwdValidationText").classList.remove("invisible");
        document.getElementById("new_password").classList.add("border-danger");

    }
    if (event.target.value.length >= 8) {
        document.getElementById("pwdValidationText").classList.add("invisible");
        document.getElementById("new_password").classList.remove("border-danger");

    }
}

const confirmPasswordValidation=(event)=>{
    let newPassword = document.getElementById("new_password").value.trim();
    if(event.target.value!=newPassword){
        document.getElementById("confirmPasswordValidation").classList.remove("invisible");
        document.getElementById("new_password").classList.add("border-danger");
        document.getElementById("confirm_password").classList.add("border-danger");
    }
    else{
        document.getElementById("confirmPasswordValidation").classList.add("invisible");
        document.getElementById("new_password").classList.remove("border-danger");
        document.getElementById("confirm_password").classList.remove("border-danger");
    }
}