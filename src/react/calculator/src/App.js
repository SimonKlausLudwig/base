import './App.css';
import useFetch from "react-fetch-hook";
function divider(sharedWith) {
  if (typeof (sharedWith == "String")) {
    return 2
  }
  else return sharedWith.length + 1
}

function App() {
  const { isLoading, data } = useFetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/bills");
  if (isLoading === false) {
    console.log(Object.keys(data))
    console.log()

    return (
      <div className="App">
        <table>
          <tr>
            <th>Name</th>
            <th>billID</th>
            <th>sharedWith</th>
            <th>amount per person</th>
          </tr>
          {data.map(item => (
            <tr>
              <td>{item.contributor}</td>
              <td>{item.billID}</td>
              <td>{item.sharedWith}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </table>
      </div>

    );
  }
}

export default App;
