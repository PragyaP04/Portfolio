document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio Loaded Successfully with Scroll-Nav!");

    const sections = document.querySelectorAll("section[id], header[id]");
    const navLinks = document.querySelectorAll(".side-nav a");

    const onScroll = () => {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === currentSection) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", onScroll);
});