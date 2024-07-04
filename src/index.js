import "./style.css";
import { checkAnyFieldsInvalid, checkFieldInvalid } from "./form-validation";

const form = document.forms[0];
const email = createField("email", "email-err");
const country = createField("country", "country-err");
const zipCode = createField("zip", "zip-err");
const password = createField("pwd", "pwd-err");
const confirmPass = createField("pwd-conf", "pwd-conf-err");
const fields = [email, country, zipCode, password, confirmPass];

fields.forEach((field) => {
  field.input.addEventListener("blur", () => {
    checkFieldInvalid(field);
  });
});

form.addEventListener("submit", (e) => {
  if (checkAnyFieldsInvalid(fields)) {
    e.preventDefault();
  } else {
    alert("Form submitted!");
  }
});

function createField(inputId, errId) {
  return {
    input: document.getElementById(inputId),
    error: document.getElementById(errId),
  };
}
