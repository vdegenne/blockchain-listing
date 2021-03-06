import { customElement, html, LitElement, property } from "lit-element";
import { nothing } from "lit-html";
import { Blockchain } from "../../types";
import pageStyles from "../styles/page-styles";


@customElement('blockchain-page')
export class BlockchainPage extends LitElement {
  @property({type:Object})
  blockchain!: Blockchain;

  static styles = [
    pageStyles
  ]

  render() {
    const b = this.blockchain;
    return html`
    <div class="wrapper">
      ${b.description ? html`
      <div class="container">
        <div class="description">${b.description}</div>
      </div>
      ` : nothing }

      <div class="container">
        <div class="title">Details</div>
        ${b.codename ? html`
        <div><b>codename: </b><span>${b.codename}</span></div>
        ` : nothing }
      </div>

      <div class="links container">
        <div class="title">Links</div>
        <div>
          <mwc-icon>language</mwc-icon><a href="${this.blockchain.website}" target="_blank">${this.blockchain.website}</a>
        </div>
        <div>
          <mwc-icon><img src="./images/github.png" width="24px"></mwc-icon><a href="${this.blockchain.github}" target="_blank">${this.blockchain.github}</a>
        </div>
      </div>
    </div>
    `
  }
}