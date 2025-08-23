document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    const GITHUB_USERNAME = 'Haplee';

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
    const container = document.querySelector('.container');

    // --- GSAP ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);

    let sections = gsap.utils.toArray(".panel");

    sections.forEach((section) => {
        const animatedEls = section.querySelectorAll(".animate");
        gsap.fromTo(animatedEls,
            { autoAlpha: 0, y: -50 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none",
                }
            }
        );
    });

    // --- FUNCTIONS ---
    const fetchGitHubData = async (endpoint) => {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}${endpoint}`);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        return response.json();
    };

    const updateProfile = (user) => {
        const name = user.name || user.login;
        headerTitle.textContent = name;
        profileNameHome.textContent = name;
        profilePic.src = user.avatar_url;
        profileName.textContent = name;
        profileBio.textContent = user.bio || 'Desarrollador de software apasionado por la tecnología.';

        // Icons SVG Code
        const iconWebsite = `<svg viewBox="0 0 420 420" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke-width="26" d="M209,15a195,195 0 1,0 2,0z"/><path stroke-width="18" d="m210,15v390m195-195H15M59,90a260,260 0 0,0 302,0 m0,240 a260,260 0 0,0-302,0M195,20a250,250 0 0,0 0,382 m30,0 a250,250 0 0,0 0-382"/></svg>`;
        const iconX = `<svg viewBox="0 0 300 271" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"/></svg>`;
        const iconInstagram = `<svg viewBox="0 0 600 600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M300,123.5c-47.9,0-54,0.2-72.8,1.1c-18.8,0.9-31.6,3.8-42.8,8.2c-11.6,4.5-21.5,10.5-31.3,20.4c-9.8,9.8-15.8,19.7-20.4,31.3c-4.4,11.2-7.4,24.1-8.2,42.8c-0.8,18.8-1.1,24.8-1.1,72.8c0,47.9,0.2,53.9,1.1,72.8c0.9,18.8,3.8,31.6,8.2,42.8c4.5,11.6,10.5,21.5,20.4,31.3c9.8,9.8,19.7,15.9,31.3,20.4c11.2,4.4,24.1,7.3,42.8,8.2c18.8,0.9,24.8,1.1,72.8,1.1c47.9,0,53.9-0.2,72.8-1.1c18.8-0.9,31.6-3.8,42.9-8.2c11.6-4.5,21.4-10.6,31.2-20.4c9.8-9.8,15.8-19.7,20.4-31.3c4.3-11.2,7.3-24,8.2-42.8c0.8-18.8,1.1-24.8,1.1-72.8c0-47.9-0.2-53.9-1.1-72.8c-0.9-18.8-3.9-31.6-8.2-42.8c-4.5-11.6-10.6-21.5-20.4-31.3c-9.8-9.8-19.6-15.8-31.3-20.4c-11.3-4.4-24.1-7.3-42.9-8.2C353.9,123.7,347.9,123.5,300,123.5L300,123.5z M300,209.4c-50.1,0-90.6,40.6-90.6,90.6c0,50.1,40.6,90.6,90.6,90.6c50.1,0,90.6-40.6,90.6-90.6C390.6,249.9,350.1,209.4,300,209.4L300,209.4z M300,358.8c-32.5,0-58.8-26.3-58.8-58.8c0-32.5,26.3-58.8,58.8-58.8c32.5,0,58.8,26.3,58.8,58.8C358.8,332.5,332.5,358.8,300,358.8z M394.2,184.6c-11.7,0-21.2,9.5-21.2,21.2c0,11.7,9.5,21.2,21.2,21.2c11.7,0,21.2-9.5,21.2-21.2C415.4,194.1,405.9,184.6,394.2,184.6L394.2,184.6z"/></svg>`;
        const iconGitHub = `<svg viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" /></svg>`;

        socialLinks.innerHTML = '';
        if (user.blog) {
            socialLinks.innerHTML += `<a href="${user.blog}" target="_blank" title="Website/Blog" class="animate">${iconWebsite}</a>`;
        }
        if (user.twitter_username) {
            socialLinks.innerHTML += `<a href="https://twitter.com/${user.twitter_username}" target="_blank" title="X" class="animate">${iconX}</a>`;
            socialLinks.innerHTML += `<a href="https://instagram.com/franvidalmateo" target="_blank" title="Instagram" class="animate">${iconInstagram}</a>`;
        }
        socialLinks.innerHTML += `<a href="https://github.com/${GITHUB_USERNAME}" target="_blank" title="GitHub" class="animate">${iconGitHub}</a>`;
    };

    const displayRepos = (repos) => {
        repoGrid.innerHTML = '';
        repos.sort((a, b) => b.stargazers_count - a.stargazers_count)
             .slice(0, 6)
             .forEach(repo => {
                const repoCard = document.createElement('div');
                repoCard.classList.add('repo-card', 'animate');
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

        // Add animate class to elements that should be animated
        document.querySelectorAll('.home h2, .home p, .profile-pic, .profile-info h2, .profile-bio, .repositories h2').forEach(el => {
            el.classList.add('animate');
        });

        try {
            const user = await fetchGitHubData('');
            updateProfile(user);

            const repos = await fetchGitHubData('/repos');
            displayRepos(repos);

        } catch (error) {
            console.error('Failed to fetch GitHub data:', error);
            if(repoGrid) repoGrid.innerHTML = '<p>No se pudieron cargar los datos de GitHub.</p>';
        }
    };

    // --- INITIALIZATION ---
    init();
});
