// Fetches the Properties from Database and adds Zip codes to select dropdown

(async () => {
    res = await axios.get('/register/getProperty')
    console.log(res.data)
    var select = document.getElementById('selectState')

    for (i in res.data) {
        option = document.createElement('option');
        option.setAttribute('value', res.data[i]);
        option.appendChild(document.createTextNode(res.data[i]));
        select.appendChild(option);
    }

})()

// Fetches the Property Names based on ZIP code
const fetchCity = async (event) => {
    console.log(event.target.value)
    res = await axios.get(`/register/fetchCity?state=${event.target.value}`)
    console.log(res.data)
    var select = document.getElementById('selectCity')
    // Removes Options from Dropdown for previously selected Zip Code
    if (select.length > 0) {
        for (var i = select.length - 1; i >= 0; i--) {
            if (select.options[i].value != 'Select City')
                select.remove(i);
        }
    }

    // Append property name to select dropdown
    for (i in res.data) {
        option = document.createElement('option');
        option.setAttribute('value', res.data[i]);
        option.appendChild(document.createTextNode(res.data[i]));
        select.appendChild(option);
    }
}
const fetchZip = async (event) => {
    console.log(event.target.value)
    res = await axios.get(`/register/fetchZip?city=${event.target.value}`)
    console.log(res.data)
    var select = document.getElementById('selectZip')
    // Removes Options from Dropdown for previously selected Zip Code
    if (select.length > 0) {
        for (var i = select.length - 1; i >= 0; i--) {
            if (select.options[i].value != 'Select Zip')
                select.remove(i);
        }
    }

    // Append property name to select dropdown
    for (i in res.data) {
        option = document.createElement('option');
        option.setAttribute('value', res.data[i]);
        option.appendChild(document.createTextNode(res.data[i]));
        select.appendChild(option);
    }
}
const fetchProperty = async (event) => {
    console.log(event.target.value)
    res = await axios.get(`/register/fetchProperty?city=${event.target.value}`)
    console.log(res.data)
    displayProperties(res.data)
    // var select = document.getElementById('selectProperty')
    // Removes Options from Dropdown for previously selected Zip Code
    // if(select.length>0){
    //     for (var i=select.length-1; i>=0; i--) {
    //         if (select.options[i].value != 'Select Property')
    //             select.remove(i);
    //     }
    // }

    // // Append property name to select dropdown
    // for (i in res.data) {
    //     option = document.createElement('option');
    //     option.setAttribute('value', res.data[i]);
    //     option.appendChild(document.createTextNode(res.data[i]));
    //     select.appendChild(option);
    // }
}
// API call to render first page of registration


const userDetails = async (property_name) => {

    console.log("userDetails")
    const property = document.getElementById('Property').value
    console.log(property_name)
    window.location.href = `/register/userDetails?property=${property_name}`
}

const displayProperties = (properties) => {
    // if (document.getElementById("property_table")) {
    //     document.getElementById("property_table").remove()
    // }
    var table = document.createElement("table");
    table.setAttribute("class", "table");
    table.setAttribute('id', 'property_table')
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var td = document.createElement("th");
    td.appendChild(document.createTextNode('Property Image'))
    tr.appendChild(td)


    var td = document.createElement("th");
    td.appendChild(document.createTextNode('Property Name'))
    tr.appendChild(td)

    var td = document.createElement("th");
    td.appendChild(document.createTextNode('Address'))
    tr.appendChild(td)
    var td = document.createElement("th");

    tr.appendChild(td)

    thead.appendChild(tr)

    table.appendChild(tr)
    for (i = 0; i < properties.length; i++) {
        var tr = document.createElement("tr");


        var td = document.createElement("td");
        var img = document.createElement('img');
        img.src = `https://images1.loopnet.com/i2/rg7ixHhoSnT-FPIgrhMUEpL4IfyeIdqzvweXQslLSI0/106/multifamily-property-for-sale-8819-reading-ave-los-angeles-ca-90045.jpg`;
        img.setAttribute("style", "width: 15rem;margin-bottom: 1.5rem;")
        td.appendChild(img);
        tr.appendChild(td)




        var td = document.createElement("td");
        td.appendChild(document.createTextNode(properties[i].Property))
        td.setAttribute("id", "Property")
        td.setAttribute("class", "align-middle")
        tr.appendChild(td)

        var td = document.createElement("td");
        let div = document.createElement('div')
        let br = document.createElement('br')
        let p1 = document.createElement('p')
        let addr = document.createTextNode(`${properties[i].Address}`)
        p1.appendChild(addr)
        let p2 = document.createElement('p')
        let addr2 = document.createTextNode(`${properties[i].City} ${properties[i].Zip}`)
        p2.appendChild(addr2)
        let p3 = document.createElement('p')
        let addr3 = document.createTextNode(` ${properties[i].State}`)
        p3.appendChild(addr3)
        div.appendChild(p1)
        div.appendChild(p2)
        div.appendChild(p3)
        td.appendChild(div)
        td.setAttribute("class", "align-middle")
        tr.appendChild(td)

        var td = document.createElement("td");
        td.setAttribute("class", "align-middle")
        var button = document.createElement("button")
        button.setAttribute("class", "btn btn-primary ")
        button.setAttribute("type", "submit")

        button.innerHTML = "Select"
        td.appendChild(button)
        tr.appendChild(td)
        table.appendChild(tr)
        button.setAttribute('onclick', `userDetails("${properties[i].Property}")`)
    }
    document.getElementById('myForm').appendChild(table)


    const form = document.getElementById("myForm");
    form.addEventListener("submit", async function (e) {
        e.preventDefault();
    })
}