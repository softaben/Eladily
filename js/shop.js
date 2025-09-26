// js/shop.js

document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('products-grid');
    const products = getProducts();

    if (products.length === 0) {
        productsGrid.innerHTML = '<p class="col-span-full text-center text-gray-500">No products found. Please add products in the admin panel.</p>';
        return;
    }

    products.forEach(product => {
        const productCard = `
            <div class="text-center group fade-in">
                <a href="#"> <div class="bg-stone-200 mb-4 overflow-hidden aspect-square">
                        <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <h3 class="text-2xl">${product.name}</h3>
                    <p class="mt-2 text-lg font-semibold">$${product.price}</p>
                </a>
            </div>
        `;
        productsGrid.innerHTML += productCard;
    });

    // Add fade-in animation effect
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px"
    };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});
