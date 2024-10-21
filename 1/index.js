// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    // Get all the filter buttons
    const filterButtons = document.querySelectorAll(".filter-btn");

    // Get all the grid items
    const gridItems = document.querySelectorAll(".grid-item");

    // Function to filter grid items based on the filter category
    function filterItems(filter) {
        gridItems.forEach(item => {
            const itemCategory = item.getAttribute("data-category");
            // Show or hide items based on the filter
            if (filter === "all" || itemCategory === filter) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    }

    // Get the filter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter') || 'all'; // Default to 'all' if no filter is set

    // Initially filter items based on the URL parameter
    filterItems(filterParam);

    // Add event listeners to each filter button
    filterButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            // The page will redirect naturally, so we do not need to prevent default
            const filter = button.getAttribute("data-filter");
            // Here you could also activate the active class if desired
            // Handle active class for filter buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            if (!button.classList.contains("active")) {
                button.classList.add("active");
            }
        });
    });

    // Modal functionality (remains unchanged)
    const modal = document.getElementById("galleryModal");
    const modalImage = document.getElementById("modalImage");
    const closeModal = document.querySelector(".close");
    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");

    let currentIndex = 0;
    const images = [
        "./assets/1.png",
        "./assets/2.png",
        "./assets/3.png",
        "./assets/4.png",
        "./assets/5.png",
        "./assets/6.png",
        "./assets/7.png",
        "./assets/8.png",
        "./assets/9.png",
        "./assets/10.png",
        "./assets/11.png",
        "./assets/12.png"
    ];

    function openModal(index) {
        modal.style.display = "block";
        currentIndex = index;
        modalImage.src = images[currentIndex];
    }

    function closeModalFunc() {
        modal.style.display = "none";
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        modalImage.src = images[currentIndex];
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImage.src = images[currentIndex];
    }

    gridItems.forEach((item, index) => {
        item.addEventListener("click", () => openModal(index));
    });

    closeModal.addEventListener("click", closeModalFunc);
    next.addEventListener("click", showNext);
    prev.addEventListener("click", showPrev);

    // Close modal when clicking outside of the image
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModalFunc();
        }
    });
});
