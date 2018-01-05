const navigation = {
    init: () => {
        const navToggle = document.querySelector(".nav-toggle");

        navToggle.addEventListener("click", (evt) => {
            document.body.classList.toggle("nav-is-open");
        });
    }
};

export { navigation };