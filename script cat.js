// ১. গ্লোবাল ভ্যারিয়েবল
let products = [];
let currentCategory = "indoor"; 
let currentSort = "default";

const productGrid = document.getElementById("product-grid");
const filterItems = document.querySelectorAll(".filter-item");

// ২. ডাটাবেজ থেকে ডাটা ফেচ করা
async function loadProductsData() {
    try {
        const response = await fetch('home.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        products = await response.json();
        renderProducts();
    } catch (error) {
        console.error("ডাটা লোড করতে সমস্যা:", error);
    }
}

// ৩. প্রোডাক্ট রেন্ডারিং এবং ফিল্টারিং লজিক
function renderProducts() {
    if (!productGrid) return;
    productGrid.innerHTML = "";

    // ফিল্টারিং: ছোট হাতের অক্ষরে রূপান্তর করে তুলনা
    let filtered = products.filter(p => {
        const cat = (p.category || "").toLowerCase().trim();
        const sub = (p.subCategory || "").toLowerCase().trim();
        const target = currentCategory.toLowerCase().trim();
        return cat === target || sub === target;
    });

    // সর্টিং লজিক
    if (currentSort === "low-high") filtered.sort((a, b) => a.price - b.price);
    else if (currentSort === "high-low") filtered.sort((a, b) => b.price - a.price);
    else if (currentSort === "most-reviewed") filtered.sort((a, b) => (b.reviews || []).length - (a.reviews || []).length);

    if (filtered.length === 0) {
        productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">কোনো প্রোডাক্ট পাওয়া যায়নি।</p>`;
        return;
    }

    filtered.forEach(product => {
        const totalReviews = (product.reviews || []).length;
        const avgRating = totalReviews > 0 ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1) : "0.0";

        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <div class="image-container" onclick="openProductDetails(${product.id})">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="card-info">
                <h4 onclick="openProductDetails(${product.id})" style="cursor:pointer;">${product.name}</h4>
                <div style="margin: 5px 0; font-size: 14px; color: #555;">
                    <i class="fas fa-star" style="color: #f39c12;"></i> ${avgRating} (${totalReviews})
                </div>
                <span class="price" style="font-weight:bold; font-size: 16px;">$${product.price.toFixed(2)}</span>
                <button class="shop-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// ৪. সর্ট ড্রপডাউন তৈরি
function initSortDropdown() {
    const titleContainer = document.getElementById("title-container");
    if (!titleContainer) return;
    
    // ইতিমধ্যে তৈরি থাকলে যেন ডাবল না হয়
    if(document.getElementById("price-sort")) return;

    const sortWrapper = document.createElement("div");
    sortWrapper.className = "sort-container";
    sortWrapper.innerHTML = `
        <label>Sort by: </label>
        <select id="price-sort" class="sort-select">
            <option value="default">Default</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="most-reviewed">Top Rated</option>
        </select>
    `;
    titleContainer.appendChild(sortWrapper);

    document.getElementById("price-sort").addEventListener("change", function() {
        currentSort = this.value;
        renderProducts();
    });
}

// ৫. সাইডবার ফিল্টার ইভেন্ট
filterItems.forEach(item => {
    item.addEventListener("click", function() {
        filterItems.forEach(i => i.classList.remove("active"));
        this.classList.add("active");
        currentCategory = this.getAttribute("data-category");
        renderProducts();
    });
});

// ৬. মোডাল পপআপ
window.openProductDetails = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const reviewsHTML = (product.reviews || []).map(r => `
        <div style="background:#f9f9f9; padding:10px; margin-bottom:8px; border-radius:6px; border-left:4px solid #2e7d32;">
            <strong>${r.user}</strong> <span style="float:right;">${r.rating}/5</span>
            <p>${r.comment}</p>
        </div>`).join("");

    const modal = document.createElement("div");
    modal.id = "product-modal";
    modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; justify-content:center; align-items:center; z-index:1000;";
    modal.innerHTML = `
        <div style="background:#fff; padding:40px; border-radius:15px; width:90%; max-width:900px; position:relative;">
            <span onclick="closeModal()" style="position:absolute; top:15px; right:20px; font-size:30px; cursor:pointer;">&times;</span>
            <div style="display:flex; gap:30px; flex-wrap:wrap;">
                <img src="${product.image}" style="width:300px; height:300px; object-fit:cover; border-radius:8px;">
                <div style="flex:1;">
                    <h2>${product.name}</h2>
                    <p style="font-size:24px; color:#2e7d32; font-weight:bold;">$${product.price.toFixed(2)}</p>
                    <p>${product.description}</p>
                    <div style="max-height:200px; overflow-y:auto; margin-top:15px;">${reviewsHTML || "No reviews."}</div>
                    <button class="shop-btn" style="margin-top:20px; width:100%;" onclick="addToCart(${product.id}); closeModal();">Add To Cart</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

window.closeModal = () => document.getElementById("product-modal")?.remove();

window.addToCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(i => i.id === productId);
    item ? item.quantity += 1 : cart.push({...products.find(p => p.id === productId), quantity: 1});
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

window.addEventListener("DOMContentLoaded", () => {
    initSortDropdown();
    loadProductsData();
});