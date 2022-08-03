import React, {useState} from 'react';
import Navbar from "../../components/navbar/Navbar";
import "./register.css";
import { useNavigate } from "react-router-dom";

const Register= () => {
  const navigate = useNavigate();
  const [user, setUser]= useState({
    "firstname":"",
    "lastname": "",
    "phonenumber": "",
    "emailaddress": "",
    "password": "",
    "confirmpassword": ""
  })

  let field, value;

  const handleInputs= (e) =>{
    console.log(e);
    field= e.target.id;
    value=e.target.value;

    setUser({... user, [field]:value});
  }

  const postData= async (e) =>{
    e.preventDefault();
    const  {firstname, lastname, phonenumber, emailaddress, password, confirmpassword }= user;

    const res= await fetch("/register", {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstname, lastname, phonenumber, emailaddress, password, confirmpassword 
      })
  });

    const data= await res.json();
    
    if(res.status===422 || !data){
      window.alert("Registration not Succesful");
      console.log("Invalid Registration");
    } else{
      window.alert("Success");
      console.log("Success");
      navigate("/DestinationSearch");
    }


  }

  return(
    <div>
    <Navbar />
    <div className="registerContainer">
      <div className="registerChildContainer">
        <div className="heading">Help us get to know you better!</div>
        <div className="guestInfoContainer">
          {/* <div className="info">Your Information</div> */}
          <section>
      <form method="POST">
        <div data-testid="first">
          <label for="firstname">First Name</label>
          <input data-testid="firstname" type="text" class="form-control" id="firstname" 
            value={user.firstname}
            onChange={handleInputs}/>
     
        </div>
        <div data-testid="second">
          <label for="lastname">Last Name</label>
          <input data-testid="lastname" type="text" class="form-control" id="lastname" 
            value={user.lastame}
            onChange={handleInputs}/>
        </div>
        <div data-testid="third">
          <label for="phonenumber">Phone Number</label>
          <input data-testid="phone" type="text" class="form-control" id="phonenumber" 
            value={user.phonenumber}
            onChange={handleInputs}/>
        </div>
        <div data-testid="fourth">
          <label for="emailaddress">Email</label>
          <input data-testid="email" type="email" class="form-control" id="emailaddress" 
            value={user.emailaddress}
            onChange={handleInputs}/>
        </div>
        <div data-testid="fifth">
          <label for="password">Password</label>
          <input data-testid="password" type="password" class="form-control" id="password"
            value={user.password}
            onChange={handleInputs}/>
        </div>
        <div data-testid="sixth">
          <label for="confirmpassword">Confirm Password</label>
          <input data-testid="confirm" type="password" class="form-control" id="confirmpassword"
            value={user.confirmpassword}
            onChange={handleInputs}/>
        </div>
      </form>
      </section>
          <button data-testid="SubmitBtn" type="submit" className="submitButton" onClick={postData}>
              Submit
            </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register