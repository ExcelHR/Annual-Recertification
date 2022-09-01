(async()=>{
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params)
    userId = params.id
    const resp=await axios.get(`/user/getTenantsDetails/?id=${userId}`)
    
    if(resp.data=="Error"){
        alert("Something Went Wromg Please Login Again")
        window.location.href="/"
    }
    else{
      
        tenantsDetails=resp.data
        console.log(tenantsDetails)
        tenants=[]
        const upload_body=document.getElementById('dashboard_card')

        tenantsDetails.forEach(tenant=>{
            tenants.push({name:`${tenant.firstName} ${tenant.lastName}`,tenantId:tenant._id})
            const upload=`
            <div class="accordion" id="accordionExample">
            <div class="card">
            <div class="card-header d-flex justify-content-center">
              <h2 class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#${tenant._id}" aria-expanded="false" aria-controls="collapseOne">${tenant.firstName} ${tenant.lastName}</h2>
            </div>
            <br />
            <div id="${tenant._id}" class="collapse col-12" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="row">
            <div class="container col-12" id="cBody_${tenant._id}">
            <div class="row">
                <table class="table table-bordered col-12 ">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col">Documents</th>
                      <th scope="col"></th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    
                    <tr>
                    <td>
                      <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="checkbox_1" value="checkbox_1" onchange="alert('Please Upload Most recent Tax Papers')">
                          <label class="custom-control-label" for="checkbox_1"></label>
                      </div>
                    </td>
                    
                    <td>I am self-employed (list nature of self employment) </td>
                    <td>Most recent Tax Papers</td>
                   
                    <td>
                    <form class="form-inline col-md-4 mt-3 ml-0" id="myForm2" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_0_${tenant._id}" class="form-control" name="doc_0" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_0','${tenant._id}','checkbox_1')">Upload</button></div></form>
                    </td>
                    </tr>
                  <tr>
                      <td>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="checkbox_2" value="checkbox_2" onchange="alert('Please Upload 3 months of paystubs, Weekly (13-14 paystubs), Bi-Weekly (7 paystubs),Semi-monthly (6 paystubs), Monthly (3 paystubs)')" >
                            <label class="custom-control-label" for="checkbox_2"></label>
                        </div>
                      </td>
                      
                      <td>I have a job/have been offered employment and receive/will receive wages, salary, overtime pay, commissions, fees,
                      tips, bonuses, and/or other compensation: </td>
                      
                      <td><br><p>3 months of paystubs</p>
                      <br><br><br>
                      <p> Weekly (13-14 paystubs), Bi-Weekly (7 paystubs)</p>
                      <br>
                      <br>
                      <p>Semi-monthly (6 paystubs), Monthly (3 paystubs)</p></td>
                      <td>
                      <form class="form-inline col-md-4 mt-3 ml-0" id="myForm2" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_1_${tenant._id}" class="form-control" name="doc_1" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_1','${tenant._id}','checkbox_2')">Upload</button></div></form>
                            <br>                    
                      <form class="form-inline col-md-4 mt-3 ml-0" id="myForm2" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_2_${tenant._id}" class="form-control" name="doc_2" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_2','${tenant._id}','checkbox_2')">Upload</button></div></form>
                          <br>
                      <form class="form-inline col-md-4 mt-3 ml-0" id="myForm2" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_3_${tenant._id}" class="form-control" name="doc_3" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_3','${tenant._id}','checkbox_2')">Upload</button></div></form>
  
                      
                      </td>
                    </tr>
             
                  <tr>
                      <td>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="checkbox_3" value="checkbox_3"onchange="alert('Please Upload TR 113 - Notorized Copy')">
                            <label class="custom-control-label" for="checkbox_3"></label>
                        </div>
                      </td>
                      
                      <td>I receive cash contributions of gifts including rent or utility payments, on an ongoing basis from persons not living with me</td>
                      <td>TR 113 - Notorized Copy</td>
                     <td>
                     <form class="form-inline col-md-4 mt-3 ml-0" id="myForm2" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_4_${tenant._id}" class="form-control" name="doc_4" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_4','${tenant._id}','checkbox_3')">Upload</button></div></form>
                     </td>
                    </tr>
                  
                    <tr>
                    <td>
                      <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="checkbox_4" value="checkbox_4" onchange="alert('Please Upload Most current Award Letter')" >
                          <label class="custom-control-label" for="checkbox_4"></label>
                      </div>
                    </td>
                    
                    <td>I receive unemployment benefits</td>
                    <td>Most current Award Letter </td>
                   <td>
                   <form class="form-inline col-md-4 mt-3 ml-0" id="myForm2" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_5_${tenant._id}" class="form-control" name="doc_5" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_5','${tenant._id}','checkbox_4')">Upload</button></div></form>
                   </td>
                  </tr>
                
                  <tr>
                  <td>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="checkbox_5" value="checkbox_5" onchange="alert('Please Upload Most current Award Letter')">
                        <label class="custom-control-label" for="checkbox_5"></label>
                    </div>
                  </td>
                  
                  <td>I receive Veteran's Administration, GI Bill, or  National Guard/Military Benefits / Income</td>
                  <td>Most current Award Letter </td>
                 <td>
                 <form class="form-inline col-md-4 mt-3 ml-0" id="myForm2" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_6_${tenant._id}" class="form-control" name="doc_6" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_6','${tenant._id}','checkbox_5')">Upload</button></div></form>
                 </td>
                </tr>
              
                <tr>
                <td>
                  <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="checkbox_6" value="checkbox_6" onchange="alert('Please Upload Most current Award Letter')">
                      <label class="custom-control-label" for="checkbox_6"></label>
                  </div>
                </td>
                
                <td>I receive Social Security payments.</td>
                <td>Most current Award Letter </td>
               <td>
               <form class="form-inline col-md-4 mt-3 ml-0" id="myForm2" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_7_${tenant._id}" class="form-control" name="doc_7" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_7','${tenant._id}','checkbox_6')">Upload</button></div></form>
               </td>
              </tr>
            
              <tr>
              <td>
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="checkbox_7" value="checkbox_7" onchange="alert('Most current Award Letter')">
                    <label class="custom-control-label" for="checkbox_7"></label>
                </div>
              </td>
              
              <td>The household receives unearned income from family members age 17 or under (example: Social Security, Trust 
                Fund disbursements, etc.) 
              </td>
              <td>Most current Award Letter </td>
             <td>
             <form class="form-inline col-md-4 mt-3 ml-0" id="myForm2" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_8_${tenant._id}" class="form-control" name="doc_8" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_8','${tenant._id}','checkbox_7')">Upload</button></div></form>
             </td>
            </tr>
          
                    
                  </tbody>
                </table>
              
              </div>
              </div>
          </div>
            
          `
          upload_body.insertAdjacentHTML('beforeend',upload)
        //   const form = document.getElementById(`form_${tenant._id}`);
        })
        console.log(tenants)
  


    }
})()


const uploadDoc= async(doc,tenantId,checkbox)=>  {
  console.log("Upload Doc")
  console.log(doc,checkbox,tenantId)
  var inputs = document.getElementById(doc + "_" + tenantId);
    console.log(inputs)
    console.log(inputs.files[0])
    const formData = new FormData();

    formData.append(inputs.name, inputs.files[0])
    console.log(formData)
    try {
      const res = await axios.post(`/user/storeDocuments`,formData,{headers: {
          "Content-Type": "multipart/form-data"
            }  })
     console.log(res)
      if (res.data) {
          console.log(res)
          let files=Object.keys(res.data.file)
        
            fileName=res.data.file[files[0]][0].filename
               
                const document={fileName,comment:"Waiting for Validation",verificationStatus:"Pending",originalName:files[0]}
        
        console.log(document)
        body={document,tenantId}
        console.log(body)
        let resp=await axios.post('/user/saveDetails',body)
        console.log(resp)
        if (resp.data!="Document Already uploaded"){
            alert("Congratulations!! Your Documents have been submitted. Thank You")
            // window.location.href=`/user/dashboard/?id=${userId}`
        }
        else{
          alert("Document Already Uploaded")
        }
        
    }
}
 catch(e){

 }
}
const formSubmit= async(tenantId)=>  {
    console.log("Submitted")
    const formData = new FormData();
    var inputs = document.getElementsByTagName('input');
    const userId=window.location.search.split("=")[1]

    for(var i = 0; i < inputs.length; i++) {
      if(inputs[i].type.toLowerCase() == 'file') {
           formData.append( inputs[i].name, inputs[i].files[0])
      }
    }
  
    try {
        const res = await axios.post(`/user/storeDocuments`,formData,{headers: {
            "Content-Type": "multipart/form-data"
              }  })
       documents=[]
        if (res.data) {
            console.log(res)
            let files=Object.keys(res.data.file)
            console.log(files)
           
            //API call to DB ro get user Details
            
            for(let i=0;i<files.length;i++){
                let doc={}
            
                fileName=res.data.file[files[i]][0].filename
                   
                    documents.push({fileName,comment:"Waiting for Validation",verificationStatus:"Pending",originalName:files[i]})
            }
            console.log(documents)
            body={documents,tenantId}
            let resp=await axios.post('/user/saveDetails',body)
            if (resp.data){
                console.log(resp)
                alert("Congratulations!! Your Documents have been submitted. Thank You")
                // window.location.href=`/user/dashboard/?id=${userId}`
            }
            
        }
    }
    catch (err) {
        console.log(err+"Please try again")
        alert(err.message)
    }
}