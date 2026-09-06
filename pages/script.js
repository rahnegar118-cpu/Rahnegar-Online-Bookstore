```javascript
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

        const quantity =
            Math.max(
                1,
                Number(item.quantity || 1)
            );

        const price =
            Number(item.price || 0);

        const itemTotal =
            price * quantity;

        const title =
            item.title || "بدون عنوان";

        const author =
            item.author || "نویسنده نامشخص";

        const publisher =
            item.publisher ||
            item.nashir ||
            "ناشر ثبت نشده";


        return `

            <article class="cart-product">

                <!-- حذف -->
                <button
                    type="button"
                    class="remove-cart"
                    onclick="removeFromCart(${item.id})"
                    aria-label="حذف ${title}"
                >
                    حذف
                </button>


                <!-- جلد کتاب -->
                <div class="cart-product-cover">

                    <div class="cover-inner">

                        <strong>
                            ${title}
                        </strong>

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


                    <!-- تعداد و قیمت -->
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
                                ${quantity.toLocaleString("fa-IR")}
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

                            <strong>
                                ${formatPrice(price)}
                            </strong>

                            <small>
                                قیمت هر جلد
                            </small>

                        </div>

                    </div>

                </div>


                <!-- مبلغ کل این کتاب -->
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
    // محاسبه جمع کل
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
```
