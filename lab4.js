document.getElementById("search-button").addEventListener("click", () => {
  const expression = document.getElementById("expression").value;
  if (expression) {
    search(expression);
  }
});

document.getElementById("get").addEventListener("click", () => {
  fetch(window.location.href)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.text();
    })
    .then((data) => {
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerText = data;
    })
    .catch((error) => {
      console.error("Error:", error.message);
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerText = "Під час запиту сталася помилка";
    });
});

function search(expression, retries = 3) {
  const url = `/api?expression=${encodeURIComponent(expression)}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    })
    .then((data) => {
      const result = document.getElementById("exp-result");
      result.innerText = `Значення виразу: ${data}`;
    })
    .catch((error) => {
      console.error("Error:", error.message);
      if (retries > 0) {
        setTimeout(() => {
          search(expression, retries - 1);
        }, 1000);
      } else {
        const result = document.getElementById("exp-result");
        result.innerText = "Під час запиту сталася помилка";
      }
    });
}