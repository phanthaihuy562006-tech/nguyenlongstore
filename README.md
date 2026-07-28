nguyenlongstore/
├── frontend/
│   ├── css/
│   │   ├── style.css
│   │   ├── home.css
│   │   ├── menu.css
│   │   ├── login.css
│   │   ├── naptien.css
│   │   ├── danhmuc.css
│   │   ├── deposithistory.css
│   │   ├── productpurchasehistory.css
│   │   ├── admin.css
│   │   └── infoadmin.css
│   ├── js/
│   │   ├── script.js
│   │   ├── auth.js
│   │   └── admin.js
│   ├── public/images/       (logo.png, background.png, bankqr.png – tự thêm)
│   ├── home.html
│   ├── menu.html
│   ├── login.html
│   ├── naptien.html
│   ├── danhmuc.html
│   ├── deposithistory.html
│   ├── productpurchasehistory.html
│   ├── admin.html
│   └── infoadmin.html
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── adminController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── upload.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   ├── Category.js
│   │   │   ├── Order.js
│   │   │   ├── Payment.js
│   │   │   ├── BankAccount.js
│   │   │   ├── TopupTransactions.js
│   │   │   └── ExchangeRate.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── adminRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── categoryRoutes.js
│   │   │   ├── paymentRoutes.js
│   │   │   └── orderRoutes.js
│   │   ├── services/
│   │   │   └── bankTransactionService.js
│   │   ├── utils/
│   │   │   ├── db.js
│   │   │   ├── errorHandler.js
│   │   │   ├── httpError.js
│   │   │   ├── jwt.js
│   │   │   └── slugify.js
│   │   ├── seedAdmin.js
│   │   └── server.js
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
