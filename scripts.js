document.addEventListener('DOMContentLoaded', () => {
  const postContainer = document.getElementById('post-container');
  if (!postContainer) return;

  fetch('posts.json')
    .then(res => res.json())
    .then(posts => {
      // Obtener el id de la URL
      const params = new URLSearchParams(window.location.search);
      const postId = params.get('id');
      const post = posts.find(p => p.id === postId);

      if (!post) {
        postContainer.innerHTML = '<p>Post no encontrado.</p>';
        return;
      }

      // Renderizar el post
      postContainer.innerHTML = `
        <h2>${post.title}</h2>
        <div class="post-meta">${post.date} — ${post.category}</div>
        <img src="${post.image}" alt="${post.title}" />
        <span class="image-credit">${post.imageCredit || ''}</span>
        <div class="post-content">${post.content}</div>
        <div class="post-tags">
          ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join(' ')}
        </div>
      `;
    })
    .catch(() => {
      postContainer.textContent = 'Error cargando post.';
    });
});