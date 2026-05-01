document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };

  try {
    const res = await fetch("/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (json.ok) {
      form.style.display = "none";
      document.getElementById("success").style.display = "block";
    } else {
      alert("There was an error submitting your message.");
    }
  } catch (err) {
    console.error(err);
    alert("Unable to submit. Please try again.");
  }
});
