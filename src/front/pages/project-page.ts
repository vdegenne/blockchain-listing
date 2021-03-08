import { css, customElement, html, LitElement, property } from "lit-element";
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
    pageStyles,
    css`
    .tier {
      padding: 8px;
      border: 2px solid var(--mdc-theme-primary);
      border-radius: 5px;
      font-size: 36px;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--mdc-theme-primary);
    }
    `
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

      <div class="container" style="display:flex;justify-content:space-between">
        <div>
        ${p.type ? p.type.split(',').map(t => {
          return html`<span class="tag">#${t}</span>`
        }) : nothing }
        </div>

        ${p.tier ? html`
        <div class="tier">${p.tier}</div>
        ` : nothing }
      </div>


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
        ${p.website ? html`
        <a href="${p.website}" target="_blank">
          <mwc-icon-button icon="language"></mwc-icon-button>
        </a>` : nothing }

        ${p.github ? html`
        <a href="${p.github}" target="_blank">
          <mwc-icon-button>
            <img src="./images/github.png" width="24px">
          </mwc-icon-button>
        </a>` : nothing }

        ${p.chart ? html`
        <a href="${p.chart}" target="_blank">
          <mwc-icon-button icon="show_chart"></mwc-icon-button>
        </a>
        ` : nothing}
      </div>
    </div>
    `
  }
}