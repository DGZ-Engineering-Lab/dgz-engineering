import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      // React Compiler advisories shipped with eslint-plugin-react-hooks v6+.
      // The app does not run the React Compiler yet, so these flag
      // performance/idiom issues rather than bugs. Kept visible as warnings
      // so they can be burned down incrementally without blocking CI.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
      "react-hooks/static-components": "warn",
      "react-hooks/refs": "warn",
      // next/image migration is tracked separately (needs width/height per asset).
      "@next/next/no-img-element": "warn",
    },
  },
  {
    files: ["**/*.test.{js,jsx}", "vitest.config.mjs"],
    rules: {
      "import/no-anonymous-default-export": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
    // Vanilla legacy scripts served as static assets.
    "public/**",
  ]),
]);

export default eslintConfig;
