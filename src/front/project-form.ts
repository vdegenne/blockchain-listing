import { css, customElement, html, LitElement, property, query } from "lit-element";
import '@material/mwc-button'
import '@material/mwc-textarea'
import '@material/mwc-dialog'
import '@material/mwc-textfield'
import '@material/mwc-select'
import { Dialog } from "@material/mwc-dialog";
import { Project, projectProperties } from "../types";

@customElement('project-form')
export class ProjectForm extends LitElement {
  @property()
  private type: 'Create'|'Update' = 'Create';

  @property({type:Object})
  private project?: Project;

  @query('mwc-dialog') dialog!: Dialog;

  static styles = css`
  mwc-textarea, mwc-textfield, mwc-select {
    display: block;
    margin: 20px 0;
  }
  `

  render () {
    return html`
    <mwc-dialog heading="${this.type} Project"
        @opened="${this.fixLayout}">
      <div>
        <div style="width:1280px"></div>
        ${projectProperties.map(prop => {
          switch (prop.type) {
            case 'textfield':
              return html`
              <mwc-textfield outlined ?required="${prop.name === 'name'}"
                name="${prop.name}" label="${prop.fullname}"></mwc-textfield>`;
            case 'textarea':
              return html`
              <mwc-textarea outlined rows="3" name="${prop.name}" label="${prop.fullname}"></mwc-textarea>`;
          }

          if (prop.name === 'blockchain') {
            return html`
            <mwc-select outlined name="${prop.name}" label="${prop.fullname}">
              <mwc-list-item></mwc-list-item>
              ${window.app.blockchains.map(b => {
                return html`<mwc-list-item value="${b.name}">${b.name}</mwc-list-item>`
              })}
            </mwc-select>
            `
          }

          if (prop.type instanceof Array) {
            return html`
            <mwc-select outlined name="${prop.name}" label="${prop.fullname}">
              <mwc-list-item></mwc-list-item>
              ${prop.type.map(v => {
                return html`<mwc-list-item value="${v}">${v}</mwc-list-item>`
              })}
            </mwc-select>
            `
          }
        })} 
      </div>

      <mwc-button unelevated
        style="vertical-align:middle"
        slot="secondaryAction">${this.type}</mwc-button>
      <mwc-button
        slot="primaryAction" dialogAction="close">cancel</mwc-button>
    </mwc-dialog> 
    `
  }

  open(p?: Project) {
    if (p) {
      this.fill(p)
    }
    else {
      this.reset()
    }
    // this.project = p;
    this.requestUpdate();
    this.dialog.show()
  }

  fill (p: Project) {
    for (const [prop, value] of Object.entries(p)) {
      this.shadowRoot!.querySelector<HTMLInputElement>(`[name=${prop}]`)!.value = value;
    }
  }

  reset () {
    this.shadowRoot!.querySelectorAll<HTMLInputElement>(`[name]`).forEach(el => {
      el.value = '';
    })
  }

  fixLayout () {
    this.shadowRoot!.querySelectorAll(`mwc-textfield, mwc-textarea, mwc-select`).forEach(el => {
      el.layout()
    });
  }
}