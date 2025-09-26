// js/product.js
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = getProducts().find(p => p.id == productId);
    const detailsContainer = document.getElementById('product-details');

    if (!product) {
        detailsContainer.innerHTML = '<p class="text-center">Product not found.</p>';
        return;
    }

    detailsContainer.innerHTML = `
        <div class="grid md:grid-cols-2 gap-12 items-start">
            <div><img src="${product.imageUrl}" alt="${product.name}" class="w-full object-cover shadow-lg"></div>
            <div>
                <h1 class="text-4xl md:text-5xl font-bold mb-4">${product.name}</h1>
                <p class="text-2xl text-rose-600 mb-6">$${product.price}</p>
                <p class="mb-8 text-gray-600">${product.description}</p>
                <div class="mb-8 border-t pt-4">
                    <h3 class="text-xl font-semibold mb-3">Olfactory Notes</h3>
                    <ul class="space-y-2 text-gray-600">
                        <li><strong>Top:</strong> ${product.notes.top}</li>
                        <li><strong>Heart:</strong> ${product.notes.heart}</li>
                        <li><strong>Base:</strong> ${product.notes.base}</li>
                    </ul>
                </div>
                <button id="add-to-cart-btn" class="bg-slate-800 text-white py-3 px-12 text-lg hover:bg-slate-700 transition">Add to Cart</button>
            </div>
        </div>`;
    
    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
        addToCart(product.id);
        window.location.href = 'cart.html';
    });
});
