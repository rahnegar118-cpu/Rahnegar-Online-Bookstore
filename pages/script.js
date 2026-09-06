// ========================================
// Rahnegar Bookstore
// Main JavaScript
// ========================================

console.log("رهنگر با موفقیت اجرا شد.");

alert("فایل رهنگر اجرا شد");

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

    console.log("سبد قبلی خراب بود و پاک شد.");

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
// تعداد کالاهای سبد
// ========================================

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");

    if (!cartCount) return;

    const count = cart.reduce(
        (total, item) => total + (item.quantity || 0),
        0
    );

    cartCount.textContent =
        count.toLocaleString("fa-IR");

}


// ========================================
// افزودن کتاب به سبد
// ========================================

function addToCart(book) {

    console.log("افزودن به سبد:", book);

    const existingBook = cart.find(
        item => item.id === book.id
    );

    if (existingBook) {

        existingBook.quantity += 1;

    } else {

        cart.push({
            id: book.id,
            title: book.title,
            author: book.author || "",
            price: Number(book.price),
            quantity: 1
        });

    }

    saveCart();

    updateCartCount();

    alert("کتاب «" + book.title + "» به سبد خرید اضافه شد.");

}


// ========================================
// حذف کتاب
// ========================================

function removeFromCart(bookId) {

    cart = cart.filter(
        item => item.id !== bookId
    );

    saveCart();

    updateCartCount();

    renderCart();

}


// ========================================
// تغییر تعداد
// ========================================

function changeQuantity(bookId, change) {

    const book = cart.find(
        item => item.id === bookId
    );

    if (!book) return;

    book.quantity += change;

    if (book.quantity <= 0) {

        cart = cart.filter(
            item => item.id !== bookId
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
                (Number(item.price) * Number(item.quantity));

        },

        0

    );

}


// ========================================
// فرمت قیمت
// ========================================

function formatPrice(price) {

    return Number(price)
        .toLocaleString("fa-IR")
        + " تومان";

}


// ========================================
// نمایش سبد خرید
// ========================================

function renderCart() {

    const cartContainer =
        document.getElementById("cart-items");

    const totalElement =
        document.getElementById("cart-total");

    if (!cartContainer) return;


    // سبد خالی

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


    // نمایش کتاب‌ها

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
                    onclick="changeQuantity(${item.id}, 1)"
                >
                    +
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(${item.id}, -1)"
                >
                    −
                </button>

            </div>


            <button
                class="remove-cart"
                onclick="removeFromCart(${item.id})"
            >
                حذف
            </button>

        </div>

    `).join("");


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
