// Get all the specific elements from the HTML page
const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

let formStepsNum = 0;

var visitorInfo = document.getElementById("visitinfo")
var visitSpecification = document.getElementById("visitSpecification")
var visitSpecificationText = document.getElementById("visitSpecificationText")

var building = document.getElementById("building")
var leaseTerm = document.getElementById("leaseTerm")
var leaseDate = document.getElementById("leaseDate")
var apartmentInfo = document.getElementById("apartmentInfo")


var firstName = document.getElementById("firstName")
var middleName = document.getElementById("middleName")
var lastName = document.getElementById("lastName")
var birthDate = document.getElementById("birthDate")
var ssn = document.getElementById("ssn")
var phoneNumber = document.getElementById("phoneNumber")
var email = document.getElementById("email")
var password = document.getElementById("password")
var confirmPassword = document.getElementById("confirmPassword")
var applicantType = document.getElementById("applicantType")

var coApplicantOne = document.getElementById("coapplicantname1")
var coApplicantTwo = document.getElementById("coapplicantname2")

var currAddr = document.getElementById("currAddr")
var currRent = document.getElementById("currRent")
var currPeriod = document.getElementById("currPeriod")
var currLandlordName = document.getElementById("currLandlordName")
var currLandlordPhoneNumber = document.getElementById("currLandlordPhoneNumber")

var prevAddr = document.getElementById("prevAddr")
var prevRent = document.getElementById("prevRent")
var prevPeriod = document.getElementById("prevPeriod")
var prevLandlordName = document.getElementById("prevLandlordName")
var prevLandlordPhoneNumber = document.getElementById("prevLandlordPhoneNumber")

var employmentCheck = document.getElementById("employmentCheck")
var addSourceInfo = document.getElementById("addSourceInfo")
var addSourceAmt = document.getElementById("addSourceAmt")

// If "other", make the user enter a comment for the visit
visitorInfo.onchange = function(){
  if(visitorInfo.selectedIndex==3){
    visitSpecification.style.display="block";
  }else{
    visitSpecification.style.display="none"
  }

}
// current date 
let mCurrentDate=moment(new Date())

// Request body object
var inputObj={}
nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    //Validation for 1st step
    if(formStepsNum == 0){
      if (visitorInfo.selectedIndex==3){
        var visitText = visitSpecificationText.value.trim()
        if(visitText==""){
          // If text is empty throw alert
          document.getElementById("alert-specify-reason").style.display =  ''
          return;
        }
        inputObj["visitInformation"]=visitText;
      }else{
        inputObj["visitInformation"]=visitorInfo.value
      }
    }

    //Validation for 2nd step
    else if(formStepsNum == 1){
      let buildingVal = building.value.trim();

      if(buildingVal =="-- Select an option --"){
        // If building empty throw alert
        document.getElementById("alert-select-building").style.display =  ""
        return;
      }else{
        document.getElementById("alert-select-building").style.display =  "none"
      }

      if(!leaseDate.value){
        // If lease date is empty throw error
        document.getElementById("alert-select-required-date-2").style.display =  "block"
        return;
      }

      let mLeaseDate=moment(leaseDate.value.trim()).local()
      
      // Validation for lease date
      if(mCurrentDate>mLeaseDate){
        document.getElementById("alert-select-required-date-1").style.display="block"
        return
      }
      let apartmentNumber = document.getElementById("apartment").value? document.getElementById("apartment").value:null

      // Update the input object
      inputObj["leaseTerm"]=leaseTerm.value
      inputObj["requiredLeaseDate"]=mLeaseDate
      inputObj["building"]=building.value
      inputObj["apartmentNumber"]=apartmentNumber
    }

    // Validation for 3rd step
    else if(formStepsNum==2){
      let firstNameVal = firstName.value.trim();
      let middleNameVal = middleName.value;
      // Allow empty middlenames
      if (middleNameVal!=""){
        middleNameVal = middleNameVal.trim();
        inputObj["middleName"]=middleNameVal;
      }
      let lastNameVal = lastName.value.trim();
      if(firstNameVal=="" || lastNameVal=="" ){
        // If empty first or last name throw alert
        document.getElementById("alert-name").style.display =  "block";
        return;
      }else{
        document.getElementById("alert-name").style.display =  "none";
      }

      if(!birthDate.value){
        // If no birth date throw error
        document.getElementById("alert-select-dob-date-1").style.display =  "block";
        return;
      }
      
      let mDOB=moment(birthDate.value).local();
      
      var ageCheck = moment.duration(mCurrentDate.diff(mDOB))
      if (ageCheck<18){
        // If the candidate has age < 18 throw error
        document.getElementById("alert-select-dob-date-2").style.display =  "block";
        return;
      }
      
      var ssncheck = document.getElementById("ssncheck").checked;
      var checkRegex = /[a-zA-Z]/g;
      // SSN can be empty
      if(ssncheck==false){
        let ssnVal = ssn.value.trim();
        // Validate the SSN
        if(ssnVal.length!=9 || checkRegex.test(ssnVal)){
          document.getElementById("alert-ssn").style.display =  "block";
          return;
        }else{
          document.getElementById("alert-ssn").style.display =  "none";
        }
        inputObj["ssn"] = ssnVal;
        inputObj["ssnExists"]=true;
      }else{
        inputObj["ssnExists"]=false;
      }
      let phoneNumberVal = phoneNumber.value.trim();
      // Validate the phone number
      if(phoneNumberVal.length!=10 || checkRegex.test(phoneNumberVal)){
        document.getElementById("alert-phoneNumber").style.display =  "block";
        return;
      }else{
        document.getElementById("alert-phoneNumber").style.display =  "none";
      }
      let emailVal = email.value.trim();
      const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      // Validate the user-entered email Id
      if(emailVal=="" || emailRegexp.test(email)){
        document.getElementById("alert-email").style.display =  "block";
        return;
      }else{
        document.getElementById("alert-email").style.display =  "none";
      }
      let passwordVal = password.value;
      // Validate the user-entered password
      if(passwordVal==""){
        document.getElementById("alert-password-1").style.display =  "block";
        return;
      }else{
        document.getElementById("alert-password-1").style.display =  "none";
      }
      if(passwordVal.length < 5){
        document.getElementById('alert-password-2').style.display = 'block'
        return;
      }else{
        // document.getElementById('alert-password-length').style.display = 'none'
      }
      // Validate the confirmed password
      let confirmPasswordVal = confirmPassword.value;
      if(confirmPasswordVal==""){
        document.getElementById('alert-confirm-password-1').style.display = 'block'
        return;
      }else{
        document.getElementById('alert-confirm-password-1').style.display = 'none'
      }
      if(passwordVal!==confirmPasswordVal){
        document.getElementById('alert-confirm-password-2').style.display = 'block'
        return;
      }else{
        document.getElementById('alert-confirm-password-2').style.display = 'none'
      }
      let applicantTypeVal = applicantType.value.trim();
      
      let coApplicantOneVal = coApplicantOne.value? coApplicantOne.value.trim(): "";
      let coApplicantTwoVal = coApplicantTwo.value? coApplicantTwo.value.trim(): "";

      inputObj["firstName"]=firstNameVal;
      inputObj["lastName"]=lastNameVal;
      inputObj["dob"]=mDOB;
      inputObj["phoneNumber"]=phoneNumberVal;
      inputObj["email"] = emailVal;
      inputObj["password"] = passwordVal;
      inputObj["applicantType"] = applicantTypeVal;
      inputObj["coApplicantOne"] = coApplicantOneVal;
      inputObj["coApplicantTwo"] = coApplicantTwoVal;
    
    }
    // Validation for 4th step
    else if(formStepsNum==3){
      let currAddrVal = currAddr.value? currAddr.value.trim() :""
      if(currAddrVal==""){
        // If no current address throw alert
        document.getElementById('alert-currAddress').style.display = 'block'
        return;
      }else{
        document.getElementById('alert-currAddress').style.display = 'none'
      }
      let currRentVal = currRent.value? currRent.value.trim():0
      let currPeriodVal = currPeriod.value? currPeriod.value.trim():0 
      if(currPeriodVal==""){
        // If no current period throw alert
        document.getElementById('alert-currPeriod').style.display = 'block'
        return;
      }else{
        document.getElementById('alert-currPeriod').style.display = 'none'
      }

      let currentLandLordNameVal = currLandlordName.value? currLandlordName.value.trim(): ""
      inputObj["currentLandLordName"]=currentLandLordNameVal

      if(currLandlordPhoneNumber.value){
        if(currLandlordPhoneNumber.value.trim().length!=10){
          // If no current landlord phone number throw alert
          document.getElementById('alert-currLandlordPhoneNumber').style.display = 'block'
          return;
        }else{
          document.getElementById('alert-currLandlordPhoneNumber').style.display = 'none'
        }
        inputObj["currentLandLordPhoneNumber"]=currLandlordPhoneNumber.value.trim()
      }else{
        inputObj["currentLandLordPhoneNumber"]=null;
      }

      inputObj["currentAddress"]=currAddrVal;
      inputObj["currentRent"]=currRentVal;
      inputObj["currentPeriod"]=currPeriodVal;
    }

    // Validation for 5th step
    else if(formStepsNum==4){
      let prevAddrVal = prevAddr.value? prevAddr.value.trim(): ""
      // if(prevAddrVal==""){
      //   document.getElementById('alert-prevAddr').style.display = ''
      //   return;
      // }else{
      //   document.getElementById('alert-prevAddr').style.display = 'none'
      // }
      let prevRentVal = prevRent.value? prevRent.value.trim() : 0
      let prevPeriodVal = prevPeriod.value? prevPeriod.value.trim() : 0
      // if(prevPeriodVal==""){
      //   document.getElementById('alert-prevPeriod').style.display = ''
      //   return;
      // }else{
      //   document.getElementById('alert-prevPeriod').style.display = 'none'
      // }
      inputObj["previousLandLordName"] = prevLandlordName.value? prevLandlordName.value.trim():""

      if(prevLandlordPhoneNumber.value){
        if(prevLandlordPhoneNumber.value.trim().length!=10){
          // If no previous landlord phone number throw alert
          document.getElementById('alert-prevLandlordPhoneNumber').style.display = 'block'
          return;
      }else{
        document.getElementById('alert-prevLandlordPhoneNumber').style.display = 'none'
      }
        inputObj["previousLandLordPhoneNumber"]=prevLandlordPhoneNumber.value.trim()
      }else{
        inputObj["previousLandLordPhoneNumber"]="";
      }

      inputObj["previousAddress"]=prevAddrVal;
      inputObj["previousRent"]=prevRentVal;
      inputObj["previousPeriod"]=prevPeriodVal;
    }

    else if(formStepsNum==5){
      var employmentCheck = document.getElementById("employmentCheck").checked
      let addSourceInfoVal = document.getElementById("addSourceInfo").value? document.getElementById("addSourceInfo").value.trim():""
      let addSourceAmtVal = document.getElementById("addSourceAmt").value? document.getElementById("addSourceInfo").value.trim():0
      inputObj["employed"]=employmentCheck;
      inputObj["additionalSourceInfo"]=addSourceInfoVal;
      inputObj["additionalIncomeAmt"]=addSourceAmtVal;
    }
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});


// Toggles to previous steps of the forms
prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

// Updates the form steps
function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });
  formSteps[formStepsNum].classList.add("form-step-active");
}

// Updates the progress bar
function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

// Make backend request to create a application i.e. customer
const submitBtn = document.getElementById("submit");
submitBtn.onclick = function(e){
    e.preventDefault();
    axios.post("/apply",inputObj)
    .then((res)=>{
      let data = res.data
      window.location.href="/user/login"
    })
    .catch((err)=>{
      let message = err.response && err.response.data && err.response.data.message
      if(message){
        alert(message)
      }else{
        alert(`Error ${err.response.status}`)
      }
      this.disabled = false
    })  
}


// Error handling testing.

// var submitBtn2 = document.getElementById("submit2")
// submitBtn2.onclick = function(e){
//   e.preventDefault();
//   console.log("testing")
//   axios.post("/apply")
//   .then(function (res){
//     let data = res.data
//     window.location="/user/login"
//   })
//   .catch(function onError(err){
//     let message = err.response && err.response.data && err.response.data.message
//     if(message){
//       alert(message)
//     }else{
//       alert(`Error ${err.response.status}`)
//     }
//     this.disabled = false
//   })  
// }