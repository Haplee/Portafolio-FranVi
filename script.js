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

    gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: ".container",
            pin: true,
            scrub: 0.3,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + container.offsetWidth,
            onUpdate: self => {
                const progress = self.progress;
                const sectionIndex = Math.round(progress * (sections.length - 1));
                animateSection(sectionIndex);
            }
        }
    });

    function animateSection(index) {
        const section = sections[index];
        gsap.fromTo(section.querySelectorAll(".animate"),
            { autoAlpha: 0, y: 50 },
            { autoAlpha: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
        );
    }

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

        socialLinks.innerHTML = '';
        if (user.blog) {
            socialLinks.innerHTML += `<a href="${user.blog}" target="_blank" title="Website/Blog" class="animate">🌐</a>`;
        }
        if (user.twitter_username) {
            socialLinks.innerHTML += `<a href="https://twitter.com/${user.twitter_username}" target="_blank" title="X" class="animate">𝕏</a>`;
            socialLinks.innerHTML += `<a href="https://instagram.com/franvidalmateo" target="_blank" title="Instagram" class="animate">𝕀</a>`;

        }
        socialLinks.innerHTML += `<a href="https://github.com/${GITHUB_USERNAME}" target="_blank" title="GitHub" class="animate"></a>`;
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

            // Animate the first section initially
            animateSection(0);

        } catch (error) {
            console.error('Failed to fetch GitHub data:', error);
            if(repoGrid) repoGrid.innerHTML = '<p>No se pudieron cargar los datos de GitHub.</p>';
        }
    };

    // --- INITIALIZATION ---
    init();
});
