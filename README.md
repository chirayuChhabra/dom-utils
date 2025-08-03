# dom-utils

**Vanilla JavaScript Utilities for Learning & Teaching DOM Manipulation**

A set of simple, dependency-free JavaScript utilities and helpers for working with the DOM—designed to help students and teachers explore DOM manipulation “by hand.” Now with a modular structure and improved validation!

---

## 🚀 Project Structure


```
dom-utils/
├── .gitignore
├── LICENSE
├── README.md
├── docs/                 # Documentation directory
├── src/                  # Source code
│   ├── utils/            # Utility modules
│   │   ├── dom-list-utils.js
│   │   └── validation-utils.js
│   └── index.js          # Main entry point
└── testing/              # Testing files
    ├── index.html        # Test HTML page
    ├── scripts/          # Test scripts
    └── styles/           # Test styles
```


- **src/** - Core source code with utility modules
- **src/utils/** - Reusable DOM manipulation and validation utilities
- **testing/** - Test files including HTML, scripts, and styles
- **docs/** - Project documentation and usage guides

---

## ✨ Core Features

- **List helpers:** Add or remove `<li>` elements using various methods—individual items, arrays, filters, and more.
- **TypeGuard validation:** Robust utilities for precise type checking and safer error handling.
- **Flexible utility functions:** Clean, extensible, and beginner-friendly—ideal for learning and scaling.
- **More advanced features coming soon... 🚀**

---

## 🛠️ Usage

> **Note on Running Locally**
>
> If you want to try out these utilities in your own HTML file, you’ll need to run your project on a local server (even a simple one). Modern browsers block JavaScript modules (and some script operations) from running directly from your filesystem (`file:///`) for security reasons—they require a real HTTP server.
>
> **How to run:**
> - If you have Python installed, open your project folder in terminal and run `python -m http.server` (for Python 3).
> - Or use VS Code’s [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
>
> Then, open `http://localhost:8000` (or whatever port your server shows) in your browser to safely use the examples and demos!


### 1. Installation

Clone or download the repo.
Add the utility files to your own project:

```html
<script src="src/utils/dom-list-utils.js" type="module"></script>
```


### 2. Import Utilities (Recommended via Modules)

- Import specific functions in your code

```javascript
import { addListElement, removeListElement } from './src/utils/dom-list-utils.js';
```


### 3. Example

#### Add List Items

```javascript
addListElement("my-list", "Learn DOM");

// Or add several

addListElement("my-list", ["Practice", "Experiment"]);
```

#### Remove List Items

```javascript
removeListElement("my-list", "index", 2);  // Remove second item

removeListElement("my-list", "filter", el => el.innerText.includes("Practice"));  // Remove items by filter
```


### 4. Type Checking Utility

For robust checks across your codebase:

```javascript
import { typeGuard } from './src/utils/validation.js';

typeGuard("hello", "string"); // returns true

typeGuard([], "array"); // raises ERROR! empty objects return Error

typeGuard(123, "number"); // true
typeGuard(() => {}, "function"); // true
```



---


## 🧪 Testing

Simple tests are provided in the `testing/` directory  to check if functions behave as expected:


---

## 📚 Docs

Extended documentation and usage examples can be found in the `docs/` directory | **UNDER CONSTRUCTION**.

---

## 💡 For Teachers & Learners

- Every function is thoroughly commented with JSDoc.
- Designed to be a living resource for anyone learning modern, browser-based JavaScript.
- Contributions, corrections, and suggestions are highly welcome!

---

## 🤝 Contributing

Pull requests, feature requests, and constructive feedback encouraged! See `docs/usage.md` **UNDER CONSTRUCTION** | for best practices and guidelines.

---

## 🛡️ License

MIT — use, modify, share, and learn as you like.

---

## 👨‍💻 Author

**Chirayu Chhabra**
Learning JavaScript, exploring the DOM, and sharing the journey.

---

