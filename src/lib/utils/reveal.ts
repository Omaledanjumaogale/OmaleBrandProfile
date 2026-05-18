/**
 * Svelte Action for revealing elements on scroll
 * Usage: <div use:reveal>...</div>
 */
export function reveal(node: HTMLElement, options: { threshold?: number, rootMargin?: string } = {}) {
    const { threshold = 0.1, rootMargin = '0px' } = options;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    node.classList.add('revealed');
                    // Once revealed, we don't need to observe anymore
                    observer.unobserve(node);
                }
            });
        },
        { threshold, rootMargin }
    );

    // Initial state: hidden
    node.style.opacity = '0';
    node.style.transform = 'translateY(20px)';
    node.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

    // CSS class to trigger visible state
    const style = document.createElement('style');
    style.innerHTML = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        }
    };
}
