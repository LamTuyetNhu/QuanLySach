
const categoryMenu = document.querySelector(".category__menu")
const category = document.querySelector(".category")
const categoryMobile = document.querySelector(".category-list__mobile")


/* Menu */
categoryMenu.addEventListener("click", () => {
  category.style.display = "block";
  categoryMobile.style.display = "block";
})