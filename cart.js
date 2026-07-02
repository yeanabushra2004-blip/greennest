// ডাইনামিক কার্ট আইটেমের অ্যারে ডাটা
let cartData = [
    {
        id: 101,
        name: "Monstera",
        subtitle: "Voakiny of 200",
        price: 30.00,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=200&auto=format&fit=cover"
    },
    {
        id: 102,
        name: "Snake Plant",
        subtitle: "Snake y of 200",
        price: 15.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=200&auto=format&fit=cover"
    },
    {
        id: 103,
        name: "Pothos",
        subtitle: "Voakir y of 200",
        price: 10.00,
        quantity: 3,
        image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=200&auto=format&fit=cover"
    }
];

const cartItemsBody = document.getElementById('cart-items-body');
const summarySubtotal = document.getElementById('summary-subtotal');
const summaryShipping = document.getElementById('summary-shipping');
const summaryTax = document.getElementById('summary-tax');
const summaryGrandTotal = document.getElementById('summary-grand-total');
const navCartCount = document.getElementById('nav-cart-count');

// ফিক্সড চার্জ 
const shippingCost = 5.00;
const taxCost = 8.40;

// ১. কার্ট আইটেম রেন্ডার এবং ক্যালকুলেশন করার মেইন ফাংশন
function updateCartUI() {
    cartItemsBody.innerHTML = "";
    let calculatedSubtotal = 0;
    let totalItemsCount = 0;

    // কার্ট যদি খালি থাকে তার হ্যান্ডলিং
    if (cartData.length === 0) {
        cartItemsBody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 30px;">Your cart is empty!</td></tr>`;
        summarySubtotal.textContent = "$0.00";
        if (summaryShipping) summaryShipping.textContent = "$0.00";
        if (summaryTax) summaryTax.textContent = "$0.00";
        summaryGrandTotal.textContent = "$0.00";
        navCartCount.textContent = "0";
        return;
    }

    cartData.forEach((item, index) => {
        let itemSubtotal = item.price * item.quantity;
        calculatedSubtotal += itemSubtotal;
        totalItemsCount += item.quantity;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="product-cell">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="prod-details">
                        <h4>${item.name}</h4>
                        <p>${item.subtitle}</p>
                    </div>
                </div>
            </td>
            <td>
                <div class="quantity-control">
                    <button class="qty-btn" onclick="changeQty(${index}, -1)">—</button>
                    <input type="text" class="qty-input" value="${item.quantity}" readonly>
                    <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                </div>
            </td>
            <td><span class="item-price">$${item.price.toFixed(2)}</span></td>
            <td><span class="item-subtotal">$${itemSubtotal.toFixed(2)}</span></td>
        `;
        cartItemsBody.appendChild(row);
    });

    // অর্ডার সামারি এবং হেডার ব্যাজ আপডেট
    summarySubtotal.textContent = `$${calculatedSubtotal.toFixed(2)}`;
    if (summaryShipping) summaryShipping.textContent = `$${shippingCost.toFixed(2)}`;
    if (summaryTax) summaryTax.textContent = `$${taxCost.toFixed(2)}`;
    
    let grandTotal = calculatedSubtotal + shippingCost + taxCost;
    summaryGrandTotal.textContent = `$${grandTotal.toFixed(2)}`;
    navCartCount.textContent = totalItemsCount;
}

// ২. কোয়ান্টিটি প্লাস মাইনাস করার হ্যান্ডলার ফাংশন
window.changeQty = function(index, direction) {
    cartData[index].quantity += direction;

    // যদি কোয়ান্টিটি ১ এর নিচে চলে যায়, আইটেমটি কার্ট থেকে ডিলিট হয়ে যাবে
    if (cartData[index].quantity < 1) {
        cartData.splice(index, 1);
    }

    updateCartUI();
};

// ৩. Proceed to Checkout বাটন অ্যাক্টিভ করার ফাংশন
function setupCheckoutButton() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cartData.length === 0) {
                alert("আপনার কার্টটি খালি! অনুগ্রহ করে চেকআউট করার আগে কিছু গাছ যোগ করুন।");
            } else {
                // এখানে আপনার তৈরি করা চেকআউট পেজের নাম (যেমন: checkout.html) দিন
                window.location.href = "checkout.html";
            }
        });
    }
}

// পেজ লোড হলে কার্ট এবং বাটন চালু করা
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI(); 
    setupCheckoutButton();
});