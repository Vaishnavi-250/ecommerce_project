const form = document.getElementById("issueForm");
const issuesDiv = document.getElementById("issues");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const location = document.getElementById("location").value;
  const description = document.getElementById("description").value;

  await fetch("http://localhost:5000/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, location, description })
  });

  form.reset();
  loadIssues();
});

async function loadIssues() {
  const res = await fetch("http://localhost:5000/reports");
  const data = await res.json();

  issuesDiv.innerHTML = "";
  data.forEach(issue => {
    issuesDiv.innerHTML += `
      <div class="issue">
        <h3>${issue.title}</h3>
        <p><b>Location:</b> ${issue.location}</p>
        <p>${issue.description}</p>
      </div>
    `;
  });
}

loadIssues();
