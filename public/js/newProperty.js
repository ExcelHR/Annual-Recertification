// Get all the specific elements from the HTML page
const submitBtn = document.getElementById("submit");
var buildingNumber = document.getElementById("buildingNumber")
var apartmentNumbers = document.getElementById("apartmentNumbers")
var streetNumber = document.getElementById("streetNumber")
var direction = document.getElementById("direction")
var streetName = document.getElementById("streetName")
var streetType = document.getElementById("streetType")
var streetNumber = document.getElementById("streetNumber")
var state = document.getElementById("state")
var city = document.getElementById("city")
var zipcode = document.getElementById("zipcode")

submitBtn.onclick = async function(e){
    e.preventDefault();
    var inputObj={}

    // Get the admin entered apartment numbers
    let apartmentNumbersFront = apartmentNumbers.value? apartmentNumbers.value.trim():null
    if(apartmentNumbersFront){
        apartmentArr = apartmentNumbersFront.split(" ")
        apartmentNumArr = []
        apartmentArr.forEach(apt => {
            apartmentNumArr.push(parseInt(apt))
        });
    }
    // Get the property information and append to the form data object
    let buildingNumberVal = buildingNumber.value? buildingNumber.value.trim():null
    let streetNumberVal = streetNumber.value? streetNumber.value.trim():null
    let directionVal = direction.value? direction.value.trim():null
    let streetNameVal = streetName.value? streetName.value.trim():null
    let streetTypeVal = streetType.value? streetType.value.trim():null
    let cityVal = city.value? city.value.trim():null
    let stateVal = state.value? state.value.trim():null 
    let zipcodeVal = zipcode.value? zipcode.value.trim():null
    inputObj["apartmentNumbers"]=apartmentNumArr
    inputObj["buildingNumber"]=buildingNumberVal
    inputObj["streetNumber"]=streetNumberVal
    inputObj["direction"]=directionVal
    inputObj["streetName"]=streetNameVal
    inputObj["streetType"]=streetTypeVal
    inputObj["city"]=cityVal
    inputObj["state"]=stateVal
    inputObj["zipcode"]=zipcodeVal
    let token = getToken()
    // Make a backend request to add a property to the portal
    const {data:{data}} = await axios.post("/admin/addProperty", inputObj,
    {
        headers:{
            Authorization: 'Bearer '.concat(token)
        }
    })
    window.location.href="/admin/dashboard"
}