export function validateCreateTaskRequest(input) {
  if (
    !input.type ||
    !input.title ||
    !input.description ||
    !input.priority ||
    !input.deadline ||
    !input.assignee ||
    !input.sender_id ||
    !input.project_id
  ) {
    throw new Error("All necessary fields must be present");
  }
  return input;
}

export function validateUpdateTaskRequest(input) {
  if (
    !input.id ||
    !input.sender_id ||
    !input.type ||
    !input.title ||
    !input.description ||
    !input.priority ||
    !input.status ||
    !input.deadline ||
    !input.assignee
  ) {
    throw new Error("All necessary fields must be present");
  }
  return input;
}
