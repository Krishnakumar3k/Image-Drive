// //End signup code
var signupForm = document.querySelector(".signup-form");
var allSignUpInput = signupForm.querySelectorAll("input");
var loginForm = document.querySelector(".login-form");
var allLoginInput = loginForm.querySelectorAll("input");

// Start signup code
signupForm.onsubmit = function(e){
    e.preventDefault(); // it uses for the loader control
    register();
}

const register = () => {
    if (localStorage.getItem(allSignUpInput[2].value) == null) {
        var userData = {
            firstName: allSignUpInput[0].value,
            lastName: allSignUpInput[1].value,
            userName: allSignUpInput[2].value,
            password: allSignUpInput[3].value,
            mobile: allSignUpInput[4].value
        };

        localStorage.setItem(allSignUpInput[2].value, JSON.stringify(userData));
        swal("Good job!", "Registration!", "success");
        signupForm.reset();
    } else {
        swal("Already Exist !", "please change username!", "warning");
    }
}
/* End Signup Code */

/*⇓ startlogin Coding----------------------------------- ⇓ */
loginForm.onsubmit = function(e) {
  e.preventDefault();
  loginFunc();
}

const loginFunc = () => { 
  if(allLoginInput[1].value && allLoginInput[1].value != ""){
    if(localStorage.getItem(allLoginInput[0].value) != null){
     var data = JSON.parse(localStorage.getItem(allLoginInput[0].value));//password code
     if(allLoginInput[1].value == data.password){
      //alert("success");
      // code to access profile.html file ⇓----------
      sessionStorage.setItem("username", allLoginInput[0].value);
      window.location = "Profile/profile.html";
     }else{
      swal("Password is not matched !", "Please check password !", "warning");

     }
     
  
    }else{
      swal("Username is not matched !", "please fill right username !", "warning");
    }
  }else{
    swal("Input field is empty !", "please fill all the fiels !", "warning");

  }
}