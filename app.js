function showTab(id) {
  document.querySelectorAll(".tool").forEach(t => t.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function runValidator() {
  const data = {
    fullName: fullName.value,
    email: email.value,
    username: username.value,
    message: message.value
  };

  const errors = validateInput(data);
  if (Object.keys(errors).length) {
    valOutput.innerText = "Errors:\n" + JSON.stringify(errors, null, 2);
    return;
  }

  const clean = sanitizeInput(data);
  valOutput.innerText = "Sanitized Data:\n" + JSON.stringify(clean, null, 2);
}
