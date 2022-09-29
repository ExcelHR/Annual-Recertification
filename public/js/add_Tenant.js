
const form = document.getElementById("myForm");
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
console.log(params)
userId = params.id
code = params.code
unitNo=params.unitNo
householdName=params.name

// Login Validation
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("AddTenant")
    fname=document.getElementById("first_name").value.trim()
    lname=document.getElementById("last_name").value.trim()
    age=document.getElementById("age").value.trim()
    student=document.getElementById("student").value
    body={fname,lname,age,student,userId}
    console.log(body)
    console.log(params)
    resp=await axios.post(`/user/saveTenantDetails`,body)
    console.log(resp    )
    if(resp.data){
        alert("New Tenant Added Sucessfully!!")
        window.location.href=`/user/dashboard/?id=${userId}&code=${code}&unitNo=${unitNo}&name=${householdName}`
    }
    else{
        alert("Some Error Error Occured Please Try Again")
        window.location.href=`/user/addNewTenant/?id=${userId}&code=${code}&unitNo=${unitNo}&name=${householdName}`   
    }
})