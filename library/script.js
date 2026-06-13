// ============================================================
//  BOOK DATA — add more books here
// ============================================================
const books = [
  {
    title: "दोन तिकीट",
    cover: "img/printing_book_page-0000.jpg",
    pdfPath: "img/दोन तिकीट.pdf"
  },
  {
    title: "RUKO JARA SABRA KARO",
    cover: "img/tbc.jpg",
    pdfPath: "img/1.pdf"
  },
 
];

// ============================================================
//  RENDER
// ============================================================
const grid      = document.getElementById('bookGrid');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');

function renderCards(list) {
  grid.innerHTML = '';
  if (!list.length) { noResults.style.display = 'block'; return; }
  noResults.style.display = 'none';

  list.forEach(book => {
    const a = document.createElement('a');
    a.className = 'book-card';
    a.href = 'reader.html?pdf=' + encodeURIComponent(book.pdfPath)
           + '&title=' + encodeURIComponent(book.title);
    a.innerHTML = `
      <div class="book-cover-wrap">
        <img
          class="book-cover"
          src="${book.cover}"
          alt="${book.title}"
          loading="lazy"
          onerror="this.style.background='#eee'"
        />
      </div>
      <div class="book-info">
        <span class="book-title">${book.title}</span>
      </div>
    `;
    grid.appendChild(a);
  });
}

renderCards(books);

// ============================================================
//  SEARCH
// ============================================================
searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  renderCards(q ? books.filter(b => b.title.toLowerCase().includes(q)) : books);
});