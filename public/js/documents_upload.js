(async () => {
    // Fetch URL Query Params

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  console.log(params)
  userId = params.id
  //Get Tenant Details
  const resp = await axios.get(`/user/getTenantsDetails/?id=${userId}`)

  if (resp.data == "Error") {
    alert("Something Went Wromg Please Login Again")
    window.location.href = "/"
  }
  else {

    tenantsDetails = resp.data
    console.log(tenantsDetails)
    tenants = []
    const upload_body = document.getElementById('dashboard_card')
//Display Document Upload Table
    tenantsDetails.forEach(tenant => {
      tenants.push({ name: `${tenant.firstName} ${tenant.lastName}`, tenantId: tenant._id })
      const upload = `
            <div class="accordion" id="accordionExample">
            <div class="card">
            <div class="card-header d-flex justify-content-center">
              <h2 class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#${tenant._id}" aria-expanded="false" aria-controls="collapseOne">${tenant.firstName} ${tenant.lastName}</h2>
            </div>
            <br />
            <div id="${tenant._id}" class="collapse card-body " aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="row">
            <div class="container " id="cBody_${tenant._id} ">
            <div class="row">
                <table class="table table-bordered col-12  ">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col" class="col-md-3"></th>
                      <th scope="col" class="col-md-3">Documents</th>
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
                            <input type="checkbox" class="custom-control-input" id="checkbox_2" value="checkbox_2" onchange="alert('Please Upload 3 months of paystubs, a) Weekly (13-14 paystubs), b) Bi-Weekly (7 paystubs), c) Semi-monthly (6 paystubs),  d) Monthly (3 paystubs)')" >
                            <label class="custom-control-label" for="checkbox_2"></label>
                        </div>
                      </td>
                      
                      <td>I have a job/have been offered employment and receive/will receive wages, salary, overtime pay, commissions, fees,
                      tips, bonuses, and/or other compensation: </td>
                      
                      <td><div><p>Paystubs of last 3 months</p>
                      <p > a) Weekly( 13-14paystubs)</p>
                     
                      <p style="margin-top:10%"> -Weekly paystub 1</p>
                   
                   
                   
                      <p style="margin-top:21%"> -Weekly paystub 2</p>
                   
                   
                   
                      <p style="margin-top:21%"> -Weekly paystub 3</p>
                   
                   
                      <p style="margin-top:21%"> -Weekly paystub 4</p>
                   
                   
                      <p style="margin-top:21%"> -Weekly paystub 5</p>
                   
                   
                      <p style="margin-top:21%"> -Weekly paystub 6</p>
                   
                      <p style="margin-top:21%"> -Weekly paystub 7</p>
                   
                   
                      <p style="margin-top:21%"> -Weekly paystub 8</p>
                   
                   
                      <p style="margin-top:21%"> -Weekly paystub 9</p>
                   
                   
                      <p style="margin-top:21%"> -Weekly paystub 10</p>
                   
                      <p  style="margin-top:21%"> -Weekly paystub 11</p>
                   
                   
                      <p  style="margin-top:21%"> -Weekly paystub 12</p>
                   
                   
                        <p  style="margin-top:21%"> -Weekly paystub 13</p>
                   
                   
                      <p  style="margin-top:21%"> -Weekly paystub 14(if applicable)</p>
                   
                   
                      <p  style="margin-top:21%"> Bi-Weekly(7 paystubs) </p>
                   

                      <p  style="margin-top:21%"> - Bi-Weekly paystub 1</p>
                   
                   
                      <p  style="margin-top:21%"> - Bi-Weekly paystub 2</p>
                   
                   
                      <p  style="margin-top:21%"> - Bi-Weekly paystub 3</p>
                   
                   
                      <p  style="margin-top:21%"> - Bi-Weekly paystub 4</p>
                   
                   
                      <p  style="margin-top:21%"> - Bi-Weekly paystub 5</p>
                   
                   
                      <p  style="margin-top:21%"> - Bi-Weekly paystub 6</p>
                   
                      <p  style="margin-top:21%"> - Bi-Weekly paystub 7</p>

                   
                   
                      <p  style="margin-top:21%"> Semi-Monthly(6 paystubs) </p>
                   

                      <p  style="margin-top:21%"> - Semi-Monthly paystub 1</p>
                   
                   
                      <p  style="margin-top:21%"> - Semi-Monthly paystub 2</p>
                   
                   
                      <p  style="margin-top:21%"> - Semi-Monthly paystub 3</p>
                   
                   
                      <p  style="margin-top:21%"> - Semi-Monthly paystub 4</p>
                   
                   
                      <p  style="margin-top:21%"> - Semi-Monthly paystub 5</p>
                   
                   
                      <p  style="margin-top:21%"> - Semi-Monthly paystub 6</p>
                   
                   
                      <p  style="margin-top:21%"> Monthly(3 paystubs) </p>
                   

                      <p  style="margin-top:21%"> - Monthly paystub 1</p>
                   
                   
                      <p  style="margin-top:21%"> - Monthly paystub 2</p>
                   
                   
                      <p  style="margin-top:21%"> - Monthly paystub 3</p>
                      <div>
                      </td>
                      <td>
                   
                   
                   
                   
                      <form class="form-inline col-md-2  ml-0" style="margin-top:14%" id="myForm2" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_1_${tenant._id}" class="form-control" name="doc_1" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_1','${tenant._id}','checkbox_2')">Upload</button></div></form>
                                             
                      <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_2_${tenant._id}" class="form-control" name="doc_2" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_2','${tenant._id}','checkbox_2')">Upload</button></div></form>
                       
                      <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_3_${tenant._id}" class="form-control" name="doc_3" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_3','${tenant._id}','checkbox_2')">Upload</button></div></form>
                                       
                      <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_4_${tenant._id}" class="form-control" name="doc_4" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_4','${tenant._id}','checkbox_2')">Upload</button></div></form>
                                       
                <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_5_${tenant._id}" class="form-control" name="doc_5" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_5','${tenant._id}','checkbox_2')">Upload</button></div></form>
                 
                <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_6_${tenant._id}" class="form-control" name="doc_6" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_6','${tenant._id}','checkbox_2')">Upload</button></div></form>
                                 

                <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_7_${tenant._id}" class="form-control" name="doc_7" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_7','${tenant._id}','checkbox_2')">Upload</button></div></form>
                                 
                 <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_8_${tenant._id}" class="form-control" name="doc_8" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_8','${tenant._id}','checkbox_2')">Upload</button></div></form>
                  
                 <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_9_${tenant._id}" class="form-control" name="doc_9" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_9','${tenant._id}','checkbox_2')">Upload</button></div></form>
                                  
                 <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_10_${tenant._id}" class="form-control" name="doc_10" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_10','${tenant._id}','checkbox_2')">Upload</button></div></form>
                                  
                <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_11_${tenant._id}" class="form-control" name="doc_11" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_11','${tenant._id}','checkbox_2')">Upload</button></div></form>
                 
                <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_12_${tenant._id}" class="form-control" name="doc_12" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_12','${tenant._id}','checkbox_2')">Upload</button></div></form>
                                 
                <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_13_${tenant._id}" class="form-control" name="doc_13" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_13','${tenant._id}','checkbox_2')">Upload</button></div></form>
                                   
                <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_14_${tenant._id}" class="form-control" name="doc_14" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_14','${tenant._id}','checkbox_2')">Upload</button></div></form>
               
               
                   
                   
                   
                   
                      
                  <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:24%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_15_${tenant._id}" class="form-control" name="doc_15" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_15','${tenant._id}','checkbox_2')">Upload</button></div></form>
                                   
                <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_16_${tenant._id}" class="form-control" name="doc_16" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_16','${tenant._id}','checkbox_2')">Upload</button></div></form>
             
                <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_17_${tenant._id}" class="form-control" name="doc_17" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_17','${tenant._id}','checkbox_2')">Upload</button></div></form>
                                 
                <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_18_${tenant._id}" class="form-control" name="doc_18" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_18','${tenant._id}','checkbox_2')">Upload</button></div></form>
                                 
                <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_19_${tenant._id}" class="form-control" name="doc_19" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_19','${tenant._id}','checkbox_2')">Upload</button></div></form>
             
                <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_20_${tenant._id}" class="form-control" name="doc_20" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_20','${tenant._id}','checkbox_2')">Upload</button></div></form>
                                 
                    
                <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_21_${tenant._id}" class="form-control" name="doc_21" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_21','${tenant._id}','checkbox_2')">Upload</button></div></form>
                
             
                 
                 
                 
                 
                    
                <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:24%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_22_${tenant._id}" class="form-control" name="doc_22" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_22','${tenant._id}','checkbox_2')">Upload</button></div></form>
                                 
              <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_23_${tenant._id}" class="form-control" name="doc_23" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_23','${tenant._id}','checkbox_2')">Upload</button></div></form>
           
              <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_24_${tenant._id}" class="form-control" name="doc_24" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_24','${tenant._id}','checkbox_2')">Upload</button></div></form>
                               
              <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_25_${tenant._id}" class="form-control" name="doc_25" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_25','${tenant._id}','checkbox_2')">Upload</button></div></form>
                               
              <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_26_${tenant._id}" class="form-control" name="doc_26" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_26','${tenant._id}','checkbox_2')">Upload</button></div></form>
           
              <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_27_${tenant._id}" class="form-control" name="doc_27" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_27','${tenant._id}','checkbox_2')">Upload</button></div></form>
              
             
                 
                 
                 
                 
                    
                <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:24%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_28_${tenant._id}" class="form-control" name="doc_28" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_28','${tenant._id}','checkbox_2')">Upload</button></div></form>
                                 
              <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_29_${tenant._id}" class="form-control" name="doc_29" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_29','${tenant._id}','checkbox_2')">Upload</button></div></form>
           
              <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:7%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_30_${tenant._id}" class="form-control" name="doc_30" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_30','${tenant._id}','checkbox_2')">Upload</button></div></form>               
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
                     <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_31_${tenant._id}" class="form-control" name="doc_31" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_31','${tenant._id}','checkbox_3')">Upload</button></div></form>
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
                   <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_32_${tenant._id}" class="form-control" name="doc_32" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_32','${tenant._id}','checkbox_4')">Upload</button></div></form>
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
                 <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_33_${tenant._id}" class="form-control" name="doc_33" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_33','${tenant._id}','checkbox_5')">Upload</button></div></form>
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
               <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_34_${tenant._id}" class="form-control" name="doc_34" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_34','${tenant._id}','checkbox_6')">Upload</button></div></form>
               </td>
              </tr>
            
              <tr>
              <td>
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="checkbox_7" value="checkbox_7" onchange="alert('Please upload most current Award Letter')">
                    <label class="custom-control-label" for="checkbox_7"></label>
                </div>
              </td>
              
              <td>The household receives unearned income from family members age 17 or under (example: Social Security, Trust 
                Fund disbursements, etc.) 
              </td>
              <td>Most current Award Letter </td>
             <td>
             <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_35_${tenant._id}" class="form-control" name="doc_35" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_35','${tenant._id}','checkbox_7')">Upload</button></div></form>
             </td>
            </tr>
            <tr>
            <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox_8" value="checkbox_8" onchange="alert('Please Upload Most current Award Letter')">
                <label class="custom-control-label" for="checkbox_8"></label>
            </div>
            </td>
            <td>I receive Supplemental Security Income (SSI) 
            </td>
            <td>Most current Award Letter </td>
           <td>
           <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_36_${tenant._id}" class="form-control" name="doc_36" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_36','${tenant._id}','checkbox_8')">Upload</button></div></form>
           </td>
            </tr>
            <tr>
            <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox_9" value="checkbox_9" onchange="alert('Please Upload Most current Award Letter')">
                <label class="custom-control-label" for="checkbox_9"></label>
            </div>
            </td>
            <td>I receive disability, EDD paid family leave, EDD disability insurance, or death benefits other than Social Security.
            </td>
            <td>Most current Award Letter </td>
           <td>
           <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_37_${tenant._id}" class="form-control" name="doc_37" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_37','${tenant._id}','checkbox_9')">Upload</button></div></form>
           </td>
            </tr>
            <tr>
            <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox_10" value="checkbox_10" onchange="alert('Please Upload Most current Award Letter')">
                <label class="custom-control-label" for="checkbox_10"></label>
            </div>
            </td>
            <td>I receive Public Assistance Income (examples: TANF, CalWorks, CAPI, AFDC, GA/GR) 
         
            <b>*Do not include CalFresh, SNAP, Food Stamps*</b>
           </td>
           <td>Most current Award Letter </td>
          <td>
          <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_38_${tenant._id}" class="form-control" name="doc_38" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_38','${tenant._id}','checkbox_10')">Upload</button></div></form>
          </td>
            </tr>

            <tr>
            <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox_11" value="checkbox_11" onchange="alert('Please Upload Court Order for Child Support payments')">
                <label class="custom-control-label" for="checkbox_11"></label>
            </div>
         
         
         
         
         


            <div class="custom-control custom-checkbox"  style="margin-top:170%">
                <input type="checkbox" class="custom-control-input" id="checkbox_12" value="checkbox_12" onchange="alert('Parental Agreement for Child Support ')">
                <label class="custom-control-label" for="checkbox_12"></label>
            </div>
            </td>
            <td><p>I am entitled to receive child support payments (court ordered or parental agreement)</br>   
         
            <p>I am currently receiving child support payments</br>
            
           </td>
           <td><p>Court Order for Child Support payments</p><br><br><p>Parental Agreement for Child Support</p></td>
          <td>
          <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_39_${tenant._id}" class="form-control" name="doc_39" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_39','${tenant._id}','checkbox_11')">Upload</button></div></form>
          
       
       
           
              <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:8%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_40_${tenant._id}" class="form-control" name="doc_40" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_40','${tenant._id}','checkbox_12')">Upload</button></div></form>
          </td>
            </tr>
            <tr>
            <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox_13" value="checkbox_13" onchange="alert('Please upload Court Order for Alimony or Spousal Support or Copy of Divorce Agreement ')">
                <label class="custom-control-label" for="checkbox_13"></label>
            </div>
            </td>
            <td>I am entitled to receive alimony or spousal support payments (court ordered or divorce agreement)
         
            <p>I am currently receiving alimony/spousal support payments</p>
           </td>
           <td><p>Court Order for Alimony or Spousal Support</p> <br><p>or</p><p>Copy of Divorce Agreement  </p> </td>
          <td>
          <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_41_${tenant._id}" class="form-control" name="doc_41" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_41','${tenant._id}','checkbox_13')">Upload</button></div></form>
       
       
          <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:8%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_42_${tenant._id}" class="form-control" name="doc_42" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_42','${tenant._id}','checkbox_13')">Upload</button></div></form>
          </td>
            </tr>


            <tr>
            <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox_14" value="checkbox_14" onchange="alert('Please Upload Annual Statement')">
                <label class="custom-control-label" for="checkbox_14"></label>
            </div>
            </td>
            <td>I receive periodic payments from trusts, annuities  inheritance, retirement funds or pensions, insurance policies, or lottery winnings.
            </td>
            <td>Annual Statement  </td>
           <td>
           <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_43_${tenant._id}" class="form-control" name="doc_43" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_43','${tenant._id}','checkbox_14')">Upload</button></div></form>
           </td>
            </tr>

            <tr>
            <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox_15" value="checkbox_15" onchange="alert('Please Upload 3 months of rent receipts & Property Tax papers')">
                <label class="custom-control-label" for="checkbox_15"></label>
            </div>
            </td>
            <td>I receive income from real or personal property.
            </td>
            <td>3 months of rent receipts & Property Tax papers </td>
           <td>
           <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_44_${tenant._id}" class="form-control" name="doc_44" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_44','${tenant._id}','checkbox_15')">Upload</button></div></form>
           </td>
            </tr>

            <tr>
            <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox_16" value="checkbox_16" onchange="alert('Financial Aid Award Letter')">
                <label class="custom-control-label" for="checkbox_16"></label>
            </div>
            </td>
            <td>I receive student financial aid (public/private, exclude loans)  Subtract cost of tuition from aid received <br><b>* For households receiving Section 8 assistance only*</b>
            </td>
            <td>Financial Aid Award Letter  </td>
           <td>
           <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_45_${tenant._id}" class="form-control" name="doc_45" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_45','${tenant._id}','checkbox_16')">Upload</button></div></form>
           </td>
            </tr>

            <tr>
            <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox_17" value="checkbox_17" onchange="alert('Please Upload ATM Balance Slip')">
                <label class="custom-control-label" for="checkbox_17"></label>
            </div>
            </td>
            <td>Are any of the above noted income sources (including
              Social Security, wages, unemployment, public assistance,
              disability, etc.) , curently being received as a Debit Visa orSecurity Mastercard?
            </td>
            <td>ATM Balance Slip  </td>
           <td>
           <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_46_${tenant._id}" class="form-control" name="doc_46" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_46','${tenant._id}','checkbox_17')">Upload</button></div></form>
           </td>
            </tr>

            <tr>
            <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox_18" value="checkbox_18" onchange="alert('Please Upload Last six months of Bank statements')">
                <label class="custom-control-label" for="checkbox_18"></label>
            </div>
            </td>
            <td>I have a checking account(s).
            
           </td>
           <td><p>Last six months of Bank statements (all pages)  </p> </td>
          <td>
          <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_47_${tenant._id}" class="form-control" name="doc_47" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_47','${tenant._id}','checkbox_18')">Upload</button></div></form>
         
          </td>
            </tr>

            <tr>
            <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox_19" value="checkbox_19" onchange="alert('Please Upload Most Most current Savings Account  Statement (1 month only)')">
                <label class="custom-control-label" for="checkbox_19"></label>
            </div>
            </td>
            <td>I have a savings account(s).
            
           </td>
           <td><p>Most current Savings Account  Statement (1 month only) </p> </td>
          <td>
          <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_48_${tenant._id}" class="form-control" name="doc_48" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_48','${tenant._id}','checkbox_19')">Upload</button></div></form>
          
          </td>
            </tr>

            <tr>
            <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox_20" value="checkbox_20" onchange="alert('Please Upload Printout of Current Balance')">
                <label class="custom-control-label" for="checkbox_20"></label>
            </div>
            </td>
            <td>I have available funds held in a payment
            service account, such as Venmo, PayPal,
            Skrill, etc.
           </td>
           <td><p>Printout of Current Balance (1 month only) </p> </td>
          <td>
          <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_49_${tenant._id}" class="form-control" name="doc_49" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_49','${tenant._id}','checkbox_20')">Upload</button></div></form>
          
          </td>
            </tr>


            <tr>
            <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox_21" value="checkbox_21" onchange="alert('Please Upload evocable trust statements  from bank (6 months)')">
                <label class="custom-control-label" for="checkbox_21"></label>
            </div>
            </td>
            <td>I have a revocable trust(s)
           </td>
           <td><p>Revocable trust statements  from bank (6 months) </p> </td>
          <td>
          <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_50_${tenant._id}" class="form-control" name="doc_50" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_50','${tenant._id}','checkbox_21')">Upload</button></div></form>
          
          </td>
            </tr>


            <tr>
            <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox_22" value="checkbox_22" onchange="alert('Please Upload Property Tax Papers  (most current year) ')">
                <label class="custom-control-label" for="checkbox_22"></label>
            </div>
            </td>
            <td>I own real estate.
           </td>
           <td><p>Property Tax Papers  (most current year) </p> </td>
          <td>
          <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_51_${tenant._id}" class="form-control" name="doc_51" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_51','${tenant._id}','checkbox_22')">Upload</button></div></form>
          
          </td>
            </tr>

            <tr>
            <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox_23" value="checkbox_23" onchange="alert('Please Upload Crypto statements (6 months)')">
                <label class="custom-control-label" for="checkbox_23"></label>
            </div>
            </td>
            <td>I own crypto currency such as Bitcoin, 
            Litecoin, Ethereum, etc.
           </td>
           <td><p>Crypto statements (6 months) </p> </td>
          <td>
          <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_52_${tenant._id}" class="form-control" name="doc_52" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_52','${tenant._id}','checkbox_23')">Upload</button></div></form>
          
          </td>
            </tr>

            

            <tr>
            <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox_24" value="checkbox_24" onchange="alert('Please Upload Stock, Bond, Treasury bills  statements (6 months)')">
                <label class="custom-control-label" for="checkbox_24"></label>
            </div>
            </td>
            <td>I own stocks, bonds, or treasury bills. 
           </td>
           <td><p> Stock, Bond, Treasury bills  statements (6 months) </p> </td>
          <td>
          <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_53_${tenant._id}" class="form-control" name="doc_53" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_53','${tenant._id}','checkbox_24')">Upload</button></div></form>
          
          </td>
            </tr>

            <tr>
            <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox_25" value="checkbox_25" onchange="alert('Please Upload Copy of Insurance & Surrender Value statement')">
                <label class="custom-control-label" for="checkbox_25"></label>
            </div>
            </td>
            <td>I have a life insurance policy with a
            cash/surrender value.
           </td>
           <td><p>Copy of Insurance & Surrender Value statement</p> </td>
          <td>
          <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_54_${tenant._id}" class="form-control" name="doc_54" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_54','${tenant._id}','checkbox_25')">Upload</button></div></form>
          
          </td>
            </tr>
                    
            <tr>
            <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox_26" value="checkbox_26" onchange="alert('Please Upload Most current CD Statement (1 month)  or Most current Money Mkt statement (1 month)')">
                <label class="custom-control-label" for="checkbox_26"></label>
            </div>
            </td>
            <td>I have Certificates of Deposit (CD) or
            Money Market account(s).
           </td>
           <td><p>Most current CD Statement (1 month) </p> <br><br> <p>Most current Money Mkt statement (1 month)</p></td>
          <td>
          <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_55_${tenant._id}" class="form-control" name="doc_55" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_55','${tenant._id}','checkbox_26')">Upload</button></div></form>
       
       
          <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:8%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_56_${tenant._id}" class="form-control" name="doc_56" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_56','${tenant._id}','checkbox_26')">Upload</button></div></form>
          </td>
            </tr>


            <tr>
            <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox_27" value="checkbox_27" onchange="alert('Please Upload Most current statement of IRA, 401K Lumpsum pension, or Keogh A/c (1 month)')">
                <label class="custom-control-label" for="checkbox_27"></label>
            </div>
            </td>
            <td>I have an IRA, lump sum pension,
            Keogh account, or 401K.
           </td>
           <td><p>Most current statement of IRA, 401K </p> <br><br> <p>Lumpsum pension, or Keogh A/c (1 month)</p></td>
          <td>
          <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_57_${tenant._id}" class="form-control" name="doc_57" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_57','${tenant._id}','checkbox_27')">Upload</button></div></form>
       
       
          <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:8 %" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_58_${tenant._id}" class="form-control" name="doc_58" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_58','${tenant._id}','checkbox_27')">Upload</button></div></form>
          </td>
            </tr>
            

            <tr>
            <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox_28" value="checkbox_28" onchange="alert('Please Upload Document showing sale of asset')">
                <label class="custom-control-label" for="checkbox_28"></label>
            </div>
            </td>
            <td>I have disposed of assets (i.e. gave
              away money/assets) for less than the fair
              market value in the last 2 years.
           </td>
           <td><p>Document showing sale of asset </p> </td>
          <td>
          <form class="form-inline col-md-4  ml-0" id="myForm2" style="margin-top:4%" method="POST" onsubmit="return false"><div class="form-group"><input type="file"  id="doc_59_${tenant._id}" class="form-control" name="doc_59" required=""><button class=" btn btn-primary" type="submit" onclick="uploadDoc('doc_59','${tenant._id}','checkbox_28')">Upload</button></div></form>
          
          </td>
            </tr>

           
                  </tbody>
                </table>
              
              </div>
              </div>
          </div>
            
          `
      upload_body.insertAdjacentHTML('beforeend', upload)
      //   const form = document.getElementById(`form_${tenant._id}`);
    })
    console.log(tenants)



  }
})()

// Function to upload Document to tenant Databse
const uploadDoc = async (doc, tenantId, checkbox) => {
  console.log("Upload Doc")
  console.log(doc, checkbox, tenantId)
  var inputs = document.getElementById(doc + "_" + tenantId);
  console.log(inputs)
  console.log(inputs.files[0])
  const formData = new FormData();

  formData.append(inputs.name, inputs.files[0])
  console.log(formData)
  try {
    // API call to store Document to DB
    const res = await axios.post(`/user/storeDocuments`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    console.log(res)
    if (res.data) {
      console.log(res)
      let files = Object.keys(res.data.file)

      fileName = res.data.file[files[0]][0].filename

      const document = { fileName, comment: "Waiting for Validation", verificationStatus: "Pending", originalName: files[0] }

      console.log(document)
      body = { document, tenantId }
      console.log(body)
      //Saves user details to DB
      let resp = await axios.post('/user/saveDetails', body)
      console.log(resp)
      if (resp.data != "Document Already uploaded") {
        alert("Congratulations!! Your Documents have been submitted. Thank You")
        // window.location.href=`/user/dashboard/?id=${userId}`
      }
      else {
        alert("Document Already Uploaded")
      }

    }
  }
  catch (e) {

  }
}
const formSubmit = async (tenantId) => {
  console.log("Submitted")
  const formData = new FormData();
  var inputs = document.getElementsByTagName('input');
  const userId = window.location.search.split("=")[1]

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type.toLowerCase() == 'file') {
      formData.append(inputs[i].name, inputs[i].files[0])
    }
  }

  try {
    const res = await axios.post(`/user/storeDocuments`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    documents = []
    if (res.data) {
      console.log(res)
      let files = Object.keys(res.data.file)
      console.log(files)

      //API call to DB ro get user Details

      for (let i = 0; i < files.length; i++) {
        let doc = {}

        fileName = res.data.file[files[i]][0].filename

        documents.push({ fileName, comment: "Waiting for Validation", verificationStatus: "Pending", originalName: files[i] })
      }
      console.log(documents)
      body = { documents, tenantId }
      let resp = await axios.post('/user/saveDetails', body)
      if (resp.data) {
        console.log(resp)
        alert("Congratulations!! Your Documents have been submitted. Thank You")
        // window.location.href=`/user/dashboard/?id=${userId}`
      }

    }
  }
  catch (err) {
    console.log(err + "Please try again")
    alert(err.message)
  }
}