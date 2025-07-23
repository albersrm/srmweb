document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('posts-container');
  const postContainer = document.getElementById('post-container');

  fetch('posts.json')
    .then(res => res.json())
    .then(posts => {
      // Página principal: mostrar tarjetas de posts
      if (postsContainer) {
        posts.forEach(post => {
          const card = document.createElement('a');
          card.className = 'post-card';
          card.href = `post.html?id=${post.id}`;

          const img = document.createElement('img');
          img.className = 'post-image';
          img.src = post.image;
          img.alt = post.title;

          const contentDiv = document.createElement('div');
          contentDiv.className = 'post-content';

          const title = document.createElement('h2');
          title.className = 'post-title';
          title.textContent = post.title;

          // Extracto (primeros 120 caracteres de content, sin HTML)
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = post.content || '';
          let text = tempDiv.textContent || tempDiv.innerText || '';
          text = text.length > 120 ? text.slice(0, 120) + '…' : text;

          const excerpt = document.createElement('p');
          excerpt.className = 'post-excerpt';
          excerpt.textContent = text;

          // Tags
          const tagsDiv = document.createElement('div');
          tagsDiv.className = 'post-tags';
          if (post.tags && post.tags.length > 0) {
            post.tags.forEach(tag => {
              const tagSpan = document.createElement('span');
              tagSpan.className = 'post-tag';
              tagSpan.textContent = tag;
              tagsDiv.appendChild(tagSpan);
            });
          }

          contentDiv.appendChild(title);
          contentDiv.appendChild(excerpt);
          contentDiv.appendChild(tagsDiv);

          card.appendChild(img);
          card.appendChild(contentDiv);

          postsContainer.appendChild(card);
        });
      }

      // Página de post individual
      if (postContainer) {
        const params = new URLSearchParams(window.location.search);
        const postId = params.get('id');
        const post = posts.find(p => p.id === postId);

        if (!post) {
          postContainer.innerHTML = '<p>Post no encontrado.</p>';
          return;
        }

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
      }
    })
    .catch(() => {
      if (postsContainer) postsContainer.textContent = 'Error cargando posts.';
      if (postContainer) postContainer.textContent = 'Error cargando post.';
    });
});