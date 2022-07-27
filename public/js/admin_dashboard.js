(async () => {
    const adminId = window.location.search.split("=")[1]
    console.log("admin_Dashboard")
    resp = await axios.get(`/admin/getHouseholdInfo/?id=${adminId}`)
    console.log(resp)
    if (!resp.data.error) {
        console.log(resp.data)
        displayTable(resp.data)
    }
    else {
        console.log(resp)
        alert(resp.data.message)
    }

})()
const displayTable = (data) => {
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
    th.appendChild(document.createTextNode('Name'))
    tr.appendChild(th)


    var th = document.createElement("th");
    th.setAttribute("scope", "col")
    th.appendChild(document.createTextNode('Property'))
    tr.appendChild(th)

    var th = document.createElement("th");
    th.setAttribute("scope", "col")
    th.appendChild(document.createTextNode('Unit'))
    tr.appendChild(th)

    var th = document.createElement("th");
    th.setAttribute("scope", "col")
    th.appendChild(document.createTextNode('Date of birth'))
    tr.appendChild(th)


    thead.appendChild(tr)
    thead.setAttribute("class", "thead-dark")
    table.appendChild(thead)
    var tbody = document.createElement("tbody");

    for (i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.setAttribute("scope", "row")
        tr.setAttribute('onclick', `getDocuments("${data[i].houshold_id}")`)
        th.appendChild(document.createTextNode(i + 1))
        th.setAttribute("class", "align-middle ")
        tr.appendChild(th)

        var td = document.createElement("td");
        td.appendChild(document.createTextNode(data[i].name))
        td.setAttribute("class", "align-middle ")
        tr.appendChild(td)

        var td = document.createElement("td");
        td.appendChild(document.createTextNode(data[i].property))
        td.setAttribute("class", "align-middle")
        tr.appendChild(td)

        var td = document.createElement("td");
        td.appendChild(document.createTextNode(data[i].unit))
        td.setAttribute("class", "align-middle")
        tr.appendChild(td)

        var td = document.createElement("td");
        td.appendChild(document.createTextNode(data[i].dob))
        td.setAttribute("class", "align-middle")
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