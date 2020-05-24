
const API_URL = process.env.REACT_APP_BACKEND_URL;

class AuthenticationService {

    executeBasicAuthenticationService(user) {
        return fetch(API_URL + 'login', {    
                    method: 'POST',    
                    body: JSON.stringify(user)    
                })
    }

    registerSuccessfulLogin(jwtToken, username) {
        sessionStorage.setItem("jwt", jwtToken);
        sessionStorage.setItem("user", username);
    }

    logout() {
        sessionStorage.removeItem("jwt");
    }

    isUserLoggedIn() {
        let jwt = sessionStorage.getItem("jwt")
        if (jwt === null) return false
        return true
    }

}

export default new AuthenticationService()