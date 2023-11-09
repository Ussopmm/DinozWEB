$(document).ready(function(){
    $(window).scroll(function(){
        if($(this).scrollTop() > 100){
            $(".header").addClass("fixed");
        }
        else {
            $(".header").removeClass("fixed");
        }
    })
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
  
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
  
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  });
  $(document).ready(function(){
    $(".filter-item").click(function(){
      const value = $(this).attr("data-filter")
      if (value == "carnivores") {
        $(".post-box").show("1000")
        $(".poster")
        // .not("." + value)
        .hide("1000");
      }
      else{
        $(".post-box")
        .not("." + value)
        .hide("1000");
        $(".poster")
        // .filter("." + value)
        .show("1000");
      }
    });
    // ADD ACTIVE TO BTN
    $(".filter-item").click(function () {
      $(this).addClass("active-filter").siblings().removeClass("active-filter");
    });
  });


  const cartItemsElement = document.getElementById('cartItems');
  const addtoCartButtons = document.querySelectorAll('.addtoCart');

  // Cart data structure
  const cart = {};

  // Add to cart
  addtoCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-product-id');
      const postBox = button.closest('.post-box');
      const productTitle = postBox.querySelector('.post-title').innerText;
      const productPrice = postBox.querySelector('.priceValue').innerText;
      const productLink = postBox.querySelector('.post-title').getAttribute('href');

      if (cart[productId]) {
        // Product already exists in the cart, increase the quantity
        cart[productId].quantity++;
      } else {
        // Add the product to the cart
        cart[productId] = {
          title: productTitle,
          price: productPrice,
          link: productLink,
          quantity: 1
        };
      }

      updateCart();
    });
  });

  // Update cart UI
  function updateCart() {
    // Clear previous cart items
    cartItemsElement.innerHTML = '';

    // Add updated cart items
    const purchasedDinosaurs = [];
    for (const productId in cart) {
      const product = cart[productId];
      const cartItem = document.createElement('li');
      cartItem.innerHTML = `
        <span class="cart-item">${product.title} - ${product.price} x ${product.quantity}</span>
        <a href="${product.link}" target="_blank">View Details</a>
        <button class="remove-btn" onclick="removeFromCart('${productId}')">Remove</button>
      `;
      cartItemsElement.appendChild(cartItem);

      if (!purchasedDinosaurs.includes(product.title)) {
        purchasedDinosaurs.push(product.title);
      }
    }

    // Check if cart is empty
    if (Object.keys(cart).length === 0) {
      const emptyCartItem = document.createElement('li');
      emptyCartItem.innerText = 'Your cart is empty';
      cartItemsElement.appendChild(emptyCartItem);
    }

    if (purchasedDinosaurs.length > 0) {
      const messageElement = document.createElement('p');
      messageElement.innerText = `You may be interested in these dinosaurs:\n${purchasedDinosaurs.join('\n')}`;
      cartItemsElement.appendChild(messageElement);
    }
  }

  // Remove from cart
  function removeFromCart(productId) {
    delete cart[productId];
    updateCart();
  }

  // Process payment
  function processPayment() {
    const totalAmount = calculateTotalAmount();
  
    // Simulate payment processing
    setTimeout(() => {
      let message = `Payment processed successfully! Total amount: $${totalAmount}`;
  
      if (Object.keys(cart).length === 0) {
        message = 'Your cart is empty';
      } else {
        const purchasedDinosaurs = Object.values(cart);
        const linkList = document.createElement('ul'); // Создаем элемент списка
  
        purchasedDinosaurs.forEach(dinosaur => {
          const listItem = document.createElement('li'); // Создаем элемент списка
          const link = document.createElement('a'); // Создаем ссылку
          link.href = dinosaur.link; // Устанавливаем атрибут href для ссылки
          link.target = '_blank'; // Открываем ссылку в новой вкладке
          link.innerText = dinosaur.title; // Устанавливаем текст ссылки
          listItem.appendChild(link); // Добавляем ссылку в элемент списка
          linkList.appendChild(listItem); // Добавляем элемент списка в список
        });
  
        const messageElement = document.createElement('p');
        messageElement.innerText = 'Your purchases:';
        messageElement.appendChild(linkList); // Добавляем список ссылок в сообщение
  
        const messageContainer = document.getElementById('messageContainer');
        messageContainer.innerHTML = ''; // Очищаем предыдущее сообщение
        messageContainer.appendChild(messageElement); // Добавляем новое сообщение в контейнер
      }
      alert(message);
      clearCart();
  
      // Hide the cart overlay
      const cartOverlay = document.getElementById('cartOverlay');
      cartOverlay.style.display = 'none';
    }, 1000);
  }

  // Calculate total amount
  function calculateTotalAmount() {
    let total = 0;
    for (const productId in cart) {
      const product = cart[productId];
      const price = parseFloat(product.price.replace('$', ''));
      const quantity = product.quantity;
      total += price * quantity;
    }
    return total.toFixed(2);
  }

  // Clear cart
  function clearCart() {
    cartItemsElement.innerHTML = '';
    cart = {};
  }

  // Show cart
  function showCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    cartOverlay.style.display = 'block';
  }
  function hideCartOverlay() {
    const cartOverlay = document.getElementById('cartOverlay');
    cartOverlay.style.display = 'none';
  }
  function processCheckout(event) {
    event.preventDefault();
  
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.innerHTML = '';
  
    for (const productId in cart) {
      const product = cart[productId];
      const productLink = product.link;
  
      const linkElement = document.createElement('a');
      linkElement.href = productLink;
      linkElement.textContent = product.title;
  
      const viewDetailsLink = document.createElement('a');
      viewDetailsLink.href = productLink;
      viewDetailsLink.textContent = 'View Details';
  
      messageContainer.appendChild(linkElement);
      messageContainer.appendChild(document.createTextNode(' - '));
      messageContainer.appendChild(viewDetailsLink);
      messageContainer.appendChild(document.createElement('br'));
    }
  }
  
  // Bind Checkout button to processCheckout function
  const checkoutButton = document.getElementById('checkoutButton');
  checkoutButton.addEventListener('click', processCheckout);






  