const openMenuBtn = document.getElementById("open__menu");
const closeMenuBtn = document.getElementById("close__menu");
const navBar = document.querySelector("nav");
const links = document.querySelectorAll(".nav__link");
const sections = document.querySelectorAll(".segment")
const navigation = document.querySelector(".navigation");


openMenuBtn.addEventListener("click", () => {
    navBar.classList.add("menu");
});

closeMenuBtn.addEventListener("click", () => {
    navBar.classList.remove("menu");
});

let isScrolling = false;
let scrollTimeout;


links.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault(); 
        isScrolling = true;
        clearTimeout(scrollTimeout);

        document.querySelector(".active")?.classList.remove("active");
        link.classList.add('active');

        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });

        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            updateStickyClass();
        }, 500);

        updateStickyClass();
    });
});


window.addEventListener("scroll", () => {
    if (isScrolling) return;

    let currentSection = "";
    sections.forEach(section => {
        if (window.scrollY >= (section.offsetTop - section.clientHeight / 4)) {
            currentSection = section.id;
        }
    });

    links.forEach(link => {
        if (link.href.includes(currentSection)) {
            document.querySelector(".active")?.classList.remove("active");
            link.classList.add("active");
        }
    });
    
    updateStickyClass();
});

const updateStickyClass = () => {
    navigation.classList.toggle("sticky", window.scrollY > 0);
};







