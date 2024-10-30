import { writable } from "svelte/store";

// Define the form schema using Zod
export const formData = writable({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

// Define the user values for after submission
export const userData = writable({ firstName: "", lastName: "", email: "" });
