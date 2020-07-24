import React, {useState, useEffect, useContext} from 'react';
import TodoForm from './form.jsx';
import TodoList from './list.jsx';
import {Container, Row, Col} from 'react-bootstrap'
import axios from 'axios';
import Pagination from 'react-bootstrap-4-pagination';
import { SettingsContext } from '../../context/settings.jsx'


import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const ToDo = (props) => {
  const context = useContext(SettingsContext);

  
  
  const [list, setList] = useState([]); 
  const [count, setCount] = useState(0); 
  const [currentPage, setPage] = useState(1);  
  const [displayList, setDisplay] = useState([])
  const [firstLoad, setFirstLoad] = useState(true);

let maxPages = Math.ceil(list.length/context.settings[0].pageMax);


let paginationConfig = {
  totalPages: maxPages,
  currentPage: currentPage,
  showMax: context.settings[0].pageMax ,
  prevNext: true,
  onClick: function (page) {
    setPage(page)
    cutList(list, page)
   },
};


  function handleGetData(list){
    setList(list);
    console.log('Form Submitted with :: ', list);
  }
 
  function cutList(list, page) {
    let startIndex = 0;
    let tempList = list;
    if(page !== 1) {
      startIndex = (page * context.settings[0].pageMax)-1;
    }
    
    let displayList = [];
    for(let i = startIndex; i< (startIndex + context.settings[0].pageMax); i++) {
      if(tempList[i]){
        displayList.push(tempList[i]);
      }
    }
    if(displayList !== []) {
      setDisplay(displayList);
    }
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

    let item = displayList.filter(i => i._id === id)[0] || {};

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

    useEffect(() => {
      setTimeout(() => {
        if(firstLoad === true) {
          cutList(list, 1);
          setPage(1);
          setFirstLoad(false);
        }
      }, 500);
    });
  
  

    return (
      <>

        <Container >
    
         <Row >
           <section className="total">
          <h2>
          There are {count} Items To Complete
          </h2>
          </section>
          </Row>
          <section className="toDo">
          <Row>
            <Col>
          <div>
            <TodoForm handleSubmit={addItem} />
          </div>
          </Col>
          <Col >
          <div>
          <Pagination {...paginationConfig} />
            <TodoList
              list={displayList}
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
