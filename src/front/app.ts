import {css, customElement, html, LitElement, property} from 'lit-element'
import { Blockchain } from '../types';
import '@material/mwc-textfield'
import { nothing } from 'lit-html';

@customElement('app-container')
export class AppContainer extends LitElement {
  @property({type:Array})
  private blockchains: Blockchain[] = [];

  @property({type:Object})
  blockchain?: Blockchain;

  constructor() {
    super()

    fetch('/data.json').then(async (response) => {
      this.blockchains = await response.json()
    })
  }

  static styles = css`
  .blockchain {
    background-color: black;
    color: white;
    cursor: pointer;
  }
  `

  render() {
    return html`
    <mwc-textfield outlined label="search"></mwc-textfield>
    <div id="blockchains">
    ${this.blockchains.map(bc => {
      return html`
      <span class="blockchain"
          @click="${() => this.blockchain = bc}">${bc.name}</span>`
    })}
    </div>

    ${this.blockchain ? html`
    <div>
      <header>${this.blockchain.name} (${this.blockchain.creationdate})</header>
      <div class="title">Smart Contract</div>
      <div>${this.blockchain.smartcontract || 'Aucun'}</div>
    </div>
    ` : nothing}
    `
  }
}