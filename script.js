

document.documentElement.classList.add("js-enabled");

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    const navigationItems = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    const revealItems = document.querySelectorAll(".reveal");
    const yearElement = document.getElementById("year");

    // Automatically update the copyright year.
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // MOBILE NAVIGATION

    function closeMenu() {
        if (!menuToggle || !navLinks) return;

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");

        navLinks.classList.remove("open");
        document.body.classList.remove("menu-open");
    }

    function toggleMenu() {
        if (!menuToggle || !navLinks) return;

        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        const shouldOpen = !isOpen;

        menuToggle.setAttribute(
            "aria-expanded",
            String(shouldOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            shouldOpen ? "Close navigation" : "Open navigation"
        );

        navLinks.classList.toggle("open", shouldOpen);

        document.body.classList.toggle(
            "menu-open",
            shouldOpen
        );
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", toggleMenu);

        // Close the menu when a navigation link is clicked.
        navigationItems.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        // Close the menu when Escape is pressed.
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Close the mobile menu when switching to desktop.
        window.addEventListener("resize", () => {
            if (window.innerWidth > 680) {
                closeMenu();
            }
        });
    }

    // STICKY NAVBAR SCROLL EFFECT

    function updateNavbar() {
        if (!navbar) return;

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );
    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    // SCROLL REVEAL ANIMATIONS

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");

                        // Reveal each element only once.
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealItems.forEach((item) => {
            revealObserver.observe(item);
        });
    } else {
        // Fallback for older browsers.
        revealItems.forEach((item) => {
            item.classList.add("is-visible");
        });
    }

    // ACTIVE NAVIGATION LINK

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    if (
        "IntersectionObserver" in window &&
        sections.length > 0
    ) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const currentId = entry.target.id;

                    navigationItems.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") ===
                            `#${currentId}`;

                        link.classList.toggle(
                            "active",
                            isActive
                        );
                    });
                });
            },
            {
                rootMargin: "-25% 0px -60% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }
});
