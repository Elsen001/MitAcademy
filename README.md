# MedBooking — Klinika Randevu Sistemi (Frontend)

Tibbi randevu (medical booking) SaaS üçün React frontend starter-i.

## Stack

| Sahə          | Texnologiya                                                             |
| ------------- | ----------------------------------------------------------------------- |
| Build / dev   | [Vite](https://vite.dev) 8                                              |
| UI            | React 19 + TypeScript                                                   |
| Styling       | [Tailwind CSS](https://tailwindcss.com) v4                              |
| Komponentlər  | [shadcn/ui](https://ui.shadcn.com) (radix-nova)                         |
| Routing       | [React Router](https://reactrouter.com) v7                              |
| Server state  | [TanStack Query](https://tanstack.com/query) v5                         |
| HTTP          | [Axios](https://axios-http.com)                                         |
| Forma         | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| Client state  | [Zustand](https://zustand.docs.pmnd.rs)                                 |
| Tarix         | [date-fns](https://date-fns.org)                                        |
| Lint / format | ESLint + Prettier                                                       |

## Başlanğıc

```bash
pnpm install
cp .env.example .env   # API ünvanını lazım olduqda dəyişin
pnpm dev               # http://localhost:5173
```

## Script-lər

| Əmr                 | Təsvir                           |
| ------------------- | -------------------------------- |
| `pnpm dev`          | Dev server (HMR)                 |
| `pnpm build`        | Tip yoxlaması + production build |
| `pnpm preview`      | Build-i lokal preview et         |
| `pnpm lint`         | ESLint                           |
| `pnpm typecheck`    | Yalnız TypeScript tip yoxlaması  |
| `pnpm format`       | Prettier ilə formatla            |
| `pnpm format:check` | Formatlama yoxlaması (CI üçün)   |

## Qovluq strukturu

```
src/
  api/            # axios instance (client.ts)
  components/
    ui/           # shadcn komponentləri (avtomatik idarə olunur)
    layout/       # RootLayout, Navbar
  hooks/          # React Query hook-ları (məs. useAppointments)
  lib/            # utils.ts (cn), query-client.ts
  pages/          # Home, Appointments, Login, NotFound
  routes/         # React Router konfiqurasiyası
  store/          # Zustand store-ları (auth-store.ts)
  types/          # paylaşılan TypeScript tipləri
  main.tsx        # provider ağacı (Query + Router + Toaster)
```

## shadcn komponenti əlavə etmək

```bash
pnpm dlx shadcn@latest add <komponent-adı>
```

## Qeydlər

- `@/*` import alias-ı `src/`-ə işarə edir (`vite.config.ts` + `tsconfig`).
- API çağırışları `src/api/client.ts`-dəki `apiClient` üzərindən getməlidir; auth
  token-i avtomatik əlavə olunur, 401-də avtomatik logout baş verir.
- `LoginPage` hələ demo auth istifadə edir — real API ilə əvəz edin.
