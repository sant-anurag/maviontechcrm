// public_event_register.js
// - Scrolls to and focuses flash messages if present
// - Validates phone input on submit (Indian 10-digit starting 6-9)
// - Disables submit button on submit to prevent double submits

document.addEventListener("DOMContentLoaded", function() {
  // Scroll to flash message if exists
  const flashContainer = document.getElementById("flash-container");
  if (flashContainer) {
    // small delay helps when rendered at top
    setTimeout(() => {
      try {
        flashContainer.scrollIntoView({ behavior: "smooth", block: "center" });
        flashContainer.setAttribute("tabindex", "-1");
        flashContainer.focus({ preventScroll: true });
      } catch (e) {
        // ignore if scrollIntoView fails
      }
    }, 120);
  }

  // Form validation and submit handling
  const form = document.querySelector(".reg-form");
  const submitBtn = document.getElementById("submitBtn");

  if (form) {
    form.addEventListener("submit", function(e) {
      // Validate phone
      const phoneInput = document.getElementById("contact");
      const phoneVal = phoneInput ? phoneInput.value.trim() : "";
      const phonePattern = /^[6-9]\d{9}$/; // standard Indian mobile pattern

      if (!phonePattern.test(phoneVal)) {
        e.preventDefault();
        alert("Please enter a valid 10-digit mobile number starting with 6-9.");
        if (phoneInput) phoneInput.focus();
        return;
      }

      // Optionally validate other required fields (basic)
      const nameEl = document.getElementById("name");
      const eventEl = document.getElementById("event_id");
      if (eventEl && !eventEl.value) {
        e.preventDefault();
        alert("Please select an event.");
        eventEl.focus();
        return;
      }
      if (nameEl && !nameEl.value.trim()) {
        e.preventDefault();
        alert("Please enter your full name.");
        nameEl.focus();
        return;
      }

      // At this point allow submit - disable button to prevent double clicks
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7";
        submitBtn.textContent = "Registering...";
      }
    }, { passive: false });
  }
});
