import React from 'react'
import { useEffect, useState} from 'react'
import Navbar from "../../components/navbar/Navbar";

import { useNavigate} from "react-router-dom";


const About= () => {

    const navigate= useNavigate();
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [userData, setUserData]= useState();
    
    let value_email={email};
    let value_pw= {password};
    

    const handleInputs= (e) =>{
        setEmail(e.target.value_email);
        setPassword(e.target.value_pw);
    }

    const loginUser= async (e) =>{
    e.preventDefault();

    const res = await fetch('/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify({
            email,
            password
        })
    });

    const data= res.json();

    if (res.status === 422){
        window.alert("Fill in all the required fields!");
    }else if (res.status===400 || !data){
        window.alert("Invalid Keyed in Credentials");
    } else{
        window.alert("Login Succesful");
        callAboutPage();
        // navigate("for you page");
    }
    }

    const callAboutPage = async () =>{


        try {
            const res= await fetch('/about');
            method:"GET";
            headers: {
                "Content-Type"; "application/json"
                Accept: "application/json"};
            credentials:"include";

            const data= await res.json();
            setUserData(data);

            if(!res.status === 200){
                const error= new Error(res.error);
                throw error;
            }

        } catch(err) {
            console.log(err);
            navigate("/register")

        }
    }

    // useEffect(() => {
    //     callAboutPage();
    // }, []);          

    return(


        <div>
        <Navbar />

        <div className="registerContainer">
        <div className="registerChildContainer">
        <div className="heading">Please Login!</div>
        <div className="guestInfoContainer">
            {/* <div className="info">Your Information</div> */}
            <section>
        <form method="POST">
        
        <div data-testid="first">
            <label for="emailaddress">Email</label>
            <input data-testid="email" type="email" class="form-control" id="emailaddress" 
            value={email}
            onChange= {handleInputs}
            />
        </div>

        <div data-testid="second">
            <label for="password">Password</label>
            <input data-testid="password" type="password" class="form-control" id="password"
            onChange={handleInputs}
            />
        </div>
        
        </form>
        </section>
            <button data-testid="LoginBtn" type="submit" className="loginButton" onClick={loginUser}>
                Log In
            </button>
        </div>
        </div>
        </div>

        <div className="registerContainer">
            <div className="registerChildContainer">
            <div className="heading">Please Login!</div>
            <div className="guestInfoContainer">
                {/* <div className="info">Your Information</div> */}
            <section>
            <form method="GET">
            
            <div data-testid="first">
                <label for="firstname">First Name</label>
                <p data-testid="firstname" type="firstname" class="form-control" id="firstname" 
                value={userData.firstname}
                onChange= {handleInputs}
                />
            </div>
    
            <div data-testid="second">
                <label for="lastname">Last Name</label>
                <input data-testid="lastname" type="lastname" class="form-control" id="lastname"
                value={userData.lastname}
                onChange={handleInputs}
                />
            </div>

            <div data-testid="third">
                <label for="phonenumber">Phone Number</label>
                <input data-testid="phonenumber" type="phonenumber" class="form-control" id="phonenumber"
                value={userData.phonenumber}
                onChange={handleInputs}
                />
            </div>

            <div data-testid="fourth">
                <label for="emailaddress">Email Address</label>
                <input data-testid="emailaddress" type="emailaddress" class="form-control" id="emailaddress"
                value={userData.emailaddress}
                onChange={handleInputs}
                />
            </div>

            <div data-testid="fifth">
                <label for="hotelinfo">Hotel Info</label>
                <input data-testid="hotelinfo" type="hotelinfo" class="form-control" id="hotelinfo"
                value={userData.hotelinfo}
                onChange={handleInputs}
                />
            </div>

            <div data-testid="sixth">
                <label for="roominfo">Room Info</label>
                <input data-testid="roominfo" type="roominfo" class="form-control" id="roominfo"
                value={userData.roominfo}
                onChange={handleInputs}
                />
            </div>
            
            </form>
            </section>
                {/* <button data-testid="LoginBtn" type="submit" className="loginButton" onClick={loginUser}>
                    Log In
                </button> */}
            </div>
            </div>
        </div>
        </div>
        )
}

export default About