import {useState} from 'react';
const axios = require('axios');

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const useAjax = (callback) => {

  const [archive, setList] = useState([]);


  const handleList = (event) => {
    if (event) event.preventDefault();
    callback(archive);
  };

  const getList = () => {
    try{
      let data = axios.get(todoAPI);
      setList(...archive, data);
    } catch (error){
      console.log(error);
    }
  };

  return [
    archive,
    getList,
    handleList,
  ];
};

export default useAjax;