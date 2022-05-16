const editButton = document.querySelector(".profile__edit-btn");
let profileName = document.querySelector(".profile__name");
// универсальные для всех попапов
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-btn");
const popupForm = document.querySelector(".popup__form");
// все инпуты
let inputName = document.querySelector("#input-name");
let inputDescription = document.querySelector("#input-dscr");
let inputTitle = document.querySelector("#input-title");
let inputImg = document.querySelector("#input-img");
// поле информации об аккаунте
let profileDescription = document.querySelector(".profile__description");
const addButton = document.querySelector(".profile__add-btn");
// карточка
const cards = document.querySelector('.elements');
const likeButton = document.querySelectorAll(".element__like-btn");
const deleteButton = document.querySelectorAll(".element__delete-btn");
// попап добавления картинок
const popupAdd = document.querySelector(".popup_add");
const formAdd = document.querySelector(".popup_new-place");
const cardAddPopupCloseButton = popupAdd.querySelector(".popup__close-btn");
// шаблон карточки
const template = document.querySelector(".card-template").content;
// попап с редактированием информации
const popupInfo = document.querySelector(".popup_info");

// открыть попап с редактированием информации
function openPopup (item) {
  item.classList.add("popup_open");
}

// заполнить поля попапа
function keepAddPopup() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

editButton.addEventListener("click", function(evt) {
  openPopup(popupInfo);
  keepAddPopup();
 })

// закрыть попап с редактированием информации
function closePopup(item) {
  item.classList.remove("popup_open");
}

closeButton.addEventListener("click", function(evt) {
  closePopup(popupInfo);
})

// сохранить изменения

function popupFullfill(ev) {
  ev.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupInfo);
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

// общая функция лайка

function toggleLike(evt) {
  evt.target.closest('.element__like-btn').classList.toggle("element__like-btn_active");
}

//лайк для изначальных карточек 

likeButton.forEach(item => {
  item.addEventListener("click", toggleLike)
})

// общая функция ремува

function removeCard(evt) {
  evt.target.closest('.element').style.display = "none";
}

//ремув для изначальных карточек 

deleteButton.forEach(item => {
  item.addEventListener("click", removeCard)
})

// создание модального окна для изображений

const popupModal = document.querySelector(".popup_modal"); 
const image = document.querySelectorAll(".element__image");
const modalImage = document.querySelector(".popup__image");
const elementText = document.querySelectorAll(".element__title");
const modalTitle = document.querySelector(".popup__caption");
const modalPopupCloseButton = popupModal.querySelector(".popup__close-btn");

// функция для существующих карточек

modalPopupCloseButton.addEventListener("click", function(evt) {
  closePopup(popupModal);
})

image.forEach(item => {
  item.addEventListener("click", function(event){
  openPopup(popupModal);
  modalImage.src = item.src;
  modalTitle.textContent = item.alt;
});
})

//универсальная функция добавления карточек

initialCards.forEach((item) => { 
  const card = addElement(item);
  renderCard(card);
});

function addElement(item) {
  const cardTemplate = template.querySelector(".card-element").cloneNode(true);
  const cardTitle = cardTemplate.querySelector(".element__title");
  const cardImg = cardTemplate.querySelector(".element__image");
  const cardRemove = cardTemplate.querySelector(".element__delete-btn");
  const cardLike = cardTemplate.querySelector(".element__like-btn");
  const name = item.name;
  const link = item.link;
  cardImg.addEventListener('click', function(evt) {
    openPopup(popupModal);
    modalImage.src = cardImg.src;
    modalImage.alt = cardTitle.textContent;
    modalTitle.textContent =  modalImage.alt;
  });

  cardLike.addEventListener('click', toggleLike);
  cardRemove.addEventListener('click', removeCard);
  cardImg.src = link;
  cardImg.alt = name;
  cardTitle.textContent = name;
  return cardTemplate;
}

function renderCard(card) {
  cards.prepend(card);
}

function formCreation(evt) {
  evt.preventDefault();
  const cardNew = addElement({name: inputTitle.value, link: inputImg.value});
  renderCard(cardNew);
  closePopup(popupAdd);
  formAdd.reset();
}

formAdd.addEventListener("submit", formCreation);

// открытие и закрытие попапа для добавления карточек

addButton.addEventListener("click", function(evt) {
  openPopup(popupAdd);
 })

 cardAddPopupCloseButton.addEventListener("click", function(evt) {
  closePopup(popupAdd);
})