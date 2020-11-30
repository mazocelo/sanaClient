class Firebase {
    constructor(){
        this._data={}

        this._firebaseConfig ={
            apiKey: "AIzaSyC2C7bCKwRn0jzhUdy9qZxhzLNLBYWNPkw",
            authDomain: "sana-auth.firebaseapp.com",
            databaseURL: "https://sana-auth.firebaseio.com",
            projectId: "sana-auth",
            storageBucket: "sana-auth.appspot.com",
            messagingSenderId: "865181068591",
            appId: "1:865181068591:web:d5224606dc05d9242185da"
        }
        this._initialize();
    }
    _initialize(){
        if (!this._initialized){
            firebase.initializeApp(this._firebaseConfig);
            this._initialized = true
        }
    }
}