import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./login.css";
import { useNavigate, Navigate } from "react-router-dom";

const Login = (e) => {
  //   const navigate = useNavigate();

  //const history= useHistory();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let value_email = { email };
  let value_pw = { password };

  const handleInputs = (e) => {
    setEmail(e.target.value_email);
    setPassword(e.target.value_pw);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = res.json();

    if (res.status === 422) {
      window.alert("Fill in all the required fields!");
    } else if (res.status === 400 || !data) {
      window.alert("Invalid Keyed in Credentials");
    } else {
      window.alert("Login Succesful");
      navigate("/");
      // navigate("for you page");
    }
  };

  //   let field, value;

  //   const handleInputs= (e) =>{
  //     console.log(e);
  //     field= e.target.id;
  //     value=e.target.value;

  //     setUser({... user, [field]:value});
  //   }

  //   const postData= async (e) =>{
  //     e.preventDefault();
  //     const  {firstname, lastname, phonenumber, emailaddress, password, confirmpassword }= user;

  //     const res= await fetch("/register", {
  //       method:"POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         firstname, lastname, phonenumber, emailaddress, password, confirmpassword
  //       })
  //   });

  //     const data= await res.json();

  //     if(res.status===422 || !data){
  //       window.alert("Registration not Succesful");
  //       console.log("Invalid Registration");
  //     } else{
  //       window.alert("Success");
  //       console.log("Success");
  //       navigate("/DestinationSearch");
  //     }

  //   }

  return (
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
                  <input
                    data-testid="email"
                    type="email"
                    class="form-control"
                    id="emailaddress"
                    value={email}
                    onChange={handleInputs}
                    placeholder="Enter your registered email address"
                  />
                </div>

                <div data-testid="second">
                  <label for="password">Password</label>
                  <input
                    data-testid="password"
                    type="password"
                    class="form-control"
                    id="password"
                    onChange={handleInputs}
                    placeholder="Enter your password"
                  />
                </div>
              </form>
            </section>
            <button
              data-testid="LoginBtn"
              type="submit"
              className="loginButton"
              onClick={loginUser}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
