// https://regexr.com/3e48o
const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const minPwdLength = 8;

function checkAnyFieldsInvalid(fields) {
  let isInvalid = false;
  fields.forEach((field) => {
    if (checkFieldInvalid(field)) isInvalid = true;
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

  switch (field.input.id) {
    case "email":
      return reportCondition(
        field,
        !emailRegEx.test(field.input.value),
        "Must enter a valid email"
      );

    case "pwd-conf":
      return reportCondition(
        field,
        field.input.value !== field.pairedPwd.input.value,
        "Passwords must match"
      );

    case "pwd":
      if (checkPasswordWeak(field)) {
        field.input.setCustomValidity("Password is too weak");
        return true;
      }
      break;
  }

  return false;
}

function checkPasswordWeak(field) {
  const password = field.input.value;
  let isWeak = false;
  if (password.length < minPwdLength) {
    isWeak = true;
    field.error.textContent = "Password should be at least 8 characters";
  }
  // more conditions after changing password's error span to have a list
  if (!isWeak) {
    field.error.textContent = "";
    field.input.setCustomValidity("");
  }
  return isWeak;
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

export { checkAnyFieldsInvalid, checkFieldInvalid, checkPasswordWeak };
