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
    
    if(!data){
      window.alert("Registration not Succesful");
    } else if(res.status===422){
      window.alert("Fill in al the required fields!")
    } else if(res.status===423){
      window.alert("User with given email already exists!")
    } else if(res.status===424){
      window.alert("Password, and Confirm Password fields are mismatching!")
    } else if(res.status===425){
      window.alert("Password too short!")
    } else{
      window.alert("Registration Success");
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
            onChange={handleInputs}
            placeholder="Enter your First Name"/>
     
        </div>
        <div data-testid="second">
          <label for="lastname">Last Name</label>
          <input data-testid="lastname" type="text" class="form-control" id="lastname" 
            value={user.lastame}
            onChange={handleInputs}
            placeholder="Enter your Last Name"/>
        </div>
        <div data-testid="third">
          <label for="phonenumber">Phone Number</label>
          <input data-testid="phone" type="text" class="form-control" id="phonenumber" 
            value={user.phonenumber}
            onChange={handleInputs}
            placeholder="Enter your Phone Number"/>
        </div>
        <div data-testid="fourth">
          <label for="emailaddress">Email</label>
          <input data-testid="email" type="email" class="form-control" id="emailaddress" 
            value={user.emailaddress}
            onChange={handleInputs}
            placeholder="Enter your Email Address"/>
        </div>
        <div data-testid="fifth">
          <label for="password">Password</label>
          <input data-testid="password" type="password" class="form-control" id="password"
            value={user.password}
            onChange={handleInputs}
            placeholder="Enter Password (Min. 6 characters)"/>
        </div>
        <div data-testid="sixth">
          <label for="confirmpassword">Confirm Password</label>
          <input data-testid="confirm" type="password" class="form-control" id="confirmpassword"
            value={user.confirmpassword}
            onChange={handleInputs}
            placeholder="Confirm your Entered Password"/>
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