// js/admin.js

document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productsList = document.getElementById('products-list');

    // Function to render products in the admin list
    function renderProducts() {
        const products = getProducts();
        productsList.innerHTML = ''; // Clear the list before rendering
        if (products.length === 0) {
            productsList.innerHTML = '<tr><td colspan="5" class="text-center py-4">No products yet.</td></tr>';
            return;
        }

        products.forEach(product => {
            const row = `
                <tr class="border-b">
                    <td class="py-2 px-4"><img src="${product.imageUrl}" alt="${product.name}" class="h-16 w-16 object-cover"></td>
                    <td class="py-2 px-4 font-semibold">${product.name}</td>
                    <td class="py-2 px-4">$${product.price}</td>
                    <td class="py-2 px-4 max-w-sm truncate">${product.description}</td>
                    <td class="py-2 px-4">
                        <button class="text-red-600 hover:text-red-800" data-id="${product.id}">Delete</button>
                    </td>
                </tr>
            `;
            productsList.innerHTML += row;
        });
    }

    // Handle form submission to add a new product
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const products = getProducts();
        const newProduct = {
            id: Date.now(), // Unique ID based on timestamp
            name: document.getElementById('name').value,
            price: document.getElementById('price').value,
            imageUrl: document.getElementById('imageUrl').value,
            description: document.getElementById('description').value,
            notes: {
                top: document.getElementById('notes_top').value,
                heart: document.getElementById('notes_heart').value,
                base: document.getElementById('notes_base').value,
            }
        };

        products.push(newProduct);
        saveProducts(products);
        
        productForm.reset();
        renderProducts();
    });

    // Handle product deletion
    productsList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.dataset.id) {
            const productId = parseInt(e.target.dataset.id);
            let products = getProducts();
            products = products.filter(p => p.id !== productId);
            saveProducts(products);
            renderProducts();
        }
    });

    // Initial render
    renderProducts();
});
