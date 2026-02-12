document.addEventListener("DOMContentLoaded", function() {
  const copyButtons = document.querySelectorAll(".copy-btn");
  copyButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      const code = btn.nextElementSibling.querySelector("code");
      if (!code) return;
      navigator.clipboard.writeText(code.textContent)
        .then(() => {
          btn.textContent = "Copied!";
          setTimeout(() => btn.textContent = "Copy", 1500);
        })
        .catch(err => {
          console.error("Copy failed", err);
        });
    });
  });
});

