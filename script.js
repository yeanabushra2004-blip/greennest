document.addEventListener("DOMContentLoaded", () => {

  fetch("home.json")
    .then(response => response.json())
    .then(data => {

      const plantGrid = document.getElementById("plantGrid");

      data.plants.forEach(plant => {

        plantGrid.innerHTML += `
          <div class="plant-item">
            <img src="${plant.image}" alt="${plant.name}">

            <div class="plant-meta-info">
              <h3>${plant.name}</h3>

              <div class="price-row">
                <span class="plant-code">${plant.code}</span>
                <span class="plant-price">${plant.price}</span>
              </div>

              <button class="btn-add-cart">
                Add to Cart
              </button>
            </div>
          </div>
        `;
      });

    });

});document.addEventListener("DOMContentLoaded", () => {

  fetch("plants.json")
    .then(response => response.json())
    .then(data => {

      const plantGrid = document.getElementById("plantGrid");

      data.plants.forEach(plant => {

        plantGrid.innerHTML += `
          <div class="plant-item">
            <img src="${plant.image}" alt="${plant.name}">

            <div class="plant-meta-info">
              <h3>${plant.name}</h3>

              <div class="price-row">
                <span class="plant-code">${plant.code}</span>
                <span class="plant-price">${plant.price}</span>
              </div>

              <button class="btn-add-cart">
                Add to Cart
              </button>
            </div>
          </div>
        `;
      });

    });

});