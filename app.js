
    let cart = {}; // An object to hold item quantities
    let totalItems = 0; // Total count of all items
    let totalAmount = 0; // Total price

    function updateCart(item, price, change) {
        if (!cart[item]) {
            cart[item] = { price: price, quantity: 0 };
        }

        // Adjust the quantity based on change
        cart[item].quantity += change;

        // Ensure quantity does not go below zero
        if (cart[item].quantity < 0) {
            cart[item].quantity = 0;
        }

        // Update total items and total amount
        totalItems += change;
        if (totalItems < 0) {
            totalItems = 0; // Ensure total items do not become negative
        }
        totalAmount += change > 0 ? price : (change < 0 ? -price : 0);

        // Update UI
        document.getElementById(`item-1-quantity`).textContent = cart["Item 1"] ? cart["Item 1"].quantity : 0;
        document.getElementById(`item-2-quantity`).textContent = cart["Item 2"] ? cart["Item 2"].quantity : 0;
        document.getElementById(`item-3-quantity`).textContent = cart["Item 3"] ? cart["Item 3"].quantity : 0;
        document.getElementById(`item-4-quantity`).textContent = cart["Item 4"] ? cart["Item 4"].quantity : 0;

        updateCartDisplay();
    }

    function updateCartDisplay() {
        const cartItemsDiv = document.getElementById('cart-items');
        const totalPriceDiv = document.getElementById('total-price');
        const cartCountDiv = document.getElementById('cart-count');
        const gst = document.getElementById('gst');

        cartItemsDiv.innerHTML = '';
        for (const item in cart) {
            if (cart[item].quantity > 0) {
                cartItemsDiv.innerHTML += `${item} - Rs.${cart[item].price} x ${cart[item].quantity}<br>`;
            }
        }
        gst.textContent = `GST (5%): Rs.${totalAmount * 0.05}`;
        totalPriceDiv.textContent = Math.ceil(totalAmount+totalAmount * 0.05);
        cartCountDiv.textContent = totalItems;
    }

    function toggleCart() {
        const cartPopup = document.getElementById('cart-popup');
        cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
    }

    function buy() {
        const phoneNumber = "919492959290"; // Replace with your phone number
        let message = "Order Details:\n";
        for (const item in cart) {
            if (cart[item].quantity > 0) {
                message += `${item} - ${cart[item].quantity} pcs\n`;
            }
        }
        message += `Total amount: Rs.${Math.ceil(totalAmount+totalAmount * 0.05)}`;

        // Generate valid WhatsApp link for both desktop and web
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Open link in a new tab/window
        window.open(whatsappURL, '_blank');
    }
