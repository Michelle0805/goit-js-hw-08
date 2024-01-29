import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', function () {
    // Get form elements
    const form = document.querySelector('.feedback-form');
    const emailInput = form.querySelector('input[name="email"]');
    const messageTextarea = form.querySelector('textarea[name="message"]');
  
    // Function to save form state to local storage
    const saveFormState = () => {
      const feedbackState = {
        email: emailInput.value,
        message: messageTextarea.value
      };
      localStorage.setItem('feedback-form-state', JSON.stringify(feedbackState));
    };
  
    // Function to load form state from local storage
    const loadFormState = () => {
      const storedState = localStorage.getItem('feedback-form-state');
      if (storedState) {
        const feedbackState = JSON.parse(storedState);
        emailInput.value = feedbackState.email;
        messageTextarea.value = feedbackState.message;
      }
    };
  
    // Function to clear form state and local storage
    const clearFormState = () => {
      localStorage.removeItem('feedback-form-state');
      emailInput.value = '';
      messageTextarea.value = '';
    };
  
    // Event listener for form input changes with throttle
    form.addEventListener('input',throttle(saveFormState, 500));
  
    // Event listener for form submission
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      // Display form state in the console
      const feedbackState = {
        email: emailInput.value,
        message: messageTextarea.value
      };
      console.log('Form State:', feedbackState);
      // Clear form state and local storage
      clearFormState();
    });
  
    // Load form state when the page is loaded
    loadFormState();
  });
  
