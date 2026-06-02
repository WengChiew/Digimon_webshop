let shopItems = [];

const url =
  "https://raw.githubusercontent.com/WengChiew/webtechnologie_json/refs/heads/main/items.json";

fetch(url)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.status);
    }
  })
  .then(function (response) {
    shopItems = response;
    loadProductDetails();
  })
  .catch(function (error) {
    console.error("Error with message: " + error);
  });

function loadProductDetails() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const productId = parseInt(params.get("id"), 10);

  const container = document.querySelector(".product_details");
  let html = "";

  const item = shopItems.find((item) => item.id === productId);
  html = "";
  if (item) {
    html += `
        <h1 class="product_title">${item.name}</h1>
        <figure class="product_image">
          <img src=${item.image} alt=${item.name} />
          <figcaption>
            src:
            ${item.image_src}
          </figcaption>
        </figure>
        <div class="product_description">
          <p>
            ${item.description}
          </p>
          <ul class="product_detail_list">
            <li><span>Price:</span> ${item.price}</li>
            <li><span>Colour:</span> ${item.colour}</li>
            <li><span>Origin:</span> ${item.origin}</li>
            <li><span>${item.varia1[0]}:</span> ${item.varia1[1]}</li>
            <li><span>${item.varia2[0]}:</span> ${item.varia2[1]}</li>
            <li><span>${item.varia3[0]}:</span> ${item.varia3[1]}</li>
            <li><span>${item.varia4[0]}:</span> ${item.varia4[1]}</li>
          </ul>
          <div class="product_buttons">
            <button class="button add_to_shop">Add to cart &#128722;</button>
            <button class="button add_to_wishlist">Add to wishlist</button>
          </div>
        </div>
    `;
  }

  container.innerHTML = html;

  const shopButton = container.querySelector(".add_to_shop");

  shopButton.addEventListener("click", () => {
    let winkelmandje =
      JSON.parse(localStorage.getItem("mijnWinkelmandje")) || [];

    const local_item = winkelmandje.find((i) => i.id === item.id);
    if (local_item) {
      local_item.aantal += 1;
    } else {
      winkelmandje.push({
        id: item.id,
        naam: item.name,
        prijs: item.price,
        afbeelding: item.image,
        aantal: 1,
      });
    }
    Toastify({
      text: `${item.name} toegevoegd aan winkelmandje!`,
      duration: 3000,
    }).showToast();
    localStorage.setItem("mijnWinkelmandje", JSON.stringify(winkelmandje));
  });

  const wishButton = container.querySelector(".add_to_wishlist");

  wishButton.addEventListener("click", () => {
    let wishlist = JSON.parse(localStorage.getItem("mijnWishlist")) || [];

    const local_item = wishlist.find((i) => i.id === item.id);
    if (local_item) {
      local_item.aantal += 1;
    } else {
      wishlist.push({
        id: item.id,
        naam: item.name,
        prijs: item.price,
        afbeelding: item.image,
        aantal: 1,
      });
    }
    Toastify({
      text: `${item.name} toegevoegd aan wishlist!`,
      duration: 3000,
    }).showToast();
    localStorage.setItem("mijnWishlist", JSON.stringify(wishlist));
  });
}
