import { css, customElement, html, LitElement, property, query } from "lit-element";
import '@material/mwc-button'
import '@material/mwc-textarea'
import '@material/mwc-dialog'
import '@material/mwc-textfield'
import '@material/mwc-select'
import { Dialog } from "@material/mwc-dialog";
import { Project, projectProperties, projectTypes } from "../types";
import { Select } from "@material/mwc-select";
import { nothing } from "lit-html";

@customElement('project-form')
export class ProjectForm extends LitElement {
  @property()
  private type: 'Create'|'Update' = 'Create';

  @property({type:Object})
  private project: Partial<Project> = {};

  @query('mwc-dialog') dialog!: Dialog;
  @query('#type-list') typeList!: Select;

  static styles = css`
  #dialog-content > mwc-textarea,
  #dialog-content > mwc-textfield,
  #dialog-content > mwc-select {
    display: block;
    margin: 27px 0;
  }

  .type {
    display: inline-block;
    padding: 4px 8px;
    background-color: #e0e0e0;
    border-radius: 4px;
    margin: 4px;
    white-space: nowrap;
  }
  `

  render () {
    return html`
    <mwc-dialog heading="${this.type} Project"
        @opened="${this.fixLayout}">
      <div id="dialog-content">
        <div style="width:1280px"></div>
        ${projectProperties.map(prop => {

          if (prop.name === 'type') {
            return html`
            <div style="display:flex;align-items:center;margin-bottom:6px;">
              <mwc-select id="type-list" label="Type" outlined style="flex:1">
                ${projectTypes.map(type => {
                  if (this.project.type?.split(',').includes(type)) return;
                  return html`<mwc-list-item value="${type}">${type}</mwc-list-item>`
                })}
              </mwc-select>
              <mwc-icon-button icon="add" style="margin: 0 0 0 6px"
                  @click="${this.addTypeToList}"></mwc-icon-button>
            </div>
            <div style="overflow-wrap:break-word">
              ${this.project.type?.split(',').map(t => {
                if (!t) return;

                return html`<span class="type">${t}</span>`
              })}
            </div>
            <input type="hidden" name="type">
            `
          }

          switch (prop.type) {
            case 'textfield':
              return html`
              <mwc-textfield outlined ?required="${prop.name === 'name'}"
                helper="${prop.helper || ''}"
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

      <mwc-button outlined slot="secondaryAction" @click="${this.reset}">reset</mwc-button>
      <mwc-button unelevated
        style="vertical-align:middle"
        slot="secondaryAction"
        @click="${() => this.submit()}"
      >${this.type}</mwc-button>
      <mwc-button
        slot="primaryAction" dialogAction="close">cancel</mwc-button>
    </mwc-dialog> 
    `
  }

  getElFromName (name: string) {
    return this.shadowRoot!.querySelector<HTMLInputElement>(`[name=${name}]`)!;
  }

  addTypeToList () {
    if (this.project.type?.split(',').includes(this.typeList.value)) {
      return;
    }
    this.project.type = this.project.type ? `${this.project.type},${this.typeList.value}` : `${this.typeList.value}`
    this.getElFromName('type').value = this.project.type;
    this.requestUpdate()
  }

  async open(p?: Project) {
    this.requestUpdate()
    await this.updateComplete
    if (p) {
      this.project = p
      if (this.type === 'Create')
        this.fill(p)
      this.type = 'Update';
    }
    else {
      if (this.type === 'Update') {
        this.reset()
      }
      this.type = 'Create';
    }
    // if (p) {
    //   this.fill(p)
    // }
    // else {
    //   this.reset()
    // }
    // this.project = p;
    this.dialog.show()
  }

  async fill (p: Project) {
    for (const [prop, value] of Object.entries(p)) {
      this.shadowRoot!.querySelector<HTMLInputElement>(`[name=${prop}]`)!.value = value;
    }
  }

  reset () {
    this.shadowRoot!.querySelectorAll<HTMLInputElement>(`[name]`).forEach(el => {
      el.value = '';
    })
    this.project = {}
  }

  fixLayout () {
    this.shadowRoot!.querySelectorAll(`mwc-textfield, mwc-textarea, mwc-select`).forEach(el => {
      el.layout()
    });
  }

  serializeForm () {
    return Object.fromEntries(
    [...this.shadowRoot!.querySelectorAll<HTMLInputElement>(`[name]`)].map(el => {
      return [el.getAttribute('name'), el.value]
    })
    )
  }

  submit () {
    if (!this.validateForm()) {
      return;
    }
    const project = this.serializeForm();
    if (this.type === 'Update') {
      Object.assign(this.project, project)
      window.app.updateHash()
      window.app.projectPage.requestUpdate()
      window.app.toast('updated')
    }
    else if (this.type === 'Create') {
      window.app.projects.push(project)
      window.app.toast('added to the list')
    }
      window.app.requestUpdate()
      this.dialog.close();
  }

  validateForm () {
    for (const el of this.shadowRoot!.querySelectorAll<HTMLInputElement>(`[name]`)) {
      if (!el.checkValidity()) {
        el.reportValidity()
        return false;
      }
    }
    return true;
  }
}