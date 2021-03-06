import { css, customElement, html, LitElement, query } from "lit-element";
import '@material/mwc-button'
import '@material/mwc-textarea'
import '@material/mwc-dialog'
import '@material/mwc-textfield'
import { Dialog } from "@material/mwc-dialog";
import { blockchainProperties } from "../types";

@customElement('blockchain-form')
export class BlockchainForm extends LitElement {
  @query('mwc-dialog') dialog!: Dialog;

  static styles = css`
  mwc-textarea {
    display: block;
    margin: 20px 0;
  }
  `

  render () {
    return html`
    <mwc-dialog heading="Informations">
      <div>
        <mwc-textfield
          outlined
          style="vertical-align:middle" slot="secondaryAction"></mwc-textfield>
        <div style="width:1280px"></div>
        ${blockchainProperties.map(prop => {
          if (typeof prop.type === 'string') {
            return html`<mwc-textarea outlined rows="1" name="${prop.name}" label="${prop.fullname}"></mwc-textarea>`;
          }
        })} 
      </div>

      <mwc-button unelevated
        style="vertical-align:middle"
        slot="secondaryAction">update</mwc-button>
      <mwc-button
        slot="primaryAction" dialogAction="close">cancel</mwc-button>
    </mwc-dialog> 
    `
  }

  show() {
    this.dialog.show()
  }
}