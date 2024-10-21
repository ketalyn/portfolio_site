// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {

    // Get all the filter buttons
    const filterButtons = document.querySelectorAll(".filter-btn");

    // Get all the grid items
    const gridItems = document.querySelectorAll(".grid-item");

    // Add event listeners to each filter button
    filterButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();

            // Get the filter category from the clicked button
            const filter = button.getAttribute("data-filter");

            // Loop through all grid items
            gridItems.forEach(item => {
                const itemCategory = item.getAttribute("data-category");

                // Show or hide items based on the filter
                if (filter === "all" || itemCategory === filter) {
                    item.classList.remove("hidden");
                } else {
                    item.classList.add("hidden");
                }
            });
        });
    });
});

// clock.js

function updateClock() {
    const now = new Date();
    // Set hour12 to true for 12-hour format with AM/PM
    const options = { hour: '2-digit', minute: '2-digit', hour12: true }; 
    const timeString = now.toLocaleTimeString([], options);
    document.getElementById('clock').textContent = timeString;
}

// Update the clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);

    // Get the current page URL
    const currentPage = window.location.pathname.split('/').pop();

    // Select all links in the right-links section
    const workLink = document.querySelector('.right-links a[data-filter="all"]');

    // Change the active class based on the current page
    if (currentPage === 'index.html' || currentPage === '') {
        workLink.classList.add('active');
    } else {
        workLink.classList.remove('active');
    }

