// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    // Filtering functionality
    const filterButtons = document.querySelectorAll(".filter-btn");
    const gridItems = document.querySelectorAll(".grid-item");
    const newGridItems = document.querySelectorAll(".new-spreads-grid .grid-item"); // Select new grid items

    function filterItems(filter) {
        gridItems.forEach(item => {
            const itemCategory = item.getAttribute("data-category");
            if (filter === "all" || itemCategory === filter) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter') || 'all';
    filterItems(filterParam);

    filterButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            const filter = button.getAttribute("data-filter");
            filterButtons.forEach(btn => btn.classList.remove("active"));
            if (!button.classList.contains("active")) {
                button.classList.add("active");
            }
            filterItems(filter); // Filter items based on the selected filter
        });
    });

    // Modal functionality (remains unchanged)
    const modal = document.getElementById("galleryModal");
    const modalImage = document.getElementById("modalImage");
    const closeModal = document.querySelector(".close");
    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");


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

    // Event listeners for existing grid items
    gridItems.forEach((item, index) => {
        item.addEventListener("click", () => openModal(index));
    });

    // Event listeners for new grid items
    newGridItems.forEach((item, index) => {
        item.addEventListener("click", () => openModal(index)); // Open modal for new grid items
    });

    closeModal.addEventListener("click", closeModalFunc);
    next.addEventListener("click", showNext);
    prev.addEventListener("click", showPrev);

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModalFunc();
        }
    });

    // Static gallery functionality
    const staticGalleryImages = document.querySelectorAll(".static-gallery .gallery-img");
    const staticGalleryPrev = document.querySelector(".static-gallery .prev");
    const staticGalleryNext = document.querySelector(".static-gallery .next");

    let staticCurrentImageIndex = 0;

    // Function to show only one image at a time in the static gallery
    function showStaticImage(index) {
        staticGalleryImages.forEach((img, i) => {
            img.classList.remove('active'); // Hide all images
            if (i === index) {
                img.classList.add('active'); // Show only the active image
            }
        });
    }

    // Initial display of the first image
    showStaticImage(staticCurrentImageIndex);

    // Function to handle next/prev buttons for static gallery
    function changeStaticImage(direction) {
        staticCurrentImageIndex = (staticCurrentImageIndex + direction + staticGalleryImages.length) % staticGalleryImages.length;
        showStaticImage(staticCurrentImageIndex);
    }

    // Add event listeners to controls for static gallery
    staticGalleryPrev.addEventListener("click", function () {
        changeStaticImage(-1);
    });

    staticGalleryNext.addEventListener("click", function () {
        changeStaticImage(1);
    });

    // Play videos on hover functionality
    const phoneContainers = document.querySelectorAll('.phone-container');

    phoneContainers.forEach(container => {
        const video = container.querySelector('.video');

        // Play the video on mouse enter
        container.addEventListener('mouseenter', () => {
            video.play();
        });

        // Pause the video on mouse leave
        container.addEventListener('mouseleave', () => {
            video.pause();
        });
    });
});
