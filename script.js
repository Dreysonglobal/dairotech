// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
    
    // Enhanced Intelligence Objects Animation
    enhanceIntelligenceObjects();
    
    // AI Avatar Interaction
    initAIAvatar();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
});

// Enhanced Intelligence Objects Animation
function enhanceIntelligenceObjects() {
    const intelObjects = document.querySelectorAll('.intel-object');
    
    intelObjects.forEach(obj => {
        // Add random initial positions and animations
        const randomX = Math.random() * 80 + 10; // 10% to 90%
        const randomY = Math.random() * 80 + 10; // 10% to 90%
        const randomSize = Math.random() * 80 + 40; // 40px to 120px
        const randomDelay = Math.random() * 10; // 0s to 10s
        
        obj.style.left = `${randomX}%`;
        obj.style.top = `${randomY}%`;
        obj.style.width = `${randomSize}px`;
        obj.style.height = `${randomSize}px`;
        obj.style.animationDelay = `${randomDelay}s`;
        
        // Add interactivity
        obj.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.filter = 'brightness(1.3)';
        });
        
        obj.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.filter = 'brightness(1)';
        });
    });
}

// AI Avatar Interaction
function initAIAvatar() {
    const avatar = document.querySelector('.ai-avatar');
    const pupils = document.querySelectorAll('.pupil');
    const mouth = document.querySelector('.avatar-mouth');
    
    if (!avatar) return;
    
    // Eye following cursor
    document.addEventListener('mousemove', (e) => {
        const eyes = document.querySelectorAll('.eye');
        eyes.forEach(eye => {
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;
            
            const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
            const distance = Math.min(7, Math.sqrt(
                Math.pow(e.clientX - eyeCenterX, 2) + 
                Math.pow(e.clientY - eyeCenterY, 2)
            ) / 50);
            
            const pupil = eye.querySelector('.pupil');
            if (pupil) {
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                pupil.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
            }
        });
    });
    
    // Avatar interaction on hover
    avatar.addEventListener('mouseenter', () => {
        avatar.style.transform = 'scale(1.1)';
        if (mouth) {
            mouth.style.animationDuration = '0.5s';
        }
    });
    
    avatar.addEventListener('mouseleave', () => {
        avatar.style.transform = 'scale(1)';
        if (mouth) {
            mouth.style.animationDuration = '2s';
        }
    });
    
    // Random blinking
    setInterval(() => {
        pupils.forEach(pupil => {
            pupil.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => {
                pupil.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 100);
        });
    }, 3000);
    
    // Speech animation when page loads
    setTimeout(() => {
        if (mouth) {
            mouth.style.animationDuration = '0.3s';
            setTimeout(() => {
                mouth.style.animationDuration = '2s';
            }, 1000);
        }
    }, 1000);
}

// WhatsApp Form Submission
function handleWhatsAppForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--accent-color)';
                    field.style.animation = 'shake 0.5s';
                } else {
                    field.style.borderColor = '';
                    field.style.animation = '';
                }
            });
            
            if (isValid) {
                // Prepare WhatsApp message
                const formData = new FormData(this);
                const message = formatWhatsAppMessage(formData);
                const phoneNumber = '2348099440105'; // Your WhatsApp number
                
                // Encode message for WhatsApp URL
                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Opening WhatsApp...';
                submitBtn.disabled = true;
                
                // Open WhatsApp
                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                    
                    // Show success message
                    showWhatsAppSuccess();
                    
                    // Reset form after a delay
                    setTimeout(() => {
                        this.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                    
                }, 1000);
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    }
}

// Format WhatsApp message from form data
function formatWhatsAppMessage(formData) {
    let message = `🌟 *New Contact Request from Dairo Tech Website* 🌟\n\n`;
    
    // Add form fields to message
    const fields = {
        'full-name': 'Full Name',
        'business-email': 'Business Email',
        'phone-number': 'Phone Number',
        'company': 'Company',
        'service-interest': 'Service of Interest',
        'message': 'Message'
    };
    
    for (let [key, label] of Object.entries(fields)) {
        const value = formData.get(key);
        if (value && value.trim()) {
            message += `*${label}:* ${value.trim()}\n`;
        }
    }
    
    // Add timestamp
    message += `\n*Submitted:* ${new Date().toLocaleString()}`;
    message += `\n\n_This message was sent via Dairo Tech website contact form_`;
    
    return message;
}

// Show WhatsApp success message
function showWhatsAppSuccess() {
    const successDiv = document.createElement('div');
    successDiv.className = 'whatsapp-success';
    successDiv.innerHTML = `
        <h4>✅ Message Ready for WhatsApp!</h4>
        <p>Your message has been prepared and WhatsApp is opening. Please click "Send" to complete your submission.</p>
        <p><small>If WhatsApp doesn't open automatically, please check your pop-up settings.</small></p>
    `;
    
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(successDiv, form);
    
    // Remove success message after 10 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 10000);
}

// Initialize WhatsApp form handling
document.addEventListener('DOMContentLoaded', function() {
    handleWhatsAppForm();
});

// Add to existing DOMContentLoaded event
// Replace the existing handleContactForm call with:
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    handleWhatsAppForm(); // Replace handleContactForm with this
    // ... existing code ...
});

// Form handling for contact page
function handleContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--accent-color)';
                    field.style.animation = 'shake 0.5s';
                } else {
                    field.style.borderColor = '';
                    field.style.animation = '';
                }
            });
            
            if (isValid) {
                // Show success message with animation
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // In a real application, you would send the form data to a server
                    showNotification('Thank you for your message! We will get back to you soon.', 'success');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--secondary-color)' : 'var(--accent-color)'};
        color: white;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    handleContactForm();
});

// Lazy loading for images
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Add CSS animation for form validation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .notification {
        font-weight: 600;
    }
`;
document.head.appendChild(style);