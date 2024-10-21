document.addEventListener("DOMContentLoaded", function () {
    // Get all the filter buttons
    const filterButtons = document.querySelectorAll(".filter-btn");
    const gridItems = document.querySelectorAll(".grid-item");
    const defaultActiveFilter = "all"; // Default active filter
    const selectedFilter = document.querySelector(".filter-btn[data-filter='all']"); // "selected" filter link

    // Function to filter grid items based on selected category
    function filterItems(filter) {
        gridItems.forEach(item => {
            const itemCategories = item.getAttribute("data-category").split(" "); // Split the categories by space
            if (filter === defaultActiveFilter || itemCategories.includes(filter)) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    }

    // Add event listeners to each filter button
    filterButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            // Get the filter category from the clicked button
            const filter = button.getAttribute("data-filter");

            // If the clicked button is already active (except for the selected filter)
            if (button.classList.contains("active") && filter !== defaultActiveFilter) {
                // Remove the active class
                button.classList.remove("active");
                selectedFilter.classList.add("active"); // Restore active state to "selected"
                
                // Show all grid items
                filterItems(defaultActiveFilter);
            } else {
                // Remove active class from all filter buttons
                filterButtons.forEach(btn => btn.classList.remove("active"));
                
                // Add active class to the clicked button
                button.classList.add("active");

                // Filter grid items based on the selected filter
                filterItems(filter);
            }
        });
    });

    // Clock update functionality
    function updateClock() {
        const now = new Date();
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        document.getElementById('clock').textContent = now.toLocaleTimeString([], options);
    }

    // Update the clock immediately and then every second
    updateClock();
    setInterval(updateClock, 1000);

    // Select the toggle button and filter links
    const toggleButton = document.querySelector(".toggle-filter-btn");
    const filterLinks = document.querySelector(".filter-links");

    // Function to check screen size and adjust filter links display
    function checkScreenSize() {
        if (window.innerWidth <= 480) {
            // Small screens (max-width: 480px)
            filterLinks.style.display = "none"; // Hide links for small screens
        } else if (window.innerWidth >= 481 && window.innerWidth <= 768) {
            // Medium screens (min-width: 481px and max-width: 768px)
            filterLinks.style.display = "none"; // Show links for medium screens
        } else {
            // Large screens (width > 768px)
            filterLinks.style.display = "flex"; // Ensure links are visible on large screens
        }
    }

    // Initial screen size check
    checkScreenSize();

    // Add event listener to toggle button
    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            filterLinks.style.display = filterLinks.style.display === "flex" ? "none" : "flex";
            toggleButton.classList.toggle("active"); // Rotate the button on toggle
        });
    } else {
        console.error("Toggle button not found");
    }

    // Add a resize event listener to check screen size on resize
    window.addEventListener("resize", checkScreenSize);
});
