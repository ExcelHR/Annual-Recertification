
userId = window.location.search.split("=")[1]
// Password Validation
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

// Display validation text
const confirmPasswordValidation = (event) => {
    let newPassword = document.getElementById("new_password").value.trim();
    if (event.target.value != newPassword) {
        document.getElementById("confirmPasswordValidation").classList.remove("invisible");
        document.getElementById("new_password").classList.add("border-danger");
        document.getElementById("confirm_password").classList.add("border-danger");
    }
    else {
        document.getElementById("confirmPasswordValidation").classList.add("invisible");
        document.getElementById("new_password").classList.remove("border-danger");
        document.getElementById("confirm_password").classList.remove("border-danger");
    }
}
// Change Password
const changePassword = async () => {
    let oldPassword = document.getElementById("old_password").value.trim();
    let newPassword = document.getElementById("new_password").value.trim();
    let confirmNewPassword = document.getElementById("confirm_password").value.trim();
    if (confirmNewPassword != newPassword) {
        document.getElementById("confirmPasswordValidation").classList.remove("invisible");
        document.getElementById("new_password").classList.add("border-danger");
        document.getElementById("confirm_password").classList.add("border-danger");
        window.location.href = `/user/change-password/?=${userId}`
    }
    // Validate on the password
    console.log(newPassword, confirmNewPassword, oldPassword)
    if (newPassword != confirmNewPassword) {
        alert("The passwords do not match")
        return;
    }
    const body = { userId, password: oldPassword, newPassword }
    console.log(body)
    const resp = await axios.post('/user/validateOldpassword', body)
    console.log(resp.data)
    if (resp.data != "Error") {
        alert("Password Changed")
        // If password changed sucessfuly then redirect tp Dashboard
        window.location.href = `/user/contact_details/?id=${userId}&code=${resp.data.code}&unitNo=${resp.data.unitNo}&name=${resp.data.householdName}`
    }
    else {
        document.getElementById("validationText").classList.remove("invisible");
        document.getElementById("old_password").classList.add("border-danger");
        alert(" The old password is incorrect")
        return
    }


}
