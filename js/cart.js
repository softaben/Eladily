// js/cart.js
document.addEventListener('DOMContentLoaded', () => {
    const cartContent = document.getElementById('cart-content');
    const cart = getCart();

    if (cart.length === 0) {
        cartContent.innerHTML = `<div class="text-center"><p class="text-xl text-gray-500 mb-4">Your cart is empty.</p><a href="shop.html" class="text-slate-600 hover:underline">Continue Shopping →</a></div>`;
        return;
    }
    
    let itemsHTML = cart.map(item => `
        <div class="flex justify-between items-center border-b py-4">
            <div class="flex items-center gap-4">
                <img src="${item.imageUrl}" class="w-20 h-20 object-cover">
                <div>
                    <h3 class="font-semibold text-lg">${item.name}</h3>
                    <p class="text-gray-500">Quantity: ${item.quantity}</p>
                </div>
            </div>
            <p class="font-semibold text-lg">$${(item.price * item.quantity).toFixed(2)}</p>
        </div>`).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

    cartContent.innerHTML = `
        ${itemsHTML}
        <div class="text-right mt-6">
            <h2 class="text-2xl md:text-3xl">Total: <span class="font-bold">$${total}</span></h2>
        </div>
        <div class="border-t mt-8 pt-8">
            <h2 class="text-3xl mb-6">Checkout</h2>
            <form id="checkout-form" class="space-y-4">
                <input type="text" id="name" placeholder="Full Name" class="p-3 border rounded w-full" required>
                <input type="email" id="email" placeholder="Email Address" class="p-3 border rounded w-full" required>
                <textarea id="address" placeholder="Shipping Address" class="p-3 border rounded w-full h-24" required></textarea>
                <button type="submit" class="w-full bg-slate-800 text-white py-3 px-12 text-lg hover:bg-slate-700 transition">Place Order</button>
            </form>
        </div>`;
    
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const customerDetails = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
        };
        const newOrder = createOrder(customerDetails);
        window.location.href = `success.html?orderId=${newOrder.id}`;
    });
});
