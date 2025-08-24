document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENTS ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const headerTitle = document.querySelector('.header-title');
    const profileNameHome = document.querySelector('.profile-name-home');
    const profilePic = document.querySelector('.profile-pic');
    const profileName = document.querySelector('.profile-info h2');
    const profileBio = document.querySelector('.profile-bio');
    const socialLinks = document.querySelector('.social-links');
    const repoGrid = document.querySelector('.repo-grid');

    // --- GSAP ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);

    const animateElements = (selector) => {
        const elements = gsap.utils.toArray(selector);
        elements.forEach((el) => {
            gsap.fromTo(el,
                { autoAlpha: 0, y: 30 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    }
                }
            );
        });
    };

    // --- FUNCTIONS ---
    const updateProfile = (user) => {
        const name = user.name || user.login;
        headerTitle.textContent = name;
        if(profileNameHome) profileNameHome.textContent = name;
        profilePic.src = user.avatar_url;
        profileName.textContent = name;
        profileBio.textContent = user.bio || 'Desarrollador de software apasionado por la tecnología.';

        // Icons SVG Code
        const iconWebsite = `<svg viewBox="0 0 420 420" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke-width="26" d="M209,15a195,195 0 1,0 2,0z"/><path stroke-width="18" d="m210,15v390m195-195H15M59,90a260,260 0 0,0 302,0 m0,240 a260,260 0 0,0-302,0M195,20a250,250 0 0,0 0,382 m30,0 a250,250 0 0,0 0-382"/></svg>`;
        const iconX = `<svg viewBox="0 0 300 271" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"/></svg>`;
        const iconInstagram = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/></svg>`;
        const iconGitHub = `<svg viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" /></svg>`;

        socialLinks.innerHTML = '';
        if (user.blog) {
            socialLinks.innerHTML += `<a href="${user.blog}" target="_blank" title="Website/Blog">${iconWebsite}</a>`;
        }
        if (user.twitter_username) {
            socialLinks.innerHTML += `<a href="https://twitter.com/${user.twitter_username}" target="_blank" title="X">${iconX}</a>`;
            socialLinks.innerHTML += `<a href="https://instagram.com/franvidalmateo" target="_blank" title="Instagram">${iconInstagram}</a>`;
        }
        socialLinks.innerHTML += `<a href="${user.html_url}" target="_blank" title="GitHub">${iconGitHub}</a>`;
    };

    const displayRepos = (repos) => {
        repoGrid.innerHTML = '';
        repos.sort((a, b) => b.stargazers_count - a.stargazers_count)
             .slice(0, 6)
             .forEach(repo => {
                const repoCard = document.createElement('div');
                repoCard.classList.add('repo-card');
                repoCard.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No hay descripción disponible.'}</p>
                    <a href="${repo.html_url}" target="_blank">Ver en GitHub</a>
                `;
                repoGrid.appendChild(repoCard);
             });
    };

    const toggleTheme = () => {
        body.classList.toggle('light-mode');
        const isLightMode = body.classList.contains('light-mode');
        localStorage.setItem('lightMode', isLightMode);
        ScrollTrigger.refresh();
    };

    const loadTheme = () => {
        if (JSON.parse(localStorage.getItem('lightMode'))) {
            body.classList.add('light-mode');
        }
    };

    const init = async () => {
        loadTheme();
        themeToggle.addEventListener('click', toggleTheme);

        animateElements('.panel, .profile-pic, .profile-info > *, .data-card, .column');

        try {
            const response = await fetch('github-data.json');
            if (!response.ok) {
                throw new Error(`Failed to load local data: ${response.status}`);
            }
            const data = await response.json();
            updateProfile(data.user);
            displayRepos(data.repos);

            animateElements('.repo-card');

        } catch (error) {
            console.error('Failed to fetch GitHub data:', error);
            if(repoGrid) repoGrid.innerHTML = '<p>No se pudieron cargar los datos de GitHub.</p>';
        }
    };

    // --- INITIALIZATION ---
    init();
});
