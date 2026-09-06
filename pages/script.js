// ========================================
// RAHNEGAR BOOKSTORE
// Main JavaScript
// ========================================


// ========================================
// سبد خرید
// ========================================

let cart = [];

try {

    const savedCart =
        localStorage.getItem("rahnegarCart");

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    if (!Array.isArray(cart)) {
        cart = [];
    }

} catch (error) {

    console.log("خطا در خواندن سبد خرید");

    cart = [];

    localStorage.removeItem("rahnegarCart");

}


// ========================================
// ذخیره سبد
// ========================================

function saveCart() {

    localStorage.setItem(
        "rahnegarCart",
        JSON.stringify(cart)
    );

}


// ========================================
// تعداد کل کالاها
// ========================================

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    const count =
        cart.reduce(
            (total, item) =>
                total + Number(item.quantity || 0),
            0
        );

    cartCount.textContent =
        count.toLocaleString("fa-IR");

}


// ========================================
// افزودن کتاب
// ========================================

function addToCart(book) {

    const existingBook =
        cart.find(
            item =>
                Number(item.id) ===
                Number(book.id)
        );

    if (existingBook) {

        existingBook.quantity =
            Number(existingBook.quantity || 0) + 1;

    } else {
cart.push({

    id: Number(book.id),

    title: book.title || "بدون عنوان",

    author: book.author || "",

    publisher: book.publisher || book.nashir || "",

    price: Number(book.price) || 0,

    quantity: 1

});

    }

    saveCart();

    updateCartCount();

    alert(
        "کتاب «" +
        book.title +
        "» به سبد خرید اضافه شد."
    );

}


// ========================================
// حذف کتاب
// ========================================

function removeFromCart(bookId) {

    cart =
        cart.filter(
            item =>
                Number(item.id) !==
                Number(bookId)
        );

    saveCart();

    updateCartCount();

    renderCart();

}


// ========================================
// تغییر تعداد
// ========================================

function changeQuantity(bookId, change) {

    const book =
        cart.find(
            item =>
                Number(item.id) ===
                Number(bookId)
        );

    if (!book) {
        return;
    }

    book.quantity =
        Number(book.quantity || 0) +
        Number(change);

    if (book.quantity <= 0) {

        cart =
            cart.filter(
                item =>
                    Number(item.id) !==
                    Number(bookId)
            );

    }

    saveCart();

    updateCartCount();

    renderCart();

}


// ========================================
// مبلغ کل
// ========================================

function calculateCartTotal() {

    return cart.reduce(

        (total, item) => {

            return total +
                (
                    Number(item.price || 0) *
                    Number(item.quantity || 0)
                );

        },

        0
    );

}


// ========================================
// فرمت قیمت
// ========================================

function formatPrice(price) {

    return (
        Number(price || 0)
            .toLocaleString("fa-IR")
        + " تومان"
    );

}


// ========================================
// نمایش سبد خرید
// ========================================
function renderCart() {

    const container =
        document.getElementById("cart-items");

    const totalElement =
        document.getElementById("cart-total");

    const finalTotalElement =
        document.getElementById("cart-final-total");

    if (!container) {
        return;
    }


    // ========================================
    // سبد خالی
    // ========================================

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h2>
                    سبد خرید شما خالی است
                </h2>

                <p>
                    هنوز کتابی برای مطالعه انتخاب نکرده‌اید.
                </p>

                <a
                    href="books.html"
                    class="empty-cart-button"
                >
                    رفتن به فروشگاه
                </a>

            </div>

        `;

        if (totalElement) {
            totalElement.textContent =
                formatPrice(0);
        }

        if (finalTotalElement) {
            finalTotalElement.textContent =
                formatPrice(0);
        }

        updateCheckoutState();

        return;
    }


    // ========================================
    // نمایش کتاب‌ها
    // ========================================

    container.innerHTML = cart.map(item => {

        const itemTotal =
            Number(item.price || 0) *
            Number(item.quantity || 0);

        const title =
            item.title || "بدون عنوان";

        const author =
            item.author || "نویسنده نامشخص";

        const publisher =
            item.publisher || "ناشر ثبت نشده";


        return `

            <article class="cart-product">

                <!-- دکمه حذف در گوشه کارت -->

                <button
                    type="button"
                    class="remove-cart"
                    onclick="removeFromCart(${item.id})"
                    aria-label="حذف ${title}"
                >
                    حذف
                </button>


                <!-- تصویر کتاب -->

                <div class="cart-product-cover">

                    <div class="cover-inner">

                        <strong>
                            ${title}
                        </strong>

                        <small>
                            ${author}
                        </small>

                    </div>

                </div>


                <!-- اطلاعات کتاب -->

                <div class="cart-product-details">

                    <span class="cart-product-label">
                        کتاب
                    </span>

                    <h3>
                        ${title}
                    </h3>

                    <div class="cart-product-meta">

                        <p>
                            <span>نویسنده:</span>
                            ${author}
                        </p>

                        <p>
                            <span>ناشر:</span>
                            ${publisher}
                        </p>

                    </div>


                    <div class="cart-product-bottom">


                        <!-- تعداد -->

                        <div class="cart-quantity">

                            <button
                                type="button"
                                onclick="changeQuantity(${item.id}, 1)"
                                aria-label="افزایش تعداد"
                            >
                                +
                            </button>

                            <span>
                                ${Number(item.quantity).toLocaleString("fa-IR")}
                            </span>

                            <button
                                type="button"
                                onclick="changeQuantity(${item.id}, -1)"
                                aria-label="کاهش تعداد"
                            >
                                −
                            </button>

                        </div>


                        <!-- قیمت هر جلد -->

                        <div class="cart-unit-price">

                            <strong>
                                ${formatPrice(item.price)}
                            </strong>

                            <small>
                                قیمت هر جلد
                            </small>

                        </div>

                    </div>

                </div>


                <!-- مبلغ کل کتاب -->

                <div class="cart-product-total">

                    <span>
                        مبلغ این کتاب
                    </span>

                    <strong>
                        ${formatPrice(itemTotal)}
                    </strong>

                </div>

            </article>

        `;

    }).join("");


    // ========================================
    // جمع کل
    // ========================================

    const total =
        calculateCartTotal();


    if (totalElement) {

        totalElement.textContent =
            formatPrice(total);

    }


    if (finalTotalElement) {

        finalTotalElement.textContent =
            formatPrice(total);

    }


    updateCheckoutState();

}


    // ========================================
    // سبد خالی
    // ========================================

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h2>
                    سبد خرید شما خالی است
                </h2>

                <p>
                    هنوز کتابی برای مطالعه انتخاب نکرده‌اید.
                </p>

                <a
                    href="books.html"
                    class="empty-cart-button"
                >
                    رفتن به فروشگاه
                </a>

            </div>

        `;

        if (totalElement) {

            totalElement.textContent =
                formatPrice(0);

        }

        if (finalTotalElement) {

            finalTotalElement.textContent =
                formatPrice(0);

        }

        updateCheckoutState();

        return;

    }


    // ========================================
    // نمایش کتاب‌ها
    // ========================================

    container.innerHTML = cart.map(item => {

        const itemTotal =
            Number(item.price || 0) *
            Number(item.quantity || 0);


        return `

            <article class="cart-product">

                <div class="cart-product-cover">

                    <div class="cover-inner">

                        <span>
                            رهنگر
                        </span>

                        <strong>
                            ${item.title}
                        </strong>

                        <small>
                            ${item.author || ""}
                        </small>

                    </div>

                </div>


                <div class="cart-product-details">

                    <span class="cart-product-label">
                        کتاب
                    </span>

                    <h3>
                        ${item.title}
                    </h3>

                    <p>
                        ${item.author || "نویسنده نامشخص"}
                    </p>


                    <div class="cart-product-bottom">

                        <div class="cart-quantity">

                            <button
                                type="button"
                                onclick="changeQuantity(${item.id}, 1)"
                                aria-label="افزایش تعداد"
                            >
                                +
                            </button>

                            <span>
                                ${Number(item.quantity).toLocaleString("fa-IR")}
                            </span>

                            <button
                                type="button"
                                onclick="changeQuantity(${item.id}, -1)"
                                aria-label="کاهش تعداد"
                            >
                                −
                            </button>

                        </div>


                        <div class="cart-unit-price">

                            ${formatPrice(item.price)}

                            <small>
                                قیمت هر جلد
                            </small>

                        </div>

                    </div>

                </div>


                <div class="cart-product-total">

                    <span>
                        مبلغ
                    </span>

                    <strong>
                        ${formatPrice(itemTotal)}
                    </strong>


                    <button
                        type="button"
                        class="remove-cart"
                        onclick="removeFromCart(${item.id})"
                    >
                        حذف
                    </button>

                </div>

            </article>

        `;

    }).join("");


    // ========================================
    // جمع کل
    // ========================================

    const total =
        calculateCartTotal();


    if (totalElement) {

        totalElement.textContent =
            formatPrice(total);

    }


    if (finalTotalElement) {

        finalTotalElement.textContent =
            formatPrice(total);

    }


    updateCheckoutState();

}


// ========================================
// وضعیت دکمه پرداخت
// ========================================

function updateCheckoutState() {

    const button =
        document.getElementById(
            "checkout-button"
        );

    if (!button) {
        return;
    }

    if (cart.length === 0) {

        button.classList.add(
            "disabled-checkout"
        );

        button.style.pointerEvents =
            "none";

    } else {

        button.classList.remove(
            "disabled-checkout"
        );

        button.style.pointerEvents =
            "auto";

    }

}


// ========================================
// اجرای اولیه
// ========================================

updateCartCount();

renderCart();
