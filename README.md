# jquery-checkbox-select

A lightweight, modern, and searchable jQuery plugin that transforms standard multi-select elements into refined checkbox lists.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![jQuery](https://img.shields.io/badge/jquery-%3E%3D1.7-orange.svg)

## 📸 Preview

![Plugin Preview](preview.png)

*Note: Take a screenshot of your working component and save it as `preview.png` in the root directory to display it here.*

## ✨ Features

*   🔍 **Searchable:** Filter options in real-time with a built-in search bar.
*   ✅ **Select All / Deselect All:** Quick actions for managing large lists.
*   🎨 **Modern UI:** Custom checkboxes with high-quality SVG icons and thin borders.
*   🔡 **Visual Feedback:** Selected options automatically become **bold** for better visibility.
*   🚀 **Lightweight:** Minimal footprint, easy to integrate into any project.
*   📱 **Responsive:** Works smoothly across different screen sizes.

## 📦 Installation

Simply include the CSS and JS files in your project after jQuery:

```html
<!-- Styles -->
<link rel="stylesheet" href="src/plugins/checkboxSelect.css">

<!-- Scripts -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="src/plugins/checkboxSelect.js"></script>
```

## 🚀 Usage

### 1. HTML Structure
Define a standard `<select multiple>` element:

```html
<select id="my-select" multiple>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
</select>
```

### 2. Initialization
Initialize the plugin with a single line of JavaScript:

```javascript
$(document).ready(function() {
    $('#my-select').checkboxSelect({
        placeholder: "Search options...",
        onSelect: function(values) {
            console.log("Selected values:", values);
        }
    });
});
```

## 🛠️ Configuration

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `placeholder` | `string` | `"Search..."` | Text displayed in the search input. |
| `onSelect` | `function` | `null` | Callback function triggered when selection changes. Receives an array of selected values. |

## 💅 Customization

The plugin is highly customizable via CSS. You can easily tweak colors, spacing, or the SVG checkmark by modifying `checkboxSelect.css`.

Example: Changing the checkmark color to blue:
```css
.checkbox-select-option input[type="checkbox"]:checked::after {
    stroke: #3b82f6; /* Change from black to blue */
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
