# Dewordify

**Dewordify** converts Microsoft Word documents (`.docx` files) into HTML web pages. This is especially useful for creating online course materials, as it transforms your Word documents into web-ready HTML files.

<br>

---

<br>
<details>
<summary><h2 style="display: inline; border-bottom: none; text-decoration: none;">Installation</h2></summary>

<br>

### Step 1: Install Node.js
**Node.js** is a free program that lets you run tools like Dewordify on your computer.

1. Go to [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
2. Download Node.js:

<details>
<summary><strong>🪟 Windows</strong></summary>

Click the Windows installer button (it will download a `.msi` file)

</details>

<details>
<summary><strong>🍎 Mac</strong></summary>

Click the macOS installer button (it will download a `.pkg` file)

</details>

3. Run the downloaded file and follow the installation instructions (just click "Next" or "Continue" through the steps)
4. **Important**: Make sure you install Node.js version 14 or higher (the website will show you the latest version)

### Step 2: Install Dewordify

After Node.js is installed, you need to install Dewordify. You have two options:

<details>
<summary><strong>📦 Installation Method 1: Local Installation (Recommended)</strong></summary>

This installs Dewordify **locally** in its own folder (doesn't require admin permissions):

#### Setup Steps:

<details>
<summary><strong>🪟 Windows</strong></summary>

1. **Open Command Prompt**:
   - Press the Windows key on your keyboard
   - Type "Command Prompt" or "cmd"
   - Click on the Command Prompt app
   
2. **Navigate to the Dewordify folder**:
   - Type `cd ` (with a space at the end)
   - Drag the Dewordify folder into the Command Prompt window
   - Press Enter
   
   *For example, if Dewordify is in `C:\Users\YourName\Downloads\dewordify`, you would type:*
   ```
   cd C:\Users\YourName\Downloads\dewordify
   ```
   *Then press Enter*

3. **Install dependencies**:
   ```
   npm install
   ```
   Wait for it to finish (you'll see lots of text scrolling by - that's normal!)

</details>

<details>
<summary><strong>🍎 Mac</strong></summary>

1. **Open Terminal**:
   - Press `Command + Space` to open Spotlight
   - Type "Terminal" and press Enter
   
2. **Navigate to the Dewordify folder**:
   - Type `cd ` (with a space at the end)
   - Drag the Dewordify folder into the Terminal window
   - Press Enter
   
   *For example, if Dewordify is in `/Users/YourName/Downloads/dewordify`, you would type:*
   ```
   cd /Users/YourName/Downloads/dewordify
   ```
   *Then press Enter*

3. **Install dependencies**:
   ```
   npm install
   ```
   Wait for it to finish (you'll see lots of text scrolling by - that's normal!)

</details>

**That's it!** Dewordify is now ready to use. See "How to Use Dewordify" below.

#### Running Dewordify (Local Installation):

After setup, you have two ways to run Dewordify. **Important:** Your `.docx` file must be in the folder where you run the command from.

**Important Notes:**
- **Your `.docx` file must be inside a folder** - You can't run Dewordify on a `.docx` file that's just sitting directly on your Desktop or in a random location. 
- **Do you already have a folder?** 
  - **YES** - If your `.docx` file is already inside a folder (like "Documents", "My Project", etc.), you can use that folder directly. No need to create a new one!
  - **NO** - If your `.docx` file is loose on your Desktop or in Downloads (not in a folder), you need to create a folder first:
    1. Create a folder (you can name it anything, like "My Documents" or "Project Files")
    2. Put your `.docx` file inside that folder
    3. Then navigate to that folder when running Dewordify
- **Example:** If your file is called `Module1.docx` and it's loose on your Desktop, create a folder (maybe call it "Module1") and move `Module1.docx` into that folder. Then navigate to that "Module1" folder when running Dewordify.

**Troubleshooting:**
- **If the folder doesn't exist:** Make sure you navigate to the correct folder. Check that the folder path is correct and the folder actually exists on your computer. If you don't have a folder yet, create one and put your `.docx` file in it first.
- **If there are no .docx files in the folder:** Dewordify will show an error. Make sure your Word document (`.docx` file) is actually inside the folder where you run the command.
- **If you get a "cannot read directory" error:** This usually means the folder path is wrong or the folder doesn't exist. Double-check the folder path.

**Option A: Navigate directly to your Word document folder**

**Before you start:** 
- **Check if your `.docx` file is already in a folder:**
  - If YES → Great! Just navigate to that folder in step 2 below.
  - If NO (your file is loose on Desktop/Downloads) → Create a folder first:
    1. Right-click on your Desktop (or wherever your `.docx` file is)
    2. Select "New Folder" (Windows) or "New Folder" (Mac)
    3. Name the folder (e.g., "My Project")
    4. Drag your `.docx` file into this new folder
    5. Then navigate to that folder in step 2 below

1. **Open Command Prompt** (Windows) or **Terminal** (Mac)
2. **Navigate to your Word document folder** (the folder that contains your `.docx` file):
   - Type `cd ` (with a space at the end)
   - Drag the folder containing your `.docx` file into the Command Prompt/Terminal window
   - Press Enter
   
   **Note:** If the folder doesn't exist, you'll get an error. Make sure you've created the folder and put your `.docx` file in it before trying to navigate to it.
3. **Run Dewordify** using the full path to the Dewordify folder:

<details>
<summary><strong>🪟 Windows</strong></summary>

Type this command and press Enter:
```
node C:\path\to\dewordify\bin\dewordify
```

**Important:** Replace `C:\path\to\dewordify` with the actual location where you saved the Dewordify folder.

*For example, if Dewordify is in `C:\Users\YourName\Downloads\dewordify`, you would type:*
```
node C:\Users\YourName\Downloads\dewordify\bin\dewordify
```

**Where your .docx file should be:** In the folder you navigated to in step 2 (the current folder).

</details>

<details>
<summary><strong>🍎 Mac</strong></summary>

Type this command and press Enter:
```
node /path/to/dewordify/bin/dewordify
```

**Important:** Replace `/path/to/dewordify` with the actual location where you saved the Dewordify folder.

*For example, if Dewordify is in `/Users/YourName/Downloads/dewordify`, you would type:*
```
node /Users/YourName/Downloads/dewordify/bin/dewordify
```

**Where your .docx file should be:** In the folder you navigated to in step 2 (the current folder).

</details>

**Option B: Navigate to Dewordify folder first, then to your Word document folder**

**Before you start:**
- **Check if your `.docx` file is already in a folder:**
  - If YES → Great! Just navigate to that folder in step 3 below.
  - If NO (your file is loose on Desktop/Downloads) → Create a folder first:
    1. Right-click on your Desktop (or wherever your `.docx` file is)
    2. Select "New Folder" (Windows) or "New Folder" (Mac)
    3. Name the folder (e.g., "My Project")
    4. Drag your `.docx` file into this new folder
    5. Then navigate to that folder in step 3 below

1. **Open Command Prompt** (Windows) or **Terminal** (Mac)
2. **Navigate to the Dewordify folder** (where you installed Dewordify):
   - Type `cd ` (with a space at the end)
   - Drag the Dewordify folder into the Command Prompt/Terminal window
   - Press Enter
3. **Navigate to your Word document folder** (the folder that contains your `.docx` file):
   - Type `cd ` (with a space at the end)
   - Drag the folder containing your `.docx` file into the Command Prompt/Terminal window
   - Press Enter
   
   **Note:** If the folder doesn't exist, you'll get an error. Make sure you've created the folder and put your `.docx` file in it before trying to navigate to it.
4. **Run Dewordify** using the full path:

<details>
<summary><strong>🪟 Windows</strong></summary>

Type this command and press Enter:
```
node C:\path\to\dewordify\bin\dewordify
```

**Important:** Replace `C:\path\to\dewordify` with the actual location where you saved the Dewordify folder.

*For example, if Dewordify is in `C:\Users\YourName\Downloads\dewordify`, you would type:*
```
node C:\Users\YourName\Downloads\dewordify\bin\dewordify
```

**Where your .docx file should be:** In the folder you navigated to in step 3 (the current folder).

</details>

<details>
<summary><strong>🍎 Mac</strong></summary>

Type this command and press Enter:
```
node /path/to/dewordify/bin/dewordify
```

**Important:** Replace `/path/to/dewordify` with the actual location where you saved the Dewordify folder.

*For example, if Dewordify is in `/Users/YourName/Downloads/dewordify`, you would type:*
```
node /Users/YourName/Downloads/dewordify/bin/dewordify
```

**Where your .docx file should be:** In the folder you navigated to in step 3 (the current folder).

</details>

</details>

<details>
<summary><strong>🌐 Installation Method 2: Global Installation</strong></summary>

This installs Dewordify **globally** so you can use the `dewordify` command from anywhere (requires admin permissions):

#### Setup Steps:

<details>
<summary><strong>🪟 Windows</strong></summary>

1. **Open Command Prompt**:
   - Press the Windows key on your keyboard
   - Type "Command Prompt" or "cmd"
   - Click on the Command Prompt app
   
2. **Navigate to the Dewordify folder**:
   - Type `cd ` (with a space at the end) and then drag the Dewordify folder from your file explorer into the Command Prompt window
   - Press Enter
   
3. **Install Dewordify globally**:
   ```
   npm install -g
   ```
   Wait for it to finish.

</details>

<details>
<summary><strong>🍎 Mac</strong></summary>

1. **Open Terminal**:
   - Press `Command + Space` to open Spotlight
   - Type "Terminal" and press Enter
   
2. **Navigate to the Dewordify folder**:
   - Type `cd ` (with a space at the end) and then drag the Dewordify folder from Finder into the Terminal window
   - Press Enter
   
3. **Install Dewordify globally**:
   ```
   sudo npm install -g
   ```
   - You'll be asked for your computer password (this is normal)
   - Type your password (you won't see it as you type - that's normal for security)
   - Press Enter and wait for it to finish

</details>

**That's it!** You can now use the `dewordify` command from anywhere on your computer.

</details>

### Which Method Should You Use?

**Use Local Installation (Method 1) if:**
- You want to avoid admin permissions (`sudo` on Mac, admin rights on Windows)
- You prefer not to modify system-wide npm packages
- You want easier updates (just pull the latest version)

**Use Global Installation (Method 2) if:**
- You want the convenience of running `dewordify` from anywhere
- You're comfortable with admin permissions
- You prefer the traditional npm global package approach

</details>

<br>

---

<br>

<details>
<summary><h2 style="display: inline; border-bottom: none; text-decoration: none;">How to Use Dewordify</h2></summary>

<br>

Now that Dewordify is installed, you can convert Word documents to HTML!

### Step-by-Step Instructions

<details>
<summary><strong>🪟 Windows</strong></summary>

1. **Open Command Prompt**:
   - Press the Windows key on your keyboard
   - Type "Command Prompt" or "cmd"
   - Click on the Command Prompt app

2. **Navigate to the folder containing your Word document**:
   - Type `cd ` (with a space at the end)
   - Drag the folder containing your `.docx` file into the Command Prompt window
   - Press Enter

3. **Run Dewordify**:
   - Type this command and press Enter:
   ```
   dewordify
   ```
   
   Dewordify will automatically find the most recently saved Word document (`.docx` file) in that folder and convert it to HTML.

</details>

<details>
<summary><strong>🍎 Mac</strong></summary>

1. **Open Terminal**:
   - Press `Command + Space` to open Spotlight
   - Type "Terminal" and press Enter

2. **Navigate to the folder containing your Word document**:
   - Type `cd ` (with a space at the end)
   - Drag the folder containing your `.docx` file into the Terminal window
   - Press Enter

3. **Run Dewordify**:
   - Type this command and press Enter:
   ```
   dewordify
   ```
   
   Dewordify will automatically find the most recently saved Word document (`.docx` file) in that folder and convert it to HTML.

</details>

### Converting a Specific File

If you have multiple `.docx` files in the folder and want to convert a specific one (not just the most recent), type:

```
dewordify name-of-your-file.docx
```

Replace `name-of-your-file.docx` with the actual name of your Word document.

**Example**: If your file is called `Module1.docx`, you would type:
```
dewordify Module1.docx
```

### What Happens Next?

After running `dewordify`, it will create HTML files in the same folder as your Word document. Each page in your Word document (separated by `h1` headings) becomes a separate HTML file with a numbered filename like `01_page-name.html`, `02_next-page.html`, etc.

</details>

<br>

---

<br>

<details>
<summary><h2 style="display: inline; border-bottom: none; text-decoration: none;">Updating Dewordify (Optional)</h2></summary>

<br>

*You only need to do this if you want to get the latest version of Dewordify. If everything is working fine, you can skip this section!*

If you need to update Dewordify to get the latest version, follow these steps:

<details>
<summary><strong>🪟 Windows</strong></summary>

1. **Open Command Prompt**:
   - Press the Windows key on your keyboard
   - Type "Command Prompt" or "cmd"
   - Click on the Command Prompt app
   
2. **Navigate to the Dewordify folder** (same as during installation)
3. **Run the update command**:
   Type this and press Enter:
   ```
   npm run update
   ```

</details>

<details>
<summary><strong>🍎 Mac</strong></summary>

1. **Open Terminal**:
   - Press `Command + Space` to open Spotlight
   - Type "Terminal" and press Enter
   
2. **Navigate to the Dewordify folder** (same as during installation)
3. **Run the update command**:
   Type this and press Enter:
   ```
   sudo npm run update
   ```
   *You may be asked for your password - this is normal*

</details>

</details>

<br>

---

<br>

<details>
<summary><h2 style="display: inline; border-bottom: none; text-decoration: none;">Advanced: Customization Options</h2></summary>

<br>

*Note: These features are for advanced users who want to customize how their HTML files look. If you're happy with the default output, you can skip this section!*

### Custom HTML Templates

By default, Dewordify uses a template designed for BCIT courses. If you want your HTML files to look different, you can create your own template.

**How to use a custom template:**

1. Create a file called `template.html` 
2. Put this file in the same folder as your Word document (`.docx` file)
3. When you run Dewordify, it will use your custom template instead of the default one

**Template files in parent folders:**

You can also put a `template.html` file in a parent folder (up to 3 folders up), and Dewordify will find it. This is useful if you want:
- One main template for many documents (put it in a parent folder)
- Different templates for different folders (put specific templates closer to specific documents)

**Where your content goes in the template:**

When you create a `template.html` file, you need to tell Dewordify where to put your converted content. It will look for these in order:

1. A `<content/>` or `<content></content>` tag - this is the best option, just put this tag where you want your content to appear
2. Inside an HTML element with `class="container"` (this is an older method, still works but not recommended)
3. At the beginning of the `<body>` tag (if neither of the above are found)

If none of these are in your template, Dewordify will just return the converted content without any template structure.

### Markout: Special Formatting in Your Word Documents

**Markout** is a special way to mark sections in your Word document that need special formatting when converted to HTML.

**How it works:**

In your Word document, you can add special markers around text that you want formatted differently. Markers use special symbols:
- A **starting symbol** (by default, this is `#`)
- An **ending symbol** (by default, this is `/`)
- A **word** that tells Dewordify what kind of formatting to apply

**Example in your Word document:**

If you want to mark a section as a "note" or "warning", you would type in your Word document:

```
#note
This is important information that should look special in the HTML.
/note
```

Dewordify will then convert this section with special formatting in the HTML file.

**Default markers:**

Dewordify comes with a default set of markers (like `#note`, `#warning`, etc.) designed for BCIT courses. You can see all available markers in [BCIT's Conversion Guide](https://ltc.bcit.ca/courseproduction/conversionguide/).

**Creating your own custom markers:**

If you want to create your own markers or change how the existing ones work:

1. Look in the `default-files` folder for a file called `markoutMap.json`
2. Copy this file to the same folder as your Word document (or a parent folder, up to 3 levels up)
3. Open the file in a text editor
4. You can:
   - Change the starting and ending symbols (if `#` and `/` don't work for you)
   - Add new markers with your own words
   - Change how existing markers format the content

The file is written in a format called JSON (JavaScript Object Notation). It might look a bit technical, but if you follow the pattern of existing entries, you can add new ones.

### Understanding "Mammoth Warnings" About Word Styles

Sometimes, when you run Dewordify, you might see a message that says:
```
[MAMMOTH WARNING] Unknown Word Styles
```

**Don't worry!** This usually isn't a big problem.

**What it means:**
- "Mammoth" is the name of the tool that converts Word files to HTML (it's not actually saying the warning is "enormous")
- "Unknown Word Styles" means there are some styles in your Word document (like "Heading 1", "Normal", etc.) that Dewordify doesn't recognize
- Most of the time, these warnings don't affect your output and can be safely ignored

**What to do:**

1. **Check your Word document** - look for any unusual styles or formatting
2. **Check the HTML output** - if it looks fine, you can ignore the warning
3. **If the HTML looks wrong**, you might need to fix the style in your Word document or manually correct it in the HTML file

**For advanced users only:**

If you want to tell Dewordify how to convert specific Word styles to HTML, you can create a custom `styleMap.txt` file. This is a more technical topic - see the [Mammoth.js style mapping documentation](https://github.com/mwilliamson/mammoth.js#custom-style-map) if you need to do this.

There's also a reference file called `styleMap-reference-list.txt` in the `default-files` folder that lists all the Word styles you can customize, if you need help.

</details>

<br>

---

<br>

<details>
<summary><h2 style="display: inline; border-bottom: none; text-decoration: none;">Advanced: Additional Commands</h2></summary>

<br>

*Note: These commands are for advanced users who need additional functionality. If you're happy with the basic `dewordify` command, you can skip this section!*

Dewordify provides three additional commands for advanced use cases:

#### `estimate` - Preview Mode

Use this command to see what Dewordify would convert **without actually creating the HTML files**. This is useful for:
- Testing your Word document before converting
- Checking for errors or warnings
- Seeing statistics about your document (number of pages, images, tables, etc.)

```
estimate
```

This runs the conversion process but doesn't write any files - you'll just see the statistics and any warnings.

#### `munch` - Normalize File Names

Use this command to **normalize file names** in your HTML files and asset folder:
- Updates all HTML files in the current folder
- Renames asset files (images, videos, etc.) with clean, standardized names
- Updates references in HTML files to match the new asset file names

This is useful when you have files with unusual or inconsistent naming.

```
munch
```

#### `strip` - Remove Comments

Use this command to **remove NOTE comments** from HTML files:
- Finds all `.html` files in the current folder
- Removes comment blocks that look like `<!--NOTE: ... -->`
- Keeps the rest of your HTML intact

This is useful for cleaning up HTML files before publishing.

```
strip
```

</details>

<br>

---

<br>

<details>
<summary><h2 style="display: inline; border-bottom: none; text-decoration: none;">Technical Information</h2></summary>

<br>

*This section is for technical users who want to know what programs Dewordify uses under the hood.*

Dewordify relies on several open-source tools to work:

* **[Mammoth.js](https://www.npmjs.com/package/mammoth)** - Converts Word documents (`.docx` files) to HTML
* **[Cheerio](https://www.npmjs.com/package/cheerio)** - Helps process and modify HTML code
* **[JSBeautify](https://www.npmjs.com/package/js-beautify)** - Makes the HTML output easier to read and edit

These are all free, open-source programs that make Dewordify possible!

</details>

<br>

---

<br>