<script lang="ts">
  import { userFormSchema, type FormErrors } from "$lib/schema/formScheme";
  import { formData, userData } from "$lib/stores/formStore";
  import { writable } from "svelte/store";

  // Form error state
  const formErrors = writable<FormErrors>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Success state
  const successMessage = writable("");

  // Submit handler
  const handleSubmit = (e: Event) => {
    e.preventDefault();

    // Get current form values
    const validation = userFormSchema.safeParse($formData);
    if (!validation.success) {
      // Map errors from Zod to formErrors
      const errors: FormErrors = {};
      validation.error.issues.forEach((issue) => {
        errors[issue.path[0] as keyof FormErrors] = issue.message;
      });
      formErrors.set(errors);
      successMessage.set("");
    } else {
      // Reset errors and show success message
      formErrors.set({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      successMessage.set("Form submitted successfully!");
      userData.set({
        firstName: $formData.firstName,
        lastName: $formData.lastName,
        email: $formData.email,
      });
      // Reset form entries
      formData.set({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    }
  };

  // Function to clear form errors and success message when typing
  const handleInput = (field: keyof FormErrors) => {
    formErrors.update((errors) => {
      errors[field] = "";
      return errors;
    });
    successMessage.set(""); // Clear the success message when typing
  };
</script>

<div class="form-container">
  <form on:submit={handleSubmit} autocomplete="off">
    <div class="form-group">
      <label for="firstName">First Name</label>
      <input
        id="firstName"
        type="text"
        placeholder="Enter your first name"
        bind:value={$formData.firstName}
        class:error={$formErrors.firstName}
        on:input={() => handleInput("firstName")}
      />
      {#if $formErrors.firstName}
        <span class="error-message">{$formErrors.firstName}</span>
      {/if}
    </div>

    <div class="form-group">
      <label for="lastName">Last Name</label>
      <input
        id="lastName"
        type="text"
        placeholder="Enter your last name"
        bind:value={$formData.lastName}
        class:error={$formErrors.lastName}
        on:input={() => handleInput("lastName")}
      />
      {#if $formErrors.lastName}
        <span class="error-message">{$formErrors.lastName}</span>
      {/if}
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        bind:value={$formData.email}
        class:error={$formErrors.email}
        on:input={() => handleInput("email")}
      />
      {#if $formErrors.email}
        <span class="error-message">{$formErrors.email}</span>
      {/if}
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Enter your password"
        bind:value={$formData.password}
        class:error={$formErrors.password}
        on:input={() => handleInput("password")}
      />
      {#if $formErrors.password}
        <span class="error-message">{$formErrors.password}</span>
      {/if}
    </div>

    <button type="submit" class="submit-button">Submit</button>
  </form>

  {#if $successMessage}
    <div class="success-message">{$successMessage}</div>
  {/if}
</div>

<style>
  .form-container {
    max-width: 480px;
    margin: 0 auto;
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #374151;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.15s ease-in-out;
  }

  input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  input::placeholder {
    color: #9ca3af;
  }

  input.error {
    border-color: #ef4444;
  }

  .error-message {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #ef4444;
  }

  .submit-button {
    width: 100%;
    padding: 0.75rem 1.5rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
  }

  .submit-button:hover {
    background-color: #2563eb;
  }

  .submit-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  }

  .submit-button:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }

  .success-message {
    margin-top: 1.5rem;
    padding: 1rem;
    background-color: #edf7ed;
    border: 1px solid #c8e6c9;
    border-radius: 6px;
    color: #1b5e20;
  }
</style>
