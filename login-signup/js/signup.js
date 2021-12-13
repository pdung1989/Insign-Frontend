"use strict";

// select existing html elements
const signUpForm = document.querySelector("#signUpForm");
const submitRegistration = document.getElementById("submitRegistration");

//validation form
submitRegistration.addEventListener("click", () => {
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
  }
});
// submit register form
signUpForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const data = serializeJson(signUpForm);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + "/auth/register", fetchOptions);
  const json = await response.json();
  alert(json.message);

  if (json.token && json.user) {
    // save token
    sessionStorage.setItem("token", json.token);
    sessionStorage.setItem("user", JSON.stringify(json.user));
    location.href = "../explore-page/explore.html";
    return;
  }

  if (json.length > 0) {
    let errors = "";
    json.forEach((err) => (errors += `${err.msg}\n`));
    alert(errors);
    return false;
  }
  alert(json.message);
  return false;
});
