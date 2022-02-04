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
          console.log(response)
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
    for (var i = 0; i < data.feed.entry.length; i++) {
        for (var key in data.feed.entry[i]) {
            if (data.feed.entry[i].hasOwnProperty(key) && key.substr(0,4) === 'gsx$') {
                // copy the value in the key up a level and delete the original key
                data.feed.entry[i][key.substr(4)] = data.feed.entry[i][key].$t.trim();
                delete data.feed.entry[i][key];
            }
        }
    }
    return data.feed.entry;
  }
}
