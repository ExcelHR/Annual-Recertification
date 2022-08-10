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
            <div id="${tenant._id}" class="collapse " aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="card-body">
              <form id="myForm" method="POST"   enctype="multipart/form-data" onsubmit="return false">
                <div class="form-group row mb-5">
                  <label
                    for="email_address"
                    class="col-md-4 col-form-label text-md-right"
                    >Document 1</label
                  >
                  <div class="col-md-6">
                    <input
                      type="file"
                      class="form-control"
                      id="Document1"
                      name="Document1"
                      required
                    >
                  </div>
                </div>
               <div class="form-group row mb-5">
                  <label
                    for="email_address"
                    class="col-md-4 col-form-label text-md-right"
                    >Document2</label
                  >
                  <div class="col-md-6">
                    <input
                      type="file"
                      class="form-control"
                      name="Document2"
                      required
                    >
                  </div>
                </div>
                <div class="form-group row mb-5">
                  <label
                    for="email_address"
                    class="col-md-4 col-form-label text-md-right"
                    >Document3</label
                  >
                  <div class="col-md-6">
                    <input
                      type="file"
                      class="form-control"
                      name="Document3"
                      required
                    >
                  </div>
                </div>
                <!-- <div class="form-group row mb-5">
                  <label
                    for="email_address"
                    class="col-md-4 col-form-label text-md-right"
                    >Document 3</label
                  >
                  <div class="col-md-6">
                    <input
                      type="file"
                      class="form-control"
                      name="Document 3"
                      required
                    />
                  </div>
                </div> --> 
    
                <div class="col-md-10 offset-md-5">
                  <button
                    id="${tenant._id}"
                    type="submit"
                     onclick="formSubmit('${tenant._id}')"
                    class="btn btn-primary"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
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
const formSubmit= async(tenantId)=>  {
    console.log("Submitted")
    const formData = new FormData();
    var inputs = document.getElementsByTagName('input');
    const userId=window.location.search.split("=")[1]

    for(var i = 0; i < inputs.length; i++) {
        
           formData.append( inputs[i].name, inputs[i].files[0])
        
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