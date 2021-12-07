const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

/* log in and sign up btn event listener*/
signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

const validationSignUpForm = () => {
  const pw1 = document.getElementById("pw1").value;
  const pw2 = document.getElementById("pw2").value;
  //check empty confirm password field
  if (pw2 == "") {
    document.getElementById("message2").innerHTML =
      "**Enter the password please!";
    return false;
  }
  if (pw1 != pw2) {
    document.getElementById("message2").innerHTML = "Passwords do not match";
    return false;
  } else {
    document.write("SignUp form has been submitted successfully");
  }
};
const validationSignInForm = () => {

	  document.write("SignIn form has been submitted successfully");
	
  };