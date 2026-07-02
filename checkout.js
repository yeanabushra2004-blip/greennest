function placeOrder(event) {
    event.preventDefault(); // ফর্ম রিলোড হওয়া বন্ধ করবে

    const name = document.getElementById('fname').value;
    const phone = document.getElementById('phone').value;
    
    // একটি সুন্দর সাকসেস অ্যালার্ট দেখানো
    alert(`🎉 Thank you, ${name}!\nYour order has been placed successfully.\nWe will call you soon at ${phone}.`);
    
    // অর্ডার শেষে হোম পেজে রিডাইরেক্ট করা
    window.location.href = "home.html";
}