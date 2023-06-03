import React,{useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Customer from '../Customer_List';
import './Provider_Page.css'

function Customer_Page() {
  if(localStorage.getItem('hostOrderId')!=='null'){
    if(localStorage.getItem('providerOrOrder')!=="/tracking"){
      localStorage.setItem('providerOrOrder',"/tracking");
    }
  }
  else{
    if(localStorage.getItem('providerOrOrder')!=="/provider"){
      localStorage.setItem('providerOrOrder',"/provider");
    }
  }
  const logoutClick=(e)=>{
    if(window.confirm('Do you want Logout?')){
      localStorage.setItem('token',null);
      window.alert("logout");
      window.location.replace('http://localhost:3000/');
      }
  }
  const d = new Date();
  let time = d.getTime();
  if(localStorage.getItem('deleteTime')!=='null'){
    localStorage.setItem('deleteTime',null);
    if(time-parseInt(localStorage.getItem('deleteTime'))>10000){
      axios.delete('http://localhost:54177/api/hostList/'+localStorage.getItem('hostOrderId'))
                .then(function (response){
                  
                  localStorage.setItem('hostOrderId',null);
                  window.alert('Delete Successfully');
                });
    }
  }
  const [jsonData,setjsonData] = useState([]);
  
  axios({
      method: "get",
      url: "http://localhost:54177/api/hostList",
  }).then(function (response) {
    //console.log(jsonData);
      setjsonData(response.data);
  }).catch(function(response){
    //console.log(jsonData);
  });
  var showData = [];
  for(var i=0;i<jsonData.length;i++){
    if(jsonData[i].status==="Can Order"){
      showData.push(jsonData[i]);
    }
  }

  console.log(showData);
  return (
    <div className='container'>
    <div className='left-container'>
      <h1>Customer</h1>
      <div className='menu-container'>
        <Link to='/infomation' ><i class="fa-solid fa-user"/></Link>
        <Link to={localStorage.getItem('providerOrOrder')} ><i class="fa-solid fa-store"/></Link> 
        <Link to='/customer' ><i class="fa-solid fa-cart-shopping active"/></Link> 
        <Link to='/status' ><i class="fa-solid fa-list"/></Link>
        <i onClick={logoutClick} class="fa-solid fa-right-from-bracket"/>
      </div>
  </div >
     <div className='right-container'>
            <div style={{height: '1.01vw'}}></div>
            {showData.map(json=>
           
              <Customer location={json.restaurant} total_amount={json.maxNum} booked_amount={json.nowNum} pickup={json.destination} btn="Order" id={json.id}/>
           
            )}
            <div style={{height: '1.01vw'}}></div>
    </div>
  </div>
  )
}

export default Customer_Page