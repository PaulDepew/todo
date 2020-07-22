import React, {useState, useEffect} from 'react';
import TodoForm from './form.jsx';
import TodoList from './list.jsx';
import {Container, Row, Col} from 'react-bootstrap'
import axios from 'axios';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const ToDo = (props) => {

  

  const [list, setList] = useState([]); 
  const [count, setCount] = useState(0); 


  function handleGetData(list){
    setList(list);
    console.log('Form Submitted with :: ', list);
  }
 

  const addItem = (item) => {
    item.due = new Date();
    axios( {
      url: todoAPI,
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(item),

    })
      .then(response => response.data)
      .then(savedItem => {
        setList([...list, savedItem])
      })
      .catch(console.error);
  };

  const toggleComplete = (id) => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let putUrl = `${todoAPI}/${id}`;

      axios( {
        url: putUrl,
        method: 'put',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(item),
      })
        .then(response => response.data)
        .then(savedItem => {
          setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
        })
        .catch(console.error);
    }
  };


  const getTodoItems = () => {
    axios({
      url:todoAPI, 
      method: 'get',
      mode: 'cors',
    })
      .then(data => data.data)
      .then(data => setList(data.results))
      .catch(console.error);
  };

    const deleteItem = (id) =>{

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      let putUrl = `${todoAPI}/${id}`;
      axios( {
        url: putUrl,
        method: 'delete',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(savedItem => {
          getTodoItems();
        })
        .catch(console.error);

    }
    }

  useEffect(getTodoItems, []);

    useEffect(() => {
      let number = list.filter(item => !item.complete).length;
      setCount(number);
    })

    return (
      <>

        <Container fluid >
    
         <Row fluid>
           <section className="total">
          <h2>
          There are {count} Items To Complete
          </h2>
          </section>
          </Row>
          <section className="toDo">
          <Row>
            <Col md lg sm="auto">
          <div>
            <TodoForm handleSubmit={addItem} />
          </div>
          </Col>
          <Col  md lg sm="auto">
          <div>
            <TodoList
              list={list}
              handleComplete={toggleComplete}
              handleDelete={deleteItem}
            />
          </div>
          </Col>
          </Row>
          </section>
        </Container>
        </>
    );
}

export default ToDo;
