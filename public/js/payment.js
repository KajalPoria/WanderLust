// Payment handling with Razorpay
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = document.getElementById('rzp-button');
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
            
            try {
                // Get form data
                const formData = {
                    listingId: document.querySelector('input[name="listingId"]').value,
                    checkIn: document.getElementById('checkIn').value,
                    checkOut: document.getElementById('checkOut').value,
                    guests: document.getElementById('guests').value
                };
                
                // Validate dates
                const checkInDate = new Date(formData.checkIn);
                const checkOutDate = new Date(formData.checkOut);
                
                if (checkOutDate <= checkInDate) {
                    alert('Check-out date must be after check-in date');
                    submitButton.disabled = false;
                    submitButton.innerHTML = '<i class="bi bi-credit-card"></i> Proceed to Payment';
                    return;
                }
                
                // Create order on backend
                const response = await fetch('/bookings/create-order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                if (!data.success) {
                    throw new Error(data.message || 'Failed to create order');
                }
                
                // Initialize Razorpay payment
                const options = {
                    key: data.key,
                    amount: data.order.amount,
                    currency: data.order.currency,
                    name: "WanderLust",
                    description: "Booking Payment",
                    order_id: data.order.id,
                    handler: async function(response) {
                        // Payment successful - verify on backend
                        try {
                            const verifyResponse = await fetch('/bookings/verify-payment', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature,
                                    bookingId: data.bookingId
                                })
                            });
                            
                            const verifyData = await verifyResponse.json();
                            
                            if (verifyData.success) {
                                window.location.href = verifyData.redirectUrl;
                            } else {
                                alert('Payment verification failed. Please contact support.');
                                submitButton.disabled = false;
                                submitButton.innerHTML = '<i class="bi bi-credit-card"></i> Proceed to Payment';
                            }
                        } catch (error) {
                            console.error('Verification error:', error);
                            alert('Payment verification failed. Please contact support.');
                            submitButton.disabled = false;
                            submitButton.innerHTML = '<i class="bi bi-credit-card"></i> Proceed to Payment';
                        }
                    },
                    prefill: {
                        name: "",
                        email: "",
                        contact: ""
                    },
                    theme: {
                        color: "#fe424d"
                    },
                    modal: {
                        ondismiss: function() {
                            submitButton.disabled = false;
                            submitButton.innerHTML = '<i class="bi bi-credit-card"></i> Proceed to Payment';
                        }
                    }
                };
                
                const rzp = new Razorpay(options);
                
                rzp.on('payment.failed', function(response) {
                    alert('Payment failed: ' + response.error.description);
                    submitButton.disabled = false;
                    submitButton.innerHTML = '<i class="bi bi-credit-card"></i> Proceed to Payment';
                });
                
                rzp.open();
                
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="bi bi-credit-card"></i> Proceed to Payment';
            }
        });
    }
});
