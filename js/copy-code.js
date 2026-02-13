document.addEventListener("DOMContentLoaded", function() {
  // Find all <pre> tags
  const preBlocks = document.querySelectorAll("main.content pre");

  preBlocks.forEach(pre => {
    // Only add a button if the <pre> contains a <code> tag
    const codeInside = pre.querySelector("code");
    
    if (codeInside) {
      // 1. Create the container
      const container = document.createElement("div");
      container.className = "code-container";
      
      // 2. Create the button
      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "Copy";
      
      // 3. Wrap the pre block
      pre.parentNode.insertBefore(container, pre);
      container.appendChild(btn);
      container.appendChild(pre);

      // 4. Add the click event
      btn.addEventListener("click", () => {
        navigator.clipboard.writeText(codeInside.textContent)
          .then(() => {
            btn.textContent = "Copied!";
            setTimeout(() => btn.textContent = "Copy", 1500);
          })
          .catch(err => console.error("Copy failed", err));
      });
    }
  });
});
