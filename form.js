document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const form = e.target;
  const name = form.navn.value.trim();
  const email = form.email.value.trim();
  const message = form.besked.value.trim();

  if (!name || !email || !message) {
    document.getElementById('status').textContent = "Udfyld venligst Alle felter.";
    return;
  }

  try {
    const response = await fetch('/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    if (response.ok) {
      document.getElementById('status').textContent = "Beskeden er sendt!";
      form.reset();
    } else {
      document.getElementById('status').textContent = "Afsendelse fejl. Prøv igen senere.";
    }
  } catch (error) {
    document.getElementById('status').textContent = "Netværksfejl.";
    console.error(error);
  }
});
