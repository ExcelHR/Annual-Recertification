
const form = document.getElementById("myForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("Submiotted")
    const formData = new FormData();
    var inputs = document.getElementsByTagName('input');

    for(var i = 0; i < inputs.length; i++) {
        
           formData.append( inputs[i].name, inputs[i].files[0])
        
    }
    
    // // // Make a backend API request to login to the system
    try {
        const res = await axios.post(`/user/storeDocuments`,formData,{headers: {
            "Content-Type": "multipart/form-data"
              }  })
       documents=[]
        if (res.data) {
            console.log(res)
            let files=Object.keys(res.data.file)
            console.log(files)
            firstName="Shrey"
            middleName="Harsh"
            lastName="Solanki"
            dob=new Date("1998/11/02")
            phoneNumber=2135435654
            unit=357,
            property="VERMONT CITY LIGHTS II"
            //API call to DB ro get user Details
            
            for(let i=0;i<files.length;i++){
                let doc={}
            
                fileName=res.data.file[files[i]][0].filename
                   
                    documents.push({fileName,comment:"Waiting for Validation",verificationStatus:"Pending",originalName:files[i]})
            }
            console.log(documents)
            let householdData={
                name:{
                    firstName,
                    middleName,
                    lastName
                },
                dob,
                phoneNumber,
                documents,
                property,
                unit
            }
            console.log(householdData)
            let resp=await axios.post('/user/saveDetails',householdData)
            if (resp.data){
                console.log(resp)
                alert("Congratulations!! Your Documents have been submitted. Thank You")
                window.location.href=`/user/dashboard`
            }
            
        }
    }
    catch (err) {
        console.log(err+"Please try again")
        window.location.href=`/user/upload_documents`
        alert(err.message)
    }
})