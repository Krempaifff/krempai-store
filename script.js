let currentProduct = {};
const SECRET_PROMO_CODE = "KREMPIK";

particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ff3366" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#ff3366", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" }
        }
    }
});

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
}

function openPurchaseModal(name, amount, price) {
    currentProduct = { name, amount, price };
    document.getElementById('nicknameModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function validateNickname() {
    const nickname = document.getElementById('playerNickname').value.trim();
    const promoCode = document.getElementById('promoCode').value.trim();
    
    if (!nickname) {
        alert('Пожалуйста, введите ваш игровой никнейм!');
        return;
    }
    
    let finalPrice = parseInt(currentProduct.price);
    if (promoCode.toUpperCase() === SECRET_PROMO_CODE) {
        finalPrice = Math.round(finalPrice * 0.9);
        alert('🎉 Промокод применен! Скидка 10%');
    } else if (promoCode && promoCode.toUpperCase() !== SECRET_PROMO_CODE) {
        alert('❌ Неверный промокод');
    }
    
    document.getElementById('modalProductName').textContent = currentProduct.name;
    document.getElementById('modalProductAmount').textContent = currentProduct.amount;
    document.getElementById('modalProductPrice').textContent = finalPrice;
    document.getElementById('modalPlayerNickname').textContent = nickname;
    document.getElementById('instructionAmount').textContent = finalPrice;
    
    closeModal('nicknameModal');
    document.getElementById('paymentModal').style.display = 'block';
    
    document.getElementById('playerNickname').value = '';
    document.getElementById('promoCode').value = '';
}

function copyCardNumber() {
    const cardNumber = document.getElementById('cardNumber').textContent;
    navigator.clipboard.writeText(cardNumber.replace(/\s/g, '')).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Скопировано!';
        btn.style.background = 'linear-gradient(45deg, #51cf66, #40c057)';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = 'linear-gradient(45deg, #ff3366, #ff6b6b)';
        }, 2000);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
        });
    });

    document.getElementById('mainShopButton').addEventListener('click', function() {
        showSection('currency');
    });

    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const amount = this.getAttribute('data-amount');
            const price = this.getAttribute('data-price');
            openPurchaseModal(name, amount, price);
        });
    });

    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    }
});