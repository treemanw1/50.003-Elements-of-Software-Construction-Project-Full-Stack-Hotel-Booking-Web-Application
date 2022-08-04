import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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
  });

  const roomsPage = useLocation();
  const hotelInfo = roomsPage.hotelInfo;
  const roomInfo = roomsPage.roomInfo;


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
      hotelInfo,
      roomInfo
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
        hotelInfo,
        roomInfo
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
                  />
                </div>
              </form>
            </section>
            <button data-testid="BookBtn" type="submit" className="submitButton" onClick={postData}>
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;