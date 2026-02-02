function containsSqlKeywords(text) {
  const sqlKeywords = [
    "SELECT", "INSERT", "UPDATE", "DELETE",
    "DROP", "UNION", "ALTER", "CREATE", "OR"
  ];

  const pattern = new RegExp("\\b(" + sqlKeywords.join("|") + ")\\b", "i");
  return pattern.test(text);
}
