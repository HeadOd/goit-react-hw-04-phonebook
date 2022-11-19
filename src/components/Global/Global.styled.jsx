import { css } from "@emotion/react";

export const GlobalStyled = css`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  input {
    display: block;
  }
`;