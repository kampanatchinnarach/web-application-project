import { Component } from "react";
import './NameQR.css';


class NameLastname extends Component{
    render(){
        return(
            //ทำแบบ probs เพื่อเอาไว้รับข้อมูล
            <div className="profile-container">
            
                <img class="profilePic" alt="" src={this.props.photos}></img>
                <h2 className="text-name-qr text-order">{this.props.Name}       {this.props.Lastname}</h2>
                
                
            </div>     
        );
    }
}

class Payment extends Component{
    render(){
        //ทำแบบ probs เพื่อเอาไว้รับข้อมูล
        var modal = document.getElementById("myModal");

        // Get the image and insert it inside the modal - use its "alt" text as a caption
        var img = document.getElementById("myImg");
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");
        const imgClick=(e)=>{
          modal.style.display = "block";
          modalImg.src = img.src;
          captionText.innerHTML = img.alt;
        }
        
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        
        // When the user clicks on <span> (x), close the modal
        const spanClick=()=> {
          modal.style.display = "none";
        }
        return(
            <div className = "payment-container">
                {/* <img class="QR" alt="" src={this.props.photos}></img> */}

                <img id="myImg" src={this.props.photos} alt="QRcode" className="QR" onClick={(e)=>imgClick(e)}/>
                        <div id="myModal" class="modal">

                            <span class="close" onClick={spanClick}>&times;</span>

                            <img class="modal-content" id="img01"/>

                            <div id="caption"></div>
                        </div>
                <h2 className="text-name-qr text-order">QR payment</h2>
                
            </div>

        );
    }
}

export  {NameLastname,Payment};
    