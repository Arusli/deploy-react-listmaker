import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Input from './Input';
import Login from './Login';
import Logout from './Logout';
import List from './List';

//MAIN PROBLEMS:
// 1. SOLVED - list rendering on load problem, via useEffect [userId].
// 2. SOLVED - Need to conditionally render list/input based on isLoggedIn State.
// 3. SOLVED - How to style login/logout component/buttons.
// 4. SOLVED - Css formatting to look good, be responsive, and account for long term values.
// 5. SOLVED - Edit list item css re: check mark toggling, possbily use useRef for this.
// 6. SOLVED? - List item animations for add/drop
// 7. SOLVED - Add icons/react-icons
// 8. SOLVED - useRef in listitem. (did this but don't understand it well)
// 9. SOLVED - delete lodash and react transition group from npm
// 10. SOLVED - decided not to refactor code according to Katie's advice, due to sql ids being used in makeDelete.
// 11. SOLVED - error handling on server/client side? list size limiting?
// 12. SOLVED - handle max list size delete bug...
// 13. maybe add media query's for mobile device, re: reducing fontSize/div height of list items.
// 14. re-refactor code, adding appropriate comments.
// 15. testing: https://enzymejs.github.io/enzyme/docs/guides/jest.html


//NPM GOOGLE AUTH/LOGIN: 
//https://www.youtube.com/watch?v=-OgU5EAcQmo
//https://anthonyjgrove.github.io/react-google-login/?path=/info/google-logout-button--default-button
//https://www.npmjs.com/package/react-google-login
//https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del


const url = 'http://localhost:3001'

const App = () => {
    
    console.log('App Component Renders');

    // for use with google log in. pass down as props throughout the app.
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState('0');
    const [userName, setUserName] = useState('');
    const [list, setList] = useState([]); 
    //
    const maxListLength = 20;
    //
    const userIdRef = useRef('0');
    userIdRef.current = userId;

    //USE EFFECT RERENDERS APP WHENEVER USER ID CHANGES. THIS REDISPLAYS UPDATED LIST ITEMS.
    useEffect( () => {
        console.log('input useEffect renders');
        makeGetRequest();
    }, [userId]);

    //(can i extract these requests/import them from another file somehow?)
    //GET REQUEST
    const makeGetRequest = () => {
        console.log('makeGetRequest called');
        console.log('get request userId', userId);
        console.log('get request userIdRef', userIdRef.current);
        axios.get(`${url}/db`, {
            params: {
                userId: userId
                // userId: userIdRef.current
            }
        })
        .then( res => {
            const array = [];
            console.log('get request response: ', res.data);
            // res.data is an array of objects from sql.
            // e.g. res.data[0] === {id: 1955, content: "one", user_id: "114716709116595320820"}
            res.data.forEach( (element) => {
                //HYPOTHETICAL REFACTOR (David style)
                //element.classOpen = 'open'
                //element.classChecked = 'unchecked'
                //element.classDisplay = 'grid'
                array.push(element);
            });
            setList(array);
        }).catch( err => {
            console.log('get request error ', err);
            alert(err);
        });
    };

    //POST REQUEST
    const makePostRequest = async (content) => {
        await axios.post(`${url}/post`, {
            content: content,
            userId: userId
            // userId: userIdRef.current
        })
        .then( res => {
            console.log(res.data);
        }).catch(err => {
            console.log('post request error ', err);
        });
    };

    //DELETE REQUEST
    const makeDeleteRequest = async (item) => {
        console.log('userId value in ListItem Component', userId);
        await axios.delete(`${url}/delete`, {
            data: {
                id: item.id,
                userId: userId
            }
        })
        .then( res => {
            console.log(res.data);
        }).catch(err => {
            console.log('delete request error ', err);
        });
      };

    //MAKE AND DELETE REQUEST
        // only needed to control bug where if a user hits the max list.length
        // that user won't be able to add items even after they delete items
        // because the list ONLY UPDATES when the get request is called.
        // the deletions are only visual until the getRequest requests and re-renders that list.
    const makeDeleteAndGetRequest = async (item) => {
        await makeDeleteRequest(item);
        makeGetRequest();
    }

    return (
        // container wrapping all content
        <div style={{}}>
                
                {/* navbar background. */}
                <div className="navbar-bg"></div>

                {/* navbar container for centering */}
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    
                    {/* navbar */}
                    <div className="navbar" >
                        {isLoggedIn ? (<div className='fadein' style={{color: '#CECECE', fontSize: '1.3rem', fontWeight: 'bold'}}>{userName}'s List</div>) : null }
                        {isLoggedIn ? null : 
                        (<div>
                            <Login 
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                                userId={userId}
                                setUserId={setUserId}
                                setUserName={setUserName}
                            />
                        </div>)}
                        {isLoggedIn ? 
                        (<div>
                            <Logout 
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                                userId={userId}
                                setUserId={setUserId}
                                setUserName={setUserName}
                            />
                        </div>) : null}
                    </div> 
                </div>
                
                {/* input div */}
                <div className='fadein' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '10vh'}}>
                    <h1 style={{marginBottom: '0px', marginTop: '3rem', fontSize: '2.5rem'}}>Listmaker</h1>
                    <h3 style={{margin: '10px'}}>Built with react/node/sql.</h3>
                    {isLoggedIn ? null : (<div className='pulse' style={{fontSize: '2.6rem', margin: '30px', fontWeight: 'bold'}}>Please Log In.</div>)}
                
                    {isLoggedIn ? (
                        <Input 
                        userId={userId}
                        makeGetRequest={makeGetRequest}
                        makePostRequest={makePostRequest}
                        list={list}
                        setList={setList}
                        maxListLength={maxListLength}
                        />
                        ) : null}    
                </div>

                {/* List div */}
                {isLoggedIn ? (
                    <div style={{border: 'none', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <List 
                            list={list} 
                            setList={setList} 
                            makeDeleteRequest={makeDeleteRequest}
                            userId={userId} 
                            makeDeleteAndGetRequest={makeDeleteAndGetRequest}
                            maxListLength={maxListLength}
                        />
                    </div>
                ) : null}
                         
        </div>
    );
        
}

export default App;