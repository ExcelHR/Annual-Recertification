// Get all the specific elements of the HTML page
const form = document.getElementById("myForm");
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    let email = document.getElementById("email").value.trim();
    console.log(email)
    window.location.href = "/auth/change-password"
    // let newPassword = document.getElementById("newPassword").value.trim();
    // let confirmNewPassword = document.getElementById("confirmNewPassword").value.trim();
    // window.location.href="auth/change-password"
    // // Validate on the password
    // if(newPassword==""){
    //     alert("Please enter a new password.")
    //     return;
    // }

    // // Validate on the confirmed password
    // if(confirmNewPassword==""){
    //     alert("Please confirm your new password.")
    //     return;
    // }

    // if(newPassword!=confirmNewPassword){
    //     alert("The passwords do not match")
    //     return;
    // }

    // if(newPassword.length < 5){
    //     alert("Password should contain at least six characters.")
    //     return;
    // }


    // // Backend API request to update the password
    // axios.post("/auth/forgot-password",{email,newPassword})
    // .then((res)=>{
    //     let data = res.data
    //     window.location.href="/auth/login"
    // })
    // .catch(function onError(err){
    //     alert(err.response.data.message)
    //     return
    // })

})
