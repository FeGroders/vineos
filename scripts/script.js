const table = document.querySelector('.card__container');
const btnOpenCart = document.querySelector('#button_cart');
const modal = document.querySelector('#modal_cart');
const modalBtnClose = document.querySelector('#button_close_cart');
const modalBtnClearCart = document.querySelector('#button_clear_cart');
const navbarBurger = document.querySelector('.navbar-burger')

function loadWines(id, nome, descricao, ano, preco, imagem) {
	console.log(id, nome, descricao, ano, preco, imagem);
	let card = document.createElement('div');
	card.classList.add('card');
	card.innerHTML = `
            <div class="card-image">
                <figure class="image is-4by3">
                <img src="${atob(imagem)}" alt="Placeholder image">
                </figure>                
			</div>
            <div class="card-content" value="${id}">
				<p class="title is-6">${nome}</p>
				<p class="subtitle is-6">${descricao}</p>
				<p class="subtitle is-6">Ano: ${ano}</p>
				<p class="subtitle is-6">Preço: ${preco}</p>
                <button class="add__cart button is-light"> <span class="material-icons card__cart">shopping_cart</span></button>
			</div>
				
			`;
	table.appendChild(card);

	let btnAddCart = card.querySelector('.add__cart');
	btnAddCart.onclick = function () {
		addToShoppingCart(id, nome, 1, preco);
		console.log(getShoppingCart());
	};
	refreshCartButton();
}

function refreshCartButton() {
	let quant = getShoppingCart().length;
	let quantFormatted = ``;
	if (quant > 0) {
		quantFormatted = `(${quant})`;
	}
	btnOpenCart.innerHTML = `<span class="material-icons">
						shopping_cart
					</span>
					Carrinho ${quantFormatted}`;
}

fetch('/vinhos').then(async (res) => {
	const data = await res.json();
	data.forEach((element) => {
		loadWines(element.id, element.nome, element.descricao, element.ano, element.preco, element.imagem);
	});
});

function addToShoppingCart(id, nome, quant, preco) {
	let cart = JSON.parse(localStorage.getItem('cart'));
	if (cart == null) {
		cart = [];
	}

	for (let i = 0; i < cart.length; i++) {
		if (cart[i].id == id) {
			cart[i].quant += quant;
			cart[i].preco = parseFloat(cart[i].preco) + parseFloat(preco);
			localStorage.setItem('cart', JSON.stringify(cart));
			loadCart();
			return;
		}
	}

	let item = {
		id: id,
		nome: nome,
		quant: quant,
		preco: preco,
	};
	cart.push(item);
	localStorage.setItem('cart', JSON.stringify(cart));
	refreshCartButton();
}

function getShoppingCart() {
	let cart = JSON.parse(localStorage.getItem('cart'));
	if (cart == null) {
		cart = [];
	}
	return cart;
}

function getTotal() {
	let cart = getShoppingCart();
	let total = 0;
	cart.forEach((element) => {
		total += element.preco * element.quant;
	});
	return total;
}

function clearShoppingCart() {
	localStorage.clear('cart');
	refreshCartButton();
}

function removeItem(id) {
	let cart = getShoppingCart();
	cart.forEach((element, index) => {
		if (element.id == id) {
			cart.splice(index, 1);
		}
	});
	localStorage.setItem('cart', JSON.stringify(cart));
	loadCart();
	refreshCartButton();
}

function loadCart() {
	let cart = getShoppingCart();
	let total = getTotal();
	let content = `<p>O carrinho está vázio</p>`;
	if (cart != null && cart.length > 0) {
		content = `<table class="table" id="table_cart">
						<thead>
							<tr>
								<th>Nome</th>
								<th class="has-text-centered">Quantidade</th>
								<th class="has-text-centered">Preço</th>
								<th class="has-text-centered"></th>
							</tr>
						</thead>
						<tbody>`;
			cart.forEach((element) => {
				content += `<tr>
								<td class="is-vcentered">${element.nome}</td>
								<td class="is-vcentered has-text-centered">${element.quant}</td>
								<td class="is-vcentered has-text-centered">${element.preco}</td>
								<td class="is-right"><button class="button is-danger" onclick="removeItem(${element.id})">X</button></td>
							</tr>`;
		});
		content += `</tbody>
					</table>
					<h5 class="is-right">Total: ${total}</h5>`;
	}
	let contentContainer = document.querySelector('.cart__container');
	contentContainer.innerHTML = content;
}

btnOpenCart.onclick = function () {
	loadCart();
	//Open modal
	modal.classList.add('is-active');
};

navbarBurger.onclick = function () {
	loadCart();
	//Open modal
	modal.classList.add('is-active');
};

modalBtnClose.onclick = function () {
	modal.classList.remove('is-active');
};

modalBtnClearCart.onclick = function () {
	clearShoppingCart();
	modal.classList.remove('is-active');
};
