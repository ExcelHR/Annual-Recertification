const form = document.getElementById("myForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const userId=window.location.search.split("=")[1]
    window.location.href=`/user/upload_documents`
    
})