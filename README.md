This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview

Academic Advisor AI is your ultimate tool for academic planning, finding professors, and getting career advice. The application provides features such as finding professors, getting major and career advice, and planning courses.

![Academic Advisor AI](./image/image1.pngimage.png)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Features

### Find a Professor
Search and rate professors based on their teaching style, course difficulty, and more.

### Major Advisor
Get personalized advice on choosing your major and career path based on your interests and strengths.

### Course Planner
Plan your courses and ensure you meet all graduation requirements with our course planning tool.

## Code Structure

### `app/page.js`
This file contains the main landing page of the application.

### `app/layout.js`
This file contains the layout structure of the application, including the header and sidebar.

### `app/majorAdvisor/page.js`
This file contains the Major Advisor page component.

### `app/coursePlanner/page.js`
This file contains the Course Planner page component.

### `components/header.jsx`
This file contains the header component of the application.

### `components/sidebar.jsx`
This file contains the sidebar component of the application.

### `components/majorAdvisor.jsx`
This file contains the Major Advisor component where users can input their interests, strengths, and career goals to get recommendations.

### `components/coursePlanner.jsx`
This file contains the Course Planner component where users can add, view, and remove planned courses.

### `app/api/majorAdvisor/route.js`
This file contains the API route for the Major Advisor feature.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
