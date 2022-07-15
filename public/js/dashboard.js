// var propertyBtn = document.getElementById("addProperty")

// var seeUsersBtn = document.getElementById("seeUsers")

// let token = getToken() 

// propertyBtn.addEventListener("click", () => {
//     fetch("/admin/addProperty",{
//         method:'GET',
//         headers: new Headers({
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer '.concat(token)
//         })
//     }).then((res)=>{
//         window.location.replace(res.url)
//     }).catch((error)=>{
//         console.log(error)
//     })
// })

// seeUsersBtn.addEventListener("click", () => {
//     fetch("/admin/allUsers",{
//         method:'GET',
//         headers: new Headers({
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer '.concat(token)
//         })
//     }).then((res)=>{
//         console.log(res)
//         // window.location = "/admin/dashboard"
//     }).catch((error)=>{
//         console.log(error)
//     })

//     // winodow.location="/allUsers"


// })
