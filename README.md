# PROJECT YFNA - HWO MAPPING

We developed a web application that visualizes the observational paths to known exoplanets in the solar neighborhood, focusing on those that the future Habitable Worlds Observatory (HWO) could potentially observe. The app enables users to explore exoplanets based on their potential for characterization, displaying pathways across our galaxy in an intuitive and interactive format. This application addresses the challenge by providing astronomers, researchers, and space enthusiasts a tool to prioritize exoplanetary targets for future observations with HWO. 

Users can easily visualize which exoplanets are observable, filter them by various scientific criteria, and understand their accessibility for detailed study. The project is important because it aids in planning for future exoplanet observations, supporting the search for habitable worlds beyond our solar system. By helping to identify and prioritize exoplanets with high characterization potential, this tool contributes to the broader goal of discovering planets that could support life.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
