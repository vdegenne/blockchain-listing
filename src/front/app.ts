import {css, customElement, html, LitElement, property, query} from 'lit-element'
import { Blockchain } from '../types';
import '@material/mwc-textfield'
import { nothing } from 'lit-html';
import './blockchain-form'
import '@material/mwc-icon-button'
import { BlockchainForm } from './blockchain-form';

@customElement('app-container')
export class AppContainer extends LitElement {
  @property({type:Array})
  private blockchains: Blockchain[] = [];

  @property({type:Object})
  blockchain?: Blockchain;

  @query('blockchain-form') blockchainForm!: BlockchainForm;

  constructor() {
    super()

    fetch('./data.json').then(async (response) => {
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
    <mwc-icon-button
        @click="${() => this.blockchainForm.show()}" icon="edit"></mwc-icon-button>
    <div>
      <header>${this.blockchain.name} (${this.blockchain.creationdate})</header>
      <div class="title">Smart Contract</div>
      <div>${this.blockchain.smartcontract || 'Aucun'}</div>
    </div>
    ` : nothing}

    <blockchain-form></blockchain-form>
    `
  }
}