/* ================= PASSWORD ASSESSOR ================= */
function checkPasswordStrength() {
  const password = document.getElementById("assessPassword").value;
  const result = document.getElementById("strengthResult");

  if (!password) {
    result.innerText = "Please enter a password.";
    return;
  }

  let score = 0;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) result.innerText = "Weak password";
  else if (score <= 4) result.innerText = "Moderate password";
  else result.innerText = "Strong password";
}

/* ================= PASSWORD GENERATOR ================= */
async function generateSecurePassword() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";

  for (let i = 0; i < 12; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  document.getElementById("generatedPassword").innerText =
    "Password: " + password;

  const hash = await sha256(password);
  document.getElementById("generatedHash").innerText =
    "SHA-256 Hash: " + hash;
}

/* ================= SHA-256 ================= */
async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

/* ================= WEB FORM VALIDATOR ================= */
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

function validateInput(data) {
  let errors = {};

  if (!data.fullName || data.fullName.length < 2)
    errors.fullName = "Invalid Full Name.";

  if (!data.email || data.email.includes(" "))
    errors.email = "Invalid Ema
