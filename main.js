// hederi
const header = document.getElementById("mainHeader");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// burger menu 
const burgerBtn = document.getElementById("burgerBtn");
const mainNav = document.getElementById("mainNav");
burgerBtn.addEventListener("click", function () {
  burgerBtn.classList.toggle("active");
  mainNav.classList.toggle("open");
});
mainNav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    burgerBtn.classList.remove("active");
    mainNav.classList.remove("open");
  });
});

// logos daawkapeb mTavar gverdze dasabruneblad
const logoLink = document.getElementById("logoLink");
if (logoLink) {
  logoLink.addEventListener("click", function () {
    burgerBtn.classList.remove("active");
    mainNav.classList.remove("open");
    closeFavPanel();
  });
}

// quqi baneri
const cookieBanner = document.getElementById('cookieBanner');
const acceptCookiesBtn = document.getElementById('acceptCookies');

if (cookieBanner && acceptCookiesBtn) {
  setTimeout(function () {
    cookieBanner.classList.add('visible');
  }, 350);

  acceptCookiesBtn.addEventListener('click', function () {
    cookieBanner.classList.remove('visible');

    
    setTimeout(function () {
      cookieBanner.classList.add('hidden');
    }, 500);
  });
}

// magla asasqroli
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});
scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// gamochenis animacia smooth gadasvlistvis
const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });
revealItems.forEach(function (item) {
  observer.observe(item);
});

// favoriti wignebi
const favCountEl = document.getElementById("favCount");
const favToggleBtn = document.getElementById("favToggleBtn");
const favPanel = document.getElementById("favPanel");
const favPanelClose = document.getElementById("favPanelClose");
const favPanelList = document.getElementById("favPanelList");
const favPanelEmpty = document.getElementById("favPanelEmpty");

function getFavorites() {
  const saved = localStorage.getItem("favoriteBooks");
  return saved ? JSON.parse(saved) : [];
}

function saveFavorites(list) {
  localStorage.setItem("favoriteBooks", JSON.stringify(list));
}

function updateFavCount() {
  if (favCountEl) {
    favCountEl.textContent = getFavorites().length;
  }
}

function isFavorite(key) {
  return getFavorites().some(function (book) { return book.key === key; });
}


function toggleFavorite(bookData, btnEl) {
  let favorites = getFavorites();
  const exists = favorites.some(function (book) { return book.key === bookData.key; });

  if (exists) {
    favorites = favorites.filter(function (book) { return book.key !== bookData.key; });
    if (btnEl) btnEl.classList.remove("active");
  } else {
    favorites.push(bookData);
    if (btnEl) btnEl.classList.add("active");
  }

  saveFavorites(favorites);
  updateFavCount();
  renderFavPanel();
}

function removeFavorite(key) {
  let favorites = getFavorites();
  favorites = favorites.filter(function (book) { return book.key !== key; });
  saveFavorites(favorites);
  updateFavCount();
  renderFavPanel();

 
  const activeBtn = document.querySelector('.fav-btn[data-key="' + CSS.escape(key) + '"]');
  if (activeBtn) activeBtn.classList.remove("active");
}

function renderFavPanel() {
  if (!favPanelList) return;
  const favorites = getFavorites();
  favPanelList.innerHTML = "";

  if (favorites.length === 0) {
    favPanelEmpty.style.display = "block";
    return;
  }
  favPanelEmpty.style.display = "none";

  favorites.forEach(function (book) {
    const item = document.createElement("div");
    item.classList.add("fav-item");

    const coverHTML = book.cover_i
      ? '<img src="https://covers.openlibrary.org/b/id/' + book.cover_i + '-S.jpg" alt="' + book.title + '" loading="lazy" />'
      : '<div class="fav-item-nocover"><span class="material-symbols-outlined" style="font-size:20px;">book_4</span></div>';

    item.innerHTML = coverHTML +
      '<div class="fav-item-info">' +
      "<h4>" + book.title + "</h4>" +
      "<p>" + book.author + " · " + book.year + "</p>" +
      "</div>" +
      '<button class="fav-item-remove" aria-label="წაშლა რჩეულებიდან"><span class="material-symbols-outlined">close</span></button>';

    const removeBtn = item.querySelector(".fav-item-remove");
    removeBtn.addEventListener("click", function () {
      removeFavorite(book.key);
    });

    favPanelList.appendChild(item);
  });
}

function openFavPanel() {
  renderFavPanel();
  favPanel.classList.add("open");
  favToggleBtn.setAttribute("aria-expanded", "true");
}

function closeFavPanel() {
  if (!favPanel || !favToggleBtn) return;
  favPanel.classList.remove("open");
  favToggleBtn.setAttribute("aria-expanded", "false");
}

if (favToggleBtn && favPanel) {
  favToggleBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (favPanel.classList.contains("open")) {
      closeFavPanel();
    } else {
      openFavPanel();
    }
  });

  favPanelClose.addEventListener("click", closeFavPanel);

 
  document.addEventListener("click", function (e) {
    if (!favPanel.contains(e.target) && !favToggleBtn.contains(e.target)) {
      closeFavPanel();
    }
  });
}


updateFavCount();

// buqserchi anu wiggnis dzebna API dan
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const searchType = document.getElementById("searchType");
const booksGrid = document.getElementById("booksGrid");
const loadingMsg = document.getElementById("loadingMsg");
const noResults = document.getElementById("noResults");
const resultsTitle = document.getElementById("resultsTitle");
const errorMsg = document.getElementById("errorMsg");

searchBtn.addEventListener("click", function () { runSearch(); });
searchInput.addEventListener("keypress", function (e) { if (e.key === "Enter") { runSearch(); } });

async function runSearch() {
  const query = searchInput.value.trim();
  const type = searchType.value;
  if (query === "") {
    errorMsg.style.display = "block";
    return;
  }
  errorMsg.style.display = "none";
  loadingMsg.style.display = "block";
  booksGrid.innerHTML = "";
  noResults.style.display = "none";
  resultsTitle.style.display = "none";

  const apiUrl = "https://openlibrary.org/search.json?" + type + "=" + encodeURIComponent(query) + "&limit=12";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("სერვერის შეცდომა: " + response.status);
    const data = await response.json();
    loadingMsg.style.display = "none";

    if (!data.docs || data.docs.length === 0) {
      noResults.style.display = "block";
      return;
    }

    resultsTitle.style.display = "block";
    resultsTitle.textContent = "მოიძებნა: " + data.numFound + " წიგნი";

    data.docs.forEach(function (book) {
      const card = createBookCard(book);
      booksGrid.appendChild(card);
    });

    document.getElementById("results-section").scrollIntoView({ behavior: "smooth" });
  } catch (err) {
    loadingMsg.style.display = "none";
    booksGrid.innerHTML = "<p class='error-msg'>შეცდომა: " + err.message + "</p>";
  }
}

function createBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("book-card");

  const title = book.title || "სათაური უცნობია";
  const author = book.author_name ? book.author_name[0] : "ავტორი უცნობია";
  const year = book.first_publish_year || "—";
  const favKey = title + " — " + author; 

  const bookData = {
    key: favKey,
    title: title,
    author: author,
    year: year,
    cover_i: book.cover_i || null
  };

  let coverHTML;
  if (book.cover_i) {
    const imgUrl = "https://covers.openlibrary.org/b/id/" + book.cover_i + "-M.jpg";
    coverHTML = '<img src="' + imgUrl + '" alt="' + title + '" loading="lazy" />';
  } else {
    coverHTML = '<div class="no-cover"><span class="material-symbols-outlined">book_4</span></div>';
  }

  card.innerHTML = coverHTML +
    '<button class="fav-btn" data-key="' + favKey + '" aria-label="რჩეულებში დამატება"><span class="material-symbols-outlined">favorite</span></button>' +
    '<div class="book-info">' +
    "<h3>" + title + "</h3>" +
    '<p class="author"><span class="material-symbols-outlined" style="font-size:14px;">edit</span> ' + author + "</p>" +
    '<p class="year"><span class="material-symbols-outlined" style="font-size:14px;">calendar_month</span> ' + year + "</p>" +
    '<p class="book-desc">ჟანრები იტვირთება...</p>' +
    "</div>";

  
  const favBtn = card.querySelector(".fav-btn");
  if (isFavorite(favKey)) {
    favBtn.classList.add("active");
  }
  favBtn.addEventListener("click", function () {
    toggleFavorite(bookData, favBtn);
  });

  
  const genreEl = card.querySelector(".book-desc");
  loadBookGenres(book.key, genreEl);

  return card;
}


async function loadBookGenres(workKey, genreEl) {
  if (!workKey || !genreEl) {
    if (genreEl) genreEl.textContent = "ჟანრი უცნობია";
    return;
  }

  try {
    const response = await fetch("https://openlibrary.org" + workKey + ".json");
    if (!response.ok) throw new Error("ჟანრების ჩატვირთვა ვერ მოხერხდა");
    const data = await response.json();

   
    if (!data.subjects || data.subjects.length === 0) {
      genreEl.textContent = "ჟანრი უცნობია";
      return;
    }

    const topGenres = data.subjects.slice(0, 3).join(", ");
    genreEl.textContent = topGenres;
  } catch (err) {
    genreEl.textContent = "ჟანრი უცნობია";
  }
}
// feedbacki shesavsebi forma
const contactBtn = document.getElementById("contactBtn");
const formSuccess = document.getElementById("formSuccess");
contactBtn.addEventListener("click", function () {
  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const msg = document.getElementById("contactMsg").value.trim();

  if (!name || !email || !msg) {
    alert("გთხოვთ შეავსოთ ყველა ველი!");
    return;
  }

  formSuccess.style.display = "block";

  // velebis gasuptaveba
  document.getElementById("contactName").value = "";
  document.getElementById("contactEmail").value = "";
  document.getElementById("contactMsg").value = "";

  setTimeout(function () { formSuccess.style.display = "none"; }, 3000);
});
