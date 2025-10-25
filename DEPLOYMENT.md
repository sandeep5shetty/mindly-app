# Deployment Guide for Mindly App

## Vercel Deployment Instructions

### Backend Deployment (mindly-backend)

1. **Push to GitHub**: Make sure your backend code is in a GitHub repository
2. **Deploy to Vercel**:

   - Go to [vercel.com](https://vercel.com)
   - Import your backend repository
   - Vercel will automatically detect it as a Node.js project
   - Set environment variables in Vercel dashboard:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your JWT secret key
     - `NODE_ENV`: production
   - Deploy!

3. **Get Backend URL**: After deployment, copy your backend Vercel URL (e.g., `https://mindly-backend-xyz.vercel.app`)

### Frontend Deployment (mindly-app)

1. **Update Environment Variables**:

   - Edit `.env.production` file
   - Replace `your-backend-domain` with your actual backend Vercel URL
   - Example: `NEXT_PUBLIC_BACKEND_URL=https://mindly-backend-xyz.vercel.app/api/v1`

2. **Deploy to Vercel**:
   - Import your frontend repository to Vercel
   - Vercel will automatically detect it as a Next.js project
   - Set environment variables in Vercel dashboard:
     - `NEXT_PUBLIC_BACKEND_URL`: Your backend URL with `/api/v1`
   - Deploy!

### Important Notes

- **Routing**: Next.js handles client-side routing automatically on Vercel
- **API Routes**: Your backend API will be serverless functions
- **CORS**: Make sure to update CORS settings if needed
- **Database**: Ensure your MongoDB is accessible from Vercel (use MongoDB Atlas)

### Local Development

- Frontend runs on `http://localhost:3000`
- Backend runs on `http://localhost:3002`
- Uses `.env.local` for local environment variables

### Production URLs

After deployment, you'll have:

- Frontend: `https://mindly-app-xyz.vercel.app`
- Backend: `https://mindly-backend-xyz.vercel.app`
- API Base: `https://mindly-backend-xyz.vercel.app/api/v1`
