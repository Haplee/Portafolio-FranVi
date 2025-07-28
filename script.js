document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    const GITHUB_USERNAME = 'Haplee'; // Cambia esto por tu nombre de usuario de GitHub

    // --- DOM ELEMENTS ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const headerName = document.getElementById('header-name');
    const profilePic = document.querySelector('.profile-pic');
    const profileName = document.getElementById('profile-name');
    const profileBio = document.getElementById('profile-bio');
    const socialLinks = document.querySelector('.social-links');
    const repoGrid = document.querySelector('.repo-grid');

    // --- FUNCTIONS ---
    const fetchGitHubData = async (endpoint) => {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}${endpoint}`);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        return response.json();
    };

    const updateProfile = (user) => {
        headerName.textContent = user.name || user.login;
        profilePic.src = user.avatar_url;
        profileName.textContent = user.name || user.login;
        profileBio.textContent = user.bio || 'Desarrollador de software apasionado por la tecnología.';

        socialLinks.innerHTML = '';
        if (user.blog) {
            socialLinks.innerHTML += `<a href="${user.blog}" target="_blank" title="Website/Blog">🌐</a>`;
        }
        if (user.twitter_username) {
            // --- Links de Redes Sociales ---
            socialLinks.innerHTML += `<a href="https://twitter.com/${user.twitter_username}" target="_blank" title="X">𝕏</a>`;
            socialLinks.innerHTML += `<a href="https://instagram.com/franvidalmateo" target="_blank" title="Instagram">𝕀</a>`;
        }
    };

    const displayRepos = (repos) => {
        repoGrid.innerHTML = '';
        repos.forEach((repo) => {
            const repoCard = document.createElement('div');
            repoCard.classList.add('repo-card');
            repoCard.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No hay descripción disponible.'}</p>
                <div class="repo-stats">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span> Forks: ${repo.forks_count}</span>
                </div>
                <a href="${repo.html_url}" target="_blank">Ver en GitHub</a>
            `;
            repoGrid.appendChild(repoCard);
        });
    };

    const toggleTheme = () => {
        body.classList.toggle('light-mode');
        body.classList.toggle('dark-mode');
        const isLightMode = body.classList.contains('light-mode');
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        themeToggle.textContent = isLightMode ? 'Modo Oscuro' : 'Modo Claro';
    };

    const loadTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggle.textContent = 'Modo Oscuro';
        }
    };

    const init = async () => {
        loadTheme();
        themeToggle.addEventListener('click', toggleTheme);

        try {
            const user = await fetchGitHubData('');
            updateProfile(user);

            const repos = await fetchGitHubData('/repos?sort=updated&per_page=6');
            displayRepos(repos);
        } catch (error) {
            console.error('Failed to fetch GitHub data:', error);
            repoGrid.innerHTML = '<p>No se pudieron cargar los datos de GitHub. Inténtalo de nuevo más tarde.</p>';
        }
    };

    // --- INITIALIZATION ---
    init();
});
