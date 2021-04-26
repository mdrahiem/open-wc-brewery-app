import { LitElement, html } from 'https://unpkg.com/lit-element?module';

class BreweryDetail extends LitElement {
  static get properties() {
    return {
      brewery: { type: Object },
      showOnlyVisited: { type: Boolean }
    }
  }

  _handleChange(e, id) {
    this.dispatchEvent(new CustomEvent('handle-visit-status', { detail: {value: e.target.value, id} }));
  }

  render() {
    const {id, name, brewery_type, city, status} = this.brewery;
    // if (this.showOnlyVisited && status == "true") {
      return html`
        <h3>${name} (${status == "true" ? 'visited' : 'not-visited'})</h3>
        <p>brewery type: ${brewery_type}</p>
        <p>city: ${city}</p>
        <input type="radio" id="visited" name="status" value="true" checked="true" @change="${e => this._handleChange(e, id)}" />
        <label for="visited">Visited</label>
        <input type="radio" id="not_visited" name="status" value="false" checked="false" @change="${e => this._handleChange(e, id)}" />
        <label for="not_visited">Not Visited</label>
      `;
    // }
  }
}

customElements.define('brewery-detail', BreweryDetail);