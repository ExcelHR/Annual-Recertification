(async () => {
    let params = (new URL(document.location)).searchParams;
    let property = params.get("property");
    console.log(property)
    res = await axios.get(`/register/getAddresss?property=${property}`)
    console.log(res)
    const address = res.data.Address
    const name = res.data.Property
    const address2 = `${res.data.City}  ${res.data.Zip}  ${res.data.State}`
    document.getElementById('name').innerHTML = name
    document.getElementById('address1').innerHTML = address
    document.getElementById('address2').innerHTML = address2

})()

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

const CpasswordValidation = (event) => {
    console.log(event.target.value.length)
    console.log(event.target.value)
    const password = document.getElementById('password').value
    console.log(password)
    if (event.target.value != password) {
        document.getElementById("CpwdValidationText").classList.remove("invisible");
        document.getElementById("password").classList.add("border-danger");

    }
    else {
        document.getElementById("CpwdValidationText").classList.add("invisible");
        document.getElementById("password").classList.remove("border-danger");

    }
}

const form = document.getElementById("myForm");

// Login Validation
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let Cpassword = document.getElementById("Cpassword").value.trim();
    // if (password !=Cpassword) {
    //     document.getElementById("CpwdValidationText").classList.remove("invisible");
    //     return
    // }

    // Make a backend API request to redirect to next page to the system
    try {
        await axios.get("/register/applicantPersonalInfo")

    }
    catch (err) {
        console.log(err)
        // modal(options)
    }
    window.location.href = '/register/applicantPersonalInfo'
})