async function loadFeaturedSection() {
    try {
        const response = await fetch("home.json");

        if (!response.ok) {
            throw new Error("JSON file load failed!");
        }

        const allProducts = await response.json();

        // Review অনুযায়ী বেশি থেকে কম সাজানো
        const featuredProducts = allProducts
            .sort((a, b) => b.review - a.review)
            .slice(0, 3);

        const container = document.getElementById("plantGrid");
        container.innerHTML = "";

        featuredProducts.forEach(product => {

            const card = document.createElement("div");
            card.className = "product-card";

            card.innerHTML = `
    <div class="image-container">
        <img src="${product.image}" alt="${product.name}">
    </div>

    <div class="card-info">
        <h4>${product.name}</h4>
        <p>$${product.price.toFixed(2)}</p>

        <a href="categories.html" class="btn-action-view">
            View Plants
        </a>
    </div>
`;

            container.appendChild(card);
        });

    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", loadFeaturedSection);