export function validateLoginRequest(input) {
  if (!input.email || !input.password) {
    throw new Error("All necessary fields must be present");
  }
  return input;
}

export function validateSignupRequest(input) {
  if (!input.username || !input.email || !input.password) {
    throw new Error("All necessary fields must be present");
  }
  return input;
}
