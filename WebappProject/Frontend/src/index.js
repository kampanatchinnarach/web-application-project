import React,{useState} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import App from './App';
//import './components/pages/userInfo/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const d = new Date();
  let time = d.getTime();
  if(localStorage.getItem('deleteTime')!==null){
    if(time-parseInt(localStorage.getItem('deleteTime'))>10000){
      
      axios.delete('http://localhost:54177/api/hostList/'+localStorage.getItem('hostOrderId'))
                .then(function (response){
                  localStorage.setItem('deleteTime',null);
                  localStorage.setItem('hostOrderId',null);
                  window.alert('Delete Successfully');
                });
    }
  }
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);