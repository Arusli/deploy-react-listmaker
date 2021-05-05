import React, {useState} from 'react';
import {FaCheckCircle} from 'react-icons/fa';
import {MdRemoveCircle} from 'react-icons/md';

//DAVID NOTE: move some of these states up to List parent component, pass down as props. more standard.

const ListItem = ({
    item, 
    list, 
    setList,
    makeDeleteRequest,
    makeDeleteAndGetRequest,
    maxListLength
    }) => {

    console.log('ListItem Component Renders');

    //styling states
    const [classOpen, setClassOpen] = useState('open')
    const [classChecked, setClassChecked] = useState('unchecked');
    const [display, setDisplay] = useState('grid');
 
    const checkOff = (e) => {
        e.preventDefault();
        if (classChecked === 'unchecked') {
            setClassChecked('checked')
        }

        if (classChecked === 'checked') {
            setClassChecked('unchecked')
        }
    };

    //UPDATE LIST TEST
     const updateList = () => {

        if (list.length <= maxListLength - 1) {
            setClassOpen('closed');
            setTimeout(() => setDisplay('none'), 190); //prevents weird css spacingbackup when deleting multiple items.
            console.log('item:',item);
            makeDeleteRequest(item);
        }

        if (list.length > maxListLength - 1) {
            setClassOpen('closed');
            setTimeout(() => setDisplay('none'), 190); //prevents weird css spacingbackup when deleting multiple items.
            console.log('item:',item);
            makeDeleteAndGetRequest(item);
        }
        
    };
    
    //Remember: one list item per component, each with their own personal states.
    //Remember: only the targeted list item will re-render on listitem state change.
    return (
        <li 
        className={`${classChecked} ${classOpen}`}
        style={{display: display}}>
            <div style={{overflowWrap: 'break-word', margin: '0 10px'}}>{item.content}</div>
            <button style={{color: '#ffffcc', backgroundColor: '#0080ff', fontWeight: 'bold', height: '2.5rem', cursor: 'pointer', borderRadius: '5px', borderStyle: 'none'}} onClick={checkOff} ><FaCheckCircle size="1.4rem" /></button>
            <button style={{color: '#ffffcc', backgroundColor: '#FF3333', fontWeight: 'bold', height: '2.5rem', marginLeft: '10px', cursor: 'pointer', borderRadius: '5px', borderStyle: 'none'}} onClick={updateList} ><MdRemoveCircle size="1.5rem"  /></button>
        </li>
    );
}

export default ListItem;