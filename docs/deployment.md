# Deployment Guide

## Production Deployment Targets
The application is fully compatible with:
- **Vercel**
- **Node.js standalone server**
- **Docker / Container Registry**
- **AWS ECS / App Runner**
- **Azure App Service**
- **DigitalOcean App Platform / Droplets**
- **OVH / Hetzner Bare Metal**

## Production Checklist
1. Provide valid `DATABASE_URL` pointing to PostgreSQL with SSL mode enabled.
2. Generate strong `AUTH_SECRET` (minimum 32 characters).
3. Set `NEXT_PUBLIC_APP_URL` and `APP_URL` to production domain.
4. Set `CLOUDINARY_*` and `BREVO_*` API keys.
5. Run build: `npm run build`
6. Start server: `npm start`
