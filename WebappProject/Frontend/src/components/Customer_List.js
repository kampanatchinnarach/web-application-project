import React from 'react'
import './Customer_List.css';
import { useNavigate } from 'react-router-dom';

function Customer_List(props) {
    const navigate = useNavigate()
    
    const handleClick = () => {
      if(props.total_amount<=props.booked_amount){
        window.alert('Can\'t Order');
      }
      else{
        localStorage.setItem('orderId',props.id);
        navigate('/order');
      }
    }
    var bt=props.btn;
  if(props.total_amount===props.booked_amount){
    bt="Can't Order";
  }
    return (
      <div className='customer-list-container'>
          <div className='customer-text-container'>
              <p>Location: {props.location}</p>
              <p>Total amount of orders: {props.total_amount}</p>
              <p>Remaining amount of orders: {props.total_amount-props.booked_amount}</p>
              <p>Booked amount of orders: {props.booked_amount}</p>
              <p>Pick up point: {props.pickup}</p>
          </div>
          <button onClick={handleClick}>{bt}</button>
      </div>
    )
}

export default Customer_List