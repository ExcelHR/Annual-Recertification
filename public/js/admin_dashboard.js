var  adminId
(async () => {
    console.log("admin_Dashboard")
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params)
     adminId = params.id

     const resp = await axios.get(`/admin/getAdminDetails/?id=${adminId}`)
     units=resp.data
     console.log(units)
     for(j=0;j<units.length;j++){
     console.log(units[j])
     res = await axios.get(`/admin/getHouseholdInfo/?unitNo=${units[j]}&adminId=${adminId}`)
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
         document.getElementById('card').insertAdjacentHTML('beforeend',unitNo)
         document.getElementById(units[j]).appendChild(table)
 
     }
    

})()
   
  


const getDocuments=async (id)=>{
    console.log(id)
 window.location.href=`/admin/showDocuments/?id=${id}`

}