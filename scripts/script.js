const editButton = document.querySelector(".profile__edit-btn");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-btn");
const popupForm = document.querySelector(".popup__form");
let profileName = document.querySelector(".profile__name");
let inputName = document.querySelector("#input-name");
let profileDescription = document.querySelector(".profile__description");
let inputDescription = document.querySelector("#input-dscr");
const addButton = document.querySelector(".profile__add-btn");

// открыть попап с редактированием информации

function openPopup() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  popup.classList.add("popup_open");
}

editButton.addEventListener("click", openPopup);

// закрыть попап с редактированием информации
function closePopup() {
  popup.classList.remove("popup_open");
}

closeButton.addEventListener("click", closePopup);

// сохранить изменения

function popupFullfill(ev) {
  ev.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup();
}

popupForm.addEventListener("submit", popupFullfill);

// добавление карточек из массива

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const cards = document.querySelector('.elements');


function createCard(item) {
  const card = document.createElement("article");
  card.classList.add("element");
  const image = document.createElement("img");
  image.classList.add("element__image");
  const container = document.createElement("div");
  container.classList.add("element__caption-container");
  const title = document.createElement("h2");
  title.classList.add("element__title");
  const likeButton = document.createElement("button");
  likeButton.classList.add("element__like-btn");
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("element__delete-btn");
  card.append(image, container);
  container.append(title, likeButton, deleteButton);
  title.textContent = item.name;
  image.src = item.link;
  image.alt = item.name;

  return card;
}

function addCard(item, cards) {
  const card = createCard(item);
  cards.append(card);
}

initialCards.forEach((item) => { 
  addCard(item, cards);
});

// добавление лайка

const likeButton = document.querySelectorAll(".element__like-btn");

likeButton.forEach(item => {
  item.addEventListener("click", function(event){
  event.preventDefault();
  item.classList.toggle("element__like-btn_active");
});
})

// добавление кнопки удаления карточки

const deleteButton = document.querySelectorAll(".element__delete-btn");

deleteButton.forEach(item => {
  item.addEventListener("click", function(event){
  event.preventDefault();
  const removeCard = item.closest(".element");
  removeCard.style.display = "none";
});
})

// добавление попапа для создания карточки

const container = document.querySelector(".popup_card");
const popupAdd = document.querySelector("#popup_add").content;
const popupElement = popupAdd.querySelector(".popup__container").cloneNode(true);
container.append(popupElement);

// открыть попап для создания карточки

function openAddPopup() { 
  container.classList.add("popup_open");
}

addButton.addEventListener("click", openAddPopup);

// закрыть попап для создания карточки

const closeButtonAdd = document.querySelector(".popup__unshow-btn");

function closeAddPopup() { 
  container.classList.remove("popup_open");
}

closeButtonAdd.addEventListener("click", closeAddPopup);



// добавить карточку через форму

let createItems = document.querySelector(".popup_new-place");
const templateCard = document.querySelector("#card_template").content;

let inputTitle = document.querySelector("#input-title");
let inputImg = document.querySelector("#input-img");


function formAddCard (evt) {
  evt.preventDefault();
  const copyCard = templateCard.querySelector(".card-element").cloneNode(true);
  let emptyImg = copyCard.querySelector(".element__image-empty");
  let emptyTitle = copyCard.querySelector(".element__title-empty");

  emptyTitle.innerHTML = inputTitle.value;
  emptyImg.src = inputImg.value;
  emptyImg.alt = inputTitle.value;


  cards.prepend(copyCard);
  const like = copyCard.querySelector(".element__like-btn");

  like.addEventListener("click", function(event){
    event.preventDefault();
    like.classList.toggle("element__like-btn_active");
  });

  const bin = copyCard.querySelector(".element__delete-btn");

  bin.addEventListener("click", function(event){
    event.preventDefault();
    bin.classList.toggle("element__like-btn_active");
    const deleteCard = bin.closest(".element");
    deleteCard.style.display = "none";
  });

  const fullImg = copyCard.querySelector(".element__image");
  
  fullImg.addEventListener("click", function(event){
      modal.classList.add("popup_open");
      imageTemplate.src = fullImg.src;
      imageTitle.textContent = fullImg.alt;
  });

  closeAddPopup();
  inputTitle.value = '';
  inputImg.value = '';
}

createItems.addEventListener("submit", formAddCard);

// создание модального окна для изображений

let modal = document.querySelector(".popup_modal"); 
let image = document.querySelectorAll(".element__image");
let imageTemplate = document.querySelector(".popup__image");
let elementText = document.querySelectorAll(".element__title");
let imageTitle = document.querySelector(".popup__caption");

image.forEach(item => {
  item.addEventListener("click", function(event){
  modal.classList.add("popup_open");
  imageTemplate.src = item.src;
  imageTitle.textContent = item.alt;
});
})

// закрыть модальное окно

const closeImgButton = document.querySelector(".popup__hide-btn");

function closeViewPopup() {
  modal.classList.remove("popup_open");
}

closeImgButton.addEventListener("click", closeViewPopup);