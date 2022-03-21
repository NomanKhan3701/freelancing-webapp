import React from "react";
import {GoogleLogin} from "react-google-login";
import { refreshTokenSetup } from "./refreshToken";
const axios = require("axios").default;

const clintId = "844752415174-c93pnbtgdm8opp0d1fcoqgpl22b4vban.apps.googleusercontent.com";

function GLogin(){
    const onSuccess = (res) => {
        console.log('[Login Success] CurrentUser:', res.profileObj);
        axios
            .post('http://localhost:8080/post', res.profileObj)
            .then(() => console.log('user google login data sent succesfuuly.'))
            .catch(err => {
                console.error(err);
            });
        refreshTokenSetup(res);
    }
    const onFailure = (res) => {
        console.log('[Login failed] res : ', res);
    }
    return (
        <div>
            <GoogleLogin
                clientId = {clintId}
                buttonText = "Login"
                onSuccess = {onSuccess}
                onFailure = {onFailure}
                cookiePolicy = {'single_host_origin'}
                style = {{marginTop : "100px"}}
                isSignedIn = {true}
                data-onsuccess="onSignIn">
            </GoogleLogin>
        </div>
    );
}

export default GLogin;