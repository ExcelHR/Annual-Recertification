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
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let p_flag = false
    console.log(email,password)
    if (password.length < 8) {
        document.getElementById("pwdValidationText").classList.remove("invisible");
        return
    }
    else {
        p_flag = true
    }
    // Make a backend API request to login to the system
    try {
        const res = await axios.post("user/login", { email, password })
        console.log(res.data)
        if (res.data) {
            console.log("Success")
                window.location.href=`/user/dashboard`
        }
    }
    catch (err) {
        console.log(err)
        document.getElementById("validationText").classList.remove("invisible");
        // modal(options)
    }
})

// Redirect to forget password page
forgotPassword.onclick = function (e) {
    e.preventDefault();
    window.location.href = "/user/forgot-password"
}
