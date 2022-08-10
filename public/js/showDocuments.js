(async () => {
    const userId = window.location.search.split("=")[1]
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
    console.log(data)
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
        td.appendChild(document.createTextNode(data[i].originalName))
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
        var button1 = document.createElement("button1")
        button1.setAttribute("class", "btn btn-success ")
        button1.setAttribute("type", "submit")

        

        button1.innerHTML = "Approve"
        td.appendChild(button1)
        tr.appendChild(td)
        button1.setAttribute('onclick', `docsReviewed("${userId}","Approved","${data[i].originalName}")`)
        
        var td = document.createElement("td");
        td.setAttribute("class", "align-middle")
        var button2 = document.createElement("button2")
        button2.setAttribute("class", "btn btn-danger ")
        button2.setAttribute("type", "submit")

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