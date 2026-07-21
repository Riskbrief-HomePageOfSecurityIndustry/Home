/*
 * RiskBrief
 * Minimal Vanilla JavaScript
 *
 * Features:
 * - Mobile navigation
 * - Navbar scroll state
 * - Active navigation section
 * - Placeholder link handling
 */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    /*
     * Mobile Menu
     */

    function openMenu() {

        if (!menuToggle || !navMenu) {
            return;
        }

        navMenu.classList.add("open");
        menuToggle.classList.add("active");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        document.body.classList.add("menu-open");
    }


    function closeMenu() {

        if (!menuToggle || !navMenu) {
            return;
        }

        navMenu.classList.remove("open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove("menu-open");
    }


    function toggleMenu() {

        if (!navMenu) {
            return;
        }

        if (navMenu.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }
    }


    if (menuToggle) {
        menuToggle.addEventListener("click", toggleMenu);
    }


    /*
     * Close mobile menu when navigation link is clicked
     */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    /*
     * Close menu when clicking outside
     */

    document.addEventListener("click", (event) => {

        if (!menuToggle || !navMenu) {
            return;
        }

        if (!navMenu.classList.contains("open")) {
            return;
        }

        const clickedMenu = navMenu.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedMenu && !clickedToggle) {
            closeMenu();
        }

    });


    /*
     * Escape closes mobile menu
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
     * Reset menu when switching to desktop
     */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 760) {
            closeMenu();
        }

    });


    /*
     * Navbar scroll styling
     */

    function updateNavbar() {

        if (!header) {
            return;
        }

        header.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );
    }


    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    /*
     * Active navigation
     */

    const sections = [
        document.querySelector("#home"),
        document.querySelector("#cves"),
        document.querySelector("#cheatsheets"),
        document.querySelector("#career"),
        document.querySelector("#about")
    ].filter(Boolean);


    function updateActiveNavigation() {

        const position = window.scrollY + 180;

        let currentSection = "home";

        sections.forEach((section) => {

            if (position >= section.offsetTop) {
                currentSection = section.id;
            }

        });


        navLinks.forEach((link) => {

            const target = link.getAttribute("href");

            link.classList.toggle(
                "active",
                target === `#${currentSection}`
            );

        });

    }


    updateActiveNavigation();

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    /*
     * Placeholder links
     *
     * These links will later point to real RiskBrief pages.
     */

    const placeholderLinks =
        document.querySelectorAll(".placeholder-link");

    placeholderLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            if (link.getAttribute("href") === "#") {
                event.preventDefault();
            }

        });

    });

});
