// Catching buttons for adding the items
const addToCartBtns = document.querySelectorAll(".add-to-cart");

let cart = [];

addToCartBtns.forEach( button => {
    button.addEventListener('click', () => {

        button.classList.add('checked-button');

        button.innerHTML = `<img src="../assets/images/icon-decrement-quantity.svg" alt="" class="decrement"/>
                            <span class="quantity">1</span>
                            <img src="../assets/images/icon-increment-quantity.svg" alt="" class="decrement"/>`;
                            
        const gridItem = button.closest('.grid-item');
        const dessertName = gridItem.querySelector('.dessert-name').textContent;

        // Add the dessert to cart array
        cart.push(dessertName);

        // Update Cart UI
        updateCartUI();
    
        console.log(`Added ${dessertName} to the cart!`);
    });
});


// Function to update look of the Cart

function updateCartUI() {

    // Writing values into the Cart

    let cartItems = document.querySelector('.cart-wrapper');

    cartItems.innerHTML = '';

    cart.forEach(item => {
        let p = document.createElement('p');
        p.textContent = item;
        cartItems.appendChild(p);
    });

}

// Function for decrement

function decrement() {
    let decrease = document.querySelector('.decrement');
    decrease.addEventListener()
}
