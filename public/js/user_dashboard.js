(async () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params)
    userId = params.id
    code = params.code
    unitNo=params.unitNo
    householdName=params.name
    console.log(userId, code,unitNo)
    res = await axios.get(`/register/getProperty/?code=${code}`)
    console.log(res.data)
    document.getElementById('name').innerHTML=res.data.Property
    document.getElementById('unitNo').innerHTML="Unit No"+" "+ unitNo
    document.getElementById('address1').innerHTML=res.data.Address
    document.getElementById('address2').innerHTML=`${res.data.City}      ${res.data.Zip}      ${res.data.State}`
    document.getElementById('HouseholdName').innerHTML="Welcome"+" "+ householdName+"!!"
    respData=await axios.post(`/user/addProperty`,{id:userId,Property:res.data.Property})
    console.log(respData)
 

})()
const form = document.getElementById("myForm");



form.addEventListener("submit", async function (e) {
    e.preventDefault();
    window.location.href = `/user/upload_documents/?id=${userId}`

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
        const householdId = doc._id
        console.log(householdId)

        const name = `${doc.firstName} ${doc.lastName} `
        doc.documents.forEach(d => {
            if (d.verificationStatus == verifiedstatus)
                status.push({ originalName: d.originalName, comment: d.comment, verificationStatus: d.verificationStatus })
        })
        console.log(status)
        if (status.length != 0) {
            displayTable(status, verifiedstatus, name, householdId)
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
const displayTable = (data, status, name, householdId) => {
const DocsName={doc_0:"Most recent Tax Papers",doc_1:"Weekly paystub 1",doc_2:"Weekly paystub 2",doc_3:"Weekly paystub 3",doc_4:"Weekly paystub 4",doc_5:"Weekly paystub 5",doc_6:"Weekly paystub 6",doc_7:"Weekly paystub 7",doc_8:"Weekly paystub 8",doc_9:"Weekly paystub 9",doc_10:"Weekly paystub 10",doc_11:"Weekly paystub 11",doc_12:"Weekly paystub 12",doc_13:"Weekly paystub 13",doc_14:"Weekly paystub 14",doc_15:"Bi-Weekly paystub 1",doc_16:"Bi-Weekly paystub 2",doc_17:"Bi-Weekly paystub 3",doc_18:"Bi-Weekly paystub 4",doc_19:"Bi-Weekly paystub 5",doc_20:"Bi-Weekly paystub 6",doc_21:"Bi-Weekly paystub 7",doc_22:"Semi Monthly paystub 1",doc_23:"Semi Monthly paystub 2",doc_24:"Semi Monthly paystub 3",doc_25:"Semi Monthly paystub 4",doc_26:"Semi Monthly paystub 5",doc_27:"Semi Monthly paystub 6",doc_28:"Monthly paystub 1",doc_29:"Monthly paystub 2",doc_30:"Monthly paystub 3",doc_31:"TR 113 - Notorized Copy",doc_32:"Most current Award Letter",doc_33:"Most current Award Letter",doc_35:"Most current Award Letter",doc_36:"Most current Award Letter",doc_37:"Most current Award Letter",doc_38:"Most current Award Letter",doc_39:"Court Order for Child Support payments",doc_40:"Parental Agreement for Child Support",doc_41:"Court Order for Alimony or Spousal Support",doc_42:"Court Order for Alimony or Spousal Support",doc_43:"Annual Statement",doc_44:"3 months of rent receipts & Property Tax papers",doc_45:"Financial Aid Award Letter",doc_46:"ATM Balance Slip",doc_47:"Last six months of Bank statements",doc_48:"Most current Savings Account  Statement (1 month only)",doc_49:"Printout of Current Balance",doc_50:"Revocable trust statements  from bank (6 months)",doc_51:"Property Tax Papers  (most current year) ",doc_52:"Crypto statements (6 months)",doc_53:"Stock, Bond, Treasury bills  statements (6 months)",doc_54:"Copy of Insurance & Surrender Value statement",doc_55:"Most current CD Statement (1 month)  ",doc_56:"Most current Money Mkt statement (1 month)",doc_57:"Most current statement of IRA, 401K",doc_58:"Lumpsum pension, or Keogh A/c",doc_59:"Document showing sale of asset",}
    console.log(data)
    console.log(householdId)
    var table = document.createElement("table");
    table.setAttribute("class", " table table-hover pointer");
    table.setAttribute("id", "table" + "_" + householdId);

    var thead = document.createElement("thead");
    var tr = document.createElement("tr");

    var th = document.createElement("th");
    th.setAttribute("scope", "col")
    th.appendChild(document.createTextNode('#'))
    tr.appendChild(th)

    var th = document.createElement("th");
    th.setAttribute("scope", "col")
    th.setAttribute("class", "col-md-2")
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
        td.appendChild(document.createTextNode(DocsName[data[i].originalName]))
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
            form.method = "POST"
            form.setAttribute("onsubmit", "return false")
            var div1 = document.createElement("div")
            div1.setAttribute("class", "form-group")
            var label = document.createElement("label")
            label.setAttribute("class", " form-label mr-3 ")
            label.innerHTML = "Please Reupload Document"
            div1.append(label)
            const input = document.createElement("INPUT");
            // input.setAttribute("type", "file");
            input.type = "file"
            input.setAttribute("id", data[i].originalName + "_" + householdId);
            input.setAttribute("class", "form-control");

            // input.setAttribute("onclick", "uploadDoc()");    
            input.setAttribute("name", data[i].originalName);
            input.required = true

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


const reuploadDocuments = async (fileName, householdId, status, i) => {
    console.log("reuploadDocuments")
    console.log(householdId)
    form2 = document.getElementById("myForm2");
    console.log(form2)
    form2.addEventListener("submit", function (e) {
        console.log(e)
        e.preventDefault();
    })
    var inputs = document.getElementById(fileName + "_" + householdId);
    console.log(inputs)
    console.log(inputs.files[0])
    const formData = new FormData();

    formData.append(inputs.name, inputs.files[0])
    console.log(formData)



    // // // Make a backend API request to login to the system
    try {
        const res = await axios.post(`/user/reuploadDocuments/?id=${householdId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        data = res.data
        let key = Object.keys(data.file)
        const documents = { fileName: data.file[key[0]][0].filename, comment: "Waiting for Validation", verificationStatus: "Pending", originalName: data.file[key[0]][0].fieldname }
        var numRows = document.getElementById("table"+ "_" + householdId).rows.length
        console.log(numRows)
        const resp = await axios.post(`/user/updateDocumentsData/?id=${householdId}`, documents)
        console.log(resp.data)
        if (resp.data) {
            alert("Thank you for reuploading the documents!!")
            if (numRows==2) {
                document.getElementById("table" + "_" + householdId).innerHTML = `<h4 class="d-flex justify-content-center">No Rejeced Documents</h4>`
            }
            else{
            document.getElementById("table" + "_" + householdId).deleteRow(parseInt(i) + 1)
            }
        }



    }
    catch (e) {
        console.log(e)
    }

}

const addNewTentant=()=>{
    console.log("addNewTentant")
    window.location.href=`/user/addNewTenant/?id=${userId}&code=${code}&unitNo=${unitNo}&name=${householdName}`
}