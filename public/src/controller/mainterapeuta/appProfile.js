
HttpRequest.post('login/log').then(userLoaded=>{
    
    
document.profile = new TherapistProfileController(userLoaded)
})