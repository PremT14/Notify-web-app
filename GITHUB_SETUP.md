# How to Push Your Project to GitHub

Since `git` is not currently installed or recognized on your computer, follow these steps to get your project on GitHub.

## Step 1: Install Git

1.  Download Git from the official website: [https://git-scm.com/downloads](https://git-scm.com/downloads)
2.  Run the installer. **Important**: specific choices during installation usually don't matter much for beginners, but make sure "Git Bash Here" is checked if you are on Windows.
3.  Once installed, restart your terminal or VS Code to recognize the command.

## Step 2: Initialize Your Repository

Open your terminal in VS Code (Ctrl + `) and run these commands one by one:

```bash
# Initialize a new git repository
git init

# Add all your files to the staging area
git add .

# Commit your files (save them to history)
git commit -m "Initial commit - Notify App"
```

## Step 3: Create a Repository on GitHub

1.  Go to [GitHub.com](https://github.com) and sign in.
2.  Click the **+** icon in the top-right corner and select **New repository**.
3.  **Repository name**: Enter `notify-notes-app` (or any name you like).
4.  **Description**: "A simple, beautiful note-taking app." (Optional).
5.  **Public/Private**: Choose whichever you prefer.
6.  Click **Create repository**.

## Step 4: Connect and Push

After creating the repository, GitHub will show you a page with setup commands. Look for the section **"…or push an existing repository from the command line"**.

Copy and paste those commands into your VS Code terminal. They will look something like this (replace `YOUR-USERNAME` with your actual GitHub username):

```bash
git remote add origin https://github.com/YOUR-USERNAME/notify-notes-app.git
git branch -M main
git push -u origin main
```

## Alternative: Upload Manually (No Git Installed)

If you cannot install Git right now, you can upload files manually:

1.  Create the repository on GitHub (Step 3).
2.  On the repository page, look for the link that says **uploading an existing file**.
3.  Drag and drop all your project files (`index.html`, `style.css`, `app.js`, `README.md`) into the browser window.
4.  Commit the changes directly on the website.
