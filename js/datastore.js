// js/datastore.js

// ### PRODUCTS DATA ###
function initializeProducts() {
    const productsInStorage = localStorage.getItem('products');
    if (!productsInStorage || JSON.parse(productsInStorage).length === 0) {
        const defaultProducts = [
            { id: 1664283600001, name: 'Green Sarmad', price: '120.00', imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1887&auto=format&fit=crop', description: 'An enchanting fragrance that captures the essence of a lush, secret garden.', notes: { top: 'Bergamot, Green Leaves', heart: 'Jasmine, White Rose', base: 'Vetiver, Sandalwood' } },
            { id: 1664283600002, name: 'Borcelle', price: '95.00', imageUrl: 'https://images.unsplash.com/photo-1622253813833-353597a718fab?q=80&w=1887&auto=format&fit=crop', description: 'A warm, inviting scent that evokes memories of a golden sunset.', notes: { top: 'Saffron, Grapefruit', heart: 'Leather, Violet', base: 'Cashmere Wood' } },
            { id: 1664283600003, name: 'Amber Noir', price: '180.00', imageUrl: 'https://images.unsplash.com/photo-1594035918252-8473815f9b5c?q=80&w=1887&auto=format&fit=crop', description: 'A deep and mysterious fragrance, combining rare woods and exotic spices.', notes: { top: 'Black Cardamom', heart: 'Orchid, Jasmine', base: 'Oud, Amber' } }
        ];
        localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
}
function getProducts() { return JSON.parse(localStorage.getItem('products')) || []; }
function saveProducts(products) { localStorage.setItem('products', JSON.stringify(products)); }

// ### CART DATA ###
function getCart() { return JSON.parse(localStorage.getItem('cart')) || []; }
function saveCart(cart) { localStorage.setItem('cart', JSON.stringify(cart)); }
function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const products = getProducts();
    const productToAdd = products.find(p => p.id == productId);

    if (!productToAdd) return;

    const existingItem = cart.find(item => item.id == productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...productToAdd, quantity });
    }
    saveCart(cart);
}
function clearCart() { localStorage.removeItem('cart'); }

// ### ORDERS DATA ###
function getOrders() { return JSON.parse(localStorage.getItem('orders')) || []; }
function saveOrders(orders) { localStorage.setItem('orders', JSON.stringify(orders)); }
function createOrder(customerDetails) {
    const orders = getOrders();
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

    const newOrder = {
        id: `ELD-${Date.now().toString().slice(-6)}`, // Unique Order ID e.g., ELD-123456
        date: new Date().toISOString(),
        customer: customerDetails,
        items: cart,
        total: total,
        status: 'Processing' // Initial status
    };
    orders.unshift(newOrder); // Add to the beginning
    saveOrders(orders);
    clearCart();
    return newOrder;
}

// Initialize data on load
initializeProducts();
