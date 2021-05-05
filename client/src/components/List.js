import React from 'react';
import ListItem from './ListItem';


const List = ({
    list, 
    setList, 
    makeDeleteRequest, 
    userId, 
    makeDeleteAndGetRequest,
    maxListLength
    }) => {

    console.log('List Component Renders');

    //the item here is a list item object returned from the get request.
    //contains properties {id, content, and user_id} from sql
    const renderedList = list.map(
        (item) => {
            console.log('userId value in List component', userId);
            return (
                    <ListItem
                    item={item} 
                    list={list} 
                    setList={setList} 
                    key={item.id} 
                    makeDeleteRequest={makeDeleteRequest}  
                    makeDeleteAndGetRequest={makeDeleteAndGetRequest}
                    maxListLength={maxListLength}
                    />                    
            );
        });
    
    return (
            <ul 
            className="fadelist"
            style={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    width: '50vw', 
                    maxWidth: '500px',  
                    minWidth: '240px',
                    margin: '40px', 
                    textAlign: 'left'
                }}>
                {renderedList}
            </ul>
            );
}

export default List;