import React, {useState} from 'react';

const Input = (
    {
    userId, 
    makeGetRequest, 
    makePostRequest, 
    list, 
    setList,
    maxListLength
    }) => {

    console.log('Input Component Renders');
    
    const [term, setTerm] = useState('');

    //UPDATE LIST/ARRAY, DON'T MAKE GET REQUEST. - katie. 
    // (here you should update list with the term. but realize that right now list is a list of objects.)
    // Realized I can't do this because I can't delete the correct item from the DB without knowing the id,
    // and the id property is assigned in sequel and needs to be getRequested.
    // I could use UUIDs and avoid this problem, technically.
    
    //ONSUBMIT
    const onSubmit = async (event) => {
        if (term !== '' && list.length <= maxListLength) {
            event.preventDefault();
            await makePostRequest(term.replace(/"/g, "'")); //accounts for sql "" errors
            await makeGetRequest(); 
            setTerm(''); 
            console.log('user id', userId);
        }
        
        if (term === '' || list.length > maxListLength) {
            event.preventDefault();
            alert('list limit reached')
        }
    }

    return (
        // container div inside the input div
        <div style={{marginTop: '20px'}}>

            {/* contains input bar and button */}
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <form onSubmit={onSubmit}>
                    <div style={{
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center'}}>
                        <input className='fadein input-field' autoFocus type="text" maxLength="40" value={term} onChange={event => setTerm(event.target.value)} />
                        <input className='fadein submitButton' type="submit" value="+"></input>
                    </div>
                </form>
            </div>
            
        </div>
    );
}

export default Input;