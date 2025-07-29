import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          name="description"
          content="Linha de Fuga é o refúgio para amantes da cultura automotiva: JDM, Muscle Cars, Drift, Off-Road e histórias que respiram gasolina."
        />
        <meta
          name="keywords"
          content="JDM, Muscle, Drift, Off-Road, Carros, Cultura Automotiva, Tuning, Linha de Fuga, Kawã Kleber, Motores, Garagem, Petrolhead"
        />
        <meta name="author" content="Kawã Kleber" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://linhadefuga.dev/" />
        <meta
          property="og:title"
          content="Linha de Fuga | Cultura Automotiva Alternativa"
        />
        <meta
          property="og:description"
          content="Explore a essência dos motores. JDM, Muscle, Off-Road e tudo que desafia o comum."
        />
        <meta
          property="og:image"
          content="https://linhadefuga.dev/imagens/banner-og.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Linha de Fuga | Cultura Automotiva Alternativa" />
        <meta
          name="twitter:description"
          content="Explore a essência dos motores. JDM, Muscle, Off-Road e tudo que desafia o comum."
        />
        <meta name="twitter:image" content="https://linhadefuga.dev/imagens/banner-og.jpg" />

        {/* Favicon */}
        <link rel="icon" href="https://i.pinimg.com/736x/93/3b/5c/933b5c9cf4702279ab8eeae238064505.jpg" type="image/png" />

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff0000" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
