import React,{useState} from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login_Page from './components/pages/Login_Page';
import Customer_Page from './components/pages/Customer_Page';
import Provider_Page from './components/pages/Provider_Page';
//import Information_Page from './components/pages/Information_Page';
import Status_Page from './components/pages/Status_Page';
import Register_Page from './components/pages/Register_Page';
import Tracking_Page from './components/pages/Tracking_Page';
import Order_Page from './components/pages/Order_Page';
import Inform from './components/pages/info/inform';
import Edit from './components/pages/info/Edit';
import Logo from './LOGO.png';

function App() {
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
  return (
    <div className="App">
      <img className="logo" src="https://cdn.discordapp.com/attachments/1017802426666991661/1101911489620742225/Teal_Grey_Blue_Trendy_Retro_Digitalism_Creative_Presentation__2_-removebg-preview.png"/>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Router>
      {/* <Navbar/> */}
        <Routes>
          <Route path='/' element={<Login_Page/>}/>
          <Route path='/customer' element={<Customer_Page/>}/>
          <Route path='/provider' element={<Provider_Page/>}/>
          <Route path='/status' element={<Status_Page/>}/>
          <Route path='/register' element={<Register_Page/>}/>
          <Route path='/tracking' element={<Tracking_Page/>}/>
          <Route path='/order' element={<Order_Page/>}/>
          <Route path='/infomation' element={<Inform/>}/>
          <Route path='/edit' element={<Edit/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
