document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollReveal();
    loadProjects();
    loadSkills();
});

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });
}

// ============================================
// Scroll Reveal Animation
// ============================================
function initScrollReveal() {
    const revealOnScroll = () => {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

// ============================================
// Projects Loading
// ============================================
function loadProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    // Utilise les données depuis data/projects.js
    if (typeof PROJECTS_DATA === 'undefined') {
        console.error('PROJECTS_DATA non défini. Vérifiez que data/projects.js est chargé.');
        return;
    }

    container.innerHTML = PROJECTS_DATA.map(project => createProjectCard(project)).join('');
    
    // Réinitialiser les animations après insertion
    setTimeout(initScrollReveal, 100);
}

function createProjectCard(project) {
    const delayClass = project.delay ? `delay-${project.delay}` : '';
    const tags = project.tags.map(tag => 
        `<span class="px-2 py-1 rounded bg-white/5 border border-white/10">${tag}</span>`
    ).join('');

    const githubLink = project.github 
        ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-primary transition-colors" title="Voir sur GitHub">
               <i class="fa-brands fa-github text-xl"></i>
           </a>`
        : '';

    return `
        <article class="project-card group reveal ${delayClass}">
            <div class="relative h-48 overflow-hidden">
                <div class="absolute inset-0 bg-dark/50 group-hover:bg-transparent transition-all z-10"></div>
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500">
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-bold group-hover:text-primary transition-colors">${project.title}</h3>
                    <div class="flex items-center gap-3">
                        ${githubLink}
                        <i class="${project.icon} text-gray-500"></i>
                    </div>
                </div>
                <p class="text-gray-400 text-sm mb-4 line-clamp-3">${project.description}</p>
                <div class="flex flex-wrap gap-2 text-xs font-mono text-secondary">
                    ${tags}
                </div>
            </div>
        </article>
    `;
}

// ============================================
// Skills Loading
// ============================================
function loadSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;

    // Utilise les données depuis data/skills.js
    if (typeof SKILLS_DATA === 'undefined') {
        console.error('SKILLS_DATA non défini. Vérifiez que data/skills.js est chargé.');
        return;
    }

    container.innerHTML = SKILLS_DATA.map(skill => createSkillCard(skill)).join('');
}

function createSkillCard(skill) {
    const isImage = skill.icon.startsWith('http') || skill.icon.startsWith('/') || skill.icon.endsWith('.svg') || skill.icon.endsWith('.png') || skill.icon.endsWith('.jpg');
    
    const iconHtml = isImage
        ? `<img src="${skill.icon}" alt="${skill.name}" class="w-10 h-10 mb-2">`
        : `<i class="${skill.icon} text-5xl ${skill.color} mb-2"></i>`;

    return `
        <div class="skill-card">
            ${iconHtml}
            <span>${skill.name}</span>
        </div>
    `;
}