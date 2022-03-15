import React from "react";
import {GoogleLogout} from "react-google-login";

const clintId = "844752415174-c93pnbtgdm8opp0d1fcoqgpl22b4vban.apps.googleusercontent.com";

function GLogin(){
    const onSuccess = (res) => {
        alert("Logout made successfully.");
    }
    const onFailure = (res) => {
        console.log('[Login failed] res : ', res);
    }
    return (
        <div>
            <GoogleLogout
            clientId = {clintId}
            buttonText = "Logout"
            onLogoutSuccess = {onSuccess}>
            </GoogleLogout>
        </div>
    );
}

export default GLogin;