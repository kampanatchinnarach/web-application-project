import { Component } from "react";
import './SelfData.css'

  class UserName extends Component{
    render(){
        return(
        <div className="container-data">
            <div className="container-usn">
              <legend>User Name</legend>
                <div  className="boxname-usn">
                  <p>{this.props.Username}</p>
                </div>
              </div>
        </div>
        );
    };
};

class Nickname extends Component{
    render(){
        
        return(
         <div className="container-data">
            <div className="container-nn">
                <legend>Nickname</legend>
                <div  className="boxname-usn">
                    <p>{this.props.nickname}</p>
                </div>
            </div>
        </div>
        );
    };
};

class StudentId extends Component{
    render(){
        
        return(
            <div className="container-data infobg-color">
            <div  className="container-si infobg-color">
            <legend className="infobg-color">Student Id</legend>
            <div  className="boxname-usn infobg-color infobg-color">
                <p className="infobg-color">{this.props.studentId}</p>
              </div>
            </div>
            </div>

    
    
        );
    };

};

class   Phone extends Component{
    render(){
        
        return(
            <div className="container-data infobg-color">
            <div  className="container-ph infobg-color">
            <legend className="infobg-color">Phone</legend>
            <div  className="boxname-usn infobg-color">
                <p className="infobg-color">{this.props.phone}</p>
              </div>
            </div>
            </div>
        );
    };
};

class PaymentOption extends Component{
    render(){
        
        return(
            <div className="container-data infobg-color">
            <div  className="container-po infobg-color">
            <legend className="infobg-color">PaymentOption</legend>
            <div  className="boxname-usn infobg-color">
                <p className="infobg-color">{this.props.paymentOption}</p>
              </div>
            </div>
            </div>
    
    
        );
    };
};

class PaymentNumber extends Component{
    render(){
        return(
            <div className="container-data infobg-color">
                <div  className="container-pm infobg-color">
                    <legend className="infobg-color">PaymentNumber</legend>
                    <div  className="boxname-usn infobg-color">
                        <p className="infobg-color">{this.props.paymentnumber}</p>
                    </div>
                </div>
            </div>

    
        );
    };
};

export {UserName,Nickname,Phone,PaymentOption,PaymentNumber,StudentId}