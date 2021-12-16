"use strict";

// select existing html elements
const signUpForm = document.querySelector("#signUpForm");
const submitRegistration = document.getElementById("submitRegistration");
const roleList = document.querySelector(".add-role");

//get user role for selection
const createRoleSelection = (roles) => {
  let roleArray = [];
  for (let i = 1; i < roles.length; i++) {
    roleList.innerHTML += `<option value="${roles[i].role_id}">${roles[i].role_name}</option>`;
    roleArray.push(roles[i]);
  }
};
//Get role to role options
const getRoles = async () => {
  try {
    const fetchOptions = {
      method: "GET",
    };
    const response = await fetch(url + "/role", fetchOptions);
    const roles = await response.json();
    createRoleSelection(roles);
  } catch (e) {
    console.log(e.message);
  }
};
getRoles();

//validation form
submitRegistration.addEventListener("click", () => {
  const pw1 = document.getElementById("pw1").value;
  const pw2 = document.getElementById("pw2").value;

  if (pw1 != pw2) {
    document.getElementById("message2").innerHTML = "Passwords do not match";
    return false;
  }
});
// submit register form
signUpForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const data = new FormData(signUpForm);
  const fetchOptions = {
    method: "POST",
    body: data,
  };
  const response = await fetch(url + "/auth/register", fetchOptions);
  const json = await response.json();
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    sessionStorage.setItem("token", json.token);
    sessionStorage.setItem("user", JSON.stringify(json.user));
    alert("Account created successfully!");
    location.href = "../login-signup/forms.html";
  }
});
