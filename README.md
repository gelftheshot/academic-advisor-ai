This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview

Academic Advisor AI is your ultimate tool for academic planning, finding professors, and getting career advice. The application provides features such as finding professors, getting major and career advice, and planning courses.

![Academic Advisor AI](./path/to/your/image.png)

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
