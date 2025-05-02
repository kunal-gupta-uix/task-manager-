export function validateCreateProjectRequest(input) {
  if (
    !input.title ||
    !input.description ||
    !input.deadline ||
    !input.sender_id
  ) {
    throw new Error("All necessary fields must be present test");
  }
  return input;
}

export function validateUpdateProjectRequest(input) {
  if (
    !input.id ||
    !input.sender_id ||
    !input.status ||
    !input.title ||
    !input.description ||
    !input.deadline
  ) {
    throw new Error("All necessary fields must be present");
  }
  return input;
}

export function validateAddMemberRequest(input) {
  if (!input.project_id || !input.user_id || !input.role) {
    throw new Error("All necessary fields must be present");
  }
  return input;
}
