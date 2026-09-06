// ========================================
// Rahnegar Bookstore
// Main JavaScript
// ========================================


// ========================================
// سبد خرید
// ========================================

let cart = [];

try {

    const savedCart = localStorage.getItem("rahnegarCart");

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    if (!Array.isArray(cart)) {
        cart = [];
    }

} catch (error) {

    console.log("خطا در خواندن سبد خرید.");

    cart = [];

    localStorage.removeItem("rahnegarCart");
}


// ========================================
// ذخیره سبد خرید
// ========================================

function saveCart() {

    localStorage.setItem(
        "rahnegarCart",
        JSON.stringify(cart)
    );

}


// ========================================
// به‌روزرسانی تعداد کالاهای سبد
// ========================================

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    const count = cart.reduce(
        (total, item) => {
            return total + Number(item.quantity || 0);
        },
        0
    );

    cartCount.textContent =
        count.toLocaleString("fa-IR");

}


// ========================================
// افزودن کتاب به سبد
// ========================================

function addToCart(book) {

    console.log("کتاب در حال اضافه شدن:", book);

    const existingBook = cart.find(
        item => Number(item.id) === Number(book.id)
    );

    if (existingBook) {

        existingBook.quantity =
            Number(existingBook.quantity || 0) + 1;

    } else {

        cart.push({

            id: Number(book.id),

            title: book.title,

            author: book.author || "",

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
// حذف کتاب از سبد
// ========================================

function removeFromCart(bookId) {

    cart = cart.filter(
        item => Number(item.id) !== Number(bookId)
    );

    saveCart();

    updateCartCount();

    renderCart();

}


// ========================================
// تغییر تعداد کتاب
// ========================================

function changeQuantity(bookId, change) {

    const book = cart.find(
        item => Number(item.id) === Number(bookId)
    );

    if (!book) {
        return;
    }

    book.quantity =
        Number(book.quantity || 0) + Number(change);

    if (book.quantity <= 0) {

        cart = cart.filter(
            item => Number(item.id) !== Number(bookId)
        );

    }

    saveCart();

    updateCartCount();

    renderCart();

}


// ========================================
// محاسبه مبلغ کل
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

    const cartContainer =
        document.getElementById("cart-items");

    const totalElement =
        document.getElementById("cart-total");

    if (!cartContainer) {
        return;
    }


    // ========================================
    // اگر سبد خالی باشد
    // ========================================

    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <h2>
                    سبد خرید خالی است
                </h2>

                <p>
                    هنوز کتابی به سبد خرید اضافه نکرده‌اید.
                </p>

                <a
                    href="books.html"
                    class="btn-primary"
                >
                    مشاهده کتاب‌ها
                </a>

            </div>

        `;

        if (totalElement) {

            totalElement.textContent =
                formatPrice(0);

        }

        return;
    }


    // ========================================
    // نمایش کتاب‌های سبد
    // ========================================

    cartContainer.innerHTML = cart.map(item => `

        <div class="cart-item">

            <div class="cart-item-info">

                <h3>
                    ${item.title}
                </h3>

                <p>
                    ${item.author || ""}
                </p>

                <strong>
                    ${formatPrice(item.price)}
                </strong>

            </div>


            <div class="cart-quantity">

                <button
                    type="button"
                    onclick="changeQuantity(${item.id}, 1)"
                >
                    +
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    type="button"
                    onclick="changeQuantity(${item.id}, -1)"
                >
                    −
                </button>

            </div>


            <button
                type="button"
                class="remove-cart"
                onclick="removeFromCart(${item.id})"
            >
                حذف
            </button>

        </div>

    `).join("");


    // ========================================
    // نمایش مبلغ کل
    // ========================================

    if (totalElement) {

        totalElement.textContent =
            formatPrice(
                calculateCartTotal()
            );

    }

}


// ========================================
// اجرای اولیه
// ========================================

updateCartCount();

renderCart();
