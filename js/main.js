// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // --- HEADER & NAVIGATION ---
    const header = document.getElementById('main-header');
    const cart = getCart();
    header.innerHTML = `
        <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
            <div class="text-3xl font-bold tracking-widest"><a href="index.html">ELDAVILY</a></div>
            <div class="hidden md:flex space-x-10 items-center text-sm tracking-wider">
                <a href="shop.html" class="hover:text-rose-600 transition-colors">SHOP</a>
                <a href="track.html" class="hover:text-rose-600 transition-colors">TRACK ORDER</a>
                <a href="admin.html" class="hover:text-rose-600 transition-colors">ADMIN</a>
            </div>
            <a href="cart.html" class="relative">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                ${cart.length > 0 ? `<span class="absolute -top-2 -right-2 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">${cart.reduce((sum, item) => sum + item.quantity, 0)}</span>` : ''}
            </a>
        </nav>`;

    // --- FADE-IN ANIMATION ---
    const faders = document.querySelectorAll('.fade-in');
    if (faders.length > 0) {
        const appearOptions = { threshold: 0.3, rootMargin: "0px 0px -50px 0px" };
        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            });
        }, appearOptions);
        faders.forEach(fader => appearOnScroll.observe(fader));
    }
});
