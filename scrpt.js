// ================= PASSWORD STRENGTH ASSESSOR =================
function checkPasswordStrength() {
  const pw = document.getElementById("assessPassword").value;
  const result = document.getElementById("strengthResult");

  if (!pw) {
    result.innerText = "Please enter a password.";
    return;
  }

  let score = 0;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 2) result.innerText = "Weak password";
  else if (score <= 4) result.innerText = "Moderate password";
  else result.innerText = "Strong password";
}

// ================= PASSWORD GENERATOR =================
async function generatePassword() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let pw = "";

  for (let i = 0; i < 12; i++) {
    pw += chars[Math.floor(Math.random() * chars.length)];
  }

  document.getElementById("genPassword").innerText = "Password: " + pw;
  document.getElementById("genHash").innerText =
    "SHA-256 Hash: " + await sha256(pw);
}

// ================= SHA-256 HASH =================
async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// ================= WEB FORM VALIDATOR & SANITIZER =================
function handleSubmit(e) {
  e.preventDefault();

  const data = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    username: document.getElementById("username").value,
    message: document.getElementById("message").value
  };

  // Validation
  if (!data.fullName || data.fullName.length < 2) {
    alert("Invalid Full Name");
    return;
  }

  if (!data.email.includes("@") || data.email.includes(" ")) {
    alert("Invalid Email");
    return;
  }

  if (!data.username || /^\d/.test(data.username)) {
    alert("Invalid Username");
    return;
  }

  if (!data.message || data.message.length > 250) {
    alert("Invalid Message");
    return;
  }

  // Sanitization
  const sanitized = {
    fullName: data.fullName.replace(/[^A-Za-z\s\-']/g, ""),
    email: data.email.replace(/\s/g, ""),
    username: data.username.replace(/[^A-Za-z0-9_]/g, ""),
    message: data.message
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\b(SELECT|INSERT|DELETE|DROP|OR|UNION|UPDATE)\b/gi, "[REMOVED]")
  };

  document.getElementById("output").innerText =
    JSON.stringify(sanitized, null, 2);
}
