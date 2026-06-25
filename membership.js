const openMemberFormBtn = document.getElementById("openMemberFormBtn");
const openSpeakFormBtn = document.getElementById("openSpeakFormBtn");

const memberFormSection = document.getElementById("memberFormSection");
const speakFormSection = document.getElementById("speakFormSection");

const memberForm = document.getElementById("memberForm");
const speakForm = document.getElementById("speakForm");

const memberFormStatus = document.getElementById("memberFormStatus");
const speakFormStatus = document.getElementById("speakFormStatus");

// TODO: Replace with your deployed endpoints
const MEMBER_ENDPOINT = "YOUR_MEMBER_APPS_SCRIPT_WEB_APP_URL";
const SPEAKER_ENDPOINT = "YOUR_SPEAKER_APPS_SCRIPT_WEB_APP_URL";

function showSection(sectionToShow) {
  [memberFormSection, speakFormSection].forEach(sec => sec.classList.add("hidden"));
  sectionToShow.classList.remove("hidden");
  sectionToShow.scrollIntoView({ behavior: "smooth", block: "start" });
}

openMemberFormBtn?.addEventListener("click", () => showSection(memberFormSection));
openSpeakFormBtn?.addEventListener("click", () => showSection(speakFormSection));

async function submitForm(form, endpoint, statusEl, submitBtnId) {
  const submitBtn = document.getElementById(submitBtnId);
  if (!endpoint || endpoint.includes("YOUR_")) {
    statusEl.textContent = "Form endpoint not configured yet.";
    return;
  }

  const payload = Object.fromEntries(new FormData(form).entries());

  try {
    submitBtn.disabled = true;
    statusEl.textContent = "Submitting...";

    const res = await fetch(endpoint, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.ok) {
      statusEl.textContent = "Submitted successfully!";
      form.reset();
    } else {
      statusEl.textContent = data.error || "Submission failed.";
    }
  } catch {
    statusEl.textContent = "Network error. Try again.";
  } finally {
    submitBtn.disabled = false;
  }
}

memberForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  submitForm(memberForm, MEMBER_ENDPOINT, memberFormStatus, "submitMemberBtn");
});

speakForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  submitForm(speakForm, SPEAKER_ENDPOINT, speakFormStatus, "submitSpeakBtn");
});
