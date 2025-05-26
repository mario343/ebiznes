const form = document.getElementById("chatForm");
const chatBox = document.getElementById("chatBox");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = document.getElementById("message").value;
  document.getElementById("message").value = "";

  const response = await fetch("/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: message }),
  });

  const data = await response.json();
  chatBox.innerHTML += `<p><strong>Me:</strong> ${message}</p>`;
  chatBox.innerHTML += `<p><strong>LLaMA:</strong> ${data.reply}</p>`;
});
