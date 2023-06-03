import React , {useState}from 'react';
import axios from 'axios';
import './inform.css';
import './Edit.css';
import  { Link } from 'react-router-dom';
import {Phone,PaymentOption,PaymentNumber,StudentId } from "./SelfData";

function Edit() {
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
    const [PhotoFileName1,setPhotoFileName1] = useState('');
    const [PhotoFileName2,setPhotoFileName2] = useState('');
    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
	const [phone,setPhone] = useState('');
    const [paymentBank,setPaymentBank] = useState('');
    const [paymentNumber,setPaymentNumber] = useState('');
    
    const PhotoPart = 'http://localhost:54177/Photos/';
    const formData=new FormData();
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
    var showNav='hidden';
    //const [showNav,setShowNav]=useState('hidden');
    if(localStorage.getItem('edit')!=='true'){
        showNav='visible';
        //setShowNav('visible');
    }
    else{
        showNav='hidden';
        //setShowNav('hidden');
    }
    const logoutClick=(e)=>{
        if(window.confirm('Do you want Logout?')){
        localStorage.setItem('token',null);
        window.alert("logout");
        window.location.replace('http://localhost:3000/');
        }
      }
    const uploadPic=(e,type)=>{
        
        var fileName=String(e.name);
        var photoName;
        if (type==='user'){
            photoName=localStorage.getItem('token')+'-user';
        }
        else if(type==='QRcode'){
            photoName=localStorage.getItem('token')+'-QRcode';
        }
        for(var i=fileName.length -1;i>0;i--){
            if(fileName[i]==='.'){
                photoName += fileName.substring(i);
                break;
            }
        }
        
        formData.append("file",e,photoName);

        axios.post("http://localhost:54177/api/userInfo/savefile/",formData,{headers: { 'Content-Type': 'multipart/form-data' },})
                .then(function (response) {
                if(type==='user'){
                    setPhotoFileName1(response.data);
                }
                else if(type==='QRcode'){
                    setPhotoFileName2(response.data);
                }
                    console.log(response.data);
                    if(response.data!=="anonymous.png")
                        {
                            window.alert('Upload success')
                        }
                        else
                        {
                            window.alert('Upload fail')
                        }
                    }).catch(function (response) {
                        console.log("response");
                    });
        }
    console.log(PhotoFileName1);
	const handleSubmit=(e)=>{
        if(PhotoFileName1===''||PhotoFileName2===''||fname===''||lname===''||phone===''||paymentBank===''||paymentNumber===''){
            window.alert('Please fill all of the informations.');
            return 0;
        }
		e.preventDefault();
        var jsonData={
            "studentId": localStorage.getItem('token'),
            "firstName": fname,
            "lastName": lname,
            "phoneNumber": phone,
            "paymentBank": paymentBank,
            "paymentNumber": paymentNumber,
            "password": '',
            "userPhotosName":PhotoFileName1,
            "paymentPhotosName":PhotoFileName2,
            }

        axios({
        method: "put",
        url: "http://localhost:54177/api/userInfo",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(jsonData)
        })
        .then(function (response) {
        //handle success
            if(response.data==='Put Successfully')
            {
            localStorage.setItem('edit','false');
            window.alert('Edit success');
            window.location.replace('http://localhost:3000/infomation');
            }
            else
            {
            window.alert('Edit Fail1');
            }
            console.log(response);
        }).catch(function (response) {
            //handle error
            window.alert('Edit Fail2');
            console.log(response.data);
        });           
	}
    
    return(

        <div className='container'>
            <div className='left-container' style={{visibility: showNav}}>
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
            
            
           <div className="profile-container">
                <img className="profilePic" alt="" src={PhotoPart+PhotoFileName1}></img>
                <input value={fname} onChange={(e)=>setFname(e.target.value)} placeholder="Enter Firstname" name="fname"></input>
                <input value={lname} onChange={(e)=>setLname(e.target.value)} placeholder="Enter Lastname" name="lname"></input>
                <label for="file-upload1" class="label-button">แก้ไขรูปภาพ</label>
                <input  id='file-upload1' type='file' onChange={(e)=>uploadPic(e.target.files[0],'user')} className='EditPicButton' ></input>
           </div>

           <div className="payment-container">
                <img className="QR" alt="" src={PhotoPart+PhotoFileName2}></img>
                <h2 className="text-order">QR payment</h2>
                <label for="file-upload2" class="label-button">แก้ไข QR</label>
                <input  id="file-upload2" class="EditQrButton" type='file' onChange={(e)=>uploadPic(e.target.files[0],"QRcode")} ></input>
           </div>

           <div className="container-local editbg-color">
                <div className="Edit-data editbg-color">
                    <StudentId studentId={localStorage.getItem('token')} />
                </div>
                <div className="Edit-data editbg-color">
                    <legend className="editbg-color">Phone</legend>
                    <input type="number" placeholder='Enter Phone' value={phone} onChange={(e)=>setPhone(e.target.value)} name="phone"></input>
                </div>
                <div className="Edit-data editbg-color">
                    <legend className="editbg-color">PaymentNumber</legend>
                    <input type="number" placeholder='Enter Payment Number' value={paymentNumber} onChange={(e)=>setPaymentNumber(e.target.value)} name="paymentNumber"></input>
                </div>
                <div className="Edit-data editbg-color">
                    <legend className="editbg-color">PaymentBank</legend>
                    <input type="text" placeholder='Enter Payment Bank' value={paymentBank} onChange={(e)=>setPaymentBank(e.target.value)} name="paymentBank"></input>
                </div> 
           </div>
           <Link to='/infomation' >  
                    <button className="CancelButton" style={{visibility: showNav}}>Cancel</button>
            </Link>
            <button onClick={handleSubmit} className="SaveButton">Save</button>
        </div>

        </div>
        )
}

export default Edit;