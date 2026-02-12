// js/blog.js
document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.getElementById('blog-posts');
  const searchInput = document.getElementById('blog-search');

  const blogPosts = [
    {
      title: "Installing LAMMPS on Linux Desktop",
      date: "2025-08-14",
      tags: ["LAMMPS", "Linux", "MD"],
      file: "posts/blog1.html",
      image: "posts/images/Lammps-logo.png"

    },
    
    {
      title: "Installing LAMMPS on Cluster",
      date: "2025-08-01",
      tags: ["Linux", "Installation", "cluster"],
      file: "posts/java.html",
      image: "posts/images/Lammps-logo.png"
    },
    
     {
      title: "Buffon's Needle",
      date: "2025-07-20",
      tags: ["Simulation", "Quantum Physics"],
      file: "posts/MC-02-BuffonsNeedle.html",
      image: "posts/images/buffons_needle.png"
    },

     {
      title: "Git Cheatsheet",
      date: "2025-07-20",
      tags: ["Git", "Linux"],
      file: "posts/git-cheatsheet.html",
      image: "posts/images/git-logo.png"
    },  
    
     {
      title: "Cluster Cheatsheet for IMSc",
      date: "2025-07-20",
      tags: ["cluster", "Linux", 'imsc', 'slurm'],
      file: "posts/cluster_cheatsheet_slurm.html",
      image: "posts/images/slurm_logo.svg"
    },

     {
      title: "Cluster Cheatsheet for UGA",
      date: "2025-07-20",
      tags: ["cluster", "Linux", 'uga', 'oar'],
      file: "posts/cluster_cheatsheet_oar.html",
      image: "posts/images/oar_logo.png"
    },
    
     {
      title: "Linux Commands",
      date: "2025-07-20",
      tags: ["Linux", "commands"],
      file: "posts/misc.html",
      image: "posts/images/cli.jpg"
    }
    
  ];

  async function getExcerpt(file) {
    try {
      const response = await fetch(file);
      const text = await response.text();
      const div = document.createElement('div');
      div.innerHTML = text;
      const plainText = div.textContent || div.innerText || "";
      return plainText.slice(0, 200) + '...';
    } catch (err) {
      console.error('Error loading post:', file, err);
      return "Error loading post";
    }
  }

  async function renderPosts(posts) {
    if (posts.length === 0) {
      blogContainer.innerHTML = '<p>No posts found.</p>';
      return;
    }

    let html = '';
    for (const post of posts) {
      const excerpt = await getExcerpt(post.file);
html += `
  <article class="blog-post">
    <div class="blog-post-wrapper">
      <img src="${post.image}" alt="${post.title}" class="blog-thumb">
      <div class="blog-text">
        <h3>${post.title}</h3>
        <small>${new Date(post.date).toLocaleDateString()}</small>
        <p>${excerpt}</p>
        <div class="tags">
          ${post.tags.map(tag => `<span class="tag" data-tag="${tag}">${tag}</span>`).join(' ')}
        </div>
        <a href="${post.file}" class="read-more">Read more</a>
      </div>
    </div>
  </article>
`;

    }

    blogContainer.innerHTML = html;

    // Attach tag click events AFTER posts are rendered
    document.querySelectorAll('.tag').forEach(tagEl => {
      tagEl.addEventListener('click', () => {
        searchInput.value = tagEl.dataset.tag;
        filterPosts();
      });
    });
  }

  function filterPosts() {
    const query = searchInput.value.toLowerCase().trim();
    const filtered = blogPosts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
    renderPosts(filtered);
  }

  // Initial render
  renderPosts(blogPosts);

  // Search input listener
  searchInput.addEventListener('input', filterPosts);
});

