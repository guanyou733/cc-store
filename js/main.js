// 商品数据
const allProducts = [
    { id:"hp1", name:"Headphone A", img:"images/Headphone A.jpg", desc:"Black wireless headphones", link:"product-hp1.html" },
    { id:"hp2", name:"Headphone B", img:"images/Headphone B.jpg", desc:"RGB wireless headphones", link:"product-hp2.html" },
    { id:"hp3", name:"Headphone C", img:"images/Headphone C.jpg", desc:"Cat‑ear LED headphones", link:"product-hp3.html" },
    { id:"kb1", name:"Keyboard A", img:"images/Keyboard A.jpg", desc:"RGB keyboard(USB version)", link:"product-kb1.html" },
    { id:"kb2", name:"Keyboard B", img:"images/Keyboard B.jpg", desc:"Black gaming keyboard(Bluetooth version)", link:"product-kb2.html" },
    { id:"kb3", name:"Keyboard C", img:"images/Keyboard C.jpg", desc:"Wired office keyboard", link:"product-kb3.html" },
    { id:"mouse1", name:"Mouse A", img:"images/Mouse A.jpg", desc:"White office mouse", link:"product-mouse1.html" },
    { id:"mouse2", name:"Mouse B", img:"images/Mouse B.jpg", desc:"RGB Gaming mouse", link:"product-mouse2.html" },
    { id:"mouse3", name:"Mouse C", img:"images/Mouse C.jpg", desc:"Honeycomb lightweight mouse", link:"product-mouse3.html" },
    { id:"mp1", name:"Mouse Pad A", img:"images/Mouse Pad A.jpg", desc:"Large ink‑style mouse pad", link:"product-mp1.html" },
    { id:"mp2", name:"Mouse Pad B", img:"images/Mouse Pad B.jpg", desc:"Cat‑pattern mouse pad", link:"product-mp2.html" },
    { id:"mp3", name:"Mouse Pad C", img:"images/Mouse Pad C.jpg", desc:"Honkai: Star Rail design mouse pad", link:"product-mp3.html" }
];

function getRandomProducts(count) {
    return allProducts.sort(() => Math.random() - 0.5).slice(0, count);
}

function renderProducts(containerId, products, withDiscount=false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";
    products.forEach((p, i) => {
        let discountHTML = "";
        if (withDiscount) {
            const discounts = [50, 30, 10];
            p.discount = discounts[i] || 0;
            discountHTML = `<p class="discount">Discount: ${p.discount}% !!!</p>`;
        }

        container.innerHTML += `
            <div class="product-card">
                <img src="${p.img}">
                <h3>${p.name}</h3>
                <p class="desc">${p.desc}</p>
                ${discountHTML}
                <a href="${p.link}" class="hero-btn">View Details</a>
            </div>
        `;
    });
}

renderProducts("featured-products", getRandomProducts(4));

renderProducts("promo-box", getRandomProducts(3), true);

function searchProduct() {
    const keyword = document.querySelector(".search-bar").value.trim();
    if (!keyword) return;
    window.location.href = `search.html?keyword=${encodeURIComponent(keyword)}`;
}


function toggleMenu() {
    const menu = document.getElementById("dropdown-menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}
document.addEventListener("click", function(e) {
    const menu = document.getElementById("dropdown-menu");
    const hamburger = document.querySelector(".hamburger");
    if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = "none";
    }
});

const params = new URLSearchParams(window.location.search);
const keyword = params.get("keyword")?.toLowerCase() || "";
if (keyword) {
    const results = allProducts.filter(p =>
        p.name.toLowerCase().includes(keyword) ||
        p.desc.toLowerCase().includes(keyword)
    );
    const container = document.getElementById("search-results");
    if (container) {
        if (results.length === 0) {
            container.innerHTML = `<p>No results found for "${keyword}"</p>`;
        } else {
            renderProducts("search-results", results);
        }
    }
}

function connectHuman() {
    const thread = document.getElementById("bot-thread");
    thread.innerHTML += `<div class="cs-bot-msg">You are now connected to a human agent.</div>`;
    document.getElementById("chat-input-row").classList.remove("hidden");
}

function sendMessage() {
    const input = document.getElementById("chat-input");
    const message = input.value.trim();
    if (!message) return;
    const thread = document.getElementById("bot-thread");
    const userMsg = document.createElement("div");
    userMsg.className = "cs-user-msg";
    userMsg.textContent = message;
    thread.appendChild(userMsg);
    input.value = "";
    thread.scrollTop = thread.scrollHeight;
}
