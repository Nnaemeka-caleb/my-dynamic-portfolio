// ===== GLOBAL VARIABLES =====
let isLoading = true;
let currentSkillCategory = 'frontend';

// ===== DOM ELEMENTS =====
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contact-form');
const currentYearSpan = document.getElementById('current-year');
const typewriterElement = document.getElementById('typewriter');
const skillCategories = document.querySelectorAll('.skill-category');
const skillsGrids = document.querySelectorAll('.skills-grid');
const skillDescription = document.getElementById('skill-description');
const projectsContainer = document.getElementById('projects-container');
const filterBtns = document.querySelectorAll('.filter-btn');
const statNumbers = document.querySelectorAll('.stat-number');

// Skills data for interactive buttons
const skillInfo = {
    "HTML": "HTML (HyperText Markup Language) is the backbone of all web pages, defining their structure and content with semantic elements.",
    "CSS": "CSS (Cascading Style Sheets) is used to style the visual presentation of web pages, making them look great with colors, layouts, and animations!",
    "JavaScript": "JavaScript is a programming language that enables interactive web pages, allowing complex features, dynamic content, and user interactions."
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Simulate loading time for loading screen effect
    setTimeout(() => {
        hideLoadingScreen();
        initializeComponents();
    }, 2000);
}

function hideLoadingScreen() {
    if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            isLoading = false;
        }, 500);
    }
}

function initializeComponents() {
    updateCurrentYear();
    initializeTypewriter();
    initializeNavigation();
    initializeThemeToggle();
    initializeScrollEffects();
    initializeSkillsSection();
    initializeContactForm();
    loadProjects();
    initializeAnimations();
    applyStoredTheme();
}

// ===== YEAR UPDATE =====
function updateCurrentYear() {
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// ===== TYPEWRITER EFFECT =====
function initializeTypewriter() {
    const texts = [
        'Full Stack Developer',
        'UI/UX Designer', 
        'Problem Solver',
        'Creative Thinker'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        if (!typewriterElement) return;
        
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(typeWriter, typingSpeed);
    }

    if (typewriterElement) {
        typeWriter();
    }
}

// ===== NAVIGATION =====
function initializeNavigation() {
    // Mobile navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Active navigation link highlighting
    window.addEventListener('scroll', highlightActiveNavLink);
}

function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// ===== THEME TOGGLE =====
function initializeThemeToggle() {
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Update button icon if it exists
    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Save theme preference
    if (isDarkMode) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

function applyStoredTheme() {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        const icon = themeToggle?.querySelector('i');
        if (icon) icon.className = 'fas fa-sun';
    }
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Back to top button
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Parallax effect for floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            const speed = element.dataset.speed || 1;
            const yPos = -(scrolled * speed * 0.1);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== SKILLS SECTION =====
function initializeSkillsSection() {
    // Skill category switching
    skillCategories.forEach(category => {
        category.addEventListener('click', () => {
            const categoryType = category.dataset.category;
            switchSkillCategory(categoryType);
        });
    });

    // Initialize skill buttons interaction (from exercise)
    const skillButtons = document.querySelectorAll('.skill-btn');
    
    skillButtons.forEach(button => {
        button.addEventListener('click', () => {
            const skill = button.dataset.skill; // Get the 'data-skill' attribute
            if (skillDescription && skillInfo[skill]) {
                skillDescription.textContent = skillInfo[skill];
                skillDescription.style.color = '#0056b3'; // Change text color on interaction
            }
        });
    });

    // Initialize skill bars animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                animateStatNumbers();
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.getElementById('skills') || document.getElementById('interactive-skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

function switchSkillCategory(categoryType) {
    // Update active category
    skillCategories.forEach(cat => cat.classList.remove('active'));
    const activeCategory = document.querySelector(`[data-category="${categoryType}"]`);
    if (activeCategory) activeCategory.classList.add('active');
    
    // Show corresponding skills grid
    skillsGrids.forEach(grid => {
        if (grid.dataset.category === categoryType) {
            grid.classList.remove('hidden');
        } else {
            grid.classList.add('hidden');
        }
    });
    
    currentSkillCategory = categoryType;
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const percentage = bar.dataset.percentage || '0';
        bar.style.width = percentage + '%';
    });
}

function animateStatNumbers() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target || '0');
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 40);
    });
}

// ===== PROJECT LOADING (JSON) =====
async function loadProjects() {
    if (!projectsContainer) return;
    
    try {
        const response = await fetch('data/portfolio_items.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const projects = await response.json();
        
        // Clear loading message if any
        projectsContainer.innerHTML = '';
        
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank" rel="noopener noreferrer">View Project</a>
            `;
            projectsContainer.appendChild(projectCard);
        });
        
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsContainer.innerHTML = '<p>Failed to load projects. Please try again later.</p>';
    }
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Simple validation
    if (!data.name || !data.email || !data.message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Fade in animations for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add floating animation to profile image
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.classList.add('floating-element');
        profileImg.dataset.speed = '2';
    }
}

// ===== PROJECT FILTERING (if filter buttons exist) =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        // Update active filter button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter projects
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(() => {
    // Any additional scroll handling can go here
}, 16);

window.addEventListener('scroll', debouncedScrollHandler);

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Apply saved theme immediately when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});