document.addEventListener('DOMContentLoaded', () => {
    let cart = [];

    const cartIcon = document.querySelector('.cart-icon a');
    const cartModal = document.getElementById('cartModal');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    const cartCountElement = document.getElementById('cart-count');

    if (cartIcon && cartModal && closeCartBtn) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            cartModal.style.display = 'flex';
        });

        closeCartBtn.addEventListener('click', () => {
            cartModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });
    }

    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const title = button.getAttribute('data-title');
            const price = parseFloat(button.getAttribute('data-price'));
            const img = button.getAttribute('data-img');

            cart.push({ id, title, price, img });

            updateCartUI();

            const originalText = button.textContent;
            button.textContent = 'Added! ✓';
            button.style.backgroundColor = '#d4af37';
            button.style.color = '#0b1b3d';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '#0b1b3d';
                button.style.color = '#d4af37';
            }, 1000);
        });
    });

    function updateCartUI() {
        if (cartCountElement) {
            cartCountElement.textContent = cart.length;
        }

        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
            cartTotalPrice.textContent = '0 SAR';
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;

            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="images/${item.img}" alt="${item.title}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${item.price} SAR</div>
                </div>
                <button class="remove-item-btn" onclick="removeCartItem(${index})">🗑️</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        cartTotalPrice.textContent = `${total} SAR`;
    }

    window.removeCartItem = function(index) {
        cart.splice(index, 1);
        updateCartUI();
    };

    const loginModal = document.getElementById('loginModal');
    const openLoginBtn = document.getElementById('openLoginBtn');
    const closeLoginBtn = document.getElementById('closeLoginBtn');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('passwordInput');
    const loginForm = document.getElementById('loginForm');

    if (openLoginBtn && loginModal) {
        openLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'flex';
        });
    }

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            togglePassword.textContent = isPassword ? '🙈' : '👁️';
        });
    }

    if (closeLoginBtn && loginModal) {
        closeLoginBtn.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
            }
        });
    }

    if (loginForm && loginModal) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            loginModal.style.display = 'none';
            loginForm.reset();
            alert('Welcome back! You have successfully signed in.');
        });
    }

    const navLinks = document.querySelectorAll('nav ul li a');
    const productCards = document.querySelectorAll('.product-card');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const selectedCategory = link.getAttribute('data-category');

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
