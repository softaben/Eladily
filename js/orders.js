// js/orders.js
document.addEventListener('DOMContentLoaded', () => {
    const ordersListDiv = document.getElementById('orders-list');

    function renderOrders() {
        const orders = getOrders();
        ordersListDiv.innerHTML = '';
        if (orders.length === 0) {
            ordersListDiv.innerHTML = '<p class="text-center text-gray-500 p-4">No orders have been placed yet.</p>';
            return;
        }

        orders.forEach(order => {
            const itemsSummary = order.items.map(item => `${item.name} (x${item.quantity})`).join(', ');
            ordersListDiv.innerHTML += `
                <div class="bg-white border rounded-lg shadow-sm p-4">
                    <div class="grid md:grid-cols-4 gap-4 items-center">
                        <div>
                            <p class="font-bold text-lg">${order.id}</p>
                            <p class="text-sm text-gray-500">${new Date(order.date).toLocaleString()}</p>
                        </div>
                        <div>
                            <p class="font-semibold">${order.customer.name}</p>
                            <p class="text-sm text-gray-500">${order.customer.email}</p>
                        </div>
                        <div class="text-sm text-gray-600" title="${itemsSummary}">
                            ${itemsSummary.substring(0, 50)}...
                        </div>
                        <div>
                            <select data-order-id="${order.id}" class="status-select p-2 border rounded w-full">
                                <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                                <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                                <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                                <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>`;
        });
    }

    ordersListDiv.addEventListener('change', (e) => {
        if (e.target.classList.contains('status-select')) {
            const orderId = e.target.dataset.orderId;
            const newStatus = e.target.value;
            const orders = getOrders();
            const orderToUpdate = orders.find(o => o.id === orderId);
            if (orderToUpdate) {
                orderToUpdate.status = newStatus;
                saveOrders(orders);
                // Optional: add a visual confirmation
            }
        }
    });

    renderOrders();
});
