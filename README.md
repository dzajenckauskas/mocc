# Opklinika

## Overview
Opklinika is a medical services platform designed to connect users with healthcare providers. This frontend project is built using modern web technologies to ensure a seamless user experience and efficient content management.

Website: [www.opklinika.lt](https://www.opklinika.lt)

## Tech Stack
- **Frontend:** React, Next.js, TypeScript
- **Backend:** Strapi CMS (Headless CMS)
- **Database:** PostgreSQL
- **Deployment:** VPS (Linux-based)

## Features
- **Dynamic content management** powered by Strapi CMS.
- **SEO-optimized architecture** with Next.js for server-side rendering.
- **Responsive design** ensuring a smooth experience on all devices.
- **Fast performance and scalability** through optimized code and efficient state management.

## Setup & Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.x)
- npm or yarn
- PostgreSQL

### Installation Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/dzajenckauskas/opklinika-front.git
   cd opklinika-front
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add necessary environment variables (e.g., Strapi API keys, database connection).
4. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```
5. Access the app at `http://localhost:3000`.

## Deployment
- The project is deployed on a VPS with Nginx as a reverse proxy.
- Uses **PM2** for process management.
- CI/CD automation with **GitHub Actions**.

## Future Improvements
- Implement **user authentication** for personalized experiences.
- Improve **UI/UX** with enhanced accessibility and design updates.
- Add **multi-language support** to reach a wider audience.

## Contributing
Contributions are welcome! Feel free to fork the repo, submit issues, or suggest improvements.

## License
This project is licensed under the MIT License.

---
For any inquiries or collaborations, reach out via [GitHub](https://github.com/dzajenckauskas/).

