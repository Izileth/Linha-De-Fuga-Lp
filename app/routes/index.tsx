import type { Route } from "./+types/index";
import Page from "~/src/pages";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Linha de Fuga | Oficial Site" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Index() {
  return <Page />;
}
