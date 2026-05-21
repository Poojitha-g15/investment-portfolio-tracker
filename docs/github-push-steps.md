# GitHub Push Steps

You can replace the old `ONLINE-VOTING-SYSTEM` repository with this new Investment Portfolio Tracker project.

## Option A: Rename the existing GitHub repo first

1. Open the old repository:
   `https://github.com/Poojitha-g15/ONLINE-VOTING-SYSTEM`
2. Go to **Settings**.
3. Under **Repository name**, rename it to:
   `investment-portfolio-tracker`
4. Click **Rename**.

GitHub usually redirects old links, but your cleaner new repo URL will be:

```text
https://github.com/Poojitha-g15/investment-portfolio-tracker
```

## Option B: Push this project into the renamed repo

Open this project in VS Code, then run:

```bash
git init
git add .
git commit -m "Replace online voting system with investment portfolio tracker"
git branch -M main
git remote add origin https://github.com/Poojitha-g15/investment-portfolio-tracker.git
git push -u origin main --force
```

Use `--force` only because you are intentionally replacing the old online voting project.

## If you do not rename the repo

You can push to the old repo URL instead:

```bash
git init
git add .
git commit -m "Replace online voting system with investment portfolio tracker"
git branch -M main
git remote add origin https://github.com/Poojitha-g15/ONLINE-VOTING-SYSTEM.git
git push -u origin main --force
```

Then rename the repo later from GitHub settings.

## After pushing

Add this repository description:

```text
Full-stack investment portfolio tracker using React, Node.js, Express.js, MongoDB, REST APIs, Docker, and responsive financial dashboards.
```

Add these topics:

```text
react
nodejs
express
mongodb
rest-api
full-stack
portfolio-tracker
finance-app
docker
javascript
```
