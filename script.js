/*
 * RiskBrief
 * Version 1
 *
 * Minimal JavaScript:
 * - Mobile navigation
 * - Navbar scroll state
 * - Active navigation section
 */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    /*
     * Mobile navigation
     */
    function openMenu() {
        navMenu.classList.add("open");
        menuToggle.classList.add("active");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");

        document.body.classList.add("menu-open");
    }

    function closeMenu() {
        navMenu.classList.remove("open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        document.body.classList.remove("menu-open");
    }

    function toggleMenu() {
        const isOpen = navMenu.classList.contains("open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", toggleMenu);
    }


    /*
     * Close mobile navigation after clicking a link
     */
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });


    /*
     * Close navigation when clicking outside it
     */
    document.addEventListener("click", (event) => {

        if (!navMenu || !menuToggle) {
            return;
        }

        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (
            navMenu.classList.contains("open") &&
            !clickedInsideMenu &&
            !clickedToggle
        ) {
            closeMenu();
        }

    });


    /*
     * Close menu when Escape is pressed
     */
    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            navMenu &&
            navMenu.classList.contains("open")
        ) {
            closeMenu();
            menuToggle.focus();
        }

    });


    /*
     * Reset mobile menu if viewport changes to desktop
     */
    window.addEventListener("resize", () => {

        if (window.innerWidth > 760) {
            closeMenu();
        }

    });


    /*
     * Navbar scroll appearance
     */
    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /*
     * Active navigation link
     */
    const sections = [
        document.querySelector("#home"),
        document.querySelector("#cves"),
        document.querySelector("#cheatsheets"),
        document.querySelector("#career"),
        document.querySelector("#about")
    ].filter(Boolean);


    function updateActiveNavigation() {

        const scrollPosition = window.scrollY + 180;

        let currentSection = "home";

        sections.forEach((section) => {

            if (scrollPosition >= section.offsetTop) {
                currentSection = section.id;
            }

        });

        navLinks.forEach((link) => {

            const href = link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    }

    updateActiveNavigation();

    window.addEventListener("scroll", updateActiveNavigation, {
        passive: true
    });


    /*
     * Prevent placeholder resource links from jumping
     * back to the top of the page.
     *
     * These can later be replaced with real pages.
     */
    const placeholderLinks = document.querySelectorAll(
        '.card-link[href="#"]'
    );

    placeholderLinks.forEach((link) => {

        link.addEventListener("click", (event) => {
            event.preventDefault();
        });

    });

});
