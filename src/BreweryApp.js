import { LitElement, html, css } from 'https://unpkg.com/lit-element?module';
import './brewery-detail.js';
import 'https://unpkg.com/@material/mwc-button?module';

const GET_LIST_URL = 'https://api.openbrewerydb.org/breweries';

function breweryDetailTemplate(brewery, toggleVisitedStatus) {
    return html`
    <h3>${brewery.name} (${brewery.visited ? 'visited' : 'not-visited'})</h3>
    <p>brewery type: ${brewery.type}</p>
    <p>city: ${brewery.city}</p>
    <mwc-button raised @click=${toggleVisitedStatus}>
        Mark as ${brewery.visited ? 'not-visited' : 'visited'}
    </mwc-button>
    `;
}

class BreweryApp extends LitElement {
    static get styles() {
    return css`
        ul {
        display: flex;
        width: 800px;
        margin: 0px auto;
        justify-content: center;
        flex-wrap: wrap;
        }
        li {
        background: rgb(76, 0, 134);
        list-style-type: none;
        list-style-position: inside;
        color: rgb(255, 255, 255);
        flex: 1 1 45%;
        box-shadow: black 0px 0px 0px 1px;
        padding: 15px 5px;
        margin: 10px;
        }
        h1 {
        color: #4c0086;
        }
        h3 {
        margin-top: 0;
        }
        mwc-button {
        --mdc-theme-primary: #e9437a;
        --mdc-theme-on-primary: white;
        }
    `;
    }

    static get properties() {
    return {
        loading: { type: Boolean },
        breweries: { type: Array },
        filter: { type: String },
    }
    }
    
    connectedCallback() {
    super.connectedCallback();
    if(!this.breweries) {
        this.fetchBreweries();
    }
    this.showOnlyVisited = false;
    }

    async fetchBreweries() {
    this.loading = true;
    const response = await fetch(GET_LIST_URL);
    const jsonResponse = await response.json();
    this.breweries = jsonResponse;
    this.loading = false;
    }

    toggleVisitedStatus(breweryToUpdate) {
    this.breweries = this.breweries.map(brewery => {
        return brewery === breweryToUpdate
        ? { ...brewery, visited: !brewery.visited }
        : brewery;
    });
    }

    _filterNone() {
    this.filter = null;
    }

    _filterVisited() {
    this.filter = 'visited';
    }

    _filterNotVisited() {
    this.filter = 'not-visited';
    }

    render() {
    const totalVisited = this.breweries.filter(b => b.visited).length;
    const totalNotVisted = this.breweries.length - totalVisited;
    const breweries = this.breweries.filter(brewery => {
        if (!this.filter) {
        return true;
        }
        return this.filter === 'visited' ? brewery.visited : !brewery.visited;
    });
    if (this.isFetchingBreweries) {
        return 'Loading..';
    }
    return html`
        <h1>Total Visited: ${totalVisited}</h1>
        <mwc-button raised @click=${this._filterNone}>Filter none</mwc-button>
        <mwc-button raised @click=${this._filterVisited}>Filter visited</mwc-button>
        <mwc-button raised @click=${this._filterNotVisited}>Filter not-visited</mwc-button>
        <ul>
        ${breweries.map(
            brewery => html`
                <li>${breweryDetailTemplate(brewery, () => this.toggleVisitedStatus(brewery))}</li>
            `,
        )}
        </ul>
    `;
    }
}

customElements.define('brewery-app', BreweryApp);