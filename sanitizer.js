function sanitizeInput(data) {
  return {
    fullName: data.fullName.replace(/[^A-Za-z\s\-']/g, ""),
    email: data.email.replace(/\s+/g, ""),
    username: data.username.replace(/[^A-Za-z0-9_]/g, ""),
    message: data.message
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\b(SELECT|INSERT|DELETE|DROP|UNION|OR)\b/gi, "[REMOVED]")
  };
}
