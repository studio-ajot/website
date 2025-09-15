document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("kontakt-form");
  const textbox = document.getElementById("kontakt-textbox");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    // FormData in ein normales Objekt umwandeln
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch(form.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Antwort:", data);
      textbox.textContent =
        "Vielen Dank für deine Nachricht. Wir haben sie erfolgreich erhalten und freuen uns darauf, von deinem Projekt zu erfahren. Wir melden uns so schnell wie möglich bei dir.";
      form.style.display = "none";
    })
    .catch(error => {
      console.error("Fehler:", error);
      alert("Netzwerkfehler. Bitte versuche es später erneut.");
    });
  });
});