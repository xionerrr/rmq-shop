import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif !important;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-size: 16px;
  }
  body {
    overflow-x: hidden;
  }


  button,input,ul,li,textarea {
    outline: none;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 0;
  }

  ul {
    list-style-type: none;
  }

  a, a:visited {
    text-decoration: none;
  }
`
