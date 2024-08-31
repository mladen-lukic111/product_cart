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
         addItem();

         // Increment and decrement item
         let decrementBtn = button.querySelector('.decrement');
         let incrementBtn = button.querySelector('.increment');

         decrementBtn.addEventListener('click', (e)=> {
            e.stopImmediatePropagation();

            let itemIndex = cart.findIndex(item =>item.name === dessertName);
            if(itemIndex !== -1) {
                if(cart[itemIndex].quantity > 1) { cart[itemIndex].quantity--; }
                else {
                    cart.splice(itemIndex, 1);
                    button.classList.remove('checked-button');
                    button.innerHTML = "Add to cart";
                }
                addItem();
                //console.log(cart);
            }
         });

         incrementBtn.addEventListener('click', (e)=> {
            e.stopImmediatePropagation();

            let itemIndex = cart.findIndex(item =>item.name === dessertName);
            if(itemIndex !== -1) {
                cart[itemIndex].quantity++;
                addItem();
                //console.log(cart);
            }
         });

    });

});


function addItem() {
    let cartHolder = document.querySelector('.cart-wrapper');


    cartHolder.innerHTML = `<h2>Your Cart (${cart.length})</h2>
                          <div class="added-items">
                          </div>`;

   let cartAddedItems = cartHolder.querySelector('.added-items');

   let orderSum = 0;

   cart.forEach(item => {
       let div = document.createElement('div');

       div.classList.add('order-item');

       // Parsing item price to number
       nItemPrice = item.price.replace("$", "");
       numberItemPrice = parseFloat(nItemPrice).toFixed(2);

       sum = item.quantity * numberItemPrice;

       orderSum += sum;
    // console.log(orderSum);

       div.innerHTML += `
                           <p>${item.name}</p>
                           <span class="quantity">${item.quantity}x</span> 
                           <span class="item-price">@${item.price}</span>
                           <span class="sum">$${sum}</span>
                           <span class="remove"><img src="./assets/images/icon-remove-item.svg"</span>
                      `;
       cartAddedItems.append(div);

       //Removing item
       removeItem();

   });

   // Total sum
   let totalSum = document.createElement('p');
   totalSum.classList.add('total-sum');
   totalSum.innerHTML += `Order Total: <span>$${orderSum.toFixed(2)}</span>`;

   cartAddedItems.append(totalSum);

   let confirmButton = document.createElement('button');
   confirmButton.classList.add('confirm-btn');
   confirmButton.innerText = "Confirm Order";
   cartAddedItems.append(confirmButton); 

   modalShow();


}

// Function that removes item from the Cart
function removeItem() {
    const xButtons = document.querySelectorAll('.remove');
    xButtons.forEach(xBtn => {
        xBtn.addEventListener("click", (e) => {
            let itemName = e.target.closest('.order-item').querySelector('p').textContent;
            cart = cart.filter(cartItem => cartItem.name !== itemName);
            addItem();
        });
    });
};

function modalShow() {
    let modalBtn = document.querySelector('.confirm-btn');

    let modalWrapper = document.querySelector('.modal-wrapper');

    let modalContent = modalWrapper.querySelector('.modal-content');

    modalBtn.addEventListener('click', () => {

        modalWrapper.style.display = 'block';

        cart.forEach(item => {
            let nItemPrice = item.price.replace("$", "");
            let numberItemPrice = parseFloat(nItemPrice).toFixed(2);
            let sum = item.quantity * numberItemPrice;

            modalContent.innerHTML += `<p class="modal-p">${item.name}</p>
                                        <span class="quantity">${item.quantity}x</span> 
                                        <span class="item-price">@${item.price}</span>
                                        <span class="sum">$${sum.toFixed(2)}</span>`;
        });

        let closeBtn = modalWrapper.querySelector('.close-modal');

        closeBtn.addEventListener("click", () => {
            modalWrapper.style.display = "none";
        });
        
   });
};

