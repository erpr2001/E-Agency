// Agency list sample
const agencies = [
    {
        name: "Alpha",
        contact: "John Smith",
        address: "123 Main St, Cityville",
        phone: "555-1234",
        type: "barn-house",
        postalCode: "12345",
    },
    {
        name: "Beta",
        contact: "Jane Doe",
        address: "456 Market Ave, Townsville",
        phone: "555-5678",
        type: "renovated",
        postalCode: "67890",
    },
    {
        name: "Gamma",
        contact: "Mike Johnson",
        address: "789 Industrial Rd, Factorytown",
        phone: "555-9101",
        type: "summer-house",
        postalCode: "11223",
    },
];

function searchAgencies() {
    const postalCode = document.getElementById("postalCode").value.toLowerCase();
    const agencyType = document.getElementById("agencyType").value;

    const filteredAgencies = agencies.filter((agency) => {
        const matchesPostal = !postalCode || agency.postalCode.includes(postalCode);
        const matchesType =
            agencyType === "Select Agency Type" || agency.type === agencyType;
        return matchesPostal && matchesType;
    });

    const tableBody = document.getElementById("agency-table-body");
    const emptyMessage = document.getElementById("empty-message");

    tableBody.innerHTML = "";

    if (filteredAgencies.length === 0) {
        emptyMessage.style.display = "";
    } else {
        emptyMessage.style.display = "none";
        filteredAgencies.forEach((agency) => {
            const row = `<tr>
                            <td>${agency.name}</td>
                            <td>${agency.contact}</td>
                            <td>${agency.address}</td>
                            <td>${agency.phone}</td>
                            <td><button class="btn btn-sm btn-outline-dark" onclick="bookAgency('${agency.name}')">Book Now</button></td>
                        </tr>`;
            tableBody.insertAdjacentHTML("beforeend", row);
        });
    }
}

function bookAgency(agencyName) {
    alert(`Booking initiated for ${agencyName}.`);
}
