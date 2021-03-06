import { customElement, html, LitElement, property } from "lit-element";
import { Project } from "../../types";
import globalStyles from "../styles/global-styles";
import pageStyles from "../styles/page-styles";
import '@material/mwc-icon'
import { nothing } from "lit-html";


@customElement('project-page')
export class ProjectPage extends LitElement {
  @property({type:Object})
  project!: Project;

  static styles = [
    globalStyles,
    pageStyles
  ]

  render() {
    const p = this.project;

    return html`
    <div class="wrapper">
      ${p.description ? html`
      <div class="container">
        <div class="description">${this.project.description}</div>
      </div>
      ` : nothing }

      <div class="container">
        <div class="title">Details</div>
        ${p.blockchain ? html`
        <div>
          <b>Blockchain: </b>
          <span class="link"
            @click="${() => window.app.goBlockchain(this.project.blockchain)}">${this.project.blockchain}</span>
        </div>
        ` : nothing}
      </div>

      <div class="links container">
        <div class="title">Links</div>
        <div>
          <mwc-icon>language</mwc-icon><a href="${this.project.website}" target="_blank">${this.project.website}</a>
        </div>
        <div>
          <mwc-icon><img src="./images/github.png" width="24px"></mwc-icon><a href="${this.project.github}" target="_blank">${this.project.github}</a>
        </div>
      </div>
    </div>
    `
  }
}