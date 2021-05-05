import React from 'react';
import { GoogleLogout } from 'react-google-login';

const Logout = ({   
    isLoggedIn, 
    setIsLoggedIn, 
    userId, 
    setUserId, 
    setUserName
    }) => {
        
    console.log('Logout Component Renders');
    const clientId = "610908639248-t99nq5ooodvi7r5qm834b2u2ruuh7hus.apps.googleusercontent.com"
    const checkSignedIn = () => window.gapi.auth2.getAuthInstance().isSignedIn.get();

    const logout = async () => {
        console.log('Logged Out.');
        console.log("gapi.auth2.getAuthInstance().isSignedIn.get() =", checkSignedIn());
        await setIsLoggedIn(false);
        await setUserId('0');
        setUserName('');
        console.log('user id: ', userId); //this is still doing the stale state problem...
    }

    return (
        <div className='fadein'>
            <GoogleLogout
                clientId={clientId}
                buttonText="Log Out"
                onLogoutSuccess={logout}
            />
        </div>
        );    
}

export default Logout;

