const searchIcon = document.querySelector(".search-icon")
const logo = document.querySelector(".logo")
const searchInput = document.querySelector(".search-input")
const headerSearch = document.querySelector(".header-search")
const headerSearchHistory = document.querySelector(".header__search-history")
const headerSearchFind = document.querySelector(".card-item__find")

/* History */
searchInput.addEventListener("keypress", () => {
  if (event.key === "Enter") {

    let valueInput = searchInput.value;
    let ulHistory = document.querySelector(".header__search-history-list")
    let liHistory = document.createElement("li");
    let aHistory = document.createElement("a");

    liHistory.setAttribute("class", "header__search-history-item")
    aHistory.innerHTML = valueInput

    liHistory.appendChild(aHistory)
    ulHistory.appendChild(liHistory)
  }
})

headerSearchFind.addEventListener("click", () => {
    let valueInput = searchInput.value;
    let ulHistory = document.querySelector(".header__search-history-list")
    let liHistory = document.createElement("li");
    let aHistory = document.createElement("a");

    liHistory.setAttribute("class", "header__search-history-item")
    aHistory.innerHTML = valueInput

    liHistory.appendChild(aHistory)
    ulHistory.appendChild(liHistory)
})

/* Search */
searchIcon.addEventListener("click", () => {
  logo.classList.remove('hidden-logo')
  headerSearch.classList.remove('header-search__hidden')
  searchInput.classList.remove('search-input__hidden')
  headerSearchFind.classList.remove('card-item__find-block')
})

searchInput.addEventListener("keypress", () => {
  if (event.key === "Enter") {
    logo.classList.add('hidden-logo')
  headerSearch.classList.add('header-search__hidden')
  searchInput.classList.add('search-input__hidden')
  headerSearchFind.classList.add('card-item__find-block')
  }
})

