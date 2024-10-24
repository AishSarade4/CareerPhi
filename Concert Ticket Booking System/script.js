document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let concert = document.getElementById('concert').value;
    let ticketType = document.getElementById('ticketType').value;
    let quantity = document.getElementById('quantity').value;

    if (!concert || !ticketType || !quantity) {
        document.getElementById('errorMessage').classList.remove('hidden');
        return;
    }

    let ticketPrice = ticketType === 'General Admission' ? 80 : 150;
    let totalPrice = ticketPrice * quantity;

    document.getElementById('concertDetails').textContent = `Concert: ${concert}`;
    document.getElementById('ticketDetails').textContent = `Ticket Type: ${ticketType} | Quantity: ${quantity}`;
    document.getElementById('totalPrice').textContent = `Total Price: $${totalPrice}`;

    document.getElementById('bookingSummary').classList.remove('hidden');
    document.getElementById('bookingForm').classList.add('hidden');
    document.getElementById('errorMessage').classList.add('hidden');
    document.getElementById('editBooking').classList.remove('hidden');
});

document.getElementById('editBooking').addEventListener('click', function () {
    document.getElementById('bookingForm').classList.remove('hidden');
    document.getElementById('bookingSummary').classList.add('hidden');
    document.getElementById('submitTickets').classList.add('hidden');
    document.getElementById('editBooking').classList.add('hidden');
});

document.getElementById('bookingForm').addEventListener('change', function() {
    document.getElementById('submitTickets').classList.remove('hidden');
});

document.getElementById('submitTickets').addEventListener('click', function () {
    alert('Tickets submitted successfully!');

    // Reset the form and reopen the booking form page after submission
    document.getElementById('bookingForm').reset();
    document.getElementById('bookingForm').classList.remove('hidden');
    document.getElementById('bookingSummary').classList.add('hidden');
    document.getElementById('submitTickets').classList.add('hidden');
    document.getElementById('editBooking').classList.add('hidden');
});
