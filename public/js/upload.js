// Get all the specific elements from the HTML page
const uploadBtn = document.getElementById("upload")

const rentalDocumentOneInput = document.getElementById("rentalDocument1")
const rentalDocumentTwoInput = document.getElementById("rentalDocument2")
const rentalDocumentThreeInput = document.getElementById("rentalDocument3")
const rentalDocumentFourInput = document.getElementById("rentalDocument4")
const rentalDocumentFiveInput = document.getElementById("rentalDocument5")
const rentalDocumentSixInput = document.getElementById("rentalDocument6")
const rentalDocumentSevenInput = document.getElementById("rentalDocument7")
const rentalDocumentEightInput = document.getElementById("rentalDocument8")
const rentalDocumentNineInput = document.getElementById("rentalDocument9")
const rentalDocumentTenInput = document.getElementById("rentalDocument10")

const rentalDocument1Link = document.getElementById("rentalDocument1Link")
const rentalDocument2Link = document.getElementById("rentalDocument2Link")
const rentalDocument3Link = document.getElementById("rentalDocument3Link")
const rentalDocument4Link = document.getElementById("rentalDocument4Link")
const rentalDocument5Link = document.getElementById("rentalDocument5Link")
const rentalDocument6Link = document.getElementById("rentalDocument6Link")
const rentalDocument7Link = document.getElementById("rentalDocument7Link")
const rentalDocument8Link = document.getElementById("rentalDocument8Link")
const rentalDocument9Link = document.getElementById("rentalDocument9Link")
const rentalDocument10Link = document.getElementById("rentalDocument10Link")


var customerId=localStorage.getItem("userId")


// axios.get(`/customer/rentalDocuments/${customerId}`)
//     .then((res)=>{
//         const files = res.data.data
//         if(files.rentalDocument1){

//             document.getElementsByTagName('h1')[0].style.display="none"

//             reUploadBtn.style.display="block"

//             rentalDocument1Link.style.display="block"
//             rentalDocument1Link.href = "http://localhost:8000/".concat(files.rentalDocument1)

//             rentalDocument2Link.style.display="block"
//             rentalDocument2Link.href = "http://localhost:8000/".concat(files.rentalDocument2)

//             rentalDocument3Link.style.display="block"
//             rentalDocument3Link.href = "http://localhost:8000/".concat(files.rentalDocument3)

//             rentalDocument4Link.style.display="block"
//             rentalDocument4Link.href = "http://localhost:8000/".concat(files.rentalDocument4)

//             rentalDocument5Link.style.display="block"
//             rentalDocument5Link.href = "http://localhost:8000/".concat(files.rentalDocument5)

//             rentalDocument6Link.style.display="block"
//             rentalDocument6Link.href = "http://localhost:8000/".concat(files.rentalDocument6)

//             rentalDocument7Link.style.display="block"
//             rentalDocument7Link.href = "http://localhost:8000/".concat(files.rentalDocument7)

//             rentalDocument8Link.style.display="block"
//             rentalDocument8Link.href = "http://localhost:8000/".concat(files.rentalDocument8)

//             rentalDocument9Link.style.display="block"
//             rentalDocument9Link.href = "http://localhost:8000/".concat(files.rentalDocument9)

//             rentalDocument10Link.style.display="block"
//             rentalDocument10Link.href = "http://localhost:8000/".concat(files.rentalDocument10)
//         }else{
//             uploadBtn.style.display="block"
//             document.getElementsByTagName('h1')[1].style.display="none"
//             document.getElementsByTagName('h3')[0].style.display="none"
//         }   
//     })
//     .catch((err)=>{
//         console.log(err)
//     })

uploadBtn.onclick = async function(e){
    e.preventDefault();
    const formData = new FormData();


    // Get the user uploaded files
    const rentalDocument1 = rentalDocumentOneInput.files
    const rentalDocument2 = rentalDocumentTwoInput.files
    const rentalDocument3 = rentalDocumentThreeInput.files
    const rentalDocument4 = rentalDocumentFourInput.files
    const rentalDocument5 = rentalDocumentFiveInput.files
    const rentalDocument6 = rentalDocumentSixInput.files
    const rentalDocument7 = rentalDocumentSevenInput.files
    const rentalDocument8 = rentalDocumentEightInput.files
    const rentalDocument9 = rentalDocumentNineInput.files
    const rentalDocument10 = rentalDocumentTenInput.files

    // Validate on the user uploaded files
    if(rentalDocument1.length==0 || rentalDocument2.length==0 || rentalDocument3.length==0 || rentalDocument4.length==0 || rentalDocument5.length==0 || rentalDocument6.length==0 || rentalDocument7.length==0 || rentalDocument8.length==0 || rentalDocument9.length==0 || rentalDocument10.length==0){
        alert("Please upload all rental documents")
        return;
    }

    // Append files to the form data object
    formData.append("rentalDocument1",rentalDocument1[0])
    formData.append("rentalDocument2",rentalDocument2[0])
    formData.append("rentalDocument3",rentalDocument3[0])
    formData.append("rentalDocument4",rentalDocument4[0])
    formData.append("rentalDocument5",rentalDocument5[0])
    formData.append("rentalDocument6",rentalDocument6[0])
    formData.append("rentalDocument7",rentalDocument7[0])
    formData.append("rentalDocument8",rentalDocument8[0])
    formData.append("rentalDocument9",rentalDocument9[0])
    formData.append("rentalDocument10",rentalDocument10[0])

    // Make a backend API request to upload the files to the database
    axios.post(`/customer/rentalDocuments/${customerId}`,formData,{
        headers:{
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then((res)=>{
        
        window.location.href="/customer/homepage"
    }).catch((err)=>{
        alert(err.response.data.message)
    })
}


