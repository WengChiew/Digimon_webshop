let winkelmandje = JSON.parse(localStorage.getItem("mijnWinkelmandje")) || [];
let wishlist = JSON.parse(localStorage.getItem("mijnWishlist")) || [];
let totaal = 0;
let shopItems = [];

fetch(
  "https://raw.githubusercontent.com/WengChiew/webtechnologie_json/refs/heads/main/items.json",
)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.status);
    }
  })
  .then(function (response) {
    shopItems = response;
    showShopItems();
  })
  .catch(function (error) {
    console.error("Error with message: " + error);
  });

function showShopItems() {
  const container = document.querySelector(".best_items");
  let html = "";

  for (let i = 0; i < shopItems.length; i++) {
    const item = shopItems[i];

    html += `
      <article class="product" style="background-image: url('${item.image}');">
        <aside class="add_buttons">
          <button class="button add_to_wishlist" data-id="${item.id}">&#129655;</button>
          <button class="button add_to_shop" data-id="${item.id}">Add to cart &#128722;</button>
        </aside>
        <div class="product_card">
          <div class="titel_card">
            <h3><a href="../itemPage.html?id=${item.id}">${item.name}</a></h3>
            <h3>${item.price} eur</h3>
          </div>
          <h3 class="subtitel_card">${item.category}</h3>
        </div>
      </article>
    `;
  }

  container.innerHTML = html;

  fetchButtons(container);
}

function fetchButtons(container) {
  const shopButtons = container.querySelectorAll(".add_to_shop");
  const wishButtons = container.querySelectorAll(".add_to_wishlist");

  for (let i = 0; i < shopButtons.length; i++) {
    const button = shopButtons[i];

    button.addEventListener("click", () => {
      const id = parseInt(button.getAttribute("data-id"));

      const item = shopItems.find((p) => p.id === id);

      if (item) {
        const isInCart = winkelmandje.find(
          (cartItem) => cartItem.naam === item.name,
        );

        if (isInCart) {
          isInCart.aantal += 1;
        } else {
          winkelmandje.push({
            naam: item.name,
            prijs: item.price,
            aantal: 1,
            afbeelding: item.image,
          });
        }

        Toastify({
          text: `${item.name} toegevoegd aan winkelmandje!`,
          duration: 3000,
        }).showToast();
        showShoppingCart();
      }
    });
  }

  for (let i = 0; i < wishButtons.length; i++) {
    const button = wishButtons[i];

    button.addEventListener("click", () => {
      const id = parseInt(button.getAttribute("data-id"));
      const item = shopItems.find((p) => p.id === id);

      if (item) {
        const isInWish = wishlist.find(
          (wishItem) => wishItem.naam === item.name,
        );

        if (isInWish) {
          isInWish.aantal += 1;
        } else {
          wishlist.push({
            naam: item.name,
            prijs: item.price,
            aantal: 1,
            afbeelding: item.image,
          });
        }
        Toastify({
          text: `${item.name} toegevoegd aan wishlist!`,
          duration: 3000,
        }).showToast();
        showWishlist();
      }
    });
  }
}
showShopItems();
showShoppingCart();
showWishlist();

function showShoppingCart() {
  localStorage.setItem("mijnWinkelmandje", JSON.stringify(winkelmandje));
  const item_container = document.querySelector(".shoppingcart_items");

  let total = 0;
  let btw = 0;
  let totalExclBtw = 0;
  let html = "";

  for (let i = 0; i < winkelmandje.length; i++) {
    const item = winkelmandje[i];
    total += item.prijs * item.aantal;

    html += `
      <div class="shopping_cart_item">
        <div class="itemList_image">
          <img src="${item.afbeelding}" alt="${item.naam}"/>
        </div>
        <div>${item.naam} (${item.aantal})</div>
        <div>${item.prijs * item.aantal} EUR</div>
        <div><button class="delete-shop" data-product="${item.naam}">❌</button></div>
      </div>
    `;
  }

  btw = ((total / 100) * 21).toFixed(2);
  totalExclBtw = total - btw;

  html += `<div class="totals"><p><span class="total_bold">Totaal excl btw</span>: ${totalExclBtw} EUR</p> <p><span class="total_bold">btw</span>: ${btw} EUR</p> <p><span class="total_bold">Totaal:</span> ${total} EUR</p></div>`;

  item_container.innerHTML = html;

  const deleteShopButtons = item_container.querySelectorAll(".delete-shop");

  for (let i = 0; i < deleteShopButtons.length; i++) {
    const button = deleteShopButtons[i];
    button.addEventListener("click", () => {
      const productNaam = button.getAttribute("data-product");

      winkelmandje = winkelmandje.filter((item) => item.naam !== productNaam);

      showShoppingCart();
    });
  }
}

const clearShoppingCartButton = document.querySelector(".clear_shoppingcart");

clearShoppingCartButton.addEventListener("click", () => {
  winkelmandje = [];
  showShoppingCart();
});

const checkoutButton = document.querySelector(".checkout_button");
checkoutButton.addEventListener("click", () => {
  let totaalKassa = 0;
  for (let i = 0; i < winkelmandje.length; i++) {
    totaalKassa += winkelmandje[i].prijs * winkelmandje[i].aantal;
  }

  let btwKassa = ((totaalKassa / 100) * 21).toFixed(2);
  let totaalExclKassa = (totaalKassa - btwKassa).toFixed(2);

  let productenHtmlKassa = "";
  for (let i = 0; i < winkelmandje.length; i++) {
    const item = winkelmandje[i];

    productenHtmlKassa += `
      <div class="popup_product_item">
        <span>${item.naam} (x${item.aantal})</span>
        <span>${item.prijs * item.aantal} eur</span>
      </div>
    `;
  }

  const paymentPopup = new Popup({
    id: "payment-" + Date.now(),
    title: "<h1>Check out</h1>",
    content: `
        <div class="checkout_popup_content">
          <h3>Jouw bestelling:</h3>
          
          <div class="popup_products">
            ${productenHtmlKassa || "<p>Je winkelmandje is leeg.</p>"}
          </div>
          
          <div class="popup_totals">
            <p class="popup_total_row">
              <span>Totaal excl. BTW: </span>${totaalExclKassa} eur
            </p>
            <p class="popup_total_row btw_row">
              <span>BTW (21%):</span> <span>${btwKassa} eur</span>
            </p>
            <hr>
            <p class="popup_total_row grand_total">
              <span>Totaal incl. BTW:</span> ${totaalKassa} eur
            </p>
          </div>
          
          <button class="pay_button">
            Nu Betalen
          </button>
        </div>
      `,
  });

  paymentPopup.show();
});

function showWishlist() {
  localStorage.setItem("mijnWishlist", JSON.stringify(wishlist));
  const container = document.querySelector(".wishlist_items");

  let html = "";

  for (let i = 0; i < wishlist.length; i++) {
    const item = wishlist[i];
    html += `
      <div class="wishlist_item">
        <div class="itemList_image">
          <img src="${item.afbeelding}" alt="${item.naam}"/>
        </div>
        <div>${item.naam} (${item.aantal})</div>
        <div>${item.prijs * item.aantal} EUR</div>
        <div><button class="delete-wish" data-product="${item.naam}">❌</button></div>
      </div>
    `;
  }
  container.innerHTML = html;

  const deleteWishButtons = container.querySelectorAll(".delete-wish");

  for (let i = 0; i < deleteWishButtons.length; i++) {
    const button = deleteWishButtons[i];
    button.addEventListener("click", () => {
      const productNaam = button.getAttribute("data-product");

      wishlist = wishlist.filter((item) => item.naam !== productNaam);

      showWishlist();
    });
  }
}

const clearWishlistButton = document.querySelector(".clear_wishlist");

clearWishlistButton.addEventListener("click", () => {
  wishlist = [];
  showWishlist();
});

const moveButton = document.querySelector(".move_to_shoppingcart");

moveButton.addEventListener("click", () => {
  for (let i = 0; i < wishlist.length; i++) {
    const item = wishlist[i];
    const isInCart = winkelmandje.find(
      (itemShop) => itemShop.naam === item.naam,
    );

    if (isInCart) {
      isInCart.aantal += item.aantal;
    } else {
      winkelmandje.push({
        naam: item.naam,
        prijs: item.prijs,
        aantal: item.aantal,
        afbeelding: item.afbeelding,
      });
    }
  }
  wishlist = [];
  showShoppingCart();
  showWishlist();
});
