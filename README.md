# dom-utils

A collection of simple, no-dependency JavaScript functions for teaching and learning DOM manipulation.  
Built with vanilla JS, designed for anyone 👨‍💻👩‍💻 who wants to understand how to work with web page elements by hand.

---

## Why?

- **Learning Tool:** Clear, readable code meant to make DOM manipulation easy to understand.
- **Teaching Aid:** Good for teachers, students, or anyone exploring how the DOM works in JavaScript.
- **Vanilla JS:** No frameworks, no libraries—just what browsers support out of the box.

---

## What’s Inside (so far)

- **List helpers**: Add or remove `<li>` elements in an HTML list (`<ul>` or `<ol>`).
- *(More DOM utilities coming soon!)*

---

## How to Use

1. **Download** the file:  
   Save `dom-utils.js` to your project folder.
2. **Link** it in your HTML:

    ```javascript
    <script src="dom-utils.js"></script>
    ```

3. **Call helper functions** from your own scripts!

---

## Examples

```javascript
// Add one item to a list
addListElement("my-list", "Learn DOM");

// Add multiple items at once
addListElement("my-list", ["Practice", "Experiment"]);

// Remove 2nd item in list (1-based)
removeListElement("my-list", "index", 2);

// Remove all items that mention "Practice"
removeListElement("my-list", "filter", (el) => el.innerText.includes("Practice"));
```

---

## For Teachers & Learners

Every function is commented with JSDoc to explain how it works and what arguments it takes.  
Start with lists—add and remove items—then watch for more functions as this teaching tool grows!

---

## Note from the Author

This project is part of my personal journey to learn JavaScript and DOM manipulation.  
I'm aiming for good, production-style code, but I’m still learning.  
**Feel free to use these utilities, suggest improvements, or point out any mistakes!**  
Contributions, corrections, and feedback are all welcome.

---

## License

MIT — Use, share, fork, adapt.

---

### Made with ❤️ by chirayuChhabra
