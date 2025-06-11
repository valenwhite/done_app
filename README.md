
# Done - A React Native Task Management App

![cover](https://github.com/user-attachments/assets/0e920fd8-7055-42c2-b796-8127b35355e5)

**Done** is a mobile task management app built with React Native using Expo. It supports a simple authentication flow and tab-based navigation, allowing users to manage tasks and view them across different pages. The app was developed as part of unit number IFN666 at QUT (Web and Mobile App Development).

The backend, built with Node.js and Express, handles user authentication and task management using a RESTful API connected to a MySQL database.

This project demonstrates cross-platform development and full-stack integration using modern web and mobile technologies.
 
---

## 🧱 Features

- **User Sign-Up & Login** – Users can register and authenticate using email and password
- **Authentication State Management** – Built with React Context to persist login state across sessions
- **Tabbed Navigation** – Access Home, Calendar, and Profile screens via a bottom tab navigator
- **Custom Fonts & Icons** – Integrated with Expo Fonts and vector icon sets
- **Theming Support** – Built with the flexibility to expand UI styling

---

## 🛠 Backend Overview

The backend server is built with Node.js and Express and interacts with a MySQL database. It includes:
- Secure user authentication (with encrypted passwords)
- Task CRUD operations using RESTful endpoints (GET, POST, PUT, DELETE)
- Middleware for request validation and error handling

---

## ⚙️ Tech Stack

**Frontend:**
- React Native (via Expo)
- Expo Router
- React Navigation
- React Context API
- Expo Fonts & Vector Icons

**Backend:**
- Node.js & Express
- MySQL

---

## 🚀 Getting Started

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/valenwhite/done_app.git
cd done_app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the application:**
```bash
expo start
```

Scan the QR code with Expo Go or run in a local emulator.

---

## 🧪 Development Notes

- This project uses Expo SDK 51
- FontAwesome icons may need conversion for SDK 53 compatibility
- Designed with extensibility in mind for future backend or task tracking features
---

## 🤝 Contributing

If you'd like to contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b my-feature`
3. Make your changes
4. Commit: `git commit -m "Add feature"`
5. Push: `git push origin my-feature`
6. Submit a pull request

---

## 🐞 Reporting Issues

Please include:
- A brief description of the issue
- Steps to reproduce
- Expected vs actual behaviour
- Screenshots (if applicable)
- Your device/environment info

You can open issues [here](https://github.com/valenwhite/done_app/issues).

---


## 📂 Folder Structure

```
DONE_APP/
├── Frontend/
│   ├── app/
│   │   ├── (tabs)/
│   │   │   ├── index.js
│   │   │   ├── profile.js
│   │   │   ├── _layout.js
│   │   │   ├── login.js
│   │   │   └── signup.js
│   │   └── assets/
│   │       ├── fonts/
│   │       └── images/
│   ├── components/
│   │   └── navigation/
│   │       ├── TabBarIcon.tsx
│   │       ├── HelloWave.tsx
│   │       ├── Task.js
│   │       ├── TaskBottomSheet.js
│   │       ├── ThemedText.js
│   │       └── ThemedView.js
│   ├── constants/
│   │   └── Colors.ts
│   ├── contexts/
│   │   └── TasksContext.js
│   ├── hooks/
│   │   ├── useColorScheme.ts
│   │   ├── useColorScheme.web.ts
│   │   └── useThemeColor.ts
│   ├── ios/
│   ├── scripts/
│   │   └── reset-project.js
│   ├── .gitignore
│   ├── app.json
│   ├── AuthContext.js
│   ├── babel.config.js
│   ├── expo-env.d.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
```

- **authcontext.js**: Manages global authentication state and session logic
- **app/\_layout.js**: Root navigation logic that controls routing based on auth state
- **app/tabs/\_layout.js**: Controls bottom tab navigation structure
- **login.js / signup.js**: Handle user authentication screens

---

## 🪪 License

This project is licensed under the [MIT License](LICENSE.txt).

---

> Developed for educational purposes as part of QUT's IFN666 Web and Mobile App Development unit.
