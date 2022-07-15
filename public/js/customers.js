// Function to capitalize a string
function capitalize(str) {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
}

// Backend API to fetch all the customers information
axios.get("/admin/allCustomers").then((res)=>{
    const customers = res.data.data.customers
    const customerTable = document.getElementById("customers").getElementsByTagName('tbody')[0]
    let i=0
    // Add each customer info to the table
    customers.forEach(customer => {
        i += 1; 
        let row = customerTable.insertRow();
        let number = row.insertCell(0)
        number.innerHTML=i
        let firstName=row.insertCell(1)
        firstName.innerHTML=customer.name.firstName
        let lastName=row.insertCell(2)
        lastName.innerHTML=customer.name.lastName
        let email = row.insertCell(3)
        email.innerHTML=customer.userId.email
        let currentAddress = row.insertCell(4)
        currentAddress.innerHTML=customer.currentAddress
        let phoneNumber = row.insertCell(5)
        phoneNumber.innerHTML=customer.phoneNumber
        let building = row.insertCell(6)
        building.innerHTML=customer.building
        let apartmentNumber = row.insertCell(7)
        apartmentNumber.innerHTML=customer.apartmentNumber
        let leaseTerm = row.insertCell(8)
        leaseTerm.innerHTML=customer.leaseTerm
        let requestedLeaseDate = row.insertCell(9)
        requestedLeaseDate.innerHTML=moment(customer.requiredLeaseDate).local().format('MM-DD-YYYY')
        // if(customer.files){
        //     let fileOne = row.insertCell(10)
        //     fileOne.innerHTML=`<a href="http://localhost:8000/${customer.files.rentalDocument1}">See document</a>`
        //     let fileTwo = row.insertCell(11)
        //     fileTwo.innerHTML=`<a href="/${customer.files.rentalDocument2}">See document</a>`
        // }else{
        //     let fileOne = row.insertCell(10)
        //     fileOne.innerHTML="No document"
        //     let fileTwo = row.insertCell(11)
        //     fileTwo.innerHTML="No document"
        // }
        let verification = row.insertCell(10)
        verification.innerHTML=capitalize(customer.verificationStatus)
        let view = row.insertCell(11)
        view.innerHTML=`<a href="http://localhost:8000/admin/showCustomer/${customer._id}">View</a>`
        
        // Search customer based on specific field
        // document.querySelectorAll(".search-input").forEach((inputField) => {
        //     console.log(inputField)
        //     const tableRows = inputField
        //         .closest("table")
        //         .querySelectorAll("tbody > tr");
        //     const headerCell = inputField.closest("th");
        //     console.log("tableRows")
        //     console.log(tableRows)
        //     console.log("headerCell")
        //     console.log(headerCell)
        //     const otherHeaderCells = headerCell.closest("tr").children;
        //     const columnIndex = Array.from(otherHeaderCells).indexOf(headerCell);
        //     const searchableCells = Array.from(tableRows).map(
        //         (row) => row.querySelectorAll("td")[columnIndex]
        //     );
        //     inputField.addEventListener("input", () => {
        //         const searchQuery = inputField.value.toLowerCase();
    
        //         for (const tableCell of searchableCells) {
        //         const row = tableCell.closest("tr");
        //         const value = tableCell.textContent.toLowerCase().replace(",", "");
        
        //         row.style.visibility = null;
        
        //             if (value.search(searchQuery) === -1) {
        //                 row.style.visibility = "collapse";
        //             }
        //         }
        //     });
        // });



    });
}).catch((err)=>{
    alert(err)
})

