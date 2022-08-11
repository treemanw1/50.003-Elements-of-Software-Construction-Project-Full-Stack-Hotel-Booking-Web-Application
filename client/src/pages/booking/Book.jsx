import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./book.css";

const Book = () => {
  const [booking, setBooking] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    emailaddress: "",
    creditcardnumber: "",
    expirydate: "",
    cvv: "",
    specialrequests: "",
  });

  let field, value;

  const handleInputs = (e) => {
    console.log(e);
    field = e.target.id;
    value = e.target.value;

    setBooking({ ...booking, [field]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      phonenumber,
      emailaddress,
      creditcardnumber,
      expirydate,
      cvv,
      specialrequests,
    } = booking;

    const res = await fetch("/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        phonenumber,
        emailaddress,
        creditcardnumber,
        expirydate,
        cvv,
        specialrequests,
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert("Booking Unsuccesful");
      console.log("Booking Unsuccesful");
    } else {
      window.alert("Success");
      console.log("Success");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bookingContainer">
        <div className="bookingChildContainer">
          <div className="heading">Booking Details</div>
          <div className="guestInfoContainer">
            {/* <div className="info">Your Information</div> */}
            <section>
              <form method="POST">
                {/* <div className="subHeading">Your Information</div> */}
                <div data-testid="firstbook">
                  <label for="firstname">First Name</label>
                  <input
                    data-testid="firstname-book"
                    type="text"
                    class="form-control"
                    id="firstname"
                    value={booking.firstname}
                    onChange={handleInputs}
                    placeholder="Enter your first name"
                  />
                </div>
                <div data-testid="secondbook">
                  <label for="lastname">Last Name</label>
                  <input
                    data-testid="lastname-book"
                    type="text"
                    class="form-control"
                    id="lastname"
                    value={booking.lastname}
                    onChange={handleInputs}
                    placeholder="Enter your last name"
                  />
                </div>
                <div data-testid="thirdbook">
                  <label for="phonenumber">Phone Number</label>
                  <input
                    data-testid="phone-book"
                    type="tel"
                    class="form-control"
                    id="phonenumber"
                    value={booking.phonenumber}
                    onChange={handleInputs}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div data-testid="fourthbook">
                  <label for="emailaddress">Email</label>
                  <input
                    data-testid="email-book"
                    type="email"
                    class="form-control"
                    id="emailaddress"
                    value={booking.emailaddress}
                    onChange={handleInputs}
                    placeholder="Enter your email address"
                  />
                </div>
                <div data-testid="fifthbook">
                  <label for="creditcardnumber">Credit Card Number</label>
                  <input
                    data-testid="card-book"
                    type="text"
                    class="form-control"
                    id="creditcardnumber"
                    value={booking.creditcardnumber}
                    onChange={handleInputs}
                    placeholder="Enter your credit card number"
                  />
                </div>
                <div data-testid="sixthbook">
                  <label for="expirydate">Expiry Date</label>
                  <input
                    data-testid="expiry-book"
                    type="text"
                    class="form-control"
                    id="expirydate"
                    value={booking.expirydate}
                    onChange={handleInputs}
                    placeholder="Enter your credit card expiration date (eg. 04/25)"
                  />
                </div>
                <div data-testid="seventhbook">
                  <label for="cvv">CVV</label>
                  <input
                    data-testid="cvv-book"
                    type="text"
                    class="form-control"
                    id="cvv"
                    value={booking.cvv}
                    onChange={handleInputs}
                    placeholder="Enter your CVV"
                  />
                </div>
                <div data-testid="eighthbook">
                  <label for="specialrequests">Special Requests</label>
                  <input
                    data-testid="specialrequests-book"
                    type="text"
                    class="form-control"
                    id="specialrequests"
                    value={booking.specialrequests}
                    onChange={handleInputs}
                    placeholder="Enter any special requests to the hotel (None if NA)"
                  />
                </div>
              </form>
            </section>
            <button
              data-testid="BookBtn"
              type="submit"
              className="submitButton"
              onClick={postData}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
