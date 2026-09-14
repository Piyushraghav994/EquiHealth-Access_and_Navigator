# EquiHealth - Access & Navigator

An equitable healthcare navigation platform designed to bridge the healthcare gap for rural, marginalized, and lower-income populations. The platform helps users navigate government health schemes (such as AB PM-JAY, NHM-FDSI, and state programs), match with certified satellite hospitals, calculate transit and out-of-pocket costs, and access step-by-step offline registration guides.

---

## Repository Structure

```text
EquiHealth-Access_and_Navigator/
│
├── frontend/
│   ├── src/                  # React application source code
│   │   ├── components/       # UI components & healthcare widgets
│   │   ├── context/          # State management & authentication context
│   │   ├── data/             # Hospital datasets, schemes, and presets
│   │   ├── pages/            # Page-level route views
│   │   ├── services/         # Client services & Spring Boot API adapter
│   │   ├── types/            # TypeScript interfaces & domain models
│   │   ├── utils/            # 5-Factor scoring engine & ID generator
│   │   ├── App.tsx           # Main application root component
│   │   ├── index.css         # Tailwind CSS styling entry
│   │   └── main.tsx          # React DOM entry point
│   ├── public/               # Public assets
│   ├── package.json          # Frontend dependencies & scripts
│   ├── index.html            # HTML entry point
│   ├── metadata.json         # Platform metadata
│   ├── tsconfig.json         # TypeScript configuration
│   ├── vite.config.ts        # Vite configuration
│   └── .env.example          # Environment variables template
│
├── backend/
│   └── .gitkeep              # Placeholder for future Spring Boot backend
│
├── README.md                 # Project documentation
├── .gitignore                # Git ignore configuration
└── package.json              # Monorepo workspace runner
```

---

## Frontend Development

The frontend is built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS**.

### Running from the `frontend/` directory:

```bash
cd frontend
npm install
npm run dev
```

### Production Build:

```bash
cd frontend
npm run build
```

### Type Checking & Linting:

```bash
cd frontend
npm run lint
```

---

## Monorepo Commands (from root)

You can also run commands across the workspaces directly from the repository root:

- **Start Dev Server**: `npm run dev`
- **Build All**: `npm run build`
- **Type Check**: `npm run lint`

---

## Future Backend Architecture (Planned)

The `backend/` directory is reserved for the planned enterprise Java Spring Boot backend service, which will eventually incorporate:

- **Java & Spring Boot**: Core microservices runtime
- **Spring Security & JWT**: Authentication and role-based access control
- **Spring Data JPA / Hibernate**: Entity mapping and persistence
- **Relational Database**: PostgreSQL / MySQL for user and facility records
- **Spring AI & RAG**: Vector database and LLM retrieval-augmented generation for government health policy navigation
