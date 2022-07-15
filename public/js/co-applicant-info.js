
const zipValidation = (event) => {
    console.log(event.target.value.length)
    console.log(event.target.value)
    if (event.target.value.length!=6) {
        document.getElementById("zipValidationText").classList.remove("invisible");
        document.getElementById("zip").classList.add("border-danger");

    }
    else{
        document.getElementById("zipValidationText").classList.add("invisible");
        document.getElementById("zip").classList.remove("border-danger");

    }
}


const form = document.getElementById("myForm");

// Login Validation
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    let name=document.getElementById('firstName').value.trim()+" "+document.getElementById('lastName').value.trim()
    let dob=document.getElementById('DOB').value.trim()
    let street=document.getElementById('street').value.trim()
    let city=document.getElementById('city').value.trim()
    let state=document.getElementById('state').value.trim()
    let zipCode= document.getElementById("zip").value
    let co_applicant2=document.getElementById('coapplicant2').checked
    let co_applicant1Details={
        name,
        dob,
        street,
        city,
        state,
        zipCode,
        co_applicant2
    }
    console.log(co_applicant1Details)
    // if (zipCode.length !=6) {
    //     document.getElementById("zipValidationText").classList.remove("invisible");
    //     return
    // }
    
    // Make a backend API request to redirect to next page to the system
    // try {
    //     await axios.get("/register/applicantPersonalInfo")
       
    // }
    // catch (err) {
    //     console.log(err)
    //     // modal(options)
    // }
    if (co_applicant2){
    window.location.href='/register/coapplicant_2_personalInfo'
    }
    else{
        console.log("Redirect to NExt Page")
    }
})