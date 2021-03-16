import {css, customElement, html, LitElement, property, query} from 'lit-element'
import { Blockchain, Project, projectProperties, tiers } from '../types';
import '@material/mwc-textfield'
import { nothing } from 'lit-html';
import './blockchain-form'
import '@material/mwc-icon-button'
import { BlockchainForm } from './blockchain-form';
import './project-form'
import '@material/mwc-top-app-bar'
import {installRouter} from 'pwa-helpers'
import './pages/project-page'
import './pages/blockchain-page'
import { ProjectForm } from './project-form';
import pageStyles from './styles/page-styles';
import '@material/mwc-snackbar'
import {Snackbar} from '@material/mwc-snackbar'
import { ProjectPage } from './pages/project-page';
import '@material/mwc-tab-bar'
import '@material/mwc-tab'

declare global {
  interface Window {
    app: AppContainer;
  }
}

@customElement('app-container')
export class AppContainer extends LitElement {
  @property()
  private page: ''|'project'|'blockchain' = '';

  @property({type: Array})
  public projects: Project[] = []

  @property({type:Array})
  public blockchains: Blockchain[] = [];

  @property({type:Object})
  blockchain?: Blockchain;

  private project?: Project;

  @property()
  private tier = 'S'

  @query('project-page') projectPage!: ProjectPage;
  @query('project-form') projectForm!: ProjectForm;
  @query('blockchain-form') blockchainForm!: BlockchainForm;
  @query('mwc-snackbar') snackbar!: Snackbar;

  constructor() {
    super()
    window.app = this

    fetch('./projects.json').then(async response => {
      this.projects = await response.json()
    })

    fetch('./blockchains.json').then(async (response) => {
      this.blockchains = await response.json()
    })
  }

  static styles = [
    pageStyles,
    css`
    :host {
      --mdc-theme-primary: #616161;
      --mdc-theme-primary: #455a64;
    }
    .tag {
      background-color: black;
      color: white;
      padding: 4px;
      cursor: pointer;
    }
    .blockchain {
      background-color: black;
      color: white;
      cursor: pointer;
    }
    .button-list > mwc-button {
      margin: 4px 2px;
    }
    .tiers {
      margin: 12px;
    }
    .tier {
      display: none
    }
    .tier[show] {
      display: block
    }
    `
  ];

  render() {
    this.determinePage();

    let title = 'Listing';
    if (this.page === 'project') {
      title = this.project!.name;
    }
    else if (this.page === 'blockchain') {
      title = this.blockchain!.name;
    }

    return html`
    <mwc-top-app-bar>
      ${this.page !== '' ? html`
      <mwc-icon-button icon="home" slot="navigationIcon"
          @click="${() => window.location.hash = ''}"></mwc-icon-button>
      ` : nothing }
      <div slot="title">${title}</div>
      ${this.page !== '' ? html`
      <mwc-icon-button icon="edit" slot="actionItems"
          @click="${this.onEditClick}"></mwc-icon-button>
      ` : nothing}
      <div id="content">
        ${this.page === '' ? html`
        <div class="wrapper">
          <mwc-textfield label="search (bientôt disponible)" type="search" style="width:100%;margin:10px 0 30px"></mwc-textfield>
          <div class="title">Projects</div>
          <div class="container button-list">
            ${this.projects.map(p => {
              return html`
              <mwc-button raised
                @click="${() => this.goProject(p)}">${p.name}</mwc-button>`;
            })}
            <mwc-button outlined icon="add"
                @click="${() => this.projectForm.open()}">add project</mwc-button>
          </div>

          <div class="title">Blockchains</div>
          <div class="container button-list">
            ${this.blockchains.map(b => {
              return html`
              <mwc-button raised
                @click="${() => this.goBlockchain(b)}">${b.name}</mwc-button>`;
            })}
            <mwc-button outlined icon="add">add blockchain</mwc-button>
          </div>


          <div class="title">Tiers List</div>
          <mwc-tab-bar
            @MDCTabBar:activated="${e => this.tier = tiers[e.detail.index]}">
            ${tiers.map(tier => {
              return html`<mwc-tab label="${tier}"></mwc-tab>`
            })}
          </mwc-tab-bar>

          <div class="tiers">
          ${tiers.map(tier => {
            return html`
            <div class="tier button-list" ?show="${tier === this.tier}">
              ${this.projects.filter(p => p.tier === tier).map(p => {
                return html`<mwc-button raised>${p.name}</mwc-button>`
              })}
            </div>
            `
          })}
          </div>
        </div>
        ` : nothing }

        ${this.page === 'project' ? html`
        <project-page .project="${this.project}"></project-page>
        `: nothing}

        ${this.page === 'blockchain' ? html`
        <blockchain-page .blockchain="${this.blockchain}"></blockchain-page>
        `: nothing}
      </div>
    </mwc-top-app-bar> 

    <project-form></project-form>
    <blockchain-form></blockchain-form>


    <mwc-snackbar></mwc-snackbar>
    `
  }

  firstUpdated() {
    installRouter(location => {
      // @ts-ignore
      this.page = location.hash.slice(1);
    })
  }

  goProject(p: Project) {
    this.project = p;
    window.location.hash = `project?v=${p.name}`
    // window.location.search = p.name;
  }

  goBlockchain (b: Blockchain|string) {
    let blockchain = b;
    if (typeof blockchain === 'string') {
      blockchain = this.blockchains.find(bc => bc.name === b)!
    }
    this.blockchain = blockchain;
    window.location.hash = `blockchain?v=${blockchain.name}`
  }

  onEditClick () {
    if (this.page === 'project') {
      this.projectForm.open(this.project)
    }
  }

  determinePage () {
    if (!window.location.hash) {
      this.page = '';
      return;
    }

    const { page, search } = this.getHash()

    switch (page) {
      case 'project':
        this.page = 'project'
        this.project = this.projects.find(p => p.name === search!.get('v'))
        break;
      case 'blockchain':
        this.page = 'blockchain'
        this.blockchain = this.blockchains.find(b => b.name === search!.get('v'))
        break;
    }
  }

  updateHash () {
    if (this.page === 'project') {
      const search = new URLSearchParams(`v=${this.project?.name}`)
      this.setHash('project', search, true)
    }
  }

  toast (message: string) {
    this.snackbar.labelText = message;
    this.snackbar.show()
  }

  getHash () {
    let hash = window.location.hash.slice(1)
    let search: URLSearchParams|undefined;
    const searchIndex = hash.indexOf('?')
    if (searchIndex > 0) {
      search = new URLSearchParams(hash.slice(searchIndex))
      hash = hash.slice(0, searchIndex)
    }
    return { page: hash, search }
  }
  setHash (page: string, search: URLSearchParams, replacePreviousState = false) {
    const hashInfo = this.getHash()
    if (page === hashInfo.page && search === hashInfo.search) {
      return;
    }
    const hash = `${page}?${search}`;
    if (replacePreviousState) {
      window.history.replaceState(null, '', `${window.location.pathname}#${hash}`)
      return;
    }
    window.location.hash = hash;
  }
}