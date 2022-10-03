
const saveContactDetails = async() => {
    // Fetch URL Query Params

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params)
    userId = params.id
    console.log('saveContactDetails')
    const email=document.getElementById("email").value
    const phoneNumber=document.getElementById("phone").value
    body={userId,email,phoneNumber}
    console.log(body)    
    //Save contact details to tenant database
    resp=await axios.post("/user/saveContactDetails",body)
    console.log(resp)
    if(resp.data){
        // If saved sucessfully redirect to dashboard
        window.location.href=`/user/dashboard/?id=${userId}&code=${params.code}&unitNo=${params.unitNo}&name=${params.name}`
    }
}





