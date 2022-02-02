# 🔍 YouTube Advanced Search

Find exactly what you're looking for on YouTube with multiple advanced search filters.

<div align="center">

![youtube-advanced-search](https://user-images.githubusercontent.com/3791148/152081623-85ae8acf-460a-4a32-b77a-6209384c0df1.png)

![youtube-advanced-search-filters](https://user-images.githubusercontent.com/3791148/152081448-d22ecea0-246e-42ad-a81f-b401c7f8a07d.png)

</div>


## This app was built with

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

</div>

## How to start

To try this project just type this lines in your terminal:

```bash
# Copy environment file
cp .env.example .env.local

# Install packages
npm install

# Start development server
npm run dev

# Build and start server
npm run build && npm run start
```

To run, you will need a `YouTube Data API v3` access key, to get it go to [Google Console](https://console.cloud.google.com), create a project and get the credentials.

## Contribution

The project is still under development, it is still necessary to create a paging system and minor UI/UX tweaks. Furthermore, the filters can also be improved as per the [YouTube API documentation](https://developers.google.com/youtube/v3/docs/search/list).
