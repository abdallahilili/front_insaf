# وشائج — Wosaej

**نظام إدارة عضوية الحزب السياسي**
Political Party Membership Management System

---

## Stack Technique

- React 18 + TypeScript
- Vite
- TailwindCSS
- React Router DOM v6
- Axios (avec interceptors JWT)
- React Hook Form + Zod
- Framer Motion
- Recharts
- Leaflet / React Leaflet
- QRCode.react
- React Hot Toast
- Lucide React

---

## Architecture

```
src/
├── components/        # Composants réutilisables
│   ├── shared/        # UI partagée (Button, Input, Card, Modal...)
│   ├── auth/          # Composants d'authentification
│   ├── dashboard/     # Widgets du dashboard
│   ├── members/       # Gestion des membres
│   └── referrals/     # Système de parrainage
├── contexts/          # AuthContext, SidebarContext, NotificationContext
├── hooks/             # useDebounce, useResponsive, useUserPermissions
├── layouts/           # AppLayout, AppSidebar, AppHeader
├── models/            # TypeScript interfaces
├── pages/             # Pages par feature
├── routes/            # AppRoutes, ProtectedRoute
├── services/          # GeneralService + services métier
└── utils/             # Helpers, formatters, constants
```

---

## Installation

```bash
# Cloner le projet
cd wosaej

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
# Éditer VITE_API_URL avec l'URL de votre API Django

# Lancer en développement
npm run dev

# Build production
npm run build
```

---

## Pages

| Route | Page |
|-------|------|
| `/` | Landing Page |
| `/login` | Connexion par téléphone |
| `/otp` | Vérification OTP |
| `/join` | Inscription multi-étapes |
| `/dashboard` | Tableau de bord principal |
| `/members` | Gestion des membres |
| `/members/:id` | Détail d'un membre |
| `/referrals` | Système de parrainage |
| `/organization` | Hiérarchie organisationnelle |
| `/analytics` | Statistiques avancées |
| `/notifications` | Notifications |
| `/settings` | Paramètres |
| `/profile` | Profil utilisateur |

---

## Connexion API Django

Le `GeneralService` gère automatiquement :
- Injection du token JWT dans les headers
- Auto-logout sur erreur 401
- Méthodes CRUD génériques

Configurer `VITE_API_URL` dans `.env` :
```
VITE_API_URL=https://votre-api.com/api/v1
```

---

## Données de démonstration

Le projet inclut des données mockées dans `src/utils/mockData.ts` pour tester sans API. Remplacer les appels mock par les vrais services une fois l'API connectée.

---

## Design System

| Couleur | Valeur |
|---------|--------|
| Primary | `#224d92` |
| Gold | `#d4af37` |
| Background | `#f8fafc` |
| Success | `#16a34a` |
| Danger | `#dc2626` |

Police : **Cairo** (Google Fonts)
Direction : **RTL** (arabe)
