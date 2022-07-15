// Get all the specific elements from the HTML page
var firstName = document.getElementById("firstName")
var middleName = document.getElementById("middleName")
var lastName = document.getElementById("lastName")
var ssn = document.getElementById("ssn")
var phoneNumber = document.getElementById("phoneNumber")
var email = document.getElementById("email")
var coApplicantOne = document.getElementById("coapplicantname1")
var coApplicantTwo = document.getElementById("coapplicantname2")
var apartmentNumber = document.getElementById("apartmentNumber")
var currentAddress = document.getElementById("currAddr")
var currentRent = document.getElementById("currRent")
var currentPeriod = document.getElementById("currPeriod")
var currentLandLordName = document.getElementById("currLandlordName")
var currentLandLordPhoneNumber = document.getElementById("currLandlordPhoneNumber")
var previousAddress = document.getElementById("prevAddr")
var previousRent = document.getElementById("prevRent")
var previousPeriod = document.getElementById("prevPeriod")
var previousLandLordName = document.getElementById("prevLandlordName")
var previousLandLordPhoneNumber = document.getElementById("prevLandlordPhoneNumber")
var additionalSourceInfo = document.getElementById("addSourceInfo")
var additionalIncomeAmt = document.getElementById("addSourceAmt")
var visitInformation = document.getElementById("visitinfo")
var leaseTerm = document.getElementById("leaseTerm")
var requiredLeaseDate = document.getElementById("leaseDate")
var dob = document.getElementById("birthDate")
var visitSpecification = document.getElementById("visitSpecification")
var submitBtn = document.getElementById("submit")
var visitSpecificationText = document.getElementById("visitSpecificationText")
var applicantType = document.getElementById("applicantType")


// Dictionaries for setting the options of the select fields
var visitInfoDict = {
    "visited_and_signed":0,
    "visited_but_not_signed":1,
    "no_visit":2,
    "other":3
}

var leaseTermDict = {
    1:0,
    2:1
}

var applicantTypeDict = {
    "tenant":0,
    "occupant":1,
    "gurantor":2
}

var defopt=document.createElement('option')
defopt.value=" -- Select an option -- ";
defopt.innerHTML = " -- Select an option -- ";
building.appendChild(defopt)

for (var i=0; i<properties.length; i++){
    var opt=document.createElement('option')
    opt.value=properties[i].optStr
    opt.innerHTML = properties[i].optStr;
    building.appendChild(opt)
}

// Make a backend request to get customer information
axios.get(`/admin/customer/${customerId}`).then((res)=>{
    let customer = res.data.data[0]
    firstName.value = customer.name.firstName? customer.name.firstName :''
    middleName.value = customer.name.middleName? customer.name.middleName: ''
    lastName.value = customer.name.lastName? customer.name.lastName: ''
    if(customer.building){
        building.value = customer.building
    }
    if(customer.visitInformation){
        let visitInfoIndex = visitInfoDict[customer.visitInformation]
        visitInformation.selectedIndex = visitInfoIndex
    }
    let leaseTermIndex = leaseTermDict[customer.leaseTerm]
    leaseTerm.selectedIndex = leaseTermIndex

    let applicantTypeIndex = applicantTypeDict[customer.applicantType]
    applicantType.selectedIndex = applicantTypeIndex
    
    if(customer.requiredLeaseDate){
        requiredLeaseDate.value = customer.requiredLeaseDate? moment(customer.requiredLeaseDate).local().format('YYYY-MM-DD') : ''
    }

    if(customer.dob){
        dob.value = customer.dob? moment(customer.dob).local().format('YYYY-MM-DD') : ''
    }

    ssn.value = customer.ssn? customer.ssn :''
    phoneNumber.value = customer.phoneNumber? customer.phoneNumber :''
    email.value = customer.userId.email? customer.userId.email:''
    coApplicantOne.value = customer.coapplicantName? customer.coapplicantName[0]? customer.coapplicantName[0] :'' :''
    coApplicantTwo.value = customer.coapplicantName? customer.coapplicantName[1]? customer.coapplicantName[1] :'' :''  
    currentAddress.value = customer.currentAddress? customer.currentAddress :''
    currentRent.value = customer.currentRent? customer.currentRent: 0
    currentPeriod.value = customer.currentPeriod? customer.currentPeriod : 0
    currentLandLordName.value = customer.currentLandLordName? customer.currentLandLordName:''
    currentLandLordPhoneNumber.value = customer.currentLandLordPhoneNumber? customer.currentLandLordPhoneNumber: ''
    previousAddress.value = customer.previousAddress? customer.previousAddress :''
    previousRent.value = customer.previousRent? customer.previousRent : 0
    previousPeriod.value = customer.previousPeriod? customer.previousPeriod : 0
    previousLandLordName.value = customer.previousLandLordName? customer.previousLandLordName:''
    previousLandLordPhoneNumber.value = customer.previousLandLordPhoneNumber? customer.previousLandLordPhoneNumber: ''
    additionalSourceInfo.value = customer.additionalSourceInfo? customer.additionalSourceInfo :''
    addSourceAmt.value = customer.additionalIncomeAmt? customer.additionalIncomeAmt : 0
}).catch((err)=>{
    console.log(err)
})


visitInformation.onchange = function(){
    if(visitInformation.selectedIndex==3){
        visitSpecification.style.display="block"    
    }
}

var inputObj={}
let mCurrentDate=moment(new Date())

submitBtn.onclick = async function(e){
    e.preventDefault();

    // Validate on visit information
    if(visitInformation.selectedIndex==3){
        var visitText = visitSpecificationText.value.trim()
        if(visitText==""){
            document.getElementById("alert-specify-reason").style.display =  ''
            return;
        }
        inputObj["visitInformation"]=visitText
    }else{
        inputObj["visitInformation"]=visitInformation.value
    }

    // Validate on building selection
    let buildingVal = building.value.trim();
    if(buildingVal =="-- Select an option --"){
        document.getElementById("alert-select-building").style.display =  ""
        return;
    }else{
        document.getElementById("alert-select-building").style.display =  "none"
    }

    // Validate on lease date
    if(!leaseDate.value){
        document.getElementById("alert-select-required-date-2").style.display =  "block"
        return;
      }

    let mLeaseDate=moment(leaseDate.value.trim()).local()
    
    // Validate on current date
    if(mCurrentDate>mLeaseDate){
        document.getElementById("alert-select-required-date-1").style.display="block"
        return
    }

    let apartmentNumber = document.getElementById("apartment").value? document.getElementById("apartment").value:null

    inputObj["leaseTerm"]=leaseTerm.value
    inputObj["requiredLeaseDate"]=mLeaseDate
    inputObj["building"]=building.value
    inputObj["apartmentNumber"]=apartmentNumber

    // Validate on first, middle and last name
    // Validations same as on the apply page
    let firstNameVal = firstName.value.trim();
    let middleNameVal = middleName.value;
    if (middleNameVal!=""){
       middleNameVal = middleNameVal.trim();
        inputObj["middleName"]=middleNameVal;
    }
    let lastNameVal = lastName.value.trim();
    if(firstNameVal=="" || lastNameVal=="" ){
        document.getElementById("alert-name").style.display =  "block";
        return;
    }else{
        document.getElementById("alert-name").style.display =  "none";
    }

    // Validate birthdate
    if(!birthDate.value){
        document.getElementById("alert-select-dob-date-1").style.display =  "block";
        return;
    }
    
    let mDOB=moment(birthDate.value).local();
    
    // Validate age
    var ageCheck = moment.duration(mCurrentDate.diff(mDOB))
    if (ageCheck<18){
        document.getElementById("alert-select-dob-date-2").style.display =  "block";
        return;
    }
    
    // Validate SSN
    var ssncheck = document.getElementById("ssncheck").checked;
    var checkRegex = /[a-zA-Z]/g;
    if(ssncheck==false){
        let ssnVal = ssn.value.trim();
    // console.log(checkRegex.test(ssnVal))
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

    // Validate phone number
    let phoneNumberVal = phoneNumber.value.trim();
    if(phoneNumberVal.length!=10 || checkRegex.test(phoneNumberVal)){
        document.getElementById("alert-phoneNumber").style.display =  "block";
        return;
    }else{
        document.getElementById("alert-phoneNumber").style.display =  "none";
    }

    // Validate email
    let emailVal = email.value.trim();
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(emailVal=="" || emailRegexp.test(email)){
        document.getElementById("alert-email").style.display =  "block";
        return;
    }else{
        document.getElementById("alert-email").style.display =  "none";
    }
    // let passwordVal = password.value;
    // if(passwordVal==""){
    //     document.getElementById("alert-password-1").style.display =  "block";
    //     return;
    // }else{
    //     document.getElementById("alert-password-1").style.display =  "none";
    // }
    // if(passwordVal.length < 5){
    //     document.getElementById('alert-password-2').style.display = 'block'
    //     return;
    // }else{
    //     // document.getElementById('alert-password-length').style.display = 'none'
    // }
    // let confirmPasswordVal = confirmPassword.value;
    // if(confirmPasswordVal==""){
    //     document.getElementById('alert-confirm-password-1').style.display = 'block'
    //     return;
    // }else{
    //     document.getElementById('alert-confirm-password-1').style.display = 'none'
    // }
    // if(passwordVal!==confirmPasswordVal){
    //     document.getElementById('alert-confirm-password-2').style.display = 'block'
    //     return;
    // }else{
    //     document.getElementById('alert-confirm-password-2').style.display = 'none'
    // }
    let applicantTypeVal = applicantType.value.trim();
    
    let coApplicantOneVal = coApplicantOne.value? coApplicantOne.value.trim(): "";
    let coApplicantTwoVal = coApplicantTwo.value? coApplicantTwo.value.trim(): "";

    // Make an input request of type form data to make a backend API request with the updated user information

    inputObj["firstName"]=firstNameVal;
    inputObj["lastName"]=lastNameVal;
    inputObj["dob"]=mDOB;
    inputObj["phoneNumber"]=phoneNumberVal;
    inputObj["email"] = emailVal;
    // inputObj["password"] = passwordVal;
    inputObj["applicantType"] = applicantTypeVal;
    inputObj["coApplicantOne"] = coApplicantOneVal;
    inputObj["coApplicantTwo"] = coApplicantTwoVal;


    // Validate current address, rent, period and landlord
    let currAddrVal = currAddr.value? currAddr.value.trim() :""
    if(currAddrVal==""){
        document.getElementById('alert-currAddress').style.display = 'block'
        return;
    }else{
        document.getElementById('alert-currAddress').style.display = 'none'
    }
    let currRentVal = currRent.value? currRent.value.trim():0
    let currPeriodVal = currPeriod.value? currPeriod.value.trim():0 
    if(currPeriodVal==""){
        document.getElementById('alert-currPeriod').style.display = 'block'
        return;
    }else{
        document.getElementById('alert-currPeriod').style.display = 'none'
    }

    let currentLandLordNameVal = currLandlordName.value? currLandlordName.value.trim(): ""
    inputObj["currentLandLordName"]=currentLandLordNameVal

    if(currLandlordPhoneNumber.value){
        if(currLandlordPhoneNumber.value.trim().length!=10){
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


    // Validate previous address, rent, period and landlord

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


    // Validate and add extra employment information

    var employmentCheck = document.getElementById("employmentCheck").checked
    let addSourceInfoVal = additionalSourceInfo.value? additionalSourceInfo.value.trim():""
    let addSourceAmtVal = additionalIncomeAmt.value? additionalIncomeAmt.value.trim():0
    inputObj["employed"]=employmentCheck;
    inputObj["additionalSourceInfo"]=addSourceInfoVal;
    inputObj["additionalIncomeAmt"]=addSourceAmtVal;

    // Make the backend API request to update
    const {data:{data}} = await axios.patch(`/admin/customer/${customerId}`,inputObj)

    // Redirect to customer specific profile page
    window.location.href=`/admin/showCustomer/${customerId}`
}