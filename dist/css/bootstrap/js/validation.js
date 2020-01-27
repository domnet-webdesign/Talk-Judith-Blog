 // Defining a function to validate form 
 function validateForm() {
    // Retrieving the values of form elements 
    var name = document.contactForm.name.value;
    var email = document.contactForm.email.value;
    var mobile = document.contactForm.mobile.value;
    var country = document.contactForm.country.value;


    // Defining error variables with a default value
    var nameErr = emailErr = mobileErr = countryErr == true;
    
    // Validate name
    if(name == "") {
      alert("nameErr", "Please enter your name");
    } else {
        var regex = /^[a-zA-Z\s]+$/;                
        if(regex.test(name) === false) {
          alert("nameErr", "Please enter a valid name");
        } else {
          alert("nameErr", "");
            nameErr = false;
        }
    }
     // Validate email address
     if(email == "") {
      alert("emailErr", "Please enter your email address");
    } else {
        // Regular expression for basic email validation
        var regex = /^\S+@\S+\.\S+$/;
        if(regex.test(email) === false) {
          alert("emailErr", "Please enter a valid email address");
        } else{.
            alert("emailErr", "");
            emailErr = false;
        }
    }

    // Validate mobile number
    if(mobile == "") {
        alert("mobileErr", "Please enter your mobile number");
    } else {
        var regex = /^[1-9]\d{9}$/;
        if(regex.test(mobile) === false) {
            alert("mobileErr", "Please enter a valid 10 digit mobile number");
        } else{
            alert("mobileErr", "");
            mobileErr = false;
        }
    }
    
     // Validate country
     if(country == "Choohse Your Country") {
        alert("countryErr", "Please select your country");
    } else {
        alert("countryErr", "");
        countryErr = false;
    }
    
    