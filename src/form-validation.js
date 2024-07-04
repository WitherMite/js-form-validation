import checkPasswordComplex from "./password-validation";

// https://regexr.com/3e48o
const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

function checkAnyFieldsInvalid(fields) {
  let isInvalid = false;
  fields.forEach((field) => {
    isInvalid = checkFieldInvalid(field);
  });
  return isInvalid;
}

function checkFieldInvalid(field) {
  const noValue = reportCondition(
    field,
    field.input.value === "",
    "This field is required."
  );
  if (noValue) return true;

  if (field.input.id === "email") {
    const wrongPattern = reportCondition(
      field,
      !emailRegEx.test(field.input.value),
      "Must enter a valid email"
    );
    if (wrongPattern) return true;
  }

  if (field.input.id === "pwd" && checkPasswordComplex(field.input))
    return true;

  return false;
}

function checkPasswordMismatch(p1, p2) {
  reportCondition(
    p2,
    p1.input.value !== p2.input.value,
    "Passwords must match"
  );
}

function reportCondition(field, condition, errMsg) {
  if (condition) {
    field.error.textContent = errMsg;
    field.input.setCustomValidity(errMsg);
  } else {
    field.error.textContent = "";
    field.input.setCustomValidity("");
  }
  return condition;
}

export { checkAnyFieldsInvalid, checkFieldInvalid, checkPasswordMismatch };
