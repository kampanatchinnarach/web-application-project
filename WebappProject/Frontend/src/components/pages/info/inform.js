import React,{useState} from 'react';
import axios from 'axios';
import {NameLastname,Payment} from "./NameQR";
import './inform.css';
import {Phone,PaymentOption,PaymentNumber,StudentId } from "./SelfData";
import { Link } from 'react-router-dom';

function Inform() {
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
  const PhotoPart = 'http://localhost:54177/Photos/';
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
    const [json,setJson] = useState([]);

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
    method: "post",
    url: "http://localhost:54177/api/userInfo/getUserInfo",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(jsonData)
  }).then(function(response){
    setJson(response.data);
  });
  if(json.firstName===''||json.lastName===''||json.userPhotosName===''||json.paymentPhotosName===''
  ||json.phoneNumber===''||json.paymentNumber===''||json.paymentBank===''){
    localStorage.setItem('edit','true');
    window.location.replace('http://localhost:3000/edit');
    //window.alert('Please edit all of the informations.');
    
  }
  
    return(
        <div className="container"> 
            <div className='left-container'>
                <h1>Information</h1>
                <div className='menu-container'>
                  <Link to='/infomation' ><i class="fa-solid fa-user active"/></Link>
                  <Link to={localStorage.getItem('providerOrOrder')} ><i class="fa-solid fa-store"/></Link> 
                  <Link to='/customer' ><i class="fa-solid fa-cart-shopping"/></Link> 
                  <Link to='/status' ><i class="fa-solid fa-list"/></Link>
                  <i onClick={logoutClick} class="fa-solid fa-right-from-bracket"/>
                </div>
            </div>
            <div className="information-container">
                <h1 className="head-info" style={{fontWeight: 'bold', color: 'var(--bg-color)'}}>INFORMATION</h1>
                <Link to='/Edit'>  
                    <button  className="EditButton"><i class="fa-solid fa-pen-to-square" style={{scale: '2', color: 'var(--text-color)', backgroundColor: 'var(--sub-color)'}}></i></button>
                </Link>

                <NameLastname Name={json.firstName} Lastname={json.lastName} photos={PhotoPart+json.userPhotosName}/>
                <Payment photos={PhotoPart+json.paymentPhotosName}/>
                <div className="container-local infobg-color">
                    <StudentId studentId={json.studentId} />
                    <Phone phone={json.phoneNumber} />
                    <PaymentNumber paymentnumber={json.paymentNumber} />
                    <PaymentOption paymentOption={json.paymentBank} />
                </div>
            </div>
        </div>
        ) 
}

export default Inform;