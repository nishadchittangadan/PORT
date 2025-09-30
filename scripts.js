/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/

// EmailJS integration for contact form

// Load EmailJS SDK
// Email validation function
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Handle form submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    // Basic validation
    if (!name || !email || !phone|| !message) {
      alert("Please fill in all fields.");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Prepare form data
    const formData = new FormData(form);

    // Send data to Formspree
    fetch("https://formspree.io/f/mrbyqyyv", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Your message has been sent successfully!");
          form.reset();
        } else {
          return response.json().then((data) => {
            throw new Error(
              data.errors ? data.errors.map((e) => e.message).join(", ") : "Unknown error"
            );
          });
        }
      })
      .catch((error) => {
        alert("There was an error sending your message. Please try again later.");
        console.error("Formspree error:", error);
      });
  });
});