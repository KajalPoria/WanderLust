// Handle payment with Razorpay
document.addEventListener('DOMContentLoaded', function() {
    let bookingForm = document.getElementById('bookingForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            let submitBtn = document.getElementById('rzp-button');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';

            try {
                // Collect form data
                let formData = {
                    listingId: document.querySelector('input[name="listingId"]').value,
                    checkIn: document.getElementById('checkIn').value,
                    checkOut: document.getElementById('checkOut').value,
                    guests: document.getElementById('guests').value
                };

                // Validate dates before proceeding
                let checkInDate = new Date(formData.checkIn);
                let checkOutDate = new Date(formData.checkOut);

                if (checkOutDate <= checkInDate) {
                    alert('Check-out date must be after check-in date');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-credit-card"></i> Proceed to Payment';
                    return;
                }

                // Create order from backend
                let response = await fetch('/bookings/create-order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                let data = await response.json();

                if (!data.success) {
                    throw new Error(data.message || 'Failed to create order');
                }

                // Configure Razorpay options
                let options = {
                    key: data.key,
                    amount: data.order.amount,
                    currency: data.order.currency,
                    name: "WanderLust",
                    description: "Property Booking",
                    order_id: data.order.id,
                    handler: async function(response) {
                        // Payment successful - verify on backend
                        try {
                            let verifyResponse = await fetch('/bookings/verify-payment', {
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

                            let verifyData = await verifyResponse.json();

                            if (verifyData.success) {
                                window.location.href = verifyData.redirectUrl;
                            } else {
                                alert('Payment verification failed. Please contact support.');
                                submitBtn.disabled = false;
                                submitBtn.innerHTML = '<i class="fa-solid fa-credit-card"></i> Proceed to Payment';
                            }
                        } catch (error) {
                            console.error('Verification error:', error);
                            alert('Payment verification failed. Please contact support.');
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = '<i class="fa-solid fa-credit-card"></i> Proceed to Payment';
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
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = '<i class="fa-solid fa-credit-card"></i> Proceed to Payment';
                        }
                    }
                };

                let rzp = new Razorpay(options);

                rzp.on('payment.failed', function(response) {
                    alert('Payment failed: ' + response.error.description);
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-credit-card"></i> Proceed to Payment';
                });

                rzp.open();

            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-credit-card"></i> Proceed to Payment';
            }
        });
    }
});
