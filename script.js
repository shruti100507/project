let cart = [];
let total = 0;

function scrollToBooking() {
  document.getElementById("services").scrollIntoView({ behavior: "smooth" });
}

function addItem(name, price) {
  cart.push({ name, price });
  total += price;
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - ₹${item.price} 
      <button onclick="removeItem(${index})">Remove</button>`;
    cartItems.appendChild(li);
  });

  document.getElementById("total").innerText = total;
}

function removeItem(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
}

// EMAIL JS
(function(){
  emailjs.init("YOUR_PUBLIC_KEY");
})();

function sendEmail() {
  const params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    total: total,
    services: cart.map(i => i.name).join(", ")
  };

  emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",params)
    .then(() => {
      document.getElementById("msg").innerText =
        "Thank you For Booking the Service We will get back to you soon!";
    });
}