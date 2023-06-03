import React , {useState}from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import './Register_Page.css';

function Register_Page() {
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
  const [id,setId] = useState('');
  const [fname,setFname] = useState('');
  const [lname,setLname] = useState('');
	const [pass,setPass] = useState('');
  const [conPass,setConPass] = useState('');
    
	const handleSubmit=(e)=>{
    if(pass!==conPass){
      window.alert('pass != conPass');
      return 0;
    }
		e.preventDefault();
    var jsonData={
          "studentId": id,
          "firstName": fname,
          "lastName": lname,
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
      //handle success
        if(response.data==='Added Successfully')
        {
          window.alert('Sign up success');
          window.location.replace('http://localhost:3000/');
        }
        else
        {
          window.alert('already used');
        }
        console.log(response);
      }).catch(function (response) {
          //handle error
          window.alert('Sign in fail');
          console.log(response.data);
      });           
	}
  return (
    <>
        
        <div className='register-container'>
          <h1>SIGN UP</h1>
          <input value={fname} onChange={(e)=>setFname(e.target.value)} placeholder="Enter Firstname" name="fname"/>
          <input value={lname} onChange={(e)=>setLname(e.target.value)} placeholder="Enter Lastname" name="lname"/>
          <input value={id} onChange={(e)=>setId(e.target.value)} placeholder="Enter Student_ID" name="id"/>
          <input value={pass} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="Password" name="password"/>
          <input value={conPass} onChange={(e)=>setConPass(e.target.value)} type="password" placeholder="Confirm Password" name="confirm password"/>
          <button onClick={handleSubmit}>Sign up</button>
          <p>Already have an account? <Link to="/">Log in</Link></p>
        </div>
    </>
  )
}

export default Register_Page