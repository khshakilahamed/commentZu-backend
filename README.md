

### 🧩 Step 1: Install `npm-check-updates`
This tool checks for newer versions beyond your current version ranges and updates your package.json automatically.
Run:
```bash
npm install -g npm-check-updates

```

(If you don’t want a global install, you can run npx npm-check-updates instead.)

---

### 🧮 Step 2: See what can be updated

Run this inside your project directory:

```bash
npx npm-check-updates

```

It will show output like:

```bash
@types/node           ^20.4.9  →  ^22.0.0
typescript            ^5.1.6   →  ^5.7.2
express               ^4.18.2  →  ^5.0.0
...

```
This tells you which versions are available.

---

### ⚙️ Step 3: Update your `package.json`

Run:

```bash
npx npm-check-updates -u

```

This updates all dependency and devDependency version numbers in your `package.json` to the latest.

---

### 🧹 Step 4: Clean old dependencies and reinstall

Now remove old packages and lockfile, then install fresh:

```bash

rm -rf node_modules package-lock.json
npm install

```

### ✅ Step 5: Verify versions

Check that everything’s updated properly:

```bash

npm outdated

```
If the list is empty → all good 🎉
