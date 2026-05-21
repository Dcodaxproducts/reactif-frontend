import type { ZodError } from "zod";

export const getZodFieldErrors = (error: ZodError): Record<string, string> => {
  return error.issues.reduce<Record<string, string>>((errors, issue) => {
    const field = issue.path[0];

    if (typeof field === "string") {
      errors[field] = issue.message;
    }

    return errors;
  }, {});
};
