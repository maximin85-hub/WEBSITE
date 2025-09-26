fetch('projects.json')
  .then(response => response.json())
  .then(projects => {
    const container = document.getElementById('projects');
    projects.forEach((proj, idx) => {
      const card = document.createElement('div');
      card.className = 'project-card';

      // Affichage index : une seule image visible (la première)
      const imagesHtml = (proj.images && proj.images.length)
        ? `<img src="${proj.images[0]}" alt="${proj.title}">`
        : '';

      card.innerHTML = `
        ${imagesHtml}
        <div class="project-info">
          <h3>${proj.title}</h3>
          <p>${proj.miniDescription || ''}</p>
        </div>
      `;

      // Ouvre la modale au clic
      card.addEventListener('click', () => openProjectModal(proj));
      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error('Erreur chargement projets:', err);
  });

// Fonction pour ouvrir la modale
function openProjectModal(proj) {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('project-modal-content');

  let layoutClass = proj.imagesLayout ? ` ${proj.imagesLayout}` : '';
  let html = `
    <div class="modal-banner">
      <div class="modal-title">${proj.title}</div>
      <button class="modal-close" onclick="closeProjectModal()">Fermer</button>
    </div>
    <div class="modal-body">
      <div class="modal-description">${proj.description}</div>
      <div class="modal-media${layoutClass}">
  `;

  // Images
  if (proj.mediaDetails && proj.mediaDetails.length) {
    html += proj.mediaDetails.map(media => {
      if (media.type === "video" || (media.src && media.src.match(/\.(mp4|webm|ogg)$/i))) {
        return `<video src="${media.src}" controls autoplay loop muted style="${media.style || ''}"></video>`;
      }
      return `<img src="${media.src}" style="${media.style || ''}">`;
    }).join('');
  } else if (proj.imagesDetails && proj.imagesDetails.length) {
    html += proj.imagesDetails.map(img =>
      `<img src="${img.src}" style="${img.style || ''}">`
    ).join('');
  } else if (proj.images && proj.images.length) {
    html += proj.images.map(src =>
      `<img src="${src}" class="modal-img">`
    ).join('');
  }

  html += `</div></div>`;
  modalContent.innerHTML = html;
  modal.style.display = 'flex';
}

function closeProjectModal() {
  document.getElementById('project-modal').style.display = 'none';
}

