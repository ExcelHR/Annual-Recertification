const form = document.getElementById("myForm");
userId = window.location.search.split("=")[1]
var name
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    window.location.href = `/user/upload_documents?id=${userId}`
    
})

const getDocuments = async (verifiedstatus) => {
    if (document.getElementById(verifiedstatus).innerHTML) {
        document.getElementById(verifiedstatus).innerHTML = ""
    }
    console.log(userId)
    resp = await axios.get(`/user/getVerifiedDocuments/?id=${userId}`)
    console.log(resp)
    const docsGroup = []
    resp.data.forEach(doc => {
        const status = []
        const householdId=doc._id
        console.log(householdId)

        const name = `${doc.name.firstName} ${doc.name.middleName} ${doc.name.lastName} `
        doc.documents.forEach(d => {
            if (d.verificationStatus == verifiedstatus)
                status.push({ originalName: d.originalName, comment: d.comment, verificationStatus: d.verificationStatus })
        })
        console.log(status)
        if (status.length != 0) {
            displayTable(status, verifiedstatus, name,householdId)
        }
        
        // else {

        //     h3 = document.createElement("h3")
        //     h3.setAttribute("id","emptyMessage")
        //     document.getElementById(verifiedstatus).appendChild(h3)

        //     if (document.getElementById(emptyMessage).innerHTML==""){
        //     h3.innerHTML = `No ${verifiedstatus} Documents`
        //     document.getElementById(verifiedstatus).appendChild(h3)
        //     }
        // }
    })


}
const displayTable = (data, status, name,householdId) => {

    console.log(data)
    console.log(householdId)
    var table = document.createElement("table");
    table.setAttribute("class", " table table-hover pointer");
    table.setAttribute("id", "table"+"_"+householdId);

    var thead = document.createElement("thead");
    var tr = document.createElement("tr");

    var th = document.createElement("th");
    th.setAttribute("scope", "col")
    th.appendChild(document.createTextNode('#'))
    tr.appendChild(th)

    var th = document.createElement("th");
    th.setAttribute("scope", "col")
    th.appendChild(document.createTextNode('Original name'))
    tr.appendChild(th)


    var th = document.createElement("th");
    th.setAttribute("scope", "col")
    th.appendChild(document.createTextNode('Verification Status'))
    tr.appendChild(th)

    var th = document.createElement("th");
    th.setAttribute("scope", "col")
    th.appendChild(document.createTextNode('Comments'))
    tr.appendChild(th)
    var color
    if (status == "Approved") {
        color = 'text-success'
    }

    if (status == "Pending") {
        color = 'text-warning'
    }
    if (status == "Rejected") {
        var th = document.createElement("th");
        th.setAttribute("scope", "col")
        color = "text-danger"
        tr.appendChild(th)
    }


    thead.appendChild(tr)
    thead.setAttribute("class", "thead-dark")
    table.appendChild(thead)
    var tbody = document.createElement("tbody");

    for (i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.setAttribute("scope", "row")
        th.appendChild(document.createTextNode(i + 1))
        th.setAttribute("class", "align-middle ")
        tr.appendChild(th)

        var td = document.createElement("td");
        td.appendChild(document.createTextNode(data[i].originalName))
        td.setAttribute("class", "align-middle ")
        tr.appendChild(td)

        var td = document.createElement("td");
        td.appendChild(document.createTextNode(status))
        td.setAttribute("class", "align-middle " + color)
        tr.appendChild(td)

        var td = document.createElement("td");
        td.appendChild(document.createTextNode(data[i].comment))
        td.setAttribute("class", "align-middle ")
        tr.appendChild(td)

        if (status == "Rejected") {
            var td = document.createElement("td");
            var form = document.createElement("form")
            form.setAttribute("class", "form-inline mt-3")
            form.setAttribute("id", "myForm2")
            form.method="POST"
            form.setAttribute("onsubmit","return false") 
            var div1 = document.createElement("div")
            div1.setAttribute("class", "form-group")
            var label = document.createElement("label")
            label.setAttribute("class", " form-label mr-3 ")
            label.innerHTML = "Please Reupload Document"
            div1.append(label)
            const input = document.createElement("INPUT");
            // input.setAttribute("type", "file");
            input.type="file"
            input.setAttribute("id",data[i].originalName+"_"+householdId );
            input.setAttribute("class", "form-control");
            
            // input.setAttribute("onclick", "uploadDoc()");    
            input.setAttribute("name", data[i].originalName);
            input.required=true

            div1.appendChild(input)


            var button2 = document.createElement("button")
            button2.setAttribute("class", " btn btn-primary")
            button2.setAttribute("type", "submit")
            button2.innerHTML = "Upload"
            div1.appendChild(button2)
            form.appendChild(div1)
            td.appendChild(form)
            td.setAttribute("class", "align-middle  ")
            tr.appendChild(td)
            button2.setAttribute('onclick', `reuploadDocuments("${data[i].originalName}","${householdId}","${status}","${i}")`)

            tr.appendChild(td)
        }

        tbody.append(tr)

    }
    nameELe = document.createTextNode(name)
    h3 = document.createElement("h3")
    h3.setAttribute("class", "d-flex justify-content-center")
    h3.appendChild(nameELe)
    table.append(tbody)
    document.getElementById(status).appendChild(h3)
    document.getElementById(status).appendChild(table)
    
}


const reuploadDocuments=async (fileName,householdId,status,i)=>{
    console.log("reuploadDocuments")
    form2 = document.getElementById("myForm2");
    console.log(form2)
    form2.addEventListener("submit",  function (e) {
        console.log(e)
           e.preventDefault();
       })
    var inputs = document.getElementById(fileName+"_"+householdId);
    console.log(inputs)
    console.log(inputs.files[0])
    const formData = new FormData();
   
           formData.append( inputs.name, inputs.files[0])
           console.log(formData)
          
     
    
    // // // Make a backend API request to login to the system
    try {
        const res = await axios.post(`/user/reuploadDocuments/?=${householdId}`,formData,{headers: {
            "Content-Type": "multipart/form-data"
              }  })

              data=res.data
            let key=Object.keys(data.file)
            const documents={fileName:data.file[key[0]][0].filename,comment:"Waiting for Validation",verificationStatus:"Pending",originalName:data.file[key[0]][0].fieldname}
            const resp=await axios.post(`/user/updateDocumentsData/?id=${householdId}`,documents)
            console.log(resp.data)
            if (resp.data){
                alert("Thank you for reuploading the documents!!")
                document.getElementById("table"+"_"+householdId).deleteRow(parseInt(i)+1)
                if(i==0){
                    document.getElementById("table"+"_"+householdId).innerHTML=`<h4 class="d-flex justify-content-center">No Rejeced Documents</h4>`
                }
                        }
             
    

}
catch(e){
    console.log(e)
}

}
