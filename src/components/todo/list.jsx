import React, {useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';


const TodoList = (props) => {

const handleVariant = (item) => {
  if(item.complete === true){
    return 'success'
  }
  return 'danger'
}

    return (
      <>
      <ListGroup as="ul" 
      variant="flush"
      >
        {props.list.map(item => (
          <ListGroup.Item 
          as="li"
         action variant={handleVariant(item)}
         
            className={`complete-${item.complete.toString()}`}
            key={item._id}
            onClick={() => props.handleComplete (item._id)}>   
              {item.text}
          </ListGroup.Item>
        ))}
      </ListGroup>
      </>
    );
}

export default TodoList;
