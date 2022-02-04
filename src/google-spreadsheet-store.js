export default class GoogleSpreadsheetStore {

  fetchContent(query) {
    const options = {
      // mode: 'cors',
      // headers: {
        // 'x-client-name': 'nextgen',
      // },
      // cache: 'default'
    };

    return fetch(query, options)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          return json;
        })
        .catch((error) => { throw new Error(error) });
  }

  getSpreadsheet(spreadsheetId, key) {
    const query = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/CONTENT?alt=json&key=${key}`;

    return this.fetchContent(query).then(data => this.prettifyGoogleSheetsJSON(data));
  }

  prettifyGoogleSheetsJSON(data) {
    let rows = data.values;
    const labels = rows[0].map((label, index) => label.toLowerCase().replace(/\s/g, ''));
    rows.slice(0,1);

    return rows.map((row) => {
      const prettifiedRow = {}
      for(let i=1; i < row.length; i++) {
        prettifiedRow[labels[i]] = row[i];
      }
      return prettifiedRow;
    });
  }
}
