// Данные о продуктах
const dataProduct = [{
	id: 1,
	image: "images/product_1.jpg",
	title: "Lorem ipsum dolor",
	description: "Sit amet consectetur adipisicing elit",
	price: 600
}, {
	id: 2,
	image: "images/product_2.jpg",
	title: "Quasi distinctio",
	description: "Nam porro cum autem repellendus eum quis",
	price: 800
}, {
	id: 3,
	image: "images/product_3.jpg",
	title: "Nisi quia doloremque",
	description: "Nisi quia doloremque sunt illo recusandae",
	price: 1000
}];

let lengthArayDataProduct = dataProduct.length; // Длина массива

// Создаем карточки продуктов
const imagesContainer = document.querySelector('.imagesContainer');
dataProduct.forEach(data => {
	imagesContainer.insertAdjacentHTML('beforeend', `
	<div class="cardProduct" id="${data.id}">
		<img src=${data.image} alt="product" width="250px" height="250px">
		<div class="prod">
			<h3 class="productTitle">${data.title}</h3>
			<p class="productDescription">${data.description}</p>
			<p class="productPrice">${data.price} руб</p>
			</div>
		</div>
	`);
})

// Создаем кнопки переключения для слайдера
const inputsContaiener = document.querySelector('.inputsContaiener');
function createCheckButton(data) {
	data.forEach(uniqueID => {
		inputsContaiener.insertAdjacentHTML('beforeend', `
		<button class="buttonSwitching inputDeactive" id="${uniqueID.id}"></button>
	`);
})
document.querySelectorAll('.buttonSwitching').forEach(item => {
	if (item.getAttribute('id') == 1) {
		item.classList.remove('inputDeactive');
		item.classList.add('inputActive');
	}
})
}
createCheckButton(dataProduct);


const cardProduct = document.querySelectorAll('.cardProduct');
const buttonSwitching = document.querySelectorAll('.buttonSwitching');

// Создаем функцию, которая открывает карточку и подсвечивает кнопку переключения в зависимости от переданного ей id
function sortThroughBlocks(numberId) {
	cardProduct.forEach(change => { // Карточки
		if (change.getAttribute('id') == numberId) {
			change.classList.add('blockActive')
			change.style.display = `block`;
		} else {
			change.classList.remove('blockActive')
			change.style.display = `none`;
		}
	})
	buttonSwitching.forEach(item => { // Кнопки
		if (item.getAttribute('id') == numberId) {
			item.classList.remove('inputDeactive');
			item.classList.add('inputActive');
		} else {
			item.classList.add('inputDeactive');
			item.classList.remove('inputActive');
		}
	})
}

// Событие загрузки слайдера при загрузке страницы
window.addEventListener('load', function (e) {
	sortThroughBlocks(1);
})
// Событие для переключение карточек с помощью кнопок
buttonSwitching.forEach(change => {
	change.addEventListener('click', function (e) {
		let idChangeElem = e.target.getAttribute('id');
		sortThroughBlocks(idChangeElem);
	})
});

// Событие переключения карточек правой стрелкой
const arrowRight = document.querySelector('#arrowRight');
arrowRight.addEventListener('click', function () {
	let elemDisplayBlock = 0;
	cardProduct.forEach(card => {
		if (card.style.display == `block`) {
			elemDisplayBlock += Number(card.getAttribute('id')) + 1;
		}
	})
	if (elemDisplayBlock == lengthArayDataProduct + 1) {
		sortThroughBlocks(1);
	} else {
		sortThroughBlocks(elemDisplayBlock);
	}
})

// Событие переключения карточек левой стрелкой
const arrowLeft = document.querySelector('#arrowLeft');
arrowLeft.addEventListener('click', function () {
	let elemDisplayBlock = 0;
	cardProduct.forEach(card => {
		if (card.style.display == `block`) {
		elemDisplayBlock += Number(card.getAttribute('id')) - 1;
		}
	})
	if (elemDisplayBlock == 0) {
		sortThroughBlocks(3);
	} else {
		sortThroughBlocks(elemDisplayBlock);
	}
})