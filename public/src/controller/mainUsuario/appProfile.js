HttpRequest.post('usuarios/log').then(userLoaded => {

    console.log(userLoaded)
    document.profile = new UserProfileController(userLoaded);
    document.agenda = new AgendaController(userLoaded);
})