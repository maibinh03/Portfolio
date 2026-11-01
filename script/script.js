(() => {
    const contactForm = document.querySelector("#contact-form");

    if (contactForm instanceof HTMLFormElement) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const name = String(formData.get("name") ?? "").trim();
            const email = String(formData.get("email") ?? "").trim();
            const subject = String(formData.get("subject") ?? "").trim();
            const message = String(formData.get("message") ?? "").trim();
            const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
            const mailto = `mailto:mthanhbinh2003@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.location.href = mailto;
        });
    }

    const menuIcon = document.querySelector("#menu-icon");
    const navbar = document.querySelector(".navbar");
    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".navbar a[href^='#']");

    if (!(menuIcon instanceof HTMLElement) || !(navbar instanceof HTMLElement)) {
        return;
    }

    if (!navbar.id) {
        navbar.id = "primary-navigation";
    }

    menuIcon.setAttribute("role", "button");
    menuIcon.setAttribute("tabindex", "0");
    menuIcon.setAttribute("aria-label", "Toggle navigation");
    menuIcon.setAttribute("aria-controls", navbar.id);
    menuIcon.setAttribute("aria-expanded", "false");

    const closeMenu = () => {
        navbar.classList.remove("active");
        menuIcon.classList.remove("bx-x");
        menuIcon.classList.add("bx-menu");
        menuIcon.setAttribute("aria-expanded", "false");
    };

    const toggleMenu = () => {
        const isExpanded = menuIcon.getAttribute("aria-expanded") === "true";
        navbar.classList.toggle("active", !isExpanded);
        menuIcon.classList.toggle("bx-x", !isExpanded);
        menuIcon.classList.toggle("bx-menu", isExpanded);
        menuIcon.setAttribute("aria-expanded", String(!isExpanded));
    };

    menuIcon.addEventListener("click", toggleMenu);
    menuIcon.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleMenu();
        }

        if (event.key === "Escape") {
            closeMenu();
        }
    });

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
            navigationLinks.forEach((navigationLink) => {
                navigationLink.classList.toggle("active", navigationLink === link);
            });
        });
    });

    document.addEventListener("click", (event) => {
        if (!navbar.contains(event.target) && !menuIcon.contains(event.target)) {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    const updateActiveLink = () => {
        let currentSectionId = sections[0]?.id;

        sections.forEach((section) => {
            if (section.getBoundingClientRect().top <= window.innerHeight * 0.35) {
                currentSectionId = section.id;
            }
        });

        navigationLinks.forEach((link) => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${currentSectionId}`,
            );
        });
    };

    window.addEventListener("scroll", updateActiveLink, { passive: true });
    updateActiveLink();
})();