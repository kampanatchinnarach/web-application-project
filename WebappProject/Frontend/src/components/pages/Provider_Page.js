import React,{useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Provider_Page.css';

function Provider_Page() {
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
  const linkToOR=(e)=>{
    window.location.replace('http://localhost:3000/tracking');
  }
  const d = new Date();
  let time = d.getTime();
  if(localStorage.getItem('deleteTime')!=='null'){
    if(time-parseInt(localStorage.getItem('deleteTime'))>10000){
      localStorage.setItem('deleteTime',null);
      axios.delete('http://localhost:54177/api/hostList/'+localStorage.getItem('hostOrderId'))
                .then(function (response){
                  
                  localStorage.setItem('hostOrderId',null);
                  window.alert('Delete Successfully');
                });
    }
  }
  const [location,setLocation] = useState('');
	const [amount,setAmount] = useState(0);
  const [pickup,setPickup] = useState('');

	const handleSubmit=(e)=>{
		e.preventDefault();
    if(location===''||amount===''||pickup===0){
      window.alert('Please select all information');
      return 0;
    }
    var jsonData={
      "restaurant": location,
      "nowNum": 0,
      "maxNum": amount,
      "destination": pickup,
      "status": "Can Order",
      "order":''
    }

    axios({
      method: "post",
      url: "http://localhost:54177/api/hostList",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(jsonData)
    })
    .then(function (response) {
      console.log(response.data);
      localStorage.setItem('hostOrderId',String(response.data));
      if(response.data!==null)
      {
        //window.alert('Post success');
        //console.log(localStorage.getItem('token'));
        var jsonData={
          "studentId": String(localStorage.getItem('token')),
          "firstName": '',
          "lastName": '',
          "phoneNumber": '',
          "paymentBank": '',
          "paymentNumber": '',
          "password": '',
          "userPhotosName":'',
          "paymentPhotosName":''
          }
        axios({
          method: "put",
          url: "http://localhost:54177/api/userInfo",
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify(jsonData)
        }).then(function(response){
          console.log(response.data);
          if(response.data==='Put Successfully'){
          //window.alert('Put success');
          window.location.replace('http://localhost:3000/tracking');
          }
          else{
            window.alert('Put fail1');
          }
        }).catch(function(response){
          window.alert('Put fail2');
        });
      }
      else
      {
        window.alert('Post fail');
      }
      }).catch(function (response) {
          //handle error
          console.log(response);
      });           
	}

  return (
    <div className='container'>
        <div className='left-container'>
          <h1>Provider</h1>
          <div className='menu-container'>
            <Link to='/infomation' ><i class="fa-solid fa-user "/></Link>
            <Link to={localStorage.getItem('providerOrOrder')} ><i class="fa-solid fa-store active"/></Link> 
            <Link to='/customer' ><i class="fa-solid fa-cart-shopping"/></Link> 
            <Link to='/status' ><i class="fa-solid fa-list"/></Link>
            <i onClick={logoutClick} class="fa-solid fa-right-from-bracket"/>
          </div>
        </div>
        <div className='right-container'>
          <h2 style={{marginTop: '2.02vw'}}>Location</h2>
          <select onChange={(e)=>setLocation(e.target.value)}>
            <option>Select your location</option>
            <option value="โรงอาหารตึกพระเทพฯ">โรงอาหารตึกพระเทพฯ</option>
            <option value="7-11 ข้างตึก ECC">7-11 ข้างตึก ECC</option>
            <option value="โรงอาหาร A">โรงอาหาร A</option>
            <option value="โรงอาหาร C">โรงอาหาร C</option>
            <option value="เกกี 1">เกกี 1</option>
            <option value="เกกี 2">เกกี 2</option>
            <option value="เกกี 3">เกกี 3</option>
            <option value="เกกี 4">เกกี 4</option>
          </select>
          <h2 >Amount</h2>
            <input style={{width: '31.25vw', height: '4.63vh', marginBottom: '4.63vh', textAlign: 'center'}} type='number' placeholder="Enter your amount" onChange={(e)=>setAmount(e.target.value)} min="0" max="10"/>
          <h2>Pickup point</h2>
          <select onChange={(e)=>setPickup(e.target.value)}>
            <option>Select where is a pickup point</option>
            <option value='ใต้ตึก ECC'>ใต้ตึก ECC</option>
            <option value='HardWare LAB'>HardWare LAB</option>
            <option value='ISAG LAB'>ISAG LAB</option>
            <option value='ESL LAB'>ESL LAB</option>
            <option value='Network LAB'>Network LAB</option>
            <option value='SAIG LAB'>SAIG LAB</option>
            <option value='HCRL LAB'>HCRL LAB</option>
            <option value='co-working space'>co-working space</option>
          </select>
          
          <button className='Provider' onClick={handleSubmit} style={{marginTop: '10vh'}}>Open for service</button>
          
        </div>
    </div>
  )
}

export default Provider_Page