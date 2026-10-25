# 📸 Photo Gallery – Infinite Scroll

A responsive photo gallery built with **React.js and Vite** that fetches images from the Lorem Picsum API. It supports infinite scrolling, allowing users to explore more photos as they scroll down.

## ✨ Features

- **Infinite Scrolling:** Automatically loads more photos when scrolling down.
- **API Integration:** Fetches paginated photo data from Lorem Picsum.
- **Photographer Details:** Displays the author name for each photo.
- **Like Button:** Allows users to like individual photos and view their like counts.
- **Responsive Design:** Adapts to desktop and mobile screens.
- **Loading & Error Handling:** Displays loading indicators and retry options when requests fail.
- **Duplicate Prevention:** Avoids adding duplicate photos to the gallery.

## 🛠️ Tech Stack

- React.js
- Vite
- JavaScript (ES6+)
- CSS3
- Font Awesome
- Lorem Picsum API

## 🔗 Project Links

- **Live Demo:** [View Hosted Project](https://photo-gallery7.netlify.app/)
- **GitHub Repository:** [View Source Code](https://github.com/Suraj-nishad78/Photo-Gallery)

## 🚀 Getting Started

Follow these steps to run the project locally.

```bash
# Clone the repository
git clone https://github.com/Suraj-nishad78/Photo-Gallery

# Navigate to the project directory
cd photo-gallery

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open the local URL displayed in your terminal to view the application.

## 🌐 API Used

The project uses the Lorem Picsum API to retrieve photo data.

**API Endpoint:**
```text
https://picsum.photos/v2/list?page=1&limit=10
```

The API returns photo details, including the photo ID, author, dimensions, source URL, and download URL.

## 📂 Project Structure

```text
photo-gallery/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## 📞 Contact
- **Author:** Suraj Nishad
- **Email:** iamsuraj0737@gmail.com

