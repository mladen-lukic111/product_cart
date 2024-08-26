// Catching buttons for adding the items
const addToCartBtns = document.querySelectorAll(".add-to-cart");

let cart = [];

addToCartBtns.forEach( button => {
    button.addEventListener('click', () => {

        button.classList.add('checked-button');

        button.innerHTML = `<img src="../assets/images/icon-decrement-quantity.svg" alt="" class="decrement"/>
                            <span class="quantity">1</span>
                            <img src="../assets/images/icon-increment-quantity.svg" alt="" class="increment"/>`;
                            
        const gridItem = button.closest('.grid-item');
        const dessertName = gridItem.querySelector('.dessert-name').textContent;
        const dessertPrice = gridItem.querySelector('.price').textContent;

        // Checking if item exist in the cart
        const checkItem = cart.findIndex(item => item.name === dessertName);

        if(checkItem !== -1) {
            cart[checkItem].quantity++;
        } else {
            cart.push({
                name: dessertName,
                price: dessertPrice,
                quantity: 1
            });
        }

         // Writing values into the Cart

         let cartHolder = document.querySelector('.cart-wrapper');


         cartHolder.innerHTML = `<h2>Your Cart (${cart.length})</h2>
                               <div class="added-items">
                               </div>`;

        let cartAddedItems = cartHolder.querySelector('.added-items');

        cart.forEach(item => {
            let div = document.createElement('div');

            div.classList.add('order-item');

            div.innerHTML += `
                                <p>${item.name}</p>
                                <span class="quantity">${item.quantity}x</span> 
                                <span class="item-price">@${item.price}</span>
                                 <span class="sum">${'$?'} </span>
                           `;
            cartAddedItems.append(div);

            console.log(`Added ${item.name} to the cart!`);
        });

    });
});



