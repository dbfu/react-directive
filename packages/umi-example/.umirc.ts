import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: 'pnpm',
  extraBabelPresets: [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic",
        "importSource": "@dbfu/react-directive"
      }
    ]
  ],
});
