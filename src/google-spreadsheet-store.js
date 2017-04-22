export default class GoogleSpreadsheetStore {

  fetchContent(query) {
    const options = {
      mode: 'cors',
      // headers: {
        // 'x-client-name': 'nextgen',
      // },
      cache: 'default'
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

  getSpreadsheet(apiId) {
    const query = `http://gsx2json.com/api?id=${apiId}`;

    return this.fetchContent(query).then(sheet => sheet);
  }
}
