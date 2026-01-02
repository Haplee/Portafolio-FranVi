document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENTS ---
    const profilePic = document.querySelector('.profile-pic');
    const profileName = document.querySelector('.profile-name');
    const socialLinks = document.querySelector('.social-links');
    const repoGrid = document.querySelector('.repo-grid');
    const footerName = document.querySelector('.footer-name');

    // --- FUNCTIONS ---
    const updateProfile = (user) => {
        const name = user.name || user.login;
        profilePic.src = user.avatar_url;
        profileName.textContent = name;
        if (footerName) footerName.textContent = name;

        // --- SOCIAL LINKS (with accessibility improvements) ---
        // Icons from Font Awesome, with aria-labels for screen readers.
        const iconWebsite = `<a href="${user.blog}" target="_blank" title="Website/Blog" aria-label="Visita mi sitio web"><i class="fas fa-globe"></i></a>`;
        const iconTwitter = `<a href="https://twitter.com/${user.twitter_username}" target="_blank" title="Twitter" aria-label="Visita mi perfil de Twitter"><i class="fab fa-twitter"></i></a>`;
        const iconInstagram = `<a href="https://instagram.com/franvidalmateo" target="_blank" title="Instagram" aria-label="Visita mi perfil de Instagram"><i class="fab fa-instagram"></i></a>`;
        const iconGitHub = `<a href="${user.html_url}" target="_blank" title="GitHub" aria-label="Visita mi perfil de GitHub"><i class="fab fa-github"></i></a>`;

        socialLinks.innerHTML = '';
        if (user.blog) {
            socialLinks.innerHTML += iconWebsite;
        }
        if (user.twitter_username) {
            socialLinks.innerHTML += iconTwitter;
        }
        // The user has an instagram, so I will add it.
        socialLinks.innerHTML += iconInstagram;
        socialLinks.innerHTML += iconGitHub;
    };

    const displayRepos = (repos) => {
        repoGrid.innerHTML = '';
        repos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
             .slice(0, 6)
             .forEach(repo => {
                const repoCard = document.createElement('div');
                repoCard.classList.add('repo-card');
                repoCard.innerHTML = `
                    <h4>${repo.name}</h4>
                    <p>${repo.description || 'No hay descripción disponible.'}</p>
                    <a href="${repo.html_url}" target="_blank">Ver en GitHub <i class="fas fa-arrow-right"></i></a>
                `;
                repoGrid.appendChild(repoCard);
             });
    };

    const init = async () => {
        try {
            const [userResponse, reposResponse] = await Promise.all([
                fetch('https://api.github.com/users/Haplee'),
                fetch('https://api.github.com/users/Haplee/repos')
            ]);

            if (!userResponse.ok) {
                throw new Error(`Error al cargar datos del usuario: ${userResponse.status}`);
            }
            if (!reposResponse.ok) {
                throw new Error(`Error al cargar los repositorios: ${reposResponse.status}`);
            }

            const user = await userResponse.json();
            const repos = await reposResponse.json();

            updateProfile(user);
            displayRepos(repos);

        } catch (error) {
            console.error('Fallo al obtener datos de GitHub:', error);
            if(repoGrid) repoGrid.innerHTML = '<p>No se pudieron cargar los datos de GitHub.</p>';
        }
    };

    const downloadCvButton = document.querySelector('.btn-pdf');

    const loadCv = () => {
        const cvData = localStorage.getItem('cvData');
        if (cvData) {
            downloadCvButton.href = cvData;
            downloadCvButton.setAttribute('download', 'cv.pdf');
        } else {
            downloadCvButton.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Todavía no se ha subido un CV.');
            });
        }
    };

    const setupObserver = () => {
        const projectSection = document.querySelector('#projects');
        if (!projectSection) return;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = document.querySelectorAll('.repo-card');
                    cards.forEach((card, index) => {
                        // The delay is calculated based on the card's index
                        card.style.animationDelay = `${index * 100}ms`;
                        card.classList.add('visible');
                    });
                    // Disconnect the observer after the animation has been triggered
                    observer.disconnect();
                }
            });
        }, { threshold: 0.1 }); // Trigger when 10% of the section is visible

        observer.observe(projectSection);
    };


    // --- INITIALIZATION ---
    init().then(() => {
        // We set up the observer after the repositories have been loaded and displayed
        setupObserver();
    });
    loadCv();

    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    hamburger.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        });
    });
});
