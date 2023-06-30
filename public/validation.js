document.addEventListener('DOMContentLoaded', function() {
    // Select form elements
    const reviewText = document.getElementById('review-text');
    const rating = document.getElementById('rating');
    const submitBtn = document.getElementById('submit-btn');
  
    // Add form submission event listener
    submitBtn.addEventListener('click', function(event) {
      // Prevent form submission
      event.preventDefault();
  
      // Perform validation
      if (reviewText.value.length < 10) {
        alert('Please enter a review with at least 10 characters.');
      } else if (rating.value < 1 || rating.value > 5) {
        alert('Please select a rating between 1 and 5.');
      } else {
        // Validation passed, submit the form
        event.target.closest('form').submit();
      }
    });
  });