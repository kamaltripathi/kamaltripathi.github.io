document.addEventListener("DOMContentLoaded", () => {
  // Use a relative path so it finds sidebar.html in the current folder
  fetch('sidebar.html') 
    .then(response => {
      if (!response.ok) throw new Error('Sidebar not found');
      return response.text();
    })
    .then(data => {
      const placeholder = document.getElementById('sidebar-placeholder');
      if (placeholder) {
        placeholder.innerHTML = data;

        // Highlight the active page in the nav
        const currentFile = window.location.pathname.split("/").pop() || "index.html";
        const navLinks = document.querySelectorAll('aside.sidebar nav a');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === currentFile) {
            link.classList.add('active');
          }
        });
      }
    })
    .catch(err => console.error('Error loading sidebar:', err));
});
