document.addEventListener('DOMContentLoaded', () => {
    const username = 'Haplee'; // Cambia esto por tu nombre de usuario de GitHub
    const repoGrid = document.querySelector('.repo-grid');
    const profilePic = document.querySelector('.profile-pic');
    const profileName = document.querySelector('.profile-info h2');
    const profileDesc = document.querySelector('.profile-info p');
    const headerName = document.querySelector('.neon-text');

    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(user => {
            headerName.textContent = user.name || user.login;
            profilePic.src = user.avatar_url;
            profileName.textContent = user.name || user.login;
            profileDesc.textContent = user.bio || 'Desarrollador de software apasionado por la tecnología.';
        });

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
        .then(response => response.json())
        .then(repos => {
            repoGrid.innerHTML = '';
            repos.forEach(repo => {
                const repoCard = document.createElement('div');
                repoCard.classList.add('repo-card');
                repoCard.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No hay descripción disponible.'}</p>
                    <a href="${repo.html_url}" target="_blank">Ver en GitHub</a>
                `;
                repoGrid.appendChild(repoCard);
            });
        });
});
