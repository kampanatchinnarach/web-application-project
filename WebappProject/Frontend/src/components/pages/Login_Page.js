import React,{useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login_Page.css';


function Login_Page() {
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
  const [id,setId] = useState('');
	const [pass,setPass] = useState('');
    
	const handleSubmit=(e)=>{
		e.preventDefault();
    var jsonData={
          "studentId": id,
          "firstName": 'login',
          "lastName": '',
          "phoneNumber": '',
          "paymentBank": '',
          "paymentNumber": '',
          "password": pass,
          "userPhotosName":'',
          "paymentPhotosName":''
          }

    axios({
      method: "post",
      url: "http://localhost:54177/api/userInfo",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(jsonData)
    })
    .then(function (response) {
      console.log(response.data);
      if(response.data!=='Login Fail')
      {
        localStorage.setItem('hostOrderId',null);
        localStorage.setItem('token',response.data)
        localStorage.setItem('providerOrOrder','/provider');
        localStorage.setItem('edit','false');
        window.alert('Login success');
        window.location.replace('http://localhost:3000/infomation');
      }
      else
      {
        window.alert('StudentId or Password incorrect')
      }
      console.log(response);
      }).catch(function (response) {
          //handle error
          console.log(response.data);
      });  
               
	}
  return (
    <>
        {/* <div className='text-container'>
          <Link to="/login"><h1>NAME</h1></Link>
          <h2><Link to="/register">SIGN UP</Link></h2>
        </div> */}
        <div className='login-container'>
          <h1>LOGIN</h1>
          <p>Hey, Enter your details to get sign in to your account</p>
          <input value={id} onChange={(e)=>setId(e.target.value)} placeholder="Enter Student_ID" name="id"/>
          <input value={pass} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="Password" name="password"/>
          <button onClick={handleSubmit}>Log in</button>
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
    </>
  )
}

export default Login_Page