document.addEventListener("DOMContentLoaded", function () {

    console.log("پنل مدیریت رهنگر فعال شد");

    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(item => {

        item.addEventListener("click", function (event) {

            const href = item.getAttribute("href");

            if (href === "#" || !href) {
                event.preventDefault();
            }

            navItems.forEach(nav => {
                nav.classList.remove("active");
            });

            item.classList.add("active");

        });

    });

});