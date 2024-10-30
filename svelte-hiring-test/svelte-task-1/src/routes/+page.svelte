<script lang="ts">
  import UserForm from "$lib/components/UserForm.svelte";
  import { formData, userData } from "$lib/stores/formStore";

  console.log($userData);
</script>

<main class="container">
  <div class="content">
    <header>
      <h1>Form Handling Test</h1>
      <p class="subtitle">
        Implement the form using Svelte's form handling capabilities
      </p>
    </header>

    <section class="instructions">
      <h2>Requirements:</h2>
      <ul>
        <li>
          Implement form state management using TypeScript types from app.d.ts
        </li>
        <li>
          Add proper form validation:
          <ul>
            <li>All fields are required</li>
            <li>Email must be in valid format</li>
            <li>Password must be at least 6 characters</li>
          </ul>
        </li>
        <li>Handle form submission and prevent default behavior</li>
        <li>Display validation errors under each field</li>
        <li>
          On successful submission:
          <ul>
            <li>
              Display the submitted data below the form (excluding password)
            </li>
            <li>Clear the form for new entries</li>
            <li>
              Hide the success message when the form is being filled again
            </li>
          </ul>
        </li>
      </ul>
    </section>

    <section class="form-section">
      <UserForm />
    </section>

    {#if $userData.firstName && $userData.lastName && $userData.email}
      <section>
        <p class="subtitle">
          Current User Name: <span>
            {$userData.firstName}
            {$userData.lastName}
          </span>
        </p>
        <p class="subtitle">
          Current User Email: <span> {$userData.email} </span>
        </p>
      </section>
    {/if}
  </div>
</main>

<style>
  .container {
    min-height: 100vh;
    padding: 2rem;
    background-color: #f3f4f6;
  }

  .content {
    max-width: 800px;
    margin: 0 auto;
  }

  header {
    text-align: center;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: #4b5563;
    font-size: 1.1rem;
  }

  .instructions {
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    color: #4b5563;
  }

  ul ul {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }

  .form-section {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
</style>
