import "./style.css";

const form = document.forms[0];
const email = document.getElementById("email");
const country = document.getElementById("country");
const zipCode = document.getElementById("zip");
const password = document.getElementById("pwd");
const confirmPass = document.getElementById("pwd-conf");

[email, country, zipCode, password, confirmPass].forEach((input) =>
  input.addEventListener("change", input.reportValidity)
);

form.addEventListener("submit", (e) => {
  if (!form.reportValidity()) {
    e.preventDefault();
  } else {
    alert("form submitted!");
  }
});
