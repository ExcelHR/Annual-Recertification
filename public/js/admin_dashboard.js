
var  adminId
(async () => {
    console.log("admin_Dashboard")
    // Fetch URL Query Params
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params)
     adminId = params.id
     const code_prop={445: "THE CREST APARTMENTS",455: "PALM TERRACE",3950: "VERMONT CITY LIGHTS II",4000: "VERMONT CITY LIGHTS I",4050: "COURTLAND CITY LIGHTS",4150: "HUNTINGTON HACIENDA 1",4200: "ADAMS CITY LIGHTS",4250: "ANGELS CITY LIGHTS",4300: "BEVERLY CITY LIGHTS",4350: "BROADWAY VISTA",4400: "COCHRAN CITY LIGHTS",4450: "GARLAND CITY LIGHTS",4500: "GATEWAY CITY LIGHTS",4550: "GRANDVIEW CITY LIGHTS",4600: "HAPPY VALLEY CITY LIGHTS",4650: "MELROSE APARTMENTS",4700: "WESTLAKE CITY LIGHTS",4750: "WILSHIRE CITY LIGHTS",4800: "WITMER CITY LIGHTS",4850: "MISSION CITY LIGHTS",4900: "RAINTREE",4950: "SAGEWOOD",5000: "ATRIUM COURT",5050: "SPRINGBROOK GROVE",5100: "GENEVA VILLAGE",5150: "TANAGER SPRINGS I",5200: "TANAGER SPRINGS II",5250: "ALAMEDA TERRACE",5300: "FIGUEROA PLACE",5350: "HARVARD CIRCLE",5400: "MAIN STREET VISTAS",5450: "MENLO PARK",5500: "THE MEDITERRANEAN",5550: "VALLEY VIEW",5600: "CORTEZ CITY LIGHTS",5650: "RUNNYMEDE SPRINGS",5700: "STUDIO POINTE (WILTON)",5750: "SONOMA APT",5800: "YALE TERRACE"}
//Fetches the property details of property assigned to that CS
     const resp = await axios.get(`/admin/getAdminDetails/?id=${adminId}`)
     console.log(resp)
     property=resp.data.property
     console.log(property)
     //Display the property collapse table
     for(k=0;k<property.length;k++){
        const prop=`<div class="accordion" id="accordionExample1">
        <div class="card">
        <div class="card-header d-flex justify-content-center">
          <h2 class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#${property[k].code}" aria-expanded="false" aria-controls="collapseOne"> ${code_prop[property[k].code]}</h2>
        </div>
        <div id="${property[k].code}" class="collapse col-12" aria-labelledby="headingOne" data-parent="#accordionExample1">
            <div class="row">
            <div class="container col-12" id="cBody_${property[k].code}">
            <div class="row">
            </div>
            </div>
            </div>
            </div>`
         document.getElementById('card').insertAdjacentHTML('beforeend',prop)

            units=property[k].units
     for(j=0;j<units.length;j++){
     console.log(units[j])
     res = await axios.get(`/admin/getHouseholdInfo/?unitNo=${units[j]}&adminId=${adminId}&code=${property[k].code}`)
     console.log(res)
        data=res.data
        console.log(data)
         const unitNo=`<div class="accordion" id="accordionExample">
         <div class="card">
         <div class="card-header d-flex justify-content-center">
           <h2 class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#${units[j]}" aria-expanded="false" aria-controls="collapseOne">Unit No ${units[j]}</h2>
         </div>
         <div id="${units[j]}" class="collapse col-12" aria-labelledby="headingOne" data-parent="#accordionExample">
             <div class="row">
             <div class="container col-12" id="cBody_${units[j]}">
             <div class="row">
             </div>
             </div>
             </div>
             </div>
             `

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
     
          
           
             tbody.append(tr)
             }
             table.append(tbody)
         document.getElementById(property[k].code).insertAdjacentHTML('beforeend',unitNo)
         document.getElementById(units[j]).appendChild(table)
 
     }
     }

})()
   
  

// Redirects to tenant Document details on clicking the tenant row
const getDocuments=async (id)=>{
    console.log(id)
 window.location.href=`/admin/showDocuments/?id=${id}`

}