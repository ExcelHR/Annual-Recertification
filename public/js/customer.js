// Get all the specific elements from the HTML page
var modal = document.getElementById("myModal")
var btn = document.getElementById("reject-button")
var span = document.getElementsByClassName("close")[0]
var comment = document.getElementById("comment")
// var rejectBtn = document.getElementById("rjt-btn")
var approveBtn = document.getElementById("approve-button")
var editBtn = document.getElementById("edit-button")
var deleteBtn = document.getElementById("delete-button")
var anc1 = document.getElementById("anc1")
var anc2 = document.getElementById("anc2")
var anc3 = document.getElementById("anc3")
var anc4 = document.getElementById("anc4")
var anc5 = document.getElementById("anc5")
var l1 = document.getElementById("l1")
var l2 = document.getElementById("l2")
var l3 = document.getElementById("l3")
var l4 = document.getElementById("l4")
var l5 = document.getElementById("l5")
var divTab1 = document.getElementById("tab1")
var divTab2 = document.getElementById("tab2")
var divTab3 = document.getElementById("tab3")
var divTab4 = document.getElementById("tab4")
var divTab5 = document.getElementById("tab5")



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
    divTab2.style.display="none"
    divTab3.style.display="none"
    divTab4.style.display="none"
    divTab5.style.display="none"
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
    divTab1.style.display="none"
    divTab3.style.display="none"
    divTab4.style.display="none"
    divTab5.style.display="none"
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
    divTab1.style.display="none"
    divTab2.style.display="none"
    divTab4.style.display="none"
    divTab5.style.display="none"
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
    divTab1.style.display="none"
    divTab2.style.display="none"
    divTab3.style.display="none"
    divTab5.style.display="none"
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
    divTab1.style.display="none"
    divTab2.style.display="none"
    divTab3.style.display="none"
    divTab4.style.display="none"
    divTab5.style.display="block"
    l5.classList.add("active")
    divTab5.classList.add("active")
}

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
function addNewComment(comment) {
    const tableRef = document.getElementById('rental-details-table').getElementsByTagName('tbody')[0];
    const newRow = tableRef.insertRow(tableRef.rows.length);
    i+=1
    newRow.innerHTML = `<td  width='40%' valign='top'>Previous comment</td><td valign='top'>&nbsp; : &nbsp;</td><td  valign='top' >${comment}</td><td  valign='top'><button class="modal-btn" id="commentBtn${i}">Comment</button></td>`;
}
let j=0
function addNewRowRental(state, key, value, href) {
    const tableRef = document.getElementById('rental-details-table').getElementsByTagName('tbody')[0];
    const newRow = tableRef.insertRow(tableRef.rows.length);
    j+=1
    const out = href ? `<a href="${href}" onclick ="update(${j})" target="_blank"">${value}</a>` : value
    newRow.innerHTML = `<td width='40%' valign='top'>${key}</td>
                        <td width='10%' valign='top'>&nbsp; : &nbsp;</td>
                        <td valign='top'>${out}</td>
                        <td valign='top'>${state}</td>
                        `;
}

function addBreak(){
    const tableRef = document.getElementById('rental-details-table').getElementsByTagName('tbody')[0];
    const newRow = tableRef.insertRow(tableRef.rows.length);
    newRow.innerHTML = `<br>`;
}

function addNewRowApplication(key, value, href) {
    const tableRef = document.getElementById('application-details-table').getElementsByTagName('tbody')[0];
    const newRow = tableRef.insertRow(tableRef.rows.length);
    const out = href ? `<a href="${href}">${value}</a>` : value
    newRow.innerHTML = `<td width='40%' valign='top'>${key}</td><td width='10%' valign='top'>&nbsp; : &nbsp;</td><td valign='top'>${out}</td>`;
}

let commentObj = {}


// Make a backend API: fetch the customer information
axios.get(`/admin/customer/${customerId}`)
    .then((res)=>{
        let customer = res.data.data[0]
        // Add the info received to the specific tabs using the above functions
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
            
            let state1 = customer.newFile.rentalDocument1? `<span style='color:green'>${capitalize("New *")}`: "    "
            let state2 = customer.newFile.rentalDocument2? `<span style='color:green'>${capitalize("New *")}`: "    "
            let state3 = customer.newFile.rentalDocument3? `<span style='color:green'>${capitalize("New *")}`: "    "
            let state4 = customer.newFile.rentalDocument4? `<span style='color:green'>${capitalize("New *")}`: "    "
            let state5 = customer.newFile.rentalDocument5? `<span style='color:green'>${capitalize("New *")}`: "    "
            let state6 = customer.newFile.rentalDocument6? `<span style='color:green'>${capitalize("New *")}`: "    "
            let state7 = customer.newFile.rentalDocument7? `<span style='color:green'>${capitalize("New *")}`: "    "
            let state8 = customer.newFile.rentalDocument8? `<span style='color:green'>${capitalize("New *")}`: "    "
            let state9 = customer.newFile.rentalDocument9? `<span style='color:green'>${capitalize("New *")}`: "    "
            let state10 = customer.newFile.rentalDocument10? `<span style='color:green'>${capitalize("New *")}`: "    "


            addNewRowRental(state1, "Rental Document 1","Document","http://localhost:8000/".concat(customer.files.rentalDocument1))
            addNewComment(comment1)
            addBreak()
            addNewRowRental(state2,"Rental Document 2","Document","http://localhost:8000/".concat(customer.files.rentalDocument2),comment2)
            addNewComment(comment2)
            addBreak()
            addNewRowRental (state3,"Rental Document 3","Document","http://localhost:8000/".concat(customer.files.rentalDocument3),comment3)
            addNewComment(comment3)
            addBreak()
            addNewRowRental(state4, "Rental Document 4","Document","http://localhost:8000/".concat(customer.files.rentalDocument4),comment4)
            addNewComment(comment4)
            addBreak()
            addNewRowRental(state5, "Rental Document 5","Document","http://localhost:8000/".concat(customer.files.rentalDocument5),comment5)
            addNewComment(comment5)
            addBreak()
            addNewRowRental(state6,"Rental Document 6","Document","http://localhost:8000/".concat(customer.files.rentalDocument6),comment6)
            addNewComment(comment6)
            addBreak()
            addNewRowRental(state7,"Rental Document 7","Document","http://localhost:8000/".concat(customer.files.rentalDocument7),comment7)
            addNewComment(comment7)
            addBreak()
            addNewRowRental(state8,"Rental Document 8","Document","http://localhost:8000/".concat(customer.files.rentalDocument8),comment8)
            addNewComment(comment8)
            addBreak()
            addNewRowRental(state9,"Rental Document 9","Document","http://localhost:8000/".concat(customer.files.rentalDocument9),comment9)
            addNewComment(comment9)
            addBreak()
            addNewRowRental(state10,"Rental Document 10","Document","http://localhost:8000/".concat(customer.files.rentalDocument10),comment10)
            addNewComment(comment10)
        }
        if(customer.verificationStatus==="approved"){
            addNewRowRental("    ","Verification", `<span style='color:green'>${capitalize(customer.verificationStatus)}`)
        }else if(customer.verificationStatus==="pending"){
            addNewRowRental("    ","Verification", `<span style='color:brown'>${capitalize(customer.verificationStatus)}`)
        }else{
            addNewRowRental("    ","Verification", `<span style='color:red'>${capitalize(customer.verificationStatus)}`)
        }

        var commentBtn1 = document.getElementById("commentBtn1")
        var commentBtn2 = document.getElementById("commentBtn2")
        var commentBtn3 = document.getElementById("commentBtn3")
        var commentBtn4 = document.getElementById("commentBtn4")
        var commentBtn5 = document.getElementById("commentBtn5")
        var commentBtn6 = document.getElementById("commentBtn6")
        var commentBtn7 = document.getElementById("commentBtn7")
        var commentBtn8 = document.getElementById("commentBtn8")
        var commentBtn9 = document.getElementById("commentBtn9")
        var commentBtn10 = document.getElementById("commentBtn10")

        var commentBtn1Modal = document.getElementById("commentBtn1Modal")
        var commentBtn2Modal = document.getElementById("commentBtn2Modal")
        var commentBtn3Modal = document.getElementById("commentBtn3Modal")
        var commentBtn4Modal = document.getElementById("commentBtn4Modal")
        var commentBtn5Modal = document.getElementById("commentBtn5Modal")
        var commentBtn6Modal = document.getElementById("commentBtn6Modal")
        var commentBtn7Modal = document.getElementById("commentBtn7Modal")
        var commentBtn8Modal = document.getElementById("commentBtn8Modal")
        var commentBtn9Modal = document.getElementById("commentBtn9Modal")
        var commentBtn10Modal = document.getElementById("commentBtn10Modal")

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

        var cmt1Btn = document.getElementById("cmt1-btn")
        var cmt2Btn = document.getElementById("cmt2-btn")
        var cmt3Btn = document.getElementById("cmt3-btn")
        var cmt4Btn = document.getElementById("cmt4-btn")
        var cmt5Btn = document.getElementById("cmt5-btn")
        var cmt6Btn = document.getElementById("cmt6-btn")
        var cmt7Btn = document.getElementById("cmt7-btn")
        var cmt8Btn = document.getElementById("cmt8-btn")
        var cmt9Btn = document.getElementById("cmt9-btn")
        var cmt10Btn = document.getElementById("cmt10-btn")

        var comment1 = document.getElementById("comment1")
        var comment2 = document.getElementById("comment2")
        var comment3 = document.getElementById("comment3")
        var comment4 = document.getElementById("comment4")
        var comment5 = document.getElementById("comment5")
        var comment6 = document.getElementById("comment6")
        var comment7 = document.getElementById("comment7")
        var comment8 = document.getElementById("comment8")
        var comment9 = document.getElementById("comment9")
        var comment10 = document.getElementById("comment10")
        
        commentBtn1.onclick = function(){
            commentBtn1Modal.style.display="block"
        }

        commentBtn2.onclick = function(){
            commentBtn2Modal.style.display="block"
        }

        commentBtn3.onclick = function(){
            commentBtn3Modal.style.display="block"
        }

        commentBtn4.onclick = function(){
            commentBtn4Modal.style.display="block"
        }

        commentBtn5.onclick = function(){
            commentBtn5Modal.style.display="block"
        }

        commentBtn6.onclick = function(){
            commentBtn6Modal.style.display="block"
        }

        commentBtn7.onclick = function(){
            commentBtn7Modal.style.display="block"
        }

        commentBtn8.onclick = function(){
            commentBtn8Modal.style.display="block"
        }

        commentBtn9.onclick = function(){
            commentBtn9Modal.style.display="block"
        }

        commentBtn10.onclick = function(){
            commentBtn10Modal.style.display="block"
        }

        spanBtn1Modal.onclick=function(){
            commentBtn1Modal.style.display="none"
        }

        spanBtn2Modal.onclick=function(){
            commentBtn2Modal.style.display="none"
        }

        spanBtn3Modal.onclick=function(){
            commentBtn3Modal.style.display="none"
        }

        spanBtn4Modal.onclick=function(){
            commentBtn4Modal.style.display="none"
        }

        spanBtn5Modal.onclick=function(){
            commentBtn5Modal.style.display="none"
        }

        spanBtn6Modal.onclick=function(){
            commentBtn6Modal.style.display="none"
        }

        spanBtn7Modal.onclick=function(){
            commentBtn7Modal.style.display="none"
        }

        spanBtn8Modal.onclick=function(){
            commentBtn8Modal.style.display="none"
        }

        spanBtn9Modal.onclick=function(){
            commentBtn9Modal.style.display="none"
        }

        spanBtn10Modal.onclick=function(){
            commentBtn10Modal.style.display="none"
        }


        // Create comment object based on the admin entered comments

        cmt1Btn.onclick=function(){
            var comment1Text = comment1.value.trim()
            if(comment1Text==""){
                alert("Please enter the comment.")
                return;
            }
            var commentObj = {}
            commentObj["comment1"] = comment1Text
            axios.post(`/admin/customer/${customerId}/comments`,{
                "comments":commentObj
            }).then((res)=>{
                
                alert("Updated successfully!")
                commentBtn1Modal.style.display="none"
                window.location.reload();
            }).catch((err)=>{
                
                alert(err.response.data.message)
            })
        }
        cmt2Btn.onclick=function(){
            var comment2Text = comment2.value.trim()
            if(comment2Text==""){
                alert("Please enter the comment.")
                return;
            }
            var commentObj = {}
            commentObj["comment2"] = comment2Text
            axios.post(`/admin/customer/${customerId}/comments`,{
                "comments":commentObj
            }).then((res)=>{
                
                alert("Updated successfully!")
                commentBtn2Modal.style.display="none"
                window.location.reload();
            }).catch((err)=>{
                
                alert(err.response.data.message)
            })
        }
        cmt3Btn.onclick=function(){
            var comment3Text = comment3.value.trim()
            if(comment3Text==""){
                alert("Please enter the comment.")
                return;
            }
            var commentObj = {}
            commentObj["comment3"] = comment3Text
            axios.post(`/admin/customer/${customerId}/comments`,{
                "comments":commentObj
            }).then((res)=>{
                
                alert("Updated successfully!")
                commentBtn3Modal.style.display="none"
                window.location.reload();
            }).catch((err)=>{
                
                alert(err.response.data.message)
            })
        }
        cmt4Btn.onclick=function(){
            var comment4Text = comment4.value.trim()
            if(comment4Text==""){
                alert("Please enter the comment.")
                return;
            }
            var commentObj = {}
            commentObj["comment4"] = comment4Text
            axios.post(`/admin/customer/${customerId}/comments`,{
                "comments":commentObj
            }).then((res)=>{
                
                alert("Updated successfully!")
                commentBtn4Modal.style.display="none"
                window.location.reload();
            }).catch((err)=>{
                
                alert(err.response.data.message)
            })
        }
        cmt5Btn.onclick=function(){
            var comment5Text = comment5.value.trim()
            if(comment5Text==""){
                alert("Please enter the comment.")
                return;
            }
            var commentObj = {}
            commentObj["comment5"] = comment5Text
            axios.post(`/admin/customer/${customerId}/comments`,{
                "comments":commentObj
            }).then((res)=>{
                
                alert("Updated successfully!")
                commentBtn5Modal.style.display="none"
                window.location.reload();
            }).catch((err)=>{
                
                alert(err.response.data.message)
            })
        }
        cmt6Btn.onclick=function(){
            var comment6Text = comment6.value.trim()
            if(comment6Text==""){
                alert("Please enter the comment.")
                return;
            }
            var commentObj = {}
            commentObj["comment6"] = comment6Text
            axios.post(`/admin/customer/${customerId}/comments`,{
                "comments":commentObj
            }).then((res)=>{
                
                alert("Updated successfully!")
                commentBtn6Modal.style.display="none"
                window.location.reload();
            }).catch((err)=>{
                
                alert(err.response.data.message)
            })
        }
        cmt7Btn.onclick=function(){
            var comment7Text = comment7.value.trim()
            if(comment7Text==""){
                alert("Please enter the comment.")
                return;
            }
            var commentObj = {}
            commentObj["comment7"] = comment7Text
            axios.post(`/admin/customer/${customerId}/comments`,{
                "comments":commentObj
            }).then((res)=>{
                
                alert("Updated successfully!")
                commentBtn7Modal.style.display="none"
                window.location.reload();
            }).catch((err)=>{
                
                alert(err.response.data.message)
            })
        }
        cmt8Btn.onclick=function(){
            var comment8Text = comment8.value.trim()
            if(comment8Text==""){
                alert("Please enter the comment.")
                return;
            }
            var commentObj = {}
            commentObj["comment8"] = comment8Text
            axios.post(`/admin/customer/${customerId}/comments`,{
                "comments":commentObj
            }).then((res)=>{
                
                alert("Updated successfully!")
                commentBtn8Modal.style.display="none"
                window.location.reload();
            }).catch((err)=>{
                
                alert(err.response.data.message)
            })
        }
        cmt9Btn.onclick=function(){
            var comment9Text = comment9.value.trim()
            if(comment9Text==""){
                alert("Please enter the comment.")
                return;
            }
            var commentObj = {}
            commentObj["comment9"] = comment9Text
            axios.post(`/admin/customer/${customerId}/comments`,{
                "comments":commentObj
            }).then((res)=>{
                
                alert("Updated successfully!")
                commentBtn9Modal.style.display="none"
                window.location.reload();
            }).catch((err)=>{
                
                alert(err.response.data.message)
            })
        }
        cmt10Btn.onclick=function(){
            var comment10Text = comment10.value.trim()
            if(comment10Text==""){
                alert("Please enter the comment.")
                return;
            }
            var commentObj = {}
            commentObj["comment10"] = comment10Text
            axios.post(`/admin/customer/${customerId}/comments`,{
                "comments":commentObj
            }).then((res)=>{
                
                alert("Updated successfully!")
                commentBtn10Modal.style.display="none"
                window.location.reload();
            }).catch((err)=>{
                
                alert(err.response.data.message)
            })
        }
    }).catch((err)=>{
        
})


// btn.onclick = function(){
//     console.log(commentObj)
//     // modal.style.display="block"
//     axios.post(`/admin/customer/${customerId}/comment`,{
//         "comments":commentObj
//     })
// }

span.onclick=function(){
    modal.style.display="none"
}

// Call backend API to reject documents
btn.onclick=function(){
    modal.style.display="none"
    axios.post(`/admin/customer/${customerId}/setState`,{
        "verificationStatus":"rejected"
    }).then((res)=>{
        alert("Updated successfully!")
        window.location.reload()
    }).catch((err)=>{
        
    })
}

// Call backend API to approve documents
approveBtn.onclick=function(){
    axios.post(`/admin/customer/${customerId}/setState`,{
        "verificationStatus":"approved"
    }).then((res)=>{
        alert("Updated successfully!")
        window.location.reload()
    })
    .catch((err)=>{
        
    })
}

// Call backend API to edit customer
editBtn.onclick=function(){
    window.location.href=`/admin/editCustomer/${customerId}`
}

// Call backend API to delete customer
deleteBtn.onclick=function(){
    axios.delete(`/admin/customer/${customerId}`).then((res)=>{
        
        console.log(res.data)
        window.location="/admin/showAllCustomers"
    })
    .catch((err)=>{
        
    })
}

// Call backend API to update on customer opened documents
function update(identity){
    f="rentalDocument".concat(identity)
    axios.post(`/admin/customer/${customerId}/viewed`,{
        "file":f
    }).then((res)=>{
        // alert("Updated successfully!")
        // window.location.reload()
    })
    .catch((err)=>{
        
    })  
}