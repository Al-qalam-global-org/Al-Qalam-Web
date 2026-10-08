# Environment Variables Reference

| Variable | Required | Description | Example |
| :--- | :--- | :--- | :--- |
| `DATABASE_URL` | Yes | Standard PostgreSQL connection URI | `postgresql://user:pass@host:5432/db` |
| `AUTH_SECRET` | Yes | 32+ character random string for security | `7f8a9...min32chars` |
| `APP_URL` | Yes | Server application root URL | `https://alqalamglobal.com` |
| `NEXT_PUBLIC_APP_URL` | Yes | Public application root URL | `https://alqalamglobal.com` |
| `CLOUDINARY_CLOUD_NAME` | Optional (Dev) | Cloudinary cloud account name | `alqalam-cloud` |
| `CLOUDINARY_API_KEY` | Optional (Dev) | Cloudinary API key | `123456789` |
| `CLOUDINARY_API_SECRET` | Optional (Dev) | Cloudinary secret key | `sec_abc123` |
| `BREVO_API_KEY` | Optional (Dev) | Brevo Transactional Email key | `xkeysib-...` |
| `BREVO_SENDER_EMAIL` | Optional | Default transactional email sender | `admissions@alqalamglobal.com` |
| `BREVO_SENDER_NAME` | Optional | Sender display name | `Al-Qalam Global Academy` |
| `NODE_ENV` | Yes | `development`, `test`, or `production` | `production` |
