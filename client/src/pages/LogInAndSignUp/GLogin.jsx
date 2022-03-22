import React from "react";
import {GoogleLogin} from "react-google-login";
import { refreshTokenSetup } from "./refreshToken";
import GoogleIcon from '@mui/icons-material/Google';   
import { useNavigate } from "react-router-dom";     
const axios = require("axios").default;
//google console clint id for google sign in api
const clintId = "844752415174-c93pnbtgdm8opp0d1fcoqgpl22b4vban.apps.googleusercontent.com";

function GLogin(props){
    //i have changed isSignIn = false, in GoogleLogin, works
    const context = props.context;
    let navigate = useNavigate();
    const onSuccess = (res) => {
        console.log('[Login Success] CurrentUser:', res.profileObj);
        //redirect to home page with logo changed on right only if username and password matches
        let onResult = (data) => {
            console.log("data is " + data );
            switch(data){
                case 1: 
                    //pop up on screen that username already exists
                    break;
                case 2:
                    //nothing
                    break;
                case 3: 
                    //user exist with username and google signUP trying
                    navigate("/");
                    break;
                case 4:
                    //new user created successfully
                    navigate("/");
                    break;
                case 5:
                    //username matched not password
                    break;
                case 6:
                    //login succesfull
                    navigate("/");
                    break;
                default:
                    //    
            }
        }
        axios
            .post(`http://localhost:8080/${context.toLowerCase()}`, {username: res.profileObj.email, password: ""})
            .then((response) => {
                //response is the object that contains data sent from server
                //response.data is that data
                onResult(response.data.result);
            })
            .catch((err) => {
                console.log(err);
            });
        refreshTokenSetup(res);
    } 
    const onFailure = (res) => {
        console.log('[Login failed] res : ', res);
    }
    return (
        <div >
            <GoogleLogin
                clientId = {clintId}
                onSuccess = {onSuccess}
                onFailure = {onFailure}
                cookiePolicy = {'single_host_origin'}
                render={renderProps => (
                    <button onClick = {renderProps.onClick} style={{color: "red"}}><GoogleIcon />{context} with Google</button>
                    )}
                isSignedIn = {false}
                data-onsuccess="onSignIn">
            </GoogleLogin>
        </div>
    );
}

export default GLogin;
