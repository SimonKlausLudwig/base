import './ShoppingList.css';
import useFetch from "react-fetch-hook";
import { Link } from 'react-router-dom';
function divider(sharedWith) {
  if (typeof (sharedWith == "String")) {
    return 2
  }
  else return sharedWith.length + 1
}

function deleteEntry(shoppingListID) {
  fetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/shoppingList/" + shoppingListID, {

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




function ShoppingList() {
  const { isLoading, data } = useFetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/shoppingList");
  if (isLoading === false) {
    console.log(Object.keys(data))
    console.log()

    return (
      <div className="App">
        <table>
          <tr>
            <th>Gegenstand</th>
            <th></th>
          </tr>
          {data.map(item => (
            <tr>
              <td>{item.item}</td>

              <td><button onClick={() => deleteEntry(item.shoppingListID)}>Löschen!</button></td>
            </tr>
          ))}
        </table>
      </div>

    );
  }
}

export default ShoppingList;
