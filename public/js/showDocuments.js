(async () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params)
    userId = params.id
     console.log("Show Documents")
    resp = await axios.get(`/admin/getDocuments/?id=${userId}`)
    console.log(resp)
    if (!resp.data.error) {
        console.log(resp.data)
        const name=resp.data.name   
        console.log(name)
        document.getElementById('HouseholdName').innerHTML=name
        displayTable(resp.data.documents,userId)
    }
    else {
        console.log(resp)
        alert(resp.data.message)
    }

})()
const displayTable = async (data,userId) => {
    const DocsName={doc_0:"Most recent Tax Papers",doc_1:"3 months of paystubs",doc_2:"Weekly (13-14 paystubs), Bi-Weekly (7 paystubs)",doc_3:"Semi-monthly (6 paystubs), Monthly (3 paystubs)",doc_4:"TR 113 - Notorized Copy",doc_5:"Most current Award Letter",doc_6:"Most current Award Letter",doc_7:"Most current Award Letter",doc_8:"Most current Award Letter",doc_9:"Most current Award Letter",}
    console.log(data)
    console.log(DocsName)
    var table = document.createElement("table");
    table.setAttribute("class", " table table-hover pointer  ");
    table.setAttribute("id", " table");

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
    th.appendChild(document.createTextNode('File Name'))
    tr.appendChild(th)

    var th = document.createElement("th");
    th.setAttribute("scope", "col")
    th.appendChild(document.createTextNode('Document Preview'))
    tr.appendChild(th)

    var th = document.createElement("th");
    th.setAttribute("scope", "col")
    th.appendChild(document.createTextNode('Document Status'))
    tr.appendChild(th)

    var th = document.createElement("th");
    th.setAttribute("scope", "col")
    tr.appendChild(th)

    var th = document.createElement("th");
    th.setAttribute("scope", "col")
    tr.appendChild(th)

    var th = document.createElement("th");
    th.setAttribute("scope", "col")
    th.appendChild(document.createTextNode('Comments'))
    tr.appendChild(th)
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
        td.appendChild(document.createTextNode(data[i].fileName))
        td.setAttribute("class", "align-middle ")
        tr.appendChild(td)

        var td = document.createElement("td");
        a=document.createElement('a');
        a.setAttribute('href', `/admin/getFile/${data[i].fileName}`);
        a.setAttribute('target','blank')
        td.appendChild(a)
        a.innerHTML="Preview"
        td.setAttribute("class", "align-middle")
        tr.appendChild(td)

        var td = document.createElement("td");
        td.appendChild(document.createTextNode(data[i].status))
        td.setAttribute("class", "align-middle ")
        tr.appendChild(td)

        var td = document.createElement("td");
        td.setAttribute("class", "align-middle")
        var button1 = document.createElement("button")
        button1.setAttribute("class", "btn btn-success ")
        button1.setAttribute("id", "Approved")

        

        button1.innerHTML = "Approve"
        td.appendChild(button1)
        tr.appendChild(td)
        button1.setAttribute('onclick', `docsReviewed("${userId}","Approved","${data[i].originalName}")`)
        
        var td = document.createElement("td");
        td.setAttribute("class", "align-middle")
        var button2 = document.createElement("button")
        button2.setAttribute("class", "btn btn-danger ")
        button2.setAttribute("id", "Rejected")
        if(data[i].status=="Approved"){
            button1.disabled = true
        }
        button2.innerHTML = "Reject"
        td.appendChild(button2)
        tr.appendChild(td)
        button2.setAttribute('onclick', `docsReviewed("${userId}","Rejected","${data[i].originalName}")`)


        var td = document.createElement("td");
        td.setAttribute("class", "align-middle")
        const input= document.createElement("INPUT");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "Reason for rejecting");
        input.setAttribute("id", data[i].originalName+"_comments");
        input.setAttribute("name", "comments");
        input.setAttribute("class", "form-control");
        if(data[i].status=="Rejected"){
            button2.disabled = true
            input.disabled = true
            }
        td.appendChild(input)
        tr.appendChild(td)
        
        tbody.append(tr)
        
    }
    table.append(tbody)
    document.getElementById('card').appendChild(table)
}

const getDocuments=async (id)=>{
    console.log(id)
 window.location.href=`/admin/showDocuments/?id=${id}`

}
const docsReviewed=async(userId,verificationStatus,originalName)=>{
    console.log('docsReviewed')
    console.log(verificationStatus)
    var comment
    comment=document.getElementById(originalName+"_comments").value
         console.log(comment)

    alert(`Document ${verificationStatus}`)
    if(verificationStatus=="Rejected"){
         comment=document.getElementById(originalName+"_comments").value
         console.log(comment)

        }
const docInfo={userId,verificationStatus,comment,originalName}
console.log(docInfo)
const resp=await axios.post('/user/updateVerificationStatus',docInfo)

console.log(resp)
window.location.href=`/admin/showDocuments/?id=${userId}`

}