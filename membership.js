const openSpeakFormBtn = document.getElementById("openSpeakFormBtn");
const speakFormSection = document.getElementById("speakFormSection");
const speakForm = document.getElementById("speakForm");
const formStatus = document.getElementById("formStatus");
const submitSpeakBtn = document.getElementById("submitSpeakBtn");

// TODO: Replace with your deployed Apps Script Web App URL
const SPEAKER_FORM_ENDPOINT = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

if (openSpeakFormBtn) {
  openSpeakFormBtn.addEventListener("click", () => {
    speakFormSection.classList.remove("hidden");
    speakFormSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (speakForm) {
  speakForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!SPEAKER_FORM_ENDPOINT || SPEAKER_FORM_ENDPOINT.includes("YOUR_GOOGLE")) {
      formStatus.textContent = "Form endpoint not configured yet.";
      return;
    }

    const formData = new FormData(speakForm);
    const payload = Object.fromEntries(formData.entries());

    try {
      submitSpeakBtn.disabled = true;
      formStatus.textContent = "Submitting...";

      const res = await fetch(SPEAKER_FORM_ENDPOINT, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.ok) {
        formStatus.textContent = "Application submitted successfully!";
        speakForm.reset();
      } else {
        formStatus.textContent = data.error || "Submission failed. Please try again.";
      }
    } catch (err) {
      formStatus.textContent = "Network error. Please try again.";
    } finally {
      submitSpeakBtn.disabled = false;
    }
  });
}
