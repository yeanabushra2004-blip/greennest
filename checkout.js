function placeOrder(event) {
    event.preventDefault(); // Prevent form submission to avoid page reload

    const name = document.getElementById('fname').value;
    const phone = document.getElementById('phone').value;
    
    
    alert(`🎉 Thank you, ${name}!\nYour order has been placed successfully.\nWe will call you soon at ${phone}.`);
    
    // directing to home page after order placement
    window.location.href = "home.html";
}