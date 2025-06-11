
# Done - A React Native Authentication App

![cover](https://github.com/user-attachments/assets/0e920fd8-7055-42c2-b796-8127b35355e5)

**Done** is a mobile task management app built with React Native using Expo. It supports a simple authentication flow and tab-based navigation, allowing users to manage tasks and view them across different pages. The app was developed as part of unit number IFN666 at QUT (Mobile and App Development) and demonstrates the use of authentication context, custom navigation, and modular architecture.

---

## 🧱 Features

- **User Sign-Up & Login** – Users can register and authenticate using email and password
- **Authentication State Management** – Built with React Context to persist login state across sessions
- **Tabbed Navigation** – Access Home, Calendar, and Profile screens via a bottom tab navigator
- **Custom Fonts & Icons** – Integrated with Expo Fonts and vector icon sets
- **Theming Support** – Built with the flexibility to expand UI styling

---

## ⚙️ Tech Stack

- React Native (via Expo)
- Expo Router
- React Navigation
- React Context API
- Expo Fonts & Vector Icons

---

## 📂 Folder Structure

```
/app
  /tabs
    index.js          # Home Screen
    calendar.js       # Calendar Screen
    profile.js        # Profile Screen
    _layout.js        # Tab Navigator Layout
  login.js            # Login Screen
  signup.js           # Signup Screen
  _layout.js          # Root Navigator Layout
/authcontext.js       # Authentication Context and Provider
```

- **authcontext.js**: Manages global authentication state and session logic
- **app/\_layout.js**: Root navigation logic that controls routing based on auth state
- **app/tabs/\_layout.js**: Controls bottom tab navigation structure
- **login.js / signup.js**: Handle user authentication screens

---

## 🚀 Getting Started

### Dependencies

- `react-navigation` and related packages for navigation.
- `expo` for development and building the app.
- `react-native` for building the user interface.
- `react-native-vector-icons` for using icons in the tab navigation.
- `@fortawesome/react-native-fontawesome` for font awesome icons.
- `expo-font` for custom fonts.
- `expo-splash-screen` for managing the splash screen.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/valenwhite/done_app.git
   cd your-repo
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the application:**

   ```bash
   expo start
   ```
You can scan the QR code with Expo Go on your phone or run the app in an emulator.

---

## 🧪 Development Notes

- This project uses Expo SDK 51
- FontAwesome icons will likely need to ne replaced with Expo-compatible vector icons when upgrading to Expo SDK 53
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
