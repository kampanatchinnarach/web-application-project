import React,{useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Status_List from '../Status_List';

function Status_Page() {
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
  //console.log(time-parseInt(localStorage.getItem('deleteTime')));
  if(localStorage.getItem('deleteTime')!=='null'){
    if(time-parseInt(localStorage.getItem('deleteTime'))>10000){
      localStorage.setItem('deleteTime',null);
      axios.delete('http://localhost:54177/api/hostList/'+localStorage.getItem('hostOrderId'))
                .then(function (response){
                  localStorage.setItem('hostOrderId',null);
                  window.alert('Delete Successfully');
                })
                .catch(function (response){
                  window.alert('Delete Fail');
                })
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
  var jsonData1={
    "id":null,
    "restaurant": null,
    "nowNum": null,
    "maxNum": null,
    "destination": null,
    "status": null,
    "order":null
  }
  var showData = [[jsonData1,"null null"]];
  var haveOrderNow = [];
  if(localStorage.getItem('haveOrder')!==null){
    showData.pop();
    var haveOrderId=localStorage.getItem('haveOrder').split(",");
    var showOrder=localStorage.getItem('order').split(",");
    for(var j=0;j<haveOrderId.length;j++){
      for(var i=0;i<jsonData.length;i++){
        if(String(jsonData[i].id)===haveOrderId[j]){
          showData.push([jsonData[i],showOrder[j]]);
          haveOrderNow.push(haveOrderId[j]);
          break;
        }
      }
  }
  
}
  return (
    <div className='container'>
    <div className='left-container'>
      <h1>Status</h1>
      <div className='menu-container'>
        <Link to='/infomation' ><i class="fa-solid fa-user"/></Link>
        <Link to={localStorage.getItem('providerOrOrder')} ><i class="fa-solid fa-store"/></Link> 
        <Link to='/customer' ><i class="fa-solid fa-cart-shopping"/></Link> 
        <Link to='/status' ><i class="fa-solid fa-list active"/></Link>
        <i onClick={logoutClick} class="fa-solid fa-right-from-bracket"/>
      </div>
    </div>
      <div style={{height: '1.01vw'}}></div>
      <div className='right-container'>
            <div style={{height: '1.01vw'}}></div>
            {showData.map(data=>
              <Status_List location={data[0].restaurant} pickup={data[0].destination} btn={data[0].status} menu={data[1].split(" ")[0]} amount={data[1].split(" ")[1]}/>
            )}
            
      </div>
      <div style={{height: '1.01vw'}}></div>
    </div>
  )
}

export default Status_Page