// Get all the specific elements from the HTML page
const uploadBtn = document.getElementById("uploadDocuments")
const pdfBtn = document.getElementById("genPdf")
var anc1 = document.getElementById("anc1")
var anc2 = document.getElementById("anc2")
var anc3 = document.getElementById("anc3")
var anc4 = document.getElementById("anc4")
var anc5 = document.getElementById("anc5")
var anc6 = document.getElementById("anc5")
var l1 = document.getElementById("l1")
var l2 = document.getElementById("l2")
var l3 = document.getElementById("l3")
var l4 = document.getElementById("l4")
var l5 = document.getElementById("l5")
var l6 = document.getElementById("l6")
var divTab1 = document.getElementById("tab1")
var divTab2 = document.getElementById("tab2")
var divTab3 = document.getElementById("tab3")
var divTab4 = document.getElementById("tab4")
var divTab5 = document.getElementById("tab5")
var divTab6 = document.getElementById("tab6")


anc1.onclick = function(e){
    e.preventDefault();
}

anc2.onclick = function(e){
    e.preventDefault();
}

anc3.onclick = function(e){
    e.preventDefault();
}

anc4.onclick = function(e){
    e.preventDefault();
}

anc5.onclick = function(e){
    e.preventDefault();
}

anc6.onclick = function(e){
    e.preventDefault();
}

// Toogle on various tabs to show the customer homepage

l1.onclick = function(e){
    l2.classList.remove("active")
    divTab2.classList.remove("active")
    l3.classList.remove("active")
    divTab3.classList.remove("active")
    l4.classList.remove("active")
    divTab4.classList.remove("active")
    l5.classList.remove("active")
    divTab5.classList.remove("active")
    l6.classList.remove("active")
    divTab6.classList.remove("active") 
    divTab2.style.display="none"
    divTab3.style.display="none"
    divTab4.style.display="none"
    divTab5.style.display="none"
    divTab6.style.display="none"
    divTab1.style.display="block"
    l1.classList.add("active")
    divTab1.classList.add("active")
}

l2.onclick = function(e){
    l1.classList.remove("active")
    divTab1.classList.remove("active")
    l3.classList.remove("active")
    divTab3.classList.remove("active")
    l4.classList.remove("active")
    divTab4.classList.remove("active")
    l5.classList.remove("active")
    divTab5.classList.remove("active")
    l6.classList.remove("active")
    divTab6.classList.remove("active")
    divTab1.style.display="none"
    divTab3.style.display="none"
    divTab4.style.display="none"
    divTab5.style.display="none"
    divTab6.style.display="none"
    divTab2.style.display="block"
    l2.classList.add("active")
    divTab2.classList.add("active")
}

l3.onclick = function(e){
    l1.classList.remove("active")
    divTab1.classList.remove("active")
    l2.classList.remove("active")
    divTab2.classList.remove("active")
    l4.classList.remove("active")
    divTab4.classList.remove("active")
    l5.classList.remove("active")
    divTab5.classList.remove("active")
    l6.classList.remove("active")
    divTab6.classList.remove("active")
    divTab1.style.display="none"
    divTab2.style.display="none"
    divTab4.style.display="none"
    divTab5.style.display="none"
    divTab6.style.display="none"
    divTab3.style.display="block"
    l3.classList.add("active")
    divTab3.classList.add("active")
}

l4.onclick = function(e){
    l1.classList.remove("active")
    divTab1.classList.remove("active")
    l2.classList.remove("active")
    divTab2.classList.remove("active")
    l3.classList.remove("active")
    divTab3.classList.remove("active")
    l5.classList.remove("active")
    divTab5.classList.remove("active")
    l6.classList.remove("active")
    divTab6.classList.remove("active")
    divTab1.style.display="none"
    divTab2.style.display="none"
    divTab3.style.display="none"
    divTab5.style.display="none"
    divTab6.style.display="none"
    divTab4.style.display="block"
    l4.classList.add("active")
    divTab4.classList.add("active")
}

l5.onclick = function(e){
    l1.classList.remove("active")
    divTab1.classList.remove("active")
    l2.classList.remove("active")
    divTab2.classList.remove("active")
    l3.classList.remove("active")
    divTab3.classList.remove("active")
    l4.classList.remove("active")
    divTab4.classList.remove("active")
    l6.classList.remove("active")
    divTab6.classList.remove("active")
    divTab1.style.display="none"
    divTab2.style.display="none"
    divTab3.style.display="none"
    divTab4.style.display="none"
    divTab6.style.display="none"
    divTab5.style.display="block"
    l5.classList.add("active")
    divTab5.classList.add("active")
}

l6.onclick = function(e){
    l1.classList.remove("active")
    divTab1.classList.remove("active")
    l2.classList.remove("active")
    divTab2.classList.remove("active")
    l3.classList.remove("active")
    divTab3.classList.remove("active")
    l4.classList.remove("active")
    divTab4.classList.remove("active")
    l5.classList.remove("active")
    divTab5.classList.remove("active")
    divTab1.style.display="none"
    divTab2.style.display="none"
    divTab3.style.display="none"
    divTab4.style.display="none"
    divTab5.style.display="none"
    divTab6.style.display="block"
    l6.classList.add("active")
    divTab6.classList.add("active")
}

var customerId=localStorage.getItem("userId")
let bodyObj 

// Functions to add newrows to the specific tab of the customer homepage

function capitalize(str) {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
}

function addNewRow(key, value, href) {
    const tableRef = document.getElementById('customer-details-table').getElementsByTagName('tbody')[0];
    const newRow = tableRef.insertRow(tableRef.rows.length);
    const out = href ? `<a href="${href}">${value}</a>` : value
    newRow.innerHTML = `<td width='40%' valign='top'>${key}</td><td width='10%' valign='top'>&nbsp; : &nbsp;</td><td valign='top'>${out}</td>`;
}

function addNewRowCurrent(key, value, href) {
    const tableRef = document.getElementById('current-details-table').getElementsByTagName('tbody')[0];
    const newRow = tableRef.insertRow(tableRef.rows.length);
    const out = href ? `<a href="${href}">${value}</a>` : value
    newRow.innerHTML = `<td width='40%' valign='top'>${key}</td><td width='10%' valign='top'>&nbsp; : &nbsp;</td><td valign='top'>${out}</td>`;
}
function addNewRowPrevious(key, value, href) {
    const tableRef = document.getElementById('previous-details-table').getElementsByTagName('tbody')[0];
    const newRow = tableRef.insertRow(tableRef.rows.length);
    const out = href ? `<a href="${href}">${value}</a>` : value
    newRow.innerHTML = `<td width='40%' valign='top'>${key}</td><td width='10%' valign='top'>&nbsp; : &nbsp;</td><td valign='top'>${out}</td>`;
}
let i=0

function addCommentWithReupload(comment) {
    const tableRef = document.getElementById('rental-details-table').getElementsByTagName('tbody')[0];
    const newRow = tableRef.insertRow(tableRef.rows.length);
    i+=1
    newRow.innerHTML = `<td  width='40%' valign='top'>Comment</td><td valign='top'>&nbsp; : &nbsp;</td><td  valign='top' >${comment}</td><td valign='top'><button class="modal-btn" id="reUploadBtn${i}">Re-upload</button></td>`;
}

function addNewRowRental(key, value, href) {
    const tableRef = document.getElementById('rental-details-table').getElementsByTagName('tbody')[0];
    const newRow = tableRef.insertRow(tableRef.rows.length);
    const out = href ? `<a href="${href}">${value}</a>` : value
    newRow.innerHTML = `<td width='40%' valign='top'>${key}</td><td width='10%' valign='top'>&nbsp; : &nbsp;</td><td valign='top'>${out}</td>`;
}

function addNewRowApplication(key, value, href) {
    const tableRef = document.getElementById('application-details-table').getElementsByTagName('tbody')[0];
    const newRow = tableRef.insertRow(tableRef.rows.length);
    const out = href ? `<a href="${href}">${value}</a>` : value
    newRow.innerHTML = `<td width='40%' valign='top'>${key}</td><td width='10%' valign='top'>&nbsp; : &nbsp;</td><td valign='top'>${out}</td>`;
}

function addBreak(){
    const tableRef = document.getElementById('rental-details-table').getElementsByTagName('tbody')[0];
    const newRow = tableRef.insertRow(tableRef.rows.length);
    newRow.innerHTML = `<br>`;
}

// Make a backend API: fetch the customer information
axios.get(`/customer/details/${customerId}`).then((res)=>{
    let customer = res.data.data[0]
    if(customer.uploaded){
        uploadBtn.style.display="none"
    }
    // Add each customer info to the table
    addNewRow("First Name",customer.name.firstName)
    addNewRow("Last Name",customer.name.lastName)
    addNewRow("Email", customer.userId.email)
    addNewRow("Phone Number",customer.phoneNumber)
    addNewRow("Date of birth", moment(customer.dob).local().format('YYYY-MM-DD'))
    customer.ssnExists? addNewRow("SSN", customer.ssn): addNewRow("SSN", "No SSN") 
    addNewRowApplication("Applicant type",customer.applicantType)
    if(customer.coapplicantName){
        for(let i=0;i<customer.coapplicantName.length;i++){
            addNewRowApplication(`Coapplicant ${i+1}`, customer.coapplicantName[i])
        }
    }
    addNewRowApplication("Apartment No",customer.apartmentNumber)
    addNewRowApplication("Building",customer.building)
    addNewRowApplication("Requested lease start date", moment(customer.requiredLeaseDate).local().format('YYYY-MM-DD'))
    addNewRowApplication("Lease Term",customer.leaseTerm)
    addNewRowCurrent("Current Address",customer.currentAddress)
    if(customer.currentLandLordName){
        addNewRowCurrent("Current Landlord Name",customer.currentLandLordName)
    }
    if(customer.currentLandLordName){
        addNewRowCurrent("Current Landlord Name",customer.currentLandLordName)
    }
    if(customer.currentLandLordPhoneNumber){
        addNewRowCurrent("Current Landlord Phone Number",customer.currentLandLordPhoneNumber)
    }
    if(customer.currentRent){
        addNewRowCurrent("Current Rent",customer.currentRent)
    } 
    if(customer.currentPeriod){
        addNewRowCurrent("Current Period", customer.currentPeriod)
    }
    if(customer.previousAddress){
        addNewRowPrevious("Previous Address",customer.previousAddress)
    }
    if(customer.previousLandLordName){
        addNewRowPrevious("Previous Landlord Name",customer.previousLandLordName)
    }
    if(customer.previousLandLordPhoneNumber){
        addNewRowPrevious("Previous LandLord Phone Number", customer.previousLandLordPhoneNumber)
    }
    if(customer.previousRent){
        addNewRowPrevious("Previous Rent",customer.previousRent)
    }
    if(customer.previousPeriod){
        addNewRowPrevious("Previous Period",customer.previousPeriod)
    }
    addNewRowApplication("Visit information",customer.visitInformation)
    if(customer.additionalIncomeAmt){
        addNewRow("Additional Income", customer.additionalIncomeAmt)
    }
    if(customer.additionalSourceInfo){
        addNewRow("Additional Income Source", customer.additionalSourceInfo)
    }
    if (customer.uploaded){
        if(customer.files){
            var comment1 = customer.comments?.comment1? customer.comments.comment1: "None";
            var comment2 = customer.comments?.comment2? customer.comments.comment2: "None";
            var comment3 = customer.comments?.comment3? customer.comments.comment3: "None";
            var comment4 = customer.comments?.comment4? customer.comments.comment4: "None";
            var comment5 = customer.comments?.comment5? customer.comments.comment5: "None";
            var comment6 = customer.comments?.comment6? customer.comments.comment6: "None";
            var comment7 = customer.comments?.comment7? customer.comments.comment7: "None";
            var comment8 = customer.comments?.comment8? customer.comments.comment8: "None";
            var comment9 = customer.comments?.comment9? customer.comments.comment9: "None";
            var comment10 = customer.comments?.comment10? customer.comments.comment10: "None";

            addNewRowRental("Rental Document 1","Document","http://localhost:8000/".concat(customer.files.rentalDocument1))
            addCommentWithReupload(comment1)
            addBreak()
            addNewRowRental("Rental Document 2","Document","http://localhost:8000/".concat(customer.files.rentalDocument2))
            addCommentWithReupload(comment2)
            addBreak()
            addNewRowRental("Rental Document 3","Document","http://localhost:8000/".concat(customer.files.rentalDocument3))
            addCommentWithReupload(comment3)
            addBreak()
            addNewRowRental("Rental Document 4","Document","http://localhost:8000/".concat(customer.files.rentalDocument4))
            addCommentWithReupload(comment4)
            addBreak()
            addNewRowRental("Rental Document 5","Document","http://localhost:8000/".concat(customer.files.rentalDocument5))
            addCommentWithReupload(comment5)
            addBreak()
            addNewRowRental("Rental Document 6","Document","http://localhost:8000/".concat(customer.files.rentalDocument6))
            addCommentWithReupload(comment6)
            addBreak()
            addNewRowRental("Rental Document 7","Document","http://localhost:8000/".concat(customer.files.rentalDocument7))
            addCommentWithReupload(comment7)
            addBreak()
            addNewRowRental("Rental Document 8","Document","http://localhost:8000/".concat(customer.files.rentalDocument8))
            addCommentWithReupload(comment8)
            addBreak()
            addNewRowRental("Rental Document 9","Document","http://localhost:8000/".concat(customer.files.rentalDocument9))
            addCommentWithReupload(comment9)
            addBreak()
            addNewRowRental("Rental Document 10","Document","http://localhost:8000/".concat(customer.files.rentalDocument10))
            addCommentWithReupload(comment10)
            addBreak()
        }
    }
    if(customer.verificationStatus==="approved"){
        // do not allow to reupload
        const tableRef = document.getElementById('rental-details-table')
        tableRef.style.display="none"
        const verid = document.getElementById('verid')
        verid.style.display="block"
        addNewRowRental("Verification", `<span style='color:green'>${capitalize(customer.verificationStatus)}`)
    }else if(customer.verificationStatus==="pending"){
        //do not allow to reupload wait for admin to verify
        addNewRowRental("Verification", `<span style='color:brown'>${capitalize(customer.verificationStatus)}`)
    }else{
        const tableRef = document.getElementById('rental-details-table')
        tableRef.style.display="none"
        const verid2 = document.getElementById('verid2')
        verid2.style.display="block"
        addNewRowRental("Verification", `<span style='color:red'>${capitalize(customer.verificationStatus)}`)
        // addNewRowRental("Comment",`<span style='color:red'>${capitalize(customer.comment)}`)
    }

    var reUploadBtn1 = document.getElementById("reUploadBtn1")
    var reUploadBtn2 = document.getElementById("reUploadBtn2")
    var reUploadBtn3 = document.getElementById("reUploadBtn3")
    var reUploadBtn4 = document.getElementById("reUploadBtn4")
    var reUploadBtn5 = document.getElementById("reUploadBtn5")
    var reUploadBtn6 = document.getElementById("reUploadBtn6")
    var reUploadBtn7 = document.getElementById("reUploadBtn7")
    var reUploadBtn8 = document.getElementById("reUploadBtn8")
    var reUploadBtn9 = document.getElementById("reUploadBtn9")
    var reUploadBtn10 = document.getElementById("reUploadBtn10")

    var uploadBtn1Modal = document.getElementById("uploadBtn1Modal")
    var uploadBtn2Modal = document.getElementById("uploadBtn2Modal")
    var uploadBtn3Modal = document.getElementById("uploadBtn3Modal")
    var uploadBtn4Modal = document.getElementById("uploadBtn4Modal")
    var uploadBtn5Modal = document.getElementById("uploadBtn5Modal")
    var uploadBtn6Modal = document.getElementById("uploadBtn6Modal")
    var uploadBtn7Modal = document.getElementById("uploadBtn7Modal")
    var uploadBtn8Modal = document.getElementById("uploadBtn8Modal")
    var uploadBtn9Modal = document.getElementById("uploadBtn9Modal")
    var uploadBtn10Modal = document.getElementById("uploadBtn10Modal")

    var spanBtn1Modal = document.getElementById("spanBtn1Modal")
    var spanBtn2Modal = document.getElementById("spanBtn2Modal")
    var spanBtn3Modal = document.getElementById("spanBtn3Modal")
    var spanBtn4Modal = document.getElementById("spanBtn4Modal")
    var spanBtn5Modal = document.getElementById("spanBtn5Modal")
    var spanBtn6Modal = document.getElementById("spanBtn6Modal")
    var spanBtn7Modal = document.getElementById("spanBtn7Modal")
    var spanBtn8Modal = document.getElementById("spanBtn8Modal")
    var spanBtn9Modal = document.getElementById("spanBtn9Modal")
    var spanBtn10Modal = document.getElementById("spanBtn10Modal")

    var upd1Btn = document.getElementById("upd1-btn")
    var upd2Btn = document.getElementById("upd2-btn")
    var upd3Btn = document.getElementById("upd3-btn")
    var upd4Btn = document.getElementById("upd4-btn")
    var upd5Btn = document.getElementById("upd5-btn")
    var upd6Btn = document.getElementById("upd6-btn")
    var upd7Btn = document.getElementById("upd7-btn")
    var upd8Btn = document.getElementById("upd8-btn")
    var upd9Btn = document.getElementById("upd9-btn")
    var upd10Btn = document.getElementById("upd10-btn")

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
    
    reUploadBtn1.onclick = function(){
        uploadBtn1Modal.style.display="block"
    }

    reUploadBtn2.onclick = function(){
        uploadBtn2Modal.style.display="block"
    }

    reUploadBtn3.onclick = function(){
        uploadBtn3Modal.style.display="block"
    }

    reUploadBtn4.onclick = function(){
        uploadBtn4Modal.style.display="block"
    }

    reUploadBtn5.onclick = function(){
        uploadBtn5Modal.style.display="block"
    }

    reUploadBtn6.onclick = function(){
        uploadBtn6Modal.style.display="block"
    }

    reUploadBtn7.onclick = function(){
        uploadBtn7Modal.style.display="block"
    }

    reUploadBtn8.onclick = function(){
        uploadBtn8Modal.style.display="block"
    }

    reUploadBtn9.onclick = function(){
        uploadBtn9Modal.style.display="block"
    }

    reUploadBtn10.onclick = function(){
        uploadBtn10Modal.style.display="block"
    }

    spanBtn1Modal.onclick=function(){
        uploadBtn1Modal.style.display="none"
    }

    spanBtn2Modal.onclick=function(){
        uploadBtn2Modal.style.display="none"
    }

    spanBtn3Modal.onclick=function(){
        uploadBtn3Modal.style.display="none"
    }

    spanBtn4Modal.onclick=function(){
        uploadBtn4Modal.style.display="none"
    }

    spanBtn5Modal.onclick=function(){
        uploadBtn5Modal.style.display="none"
    }

    spanBtn6Modal.onclick=function(){
        uploadBtn6Modal.style.display="none"
    }

    spanBtn7Modal.onclick=function(){
        uploadBtn7Modal.style.display="none"
    }

    spanBtn8Modal.onclick=function(){
        uploadBtn8Modal.style.display="none"
    }

    spanBtn9Modal.onclick=function(){
        uploadBtn9Modal.style.display="none"
    }

    spanBtn10Modal.onclick=function(){
        uploadBtn10Modal.style.display="none"
    }

    // Make a backend API to reupload specific documents
    upd1Btn.onclick=function(){
        const rentalDocument1 = rentalDocumentOneInput.files
        if(rentalDocument1.length!=0){
            var formData = new FormData();
            formData.append("rentalDocument1",rentalDocument1[0])
            axios.patch(`/customer/rentalDocuments/${customerId}`,formData,{
                headers:{
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res)=>{
                
                alert("Uploaded successfully!")
                uploadBtn1Modal.style.display="none"
                window.location.reload();
            }).catch((err)=>{
                
                alert(err.response.data.message)
            })
        }else{
            alert("Please upload the file.")
            return;
        }
    }
    upd2Btn.onclick=function(){
        const rentalDocument2 = rentalDocumentTwoInput.files
        if(rentalDocument2.length!=0){
            var formData = new FormData();
            formData.append("rentalDocument2",rentalDocument2[0])
            axios.patch(`/customer/rentalDocuments/${customerId}`,formData,{
                headers:{
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res)=>{
                
                alert("Uploaded successfully!")
                uploadBtn2Modal.style.display="none"
                window.location.reload();
            }).catch((err)=>{
                
                alert(err.response.data.message)
            })
        }else{
            alert("Please upload the file.")
            return;
        }
    
    }
    upd3Btn.onclick=function(){
        const rentalDocument3 = rentalDocumentThreeInput.files
        if(rentalDocument3.length!=0){
            var formData = new FormData();
            formData.append("rentalDocument3",rentalDocument3[0])
            axios.patch(`/customer/rentalDocuments/${customerId}`,formData,{
                headers:{
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res)=>{
                
                alert("Uploaded successfully!")
                uploadBtn3Modal.style.display="none"
                window.location.reload();
            }).catch((err)=>{
                
                alert(err.response.data.message)
            })
        }else{
            alert("Please upload the file.")
            return;
        }

    }
    upd4Btn.onclick=function(){
        const rentalDocument4 = rentalDocumentFourInput.files
        if(rentalDocument4.length!=0){
            var formData = new FormData();
            formData.append("rentalDocument4",rentalDocument4[0])
            axios.patch(`/customer/rentalDocuments/${customerId}`,formData,{
                headers:{
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res)=>{
                
                alert("Uploaded successfully!")
                uploadBtn4Modal.style.display="none"
                window.location.reload();
            }).catch((err)=>{
                
                alert(err.response.data.message)
            })
        }else{
            alert("Please upload the file.")
            return;
        }

    }
    upd5Btn.onclick=function(){
        const rentalDocument5 = rentalDocumentFiveInput.files
        if(rentalDocument5.length!=0){
            var formData = new FormData();
            formData.append("rentalDocument5",rentalDocument5[0])
            axios.patch(`/customer/rentalDocuments/${customerId}`,formData,{
                headers:{
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res)=>{
                
                alert("Uploaded successfully!")
                uploadBtn5Modal.style.display="none"
                window.location.reload();
            }).catch((err)=>{
                
                alert(err.response.data.message)
            })
        }else{
            alert("Please upload the file.")
            return;
        }

    }
    upd6Btn.onclick=function(){
        const rentalDocument6 = rentalDocumentSixInput.files
        if(rentalDocument6.length!=0){
            var formData = new FormData();
            formData.append("rentalDocument6",rentalDocument6[0])
            axios.patch(`/customer/rentalDocuments/${customerId}`,formData,{
                headers:{
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res)=>{
                
                alert("Uploaded successfully!")
                uploadBtn6Modal.style.display="none"
                window.location.reload();
            }).catch((err)=>{
                
                alert(err.response.data.message)
            })
        }else{
            alert("Please upload the file.")
            return;
        }

    }
    upd7Btn.onclick=function(){
        const rentalDocument7 = rentalDocumentSevenInput.files
        if(rentalDocument7.length!=0){
            var formData = new FormData();
            formData.append("rentalDocument7",rentalDocument7[0])
            axios.patch(`/customer/rentalDocuments/${customerId}`,formData,{
                headers:{
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res)=>{
                
                alert("Uploaded successfully!")
                uploadBtn7Modal.style.display="none"
                window.location.reload();

            }).catch((err)=>{
                
                alert(err.response.data.message)
            })
        }else{
            alert("Please upload the file.")
            return;
        }

    }
    upd8Btn.onclick=function(){
        const rentalDocument8 = rentalDocumentEightInput.files
        if(rentalDocument8.length!=0){
            var formData = new FormData();
            formData.append("rentalDocument8",rentalDocument8[0])
            axios.patch(`/customer/rentalDocuments/${customerId}`,formData,{
                headers:{
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res)=>{
                
                alert("Uploaded successfully!")
                uploadBtn8Modal.style.display="none"
                window.location.reload();

            }).catch((err)=>{
                
                alert(err.response.data.message)
            })
        }else{
            alert("Please upload the file.")
            return;
        }

    }
    upd9Btn.onclick=function(){
        const rentalDocument9 = rentalDocumentNineInput.files
        if(rentalDocument9.length!=0){
            var formData = new FormData();
            formData.append("rentalDocument9",rentalDocument9[0])
            axios.patch(`/customer/rentalDocuments/${customerId}`,formData,{
                headers:{
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res)=>{
                
                alert("Uploaded successfully!")
                uploadBtn9Modal.style.display="none"
                window.location.reload();

            }).catch((err)=>{
                
                alert(err.response.data.message)
            })
        }else{
            alert("Please upload the file.")
            return;
        }

    }
    upd10Btn.onclick=function(){
        const rentalDocument10 = rentalDocumentTenInput.files
        if(rentalDocument10.length!=0){
            var formData = new FormData();
            formData.append("rentalDocument10",rentalDocument10[0])
            axios.patch(`/customer/rentalDocuments/${customerId}`,formData,{
                headers:{
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res)=>{
                
                alert("Uploaded successfully!")
                uploadBtn10Modal.style.display="none"
                window.location.reload();

            }).catch((err)=>{
                
                alert(err.response.data.message)
            })
        }else{
            alert("Please upload the file.")
            return;
        }
    }
}).catch((err)=>{
    
})

// Redirect user to the uplaod (first time uploads page)
uploadBtn.onclick = async function(e){
    e.preventDefault();
    window.location.href="/customer/uploadDocuments"
}