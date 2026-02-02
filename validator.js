function handleSubmit(event) {
  event.preventDefault();

  clearErrors();

  const formData = {
    fullName: fullName.value,
    email: email.value,
    username: username.value,
    message: message.value
  };

  const errors = validateInput(formData);

  if (Object.keys(errors).length > 0) {
    showErrors(errors);
    return;
  }

  if (containsSqlKeywords(formData.message)) {
    alert("Warning: Possible SQL injection detected.");
  }

  const result = sanitizeInput(formData);
  output.innerText = JSON.stringify(result, null, 2);
}

function validateInput(formData) {
  let errors = {};

  if (!formData.fullName || formData.fullName.length < 2)
    errors.fullName = "Invalid Full Name.";

  if (!formData.email || formData.email.includes(" "))
    errors.email = "Invalid Email.";

  if (!formData.username || /^\d/.test(formData.username))
    errors.username = "Invalid Username.";

  if (!formData.message || formData.message.length > 250)
    errors.message = "Invalid Message.";

  return errors;
}

function showErrors(errors) {
  if (errors.fullName) errFullName.innerText = errors.fullName;
  if (errors.email) errEmail.innerText = errors.email;
  if (errors.username) errUsername.innerText = errors.username;
  if (errors.message) errMessage.innerText = errors.message;
}

function clearErrors() {
  errFullName.innerText = "";
  errEmail.innerText = "";
  errUsername.innerText = "";
  errMessage.innerText = "";
}
