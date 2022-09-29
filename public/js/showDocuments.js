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
        if(resp.data.documents.length==0){
            h2=document.createElement("h2")
            h2.setAttribute("class","d-flex justify-content-center")
            h2.appendChild(document.createTextNode("Documents not uploaded"))
            document.getElementById('card').appendChild(h2)
        }
        else{
        displayTable(resp.data.documents,userId)
        }
    }
    else {
        console.log(resp)
        alert(resp.data.message)
    }

})()
const displayTable = async (data,userId) => {
const DocsName={doc_0:"Most recent Tax Papers",doc_1:"Weekly paystub 1",doc_2:"Weekly paystub 2",doc_3:"Weekly paystub 3",doc_4:"Weekly paystub 4",doc_5:"Weekly paystub 5",doc_6:"Weekly paystub 6",doc_7:"Weekly paystub 7",doc_8:"Weekly paystub 8",doc_9:"Weekly paystub 9",doc_10:"Weekly paystub 10",doc_11:"Weekly paystub 11",doc_12:"Weekly paystub 12",doc_13:"Weekly paystub 13",doc_14:"Weekly paystub 14",doc_15:"Bi-Weekly paystub 1",doc_16:"Bi-Weekly paystub 2",doc_17:"Bi-Weekly paystub 3",doc_18:"Bi-Weekly paystub 4",doc_19:"Bi-Weekly paystub 5",doc_20:"Bi-Weekly paystub 6",doc_21:"Bi-Weekly paystub 7",doc_22:"Semi Monthly paystub 1",doc_23:"Semi Monthly paystub 2",doc_24:"Semi Monthly paystub 3",doc_25:"Semi Monthly paystub 4",doc_26:"Semi Monthly paystub 5",doc_27:"Semi Monthly paystub 6",doc_28:"Monthly paystub 1",doc_29:"Monthly paystub 2",doc_30:"Monthly paystub 3",doc_31:"TR 113 - Notorized Copy",doc_32:"Most current Award Letter",doc_33:"Most current Award Letter",doc_35:"Most current Award Letter",doc_36:"Most current Award Letter",doc_37:"Most current Award Letter",doc_38:"Most current Award Letter",doc_39:"Court Order for Child Support payments",doc_40:"Parental Agreement for Child Support",doc_41:"Court Order for Alimony or Spousal Support",doc_42:"Court Order for Alimony or Spousal Support",doc_43:"Annual Statement",doc_44:"3 months of rent receipts & Property Tax papers",doc_45:"Financial Aid Award Letter",doc_46:"ATM Balance Slip",doc_47:"Last six months of Bank statements",doc_48:"Most current Savings Account  Statement (1 month only)",doc_49:"Printout of Current Balance",doc_50:"Revocable trust statements  from bank (6 months)",doc_51:"Property Tax Papers  (most current year) ",doc_52:"Crypto statements (6 months)",doc_53:"Stock, Bond, Treasury bills  statements (6 months)",doc_54:"Copy of Insurance & Surrender Value statement",doc_55:"Most current CD Statement (1 month)  ",doc_56:"Most current Money Mkt statement (1 month)",doc_57:"Most current statement of IRA, 401K",doc_58:"Lumpsum pension, or Keogh A/c",doc_59:"Document showing sale of asset",}
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