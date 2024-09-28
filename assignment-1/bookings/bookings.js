// Booking list sample
const bookings = [
    {
        contact: "Alice Johnson",
        address: "101 Maple St, Springfield",
        phone: "555-1234",
        detail: "Request for residential renovation.",
        state: "pending",
        date: "2024-09-01"
    },
    {
        contact: "Bob Smith",
        address: "202 Oak St, Springfield",
        phone: "555-5678",
        detail: "Commercial building project.",
        state: "accepted",
        date: "2024-09-02"
    },
    {
        contact: "Charlie Brown",
        address: "303 Pine St, Springfield",
        phone: "555-9101",
        detail: "Industrial setup consultation.",
        state: "completed",
        date: "2024-09-03"
    }
];

function searchBookings() {
    const keyword = document.getElementById('keyword').value.toLowerCase();
    const selectedDate = document.getElementById('date').value;
    const state = document.getElementById('state').value;

    const filteredBookings = bookings.filter(booking => {
        const matchesKeyword = !keyword || booking.detail.toLowerCase().includes(keyword);
        const matchesDate = !selectedDate || booking.date === selectedDate;
        const matchesState = state === "Select State" || booking.state === state;
        return matchesKeyword && matchesDate && matchesState;
    });

    const tableBody = document.getElementById('bookings-table-body');
    tableBody.innerHTML = '';

    filteredBookings.forEach(booking => {
        const actionButtons = booking.state === "pending"
            ? `<button class="btn btn-sm btn-success me-2" onclick="acceptBooking('${booking.contact}')">Accept</button>
               <button class="btn btn-sm btn-danger" onclick="declineBooking('${booking.contact}')">Decline</button>`
            : booking.state;

        const row = `<tr>
                        <td>${booking.contact}</td>
                        <td>${booking.address}</td>
                        <td>${booking.phone}</td>
                        <td>${booking.detail}</td>
                        <td>${booking.state.charAt(0).toUpperCase() + booking.state.slice(1)}</td>
                        <td>${actionButtons}</td>
                     </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

function acceptBooking(contact) {
    alert(`Booking accepted for ${contact}.`);
    //TODO
}

function declineBooking(contact) {
    alert(`Booking declined for ${contact}.`);
    //TODO
}

window.onload = function() {
    searchBookings();
};