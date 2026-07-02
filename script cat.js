let allProducts = [];

// ১. JSON থেকে ডাটা লোড করার মেইন ফাংশন
async function init() {
    try {
        const response = await fetch('home.json');
        allProducts = await response.json();
        
        // শুরুতে ডিফল্ট হিসেবে 'indoor' ক্যাটাগরি দেখাবে
        filterProducts('indoor'); 
        setupFilterEvents();
    } catch (error) {
        console.error("ডাটা লোড করতে ব্যর্থ:", error);
    }
}

// ২. নির্দিষ্ট ক্যাটাগরি অনুযায়ী প্রোডাক্ট রেন্ডার করার ফাংশন
function filterProducts(category) {
    const gridContainer = document.getElementById('product-grid');
    if (!gridContainer) return;
    
    gridContainer.innerHTML = '';

    // শুধুমাত্র ম্যাচিং ক্যাটাগরির প্রোডাক্টগুলো ফিল্টার করা
    const filtered = allProducts.filter(p => p.category === category);

    filtered.forEach(product => {
        const cardHTML = `
            <div class="product-card">
                <div class="image-container">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="card-info">
                    <h4>${product.name}</h4>
                    <p class="price">Starting at $${product.price}</p>
                    <button class="shop-btn">Shop Now</button>
                </div>
            </div>
        `;
        gridContainer.innerHTML += cardHTML;
    });

    // টেক্সট ডাইনামিক্যালি আপডেট করা
    updateHeadings(category);
}

// ৩. সাইডবার ক্লিকে ইভেন্ট সেটআপ এবং রেডিও আইকন পরিবর্তন
function setupFilterEvents() {
    const filterItems = document.querySelectorAll('.filter-item');

    filterItems.forEach(item => {
        item.addEventListener('click', function() {
            // আগের অ্যাক্টিভ ক্লাস রিমুভ এবং আইকন চেঞ্জ
            filterItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.radio-icon').innerHTML = '<i class="far fa-circle"></i>';
            });

            // বর্তমান ক্লিকে অ্যাক্টিভ ক্লাস এবং চেক আইকন বসানো
            this.classList.add('active');
            this.querySelector('.radio-icon').innerHTML = '<i class="fas fa-check-circle"></i>';

            const selectedCategory = this.getAttribute('data-category');
            filterProducts(selectedCategory);
        });
    });
}

// ৪. ক্যাটাগরি পরিবর্তনের সাথে টাইটেল ও সাবটাইটেল পরিবর্তন
function updateHeadings(category) {
    const heading = document.getElementById('page-heading');
    const crumb = document.getElementById('current-crumb');
    const subtitle = document.getElementById('page-subtitle');

    if (!heading || !crumb || !subtitle) return;

    if(category === 'indoor') {
        heading.innerText = "Indoor Plants";
        crumb.innerText = "Indoor Plants";
        subtitle.innerText = "A variety of indoor plants perfect for adding greenery to your space.";
    } else if(category === 'purifying') {
        heading.innerText = "Air Purifying Plants";
        crumb.innerText = "Air Purifying";
        subtitle.innerText = "Keep your indoor air fresh and clean with these natural air purifiers.";
    } else if(category === 'decorative') {
        heading.innerText = "Decorative Plants";
        crumb.innerText = "Decorative";
        subtitle.innerText = "Beautiful and aesthetic plants to elevate your home interior design.";
    }
}

// পেজ লোড হলে রান করবে
window.addEventListener('DOMContentLoaded', init);