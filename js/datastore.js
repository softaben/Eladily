// js/datastore.js

// This function initializes the product data.
// It checks if there's already data in localStorage. If not, it loads default products.
function initializeProducts() {
    const productsInStorage = localStorage.getItem('products');
    if (!productsInStorage) {
        const defaultProducts = [
            {
                id: 1,
                name: 'Green Sarmad',
                price: '120.00',
                imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1887&auto=format&fit=crop',
                description: 'An enchanting fragrance that captures the essence of a lush, secret garden. A statement of confidence and serene elegance.',
                notes: {
                    top: 'Bergamot, Green Leaves',
                    heart: 'Jasmine, White Rose',
                    base: 'Vetiver, Sandalwood, Musk'
                }
            },
            {
                id: 2,
                name: 'Borcelle',
                price: '95.00',
                imageUrl: 'https://images.unsplash.com/photo-1622253813833-353597a718fab?q=80&w=1887&auto=format&fit=crop',
                description: 'A warm, inviting scent that evokes memories of a golden sunset. Perfect for those who appreciate classic sophistication.',
                notes: {
                    top: 'Saffron, Grapefruit',
                    heart: 'Leather, Violet',
                    base: 'Cashmere Wood, Raspberry'
                }
            },
            {
                id: 3,
                name: 'Amber Noir',
                price: '180.00',
                imageUrl: 'https://images.unsplash.com/photo-1594035918252-8473815f9b5c?q=80&w=1887&auto=format&fit=crop',
                description: 'A deep and mysterious fragrance, combining rare woods and exotic spices for an unforgettable, luxurious experience.',
                notes: {
                    top: 'Black Cardamom, Ginger',
                    heart: 'Jasmine, Orchid',
                    base: 'Oud, Amber, Black Sandalwood'
                }
            }
        ];
        localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
}

// Function to get all products from localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Function to save the products array to localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Initialize the products when the script loads
initializeProducts();
