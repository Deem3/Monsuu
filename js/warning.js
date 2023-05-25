export class Warning extends HTMLElement {
  constructor(code, msg) {
    super();
    this.attachShadow({ mode: "open" });
    // this.shadowRoot.querySelector('.warning-template')
    this.message = msg;
    this.code = code;
    this.themeTogler = false;
  }

  Render(code, msg) {
    this.shadowRoot.innerHTML = `
        <style>
        .container{
          background-color: ${this.themeTogler === true ? 'rgb(142, 1, 1)' : 'red'};
          width: 20rem;
          border-radius: 6px;
        }

        @media(prefers-color-scheme: dark) {
          .container{
            background-color: rgb(142, 1, 1);
            width: 20rem;
            border-radius: 6px;
          }
        }
          
        </style>
        <div class="container">
          <h1 id="headline" class="headline">Error</h1>
          <p id="context" class="context">something went wrong</p>
          <button id="closeBtn">x</button>
        </div>
      `;
  }

  connectedCallback() {
    this.Render();
    setTimeout(() => {
      this.shadowRoot.innerHTML = "";
    }, 10000);
    this.shadowRoot.getElementById("closeBtn").addEventListener("click", () => {
      this.remove();
    });
  }

  disconnectedCallback() {
    // implementation
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case "theme":
        switch (newVal) {
          case "dark":
            this.themeTogler = true;
            break;
          case "light":
            this.themeTogler = false;
            break;
        }
        break;
      case "color":
        switch (newVal) {
          case "red":
            this.shadowRoot.getElementById("headline").style.color = "red";
            break;
          case "blue":
            this.shadowRoot.getElementById("headline").style.color = "blue";
            break;
          case "white":
            this.shadowRoot.getElementById("headline").style.color = "white";
            break;
          case "black":
            this.shadowRoot.getElementById("headline").style.color = "black";
            break;
        }
        break;
    }
  }

  static get observedAttributes() {
    return ["color", "theme"];
  }

  adoptedCallback() {
    // implementation
  }
}

window.customElements.define("wc-warning", Warning);
