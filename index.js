        document.addEventListener('DOMContentLoaded', function () {
            const orderForms = document.querySelectorAll('.order-form');
            const cart = document.getElementById('cart');
            const cartItems = document.getElementById('cart-items');
    
            orderForms.forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    event.preventDefault();
    
                    const item = form.closest('.menu-item').querySelector('h3').innerText;
                    const quantity = parseInt(form.querySelector('input[type="number"]').value, 10);
    
                    if (quantity > 0) {
                        addToCart(item, quantity);
                        updateCartDisplay();
                    }
                });
            });
    
            function addToCart(item, quantity) {
                if (!cart.hasAttribute('data-items')) {
                    cart.setAttribute('data-items', '[]');
                }
    
                const items = JSON.parse(cart.getAttribute('data-items'));
                const existingItemIndex = items.findIndex(cartItem => cartItem.item === item);
    
                if (existingItemIndex !== -1) {
                    items[existingItemIndex].quantity += quantity;
                } else {
                    items.push({ item, quantity });
                }
    
                cart.setAttribute('data-items', JSON.stringify(items));
            }
    
            function updateCartDisplay() {
                const items = JSON.parse(cart.getAttribute('data-items'));
                cartItems.innerHTML = '';
    
                items.forEach(function (cartItem) {
                    const cartItemElement = document.createElement('div');
                    cartItemElement.classList.add('cart-item');
                    cartItemElement.innerHTML = `<strong>${cartItem.item}</strong> - Quantity: ${cartItem.quantity}`;
                    cartItems.appendChild(cartItemElement);
                });
    
                if (items.length > 0) {
                    cart.style.display = 'block';
                } else {
                    cart.style.display = 'none';
                }
            }
        });