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

function checkPasswordWeak(field) {
  const password = field.input.value;
  const error = field.error;
  let isWeak = false;
  field.error.textContent = "Password Needs:";
  if (password.length < minPwdLength) {
    isWeak = true;
    error.append(createReq("minimum 8 characters"));
  }
  if (!/[A-Z]/.test(password)) {
    isWeak = true;

    error.append(createReq("at least one capital"));
  }
  if (!/[a-z]/.test(password)) {
    isWeak = true;
    error.append(createReq("at least one lowercase"));
  }
  if (!/\d/.test(password)) {
    isWeak = true;
    error.append(createReq("at least one number"));
  }
  if (!/[^A-z 0-9]/.test(password)) {
    isWeak = true;
    error.append(createReq("at least one special character"));
  }
  if (!isWeak) {
    error.textContent = "";
    field.input.setCustomValidity("");
  }
  return isWeak;

  function createReq(message) {
    const requirement = document.createElement("li");
    requirement.textContent = message;
    return requirement;
  }
}

export { checkAnyFieldsInvalid, checkFieldInvalid, checkPasswordWeak };
