// Product data (Mock data)
const products = [
    { id: 1, name: 'Product 1', price: 10.00, img: 'https://via.placeholder.com/150' },
    // Add more products as needed
];

// Retrieve cart from localStorage or initialize it as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
        alert(`${product.name} added to cart!`);
        updateCartCount();
    }
}

// Buy Now: Adds the product to the cart and redirects to the address page
function buyNow(productId) {
    addToCart(productId); // Add product to cart
    window.location.href = 'address.html'; // Redirect to address page
}

// Proceed to checkout from cart
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        window.location.href = 'address.html'; // Redirect to address page
    }
}

// Update cart count in the navigation
function updateCartCount() {
    const cartLink = document.querySelector('nav a');
    if (cartLink) {
        cartLink.innerText = `Cart (${cart.length})`;
    }
}

// Display cart items on the cart page
function displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) return;

    // Check if cart is empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p>No items in the cart.</p>`;
        return;
    }

    // Display items in the cart
    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        </div>
    `).join('');

    // Add a button to proceed to checkout
    cartItemsContainer.innerHTML += `<button onclick="proceedToCheckout()">Proceed to Checkout</button>`;
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    displayCartItems(); // Refresh cart display
    updateCartCount();
}

// Load the cart items on the cart page
window.onload = () => {
    updateCartCount();
    displayCartItems();
};
