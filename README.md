# BTU-PROJECT-IAKOBI
# 📚 BookFinder

წიგნების საძიებო ვებ-აპლიკაცია, რომელიც იყენებს [Open Library](https://openlibrary.org/developers/api) API-ს. მომხმარებელს შეუძლია მოძებნოს წიგნები სათაურით ან ავტორის სახელით, ნახოს დეტალები (ავტორი, გამოცემის წელი, ჟანრები, ყდის სურათი) და დაამატოს საყვარელი წიგნები რჩეულებში.

## ✨ ფუნქციონალი

- 🔍 **წიგნების ძიება** — Open Library-ს `search.json` API-ს გამოყენებით, სათაურით ან ავტორით
- 🖼️ **წიგნის ბარათები** — ყდის სურათი, სათაური, ავტორი, გამოცემის წელი
- 🏷️ **ჟანრების ჩვენება** — ცალკე მოთხოვნით Open Library Works API-დან
- ❤️ **რჩეულები** — წიგნების შენახვა `localStorage`-ში, გვერდითი პანელით
- 📱 **სრულად რესპონსივი** — მუშაობს მობილურზე, ტაბლეტსა და დესკტოპზე (breakpoints: 1024px, 768px, 480px, 320px)
- 🍪 **Cookie-ს შეტყობინება**
- 🎨 **Smooth scroll**, reveal-ანიმაციები, scroll-to-top ღილაკი
- ✉️ **საკონტაქტო ფორმა** (front-end ვალიდაცია)

## 🛠️ ტექნოლოგიები
- **HTML5**
- **CSS3** — custom properties (CSS variables) + [Tailwind CSS](https://tailwindcss.com/) (CDN, `forms` და `container-queries` პლაგინებით)
- **Vanilla JavaScript** (ES6+, `async/await`, `fetch`, `IntersectionObserver`)
- **[Open Library API](https://openlibrary.org/developers/api)** — წიგნების ძიება და მეტამონაცემები
- **Google Fonts** — EB Garamond, Inter
- **Material Symbols** — აიქონები

## 📁 პროექტის სტრუქტურა

```
bookfinder/
├── index.html      # მთავარი HTML ფაილი
├── style.css       # სტილები
├── main.js         # აპლიკაციის ლოგიკა
└── README.md
```
## 🚀 გაშვება ლოკალურად
დამატებითი დამოკიდებულებების ინსტალაცია არ არის საჭირო — პროექტი მუშაობს სუფთა HTML/CSS/JS-ზე.
1. დააკლონეთ რეპოზიტორია:
   ```bash
   git clone https://github.com/<your-username>/bookfinder.git
   cd bookfinder
   ```
2. გახსენით `index.html` ბრაუზერში, ან გაუშვით ლოკალური სერვერი (რეკომენდირებულია fetch მოთხოვნების გამო):
   ```bash
   # Python
   python3 -m http.server 8000

   # ან VS Code-ის Live Server extension
   ```
3. გახსენით `http://localhost:8000`

## 🔌 გამოყენებული API-ები

| Endpoint | დანიშნულება |
|---|---|
| `https://openlibrary.org/search.json?title=...` / `?author=...` | წიგნების ძიება |
| `https://openlibrary.org/{work_key}.json` | წიგნის ჟანრების (subjects) მიღება |
| `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg` | წიგნის ყდის სურათი |

API რეგისტრაციას/გასაღებს არ საჭიროებს.
## 📌 ცნობილი შეზღუდვები
- რჩეულები ინახება მხოლოდ ლოკალურად (`localStorage`), ბრაუზერსა და მოწყობილობას შორის არ სინქრონდება
- საკონტაქტო ფორმა ამჟამად რეალურ ბექენდს არ უკავშირდება (მხოლოდ front-end სიმულაცია)
