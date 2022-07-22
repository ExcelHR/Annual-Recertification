
const form = document.getElementById("myForm");

form.addEventListener("submit", async function (e) {
    // e.preventDefault();
    console.log("Submiotted")
    alert("Your Documents have been uploaded! Thank You")
    
    // // Make a backend API request to login to the system
    // try {
    //     const res = await axios.post("user/login", { email, password })
    //     console.log(res)
    //     if (res.data=="Validated") {
    //         console.log("Success")
    //             window.location.replace('/user/dashboard')
    //     }
    // }
    // catch (err) {
    //     console.log(err)
    //     document.getElementById("validationText").classList.remove("invisible");
    //     // modal(options)
    // }
})