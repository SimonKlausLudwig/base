import './App.css';
import useFetch from "react-fetch-hook";
import { Link } from 'react-router-dom';
function divider(sharedWith) {
  if (typeof (sharedWith == "String")) {
    return 2
  }
  else return sharedWith.length + 1
}

function deleteEntry(billID) {
  fetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/bills/" + billID, {

    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "DELETE"
  })
    .then(function (res) { window.location.reload() })
    .catch(function (res) { console.log(res) })
}

// ...




function App() {
  const { isLoading, data } = useFetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/bills");
  if (isLoading === false) {
    console.log(Object.keys(data))
    console.log()

    return (
      <div className="App">
        <table>
          <tr>
            <th>Gläubiger</th>
            <th>Rechnung</th>
            <th>Schuldner</th>
            <th>Datum</th>
            <th>Betrag</th>
            <th></th>
          </tr>
          {data.map(item => (
            <tr>
              <td>{item.contributor}</td>
              <td>{item.billID}</td>
              <td>{item.sharedWith}</td>
              <td>{item.datum}</td>
              <td>{item.amount}</td>
              <td><button onClick={() => deleteEntry(item.billID)}>Löschen!</button></td>
            </tr>
          ))}
        </table>
      </div>

    );
  }
}

export default App;
