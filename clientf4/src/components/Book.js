import React, {useState} from 'react'

const Book= () => {

  const [booking, setBooking]= useState({
    "firstname":"",
    "lastname": "",
    "phonenumber": "",
    "emailaddress": "",
    "creditcardnumber": "",
    "expirydate": "",
    "cvv": ""
  })

  let field, value;

  const handleInputs= (e) =>{
    console.log(e);
    field= e.target.id;
    value=e.target.value;

    setBooking({... booking, [field]:value});
  }

  const postData= async (e) =>{
    e.preventDefault();
    const  {firstname, lastname, phonenumber, emailaddress, creditcardnumber, expirydate, cvv }= booking;

    const res= await fetch("/book", {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstname, lastname, phonenumber, emailaddress, creditcardnumber, expirydate, cvv
      })
  });

    const data= await res.json();
    
    if(res.status===422 || !data){
      window.alert("Booking Unsuccesful");
      console.log("Booking Unsuccesful");
    } else{
      window.alert("Success");
      console.log("Success");
    }


  }

  return(
    <div>
      <section>
      <form method="POST">
        <div class="form-group">
          <label for="firstname">First Name</label>
          <input type="text" class="form-control" id="firstname"
            value={booking.firstname}
            onChange={handleInputs} />
        </div>
        <div class="form-group">
          <label for="lastname">Last Name</label>
          <input type="text" class="form-control" id="lastname" 
            value={booking.lastname}
            onChange={handleInputs} />
        </div>
        <div class="form-group">
          <label for="phonenumber">Phone Number</label>
          <input type="text" class="form-control" id="phonenumber"
            value={booking.phonenumber}
            onChange={handleInputs}  />
        </div>
        <div class="form-group">
          <label for="emailaddress">Email</label>
          <input type="email" class="form-control" id="emailaddress"
            value={booking.emailaddress}
            onChange={handleInputs} />
        </div>
        <div class="form-group">
          <label for="creditcardnumber">Credit Card Number</label>
          <input type="text" class="form-control" id="creditcardnumber"
            value={booking.creditcardnumber}
            onChange={handleInputs}/>
        </div>
        <div class="form-group">
          <label for="expirydate">Expiry Date</label>
          <input type="text" class="form-control" id="expirydate"
            value={booking.expirydate}
            onChange={handleInputs}/>
        </div>
        <div class="form-group">
          <label for="cvv">CVV</label>
          <input type="text" class="form-control" id="cvv"
            value={booking.cvv}
            onChange={handleInputs}/>
        </div>
        
        <button type="submit" class="btn btn-primary" onClick={postData}>Submit</button>
      </form>
      </section>
    </div>
  )
}

export default Book


