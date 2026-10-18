# Sunrich Renewable Power

A responsive React website for Sunrich Renewable Power, served by a lightweight
Express server. There is no database: order enquiries are sent directly to the
company through WhatsApp. The site uses solar installation photos supplied in
the project materials.

## Requirements

- Node.js 20.19+ or 22.12+

## Run locally

1. Install dependencies:

   ```sh
   npm install
   npm install --prefix client
   npm install --prefix server
   ```

2. Start the React and Express development servers:

   ```sh
   npm run dev
   ```

   The website is available at `http://localhost:5173`; the Express health check
   runs at `http://localhost:5000/api/health`.

3. Use **Order on WhatsApp** or complete the order form to open a pre-filled
   WhatsApp message to **+91 92096 19417**.

## Production

Run `npm run build` to build the React site, then `npm start` to serve the
production build from Express. Set `PORT` if your hosting platform requires a
specific server port.

## Website content

- Update business contact details and location in `client/src/App.jsx`.
- Update the WhatsApp order number in `client/src/App.jsx`.
- The gallery photos are optimized copies of images from the supplied solar
  installation PDF in `client/public/images`.
