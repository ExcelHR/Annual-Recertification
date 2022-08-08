//Password Validation
const passwordValidation = (event) => {
    console.log(event.target.value.length)
    console.log(event.target.value)
    if (event.target.value.length >= 0 && event.target.value.length < 8) {
        document.getElementById("pwdValidationText").classList.remove("invisible");
        document.getElementById("password").classList.add("border-danger");

    }
    if (event.target.value.length >= 8) {
        document.getElementById("pwdValidationText").classList.add("invisible");
        document.getElementById("password").classList.remove("border-danger");

    }
}


const form = document.getElementById("myForm");
const forgotPassword = document.getElementById("forgot-password")

// Login Validation
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    let userName = document.getElementById("userName").value.trim();
    let password = document.getElementById("password").value.trim();
    let p_flag = false
    console.log(userName,password)
    if (password.length < 8) {
        document.getElementById("pwdValidationText").classList.remove("invisible");
        return
    }
    else {
        p_flag = true
    }
    // Make a backend API request to login to the system
    try {
        const res = await axios.post("user/login", { userName, password })
        console.log(res.data)
        if (res.data) {
            console.log("Success")
                window.location.href=`/user/change-password/?id=${res.data.userId}`
        }
    }
    catch (err) {
        console.log(err)
        document.getElementById("validationText").classList.remove("invisible");
        // modal(options)
    }
})


