window.onload = () => {

    // NAV RESPONSIVE
    let nav = document.querySelector("#nav");
    let abrir_nav = document.querySelector("#abrir_nav");
    let cerrar_nav = document.querySelector("#cerrar_nav");

    abrir_nav.addEventListener("click", () => {
        nav.classList.add("visible");
    })

    cerrar_nav.addEventListener("click", () => {
        nav.classList.remove("visible");
    })

    // SUBMENU PROFILE

    let userPic = document.getElementById("userPic");
    let subMenu = document.getElementById("subMenu");

    function toggleMenu() {
        subMenu.classList.toggle("sub_menu_wrap_open");
    }

    userPic.addEventListener("click", function () {
        toggleMenu();
    });


    // APARECER CARRITO
    let iconCart = document.querySelector(".shop_cart");
    let CartTab = document.querySelector(".CartTab");
    let closeCart = document.querySelector("#closeCart")

    function toggleCart() {
        CartTab.classList.toggle("CartTab_Open");
    }

    iconCart.addEventListener("click", function () {
        toggleCart();
    });

    closeCart.addEventListener('click', () => {
        CartTab.classList.toggle("CartTab_Open");
    })

    //AÑADIR AL CARRITO
    let CartInfo = document.querySelector('.Frame1');
    let rowProduct = document.querySelector('.item_array');
    let productList = document.querySelector('.Frames');
    let allProducts = [];
    let valorTotal = document.querySelector('.total_pagar');
    let countProducts = document.querySelector('.cantidad');
    let carrito = document.querySelector('.shop_cart')

    productList.addEventListener('click', e => {
        addProduct(e)
    });

    let modalAdd = document.querySelector("#AddCartModal")
    modalAdd.addEventListener('click', e => {
        addProduct(e, true)
    });

    let addProduct = (e, modal = false) => {
        if (e.target.classList.contains('AddCart')) {
            let infoProduct;
            if (modal) {
                let productInfo = {
                    title: document.getElementById('modalName').textContent,
                    price: parseFloat(document.getElementById('modalPrice').textContent),
                    quantity: 1,
                    imageSrc: document.getElementById('modalImage').getAttribute('src')
                };
                infoProduct = productInfo;
            } else {
                let article = e.target.closest('.Frame1'); // Encuentra el elemento artículo más cercano
                let product = article.querySelector('.FrameText');
                infoProduct = {
                    quantity: 1,
                    title: product.querySelector('h3').textContent,
                    price: parseFloat(product.querySelector('span.price').textContent),
                    imageSrc: article.querySelector('img').getAttribute('src') 
                };
            }
            if (infoProduct) {
                let exists = allProducts.some(product => product.title === infoProduct.title);
                if (exists) {
                    allProducts = allProducts.map(product => {
                        if (product.title === infoProduct.title) {
                            product.quantity++;
                        }
                        return product;
                    });
                } else {
                    allProducts.push(infoProduct);
                }
            }

            showHTML();

            carrito.classList.remove("animar")
            setTimeout(() => carrito.classList.add("animar"), 0)
        }
    }

    let showHTML = () => {
        // mensaje para cuando vacie el carrito
        if (allProducts.length === 0) {
            rowProduct.innerHTML = '<p>Has vaciado el carrito ;( </p>';
            valorTotal.innerText = '0.00€';
            countProducts.innerText = '0';
            return; 
        }

        rowProduct.innerHTML = '';
        let total = 0;
        let totalOfProducts = 0;

        allProducts.forEach(product => {
            let containerProduct = document.createElement('div');
            containerProduct.classList.add('item');

            containerProduct.innerHTML = `
                <div class="image">
                    <img src="${product.imageSrc}" alt="">
                </div>
                <div class="name">
                    <h3>${product.title}</h3>
                </div>
                <div class="price">${product.price}</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${product.quantity}</span>
                    <span class="plus">+</span>
                </div>
            `;

            rowProduct.append(containerProduct);
            total = total + parseFloat((product.quantity * product.price).toFixed(2));
            totalOfProducts = totalOfProducts + product.quantity;
        });

        valorTotal.innerText = `${total.toFixed(2)}€`;
        countProducts.innerText = totalOfProducts;

        // suma y resta de los items
        let minusButtons = document.querySelectorAll('.minus');
        let plusButtons = document.querySelectorAll('.plus');

        minusButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                if (allProducts[index].quantity > 1) {
                    allProducts[index].quantity--;
                } else {
                    // eliminar cuando llegue a 0
                    allProducts.splice(index, 1);
                }
                showHTML();
            });
        });
    
        plusButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                allProducts[index].quantity++;
                showHTML();
            });
        });
    }

    // MODAL PARA PRODUCTOS
    let seeMoreButtons = document.querySelectorAll("#SeeMore");
    let modal = document.getElementById("myModal");
    let modalImage = document.getElementById("modalImage");
    let modalName = document.getElementById("modalName");
    let modalDescription = document.getElementById("modalDescription");
    let modalPrice = document.getElementById("modalPrice");

    function openModal(frame) {
        let frameImage = frame.querySelector("img").src;
        let frameName = frame.querySelector("h3").textContent;
        let frameDescription = frame.querySelector("p").textContent;
        let framePrice = frame.getAttribute("data-price");

        modalImage.src = frameImage;
        modalName.textContent = frameName;
        modalDescription.textContent = frameDescription;
        modalPrice.textContent = framePrice + "€";

        modal.style.display = "block";
    }

    function closeModal() {
        modal.style.display = "none";
    }

    seeMoreButtons.forEach(button => {
        button.addEventListener("click", function () {
            let frame = this.closest(".Frame1"); // busca el ancestro más cercano del elemento actual (this) que tenga la clase Frame1.
            openModal(frame);
        });
    });

    let closeModalButton = document.getElementById("closeModal");
    closeModalButton.addEventListener("click", function () {
        closeModal();
    });

    //para cerrar la ventana modal al hacer clic fuera de ella
    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });


    // GALERÍA
    let imgActual = 0;
    let miniaturas = document.querySelectorAll('.mini');

    let cambioimagen = (item) => {
        let imagengrande = document.querySelector("#caja");
        imagengrande.src = item.src;
        imagengrande.alt = item.alt;

        miniaturas.forEach(miniatura => {
            miniatura.style.border = 'none';
            miniatura.style.filter = 'grayscale (100%)'
        });
        item.style.border = '2px solid #b4b4b4';
    };

    miniaturas.forEach(item => {
        item.addEventListener('click', event => {
            imgActual = item.dataset.num
            cambioimagen(item);
        });
    });

    let btnIzq = document.querySelector("#izq");
    btnIzq.addEventListener('click', () => {
        imgActual == 0 ? imgActual = miniaturas.length - 1 : imgActual--;
        cambioimagen(miniaturas[imgActual]);
    });

    let btnDer = document.querySelector("#der");
    btnDer.addEventListener('click', () => {
        imgActual == miniaturas.length - 1 ? imgActual = 0 : imgActual++;
        cambioimagen(miniaturas[imgActual]);
    });
}





