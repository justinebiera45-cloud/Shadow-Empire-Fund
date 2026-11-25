# SHADOW EMPIRE — Rise From The Shadows

Responsive, database-backed Roblox project website and development funding management platform. Frontend: Vite + vanilla JavaScript. Backend: Supabase Auth, Postgres, RLS, SQL RPCs, and a server-side registration Edge Function.

## Important setup notes

- The repository does **not** include your original InstaPay QR image or real credentials. Put your genuine image at `public/assets/images/instapay-qr.jpg`. Do not regenerate or replace it with an AI QR.
- Public usernames are authenticated with Supabase Auth using a reserved synthetic identifier such as `playername@shadow.invalid`. This is not an email mailbox; no email address is collected from the user and no email is sent. Supabase Auth performs password hashing and session management.
- Keep `SUPABASE_SERVICE_ROLE_KEY` only in Edge Function secrets. Never put it in `src/config.js` or browser code.
- Payment is manual review. The QR only starts payment; a submitted reference stays pending until an admin verifies it against the actual payment account. Never ask for a PIN, OTP, or banking password.
- A trusted adult project owner should own the payment account, review finances, and administer the site.

## 1. Requirements

Install Node.js 20+ and npm. Create a Supabase project. Use the project URL and anon/publishable key only in the frontend.

## 2. Configure the frontend

Edit `src/config.js`:

```js
export const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
export const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
export const DISCORD_URL = 'https://discord.gg/YOUR_INVITE';
```

Copy the original payment QR to `public/assets/images/instapay-qr.jpg`.

## 3. Database

In Supabase Dashboard → SQL Editor, run all of `supabase/schema.sql`.

Then set Auth → Providers → Email enabled (Supabase uses its email/password provider internally for the synthetic alias) and turn **Confirm email OFF**. No user enters an email. Do not configure a mail provider for this synthetic login scheme.

## 4. Deploy username registration function

Install the Supabase CLI and link this project to your Supabase project:

```bash
npm install
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
npx supabase functions deploy register --no-verify-jwt
```

The function uses the service role only on the server to create a Supabase Auth user and matching `profiles` row. It validates username/password, creates no admin accounts, and rolls back the auth user if profile creation fails. For production, restrict `Access-Control-Allow-Origin` in `supabase/functions/_shared/cors.ts` to your actual website origin, add rate limiting/bot protection at the edge, and redeploy.

## 5. Create the first administrator

1. Register your own account through the website.
2. In Supabase SQL Editor, run (replace the username):

```sql
update public.profiles
set role = 'admin'
where username = 'YOUR_OWNER_USERNAME';
```

3. Verify exactly one row changed. Admin role is never selectable in public registration. Use a strong unique password and keep the admin account private.

## 6. Run locally

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal. Test registration, login, user pages, payment submission, and admin verification. A payment can only be confirmed by an authenticated admin; RLS and security-definer RPCs check the role server-side.

## 7. Build and deploy

```bash
npm run build
npm run preview
```

Deploy the generated `dist/` folder to a static host such as Netlify, Vercel, Cloudflare Pages, or GitHub Pages. Configure the SPA fallback so routes return `index.html`. Supabase stays as the backend. Set production environment values in the frontend config before building.

## 8. Android and desktop testing

- Test using Chrome Android at 360px, 390px, and tablet width; check the slide-out menu and forms.
- Test desktop at 1280px and 1920px; check collapsible/mobile menu behavior, table horizontal overflow, and sidebar.
- Use two separate user accounts to verify one user cannot view another user's contributions, notifications, or support tickets.
- Test admin pages in a normal user session; admin-only SQL functions and RLS must reject access.
- Use Supabase Auth logs and Database → Logs to investigate issues. Never share screenshots containing secret keys.

## Functional areas included

- Public Home, About, Features, Roadmap, Fund, Community, Dashboard views.
- Username-only registration/login (synthetic internal identifier), session persistence, logout, password change, admin-assisted recovery process.
- User overview, contributions, transaction history, notifications, profile, settings, support tickets.
- Admin overview, users, funding goal, payment verification, transactions, financial reports/CSV, milestones, announcements, site settings, audit logs.
- Postgres schema, indexes, RLS, protected RPCs, payment status and admin audit trails.

## Production hardening checklist

- Set exact CORS origin and deploy HTTPS only.
- Add rate limits to registration/login and abuse monitoring.
- Configure Supabase Auth password policy and session lifetime.
- Add a private admin-assisted recovery workflow (identity check by owner; never send a user's old password).
- Add optional secure storage for payment proof if needed; keep it private and use signed URLs. This starter accepts transaction references only and does not expose public proof uploads.
- Have a trusted adult review funding disclosures, privacy notice, tax/legal obligations, and payment handling before accepting money.
- Back up database and test restore before launch.
