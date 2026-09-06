
// ========================================
// Rahnegar Bookstore
// Main JavaScript
// ========================================

console.log("رهنگر با موفقیت اجرا شد.");


// ========================================
// سبد خرید
// ========================================

let cart = JSON.parse(localStorage.getItem("rahnegarCart")) || [];


// ذخیره سبد خرید
function saveCart() {
    localStorage.setItem(
        "rahnegarCart",
        JSON.stringify(cart)
    );
}


// افزودن کتاب به سبد
function addToCart(book) {

    const existingBook = cart.find(
        item => item.id === book.id
    );

    if (existingBook) {

        existingBook.quantity += 1;

    } else {

        cart.push({
            ...book,
            quantity: 1
        });

    }

    saveCart();

    alert("کتاب به سبد خرید اضافه شد.");
}


// حذف کتاب از سبد
function removeFromCart(bookId) {

    cart = cart.filter(
        item => item.id !== bookId
    );

    saveCart();

    renderCart();
}


// تغییر تعداد کتاب
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

    renderCart();
}


// محاسبه مبلغ سبد
function calculateCartTotal() {

    return cart.reduce(
        (total, item) =>
            total + (item.price * item.quantity),
        0
    );

}


// نمایش سبد خرید
function renderCart() {

    console.log("سبد خرید:", cart);

    console.log(
        "مبلغ کل:",
        calculateCartTotal()
    );

}


// اجرای اولیه
renderCart();
