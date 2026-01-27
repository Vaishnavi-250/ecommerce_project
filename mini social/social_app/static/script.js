// Enhanced Interactive Dashboard Script

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    addAnimations();
});

// ==========================================
// EVENT LISTENERS
// ==========================================

function initializeEventListeners() {
    // Add smooth scroll behavior to links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.post-card, .trending-card, .stat-card, .activity-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add animation to stat values
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        animateValue(stat);
    });

    // Add responsive menu toggle if needed
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && window.innerWidth <= 768) {
        createMobileMenu();
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            createMobileMenu();
        }
    });
}

// ==========================================
// ANIMATIONS
// ==========================================

function addAnimations() {
    // Animate cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.5s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.post-card, .trending-card').forEach(card => {
        observer.observe(card);
    });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function animateValue(element) {
    const start = 0;
    const end = parseInt(element.textContent) || 0;
    const duration = 1000;
    const startTime = Date.now();

    function updateValue() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * end);
        element.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(updateValue);
        } else {
            element.textContent = end;
        }
    }

    updateValue();
}

function createMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu.classList.contains('mobile-menu-created')) {
        navMenu.classList.add('mobile-menu');
        navMenu.classList.add('mobile-menu-created');
    }
}

// ==========================================
// INTERACTION HANDLERS
// ==========================================

// Like button functionality
function setupLikeButtons() {
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.dataset.postId;
            toggleLike(postId, this);
        });
    });
}

function toggleLike(postId, button) {
    // This would typically send an AJAX request to the server
    console.log('Toggling like for post:', postId);
    button.classList.toggle('liked');
    
    // Update like count
    const likeCount = button.querySelector('.like-count');
    if (likeCount) {
        const currentCount = parseInt(likeCount.textContent) || 0;
        likeCount.textContent = button.classList.contains('liked') ? currentCount + 1 : currentCount - 1;
    }
}

// ==========================================
// REAL-TIME UPDATES
// ==========================================

// Simulate real-time notifications (can be replaced with WebSocket/Server-Sent Events)
function initializeNotifications() {
    // Check for new posts every 30 seconds
    setInterval(checkForNewPosts, 30000);
}

function checkForNewPosts() {
    console.log('Checking for new posts...');
    // This would typically fetch new posts from the server
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Lazy load images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ==========================================
// INITIALIZATION ON LOAD
// ==========================================

initializeLazyLoading();
setupLikeButtons();
initializeNotifications();

// Add console message for debugging
console.log('Mini Social Dashboard initialized successfully!');