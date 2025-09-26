// js/track.js
document.addEventListener('DOMContentLoaded', () => {
    const trackForm = document.getElementById('track-form');
    const resultDiv = document.getElementById('order-status-result');

    trackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const orderId = document.getElementById('order-id-input').value.trim();
        if (!orderId) {
            resultDiv.innerHTML = '<p class="text-red-500">Please enter an Order ID.</p>';
            return;
        }

        const orders = getOrders();
        const order = orders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
        
        if (order) {
            resultDiv.innerHTML = `
                <h3 class="text-2xl font-semibold mb-4">Order Status</h3>
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
                <p class="mt-4"><strong>Current Status:</strong> 
                    <span class="text-lg font-bold ${order.status === 'Delivered' ? 'text-green-600' : 'text-rose-600'}">${order.status}</span>
                </p>
            `;
        } else {
            resultDiv.innerHTML = '<p class="text-red-500">No order found with that ID. Please check the ID and try again.</p>';
        }
    });
});
