import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MultiSelectDropdown from "./MultiSelectDropdown";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import { appendErrors, useForm } from "react-hook-form";
//import Select from 'react-select'
import useFetch from "react-fetch-hook";



const contributor = "Luca"
/*
  < div class="row" >
  {
    mates.map(mate => <label>
      <p>{mate.firstname}</p>
      <p>{mate.lastname}</p>
      <p>{mate.personID}</p>
      <p>{mate.groupID}</p>
    </label>)
  }
        </div >
*/
function App() {
  const { isLoading, data } = useFetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/bills");
  const { register, handleSubmit, formState: { errors } } = useForm();


  if (isLoading) {
    console.log("...loading")
    return <div>Is loading!</div>
  }

  const bills = data;


  const onSubmit = data =>
    fetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/bills?contributor=" + contributor + "&amount=" + data.amount + "&sharedWith=" + data.sharedWith + "&comment=" + data.comment + "&billID=" + uuid(), {

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT"
    })
      .then(function (res) { window.location.reload() })
      .catch(function (res) { console.log(res) })


  const options = [
    { value: 'luca', label: 'Luca' },
    { value: 'niklas', label: 'Niklas' },
    { value: 'simon', label: 'Simon' }
  ]
  const MyComponent = () => (
    <Select options={options} isMulti />
  )

  //<Select options={options} isMulti={true} {...register("sharedWith")}></Select>

  return (

    <main class="form-signin w-100 m-auto">

      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="row">
          <div class="col">
            <div class="input-group mb-3">
              <span class="input-group-text">Betrag €</span>
              <input {...register("amount")} type="text" class="form-control" aria-label="Amount (to the nearest dollar)"></input>

            </div>

          </div>
          <div class="col checkbox">
            <div>
              <input type="checkbox" id="option1" value="niklas" />
              <label for="option1">Niklas</label>
            </div>
            <div>
              <input type="checkbox" id="option2" value="luca" />
              <label for="option2">Luca</label>
            </div>
            <div>
              <input type="checkbox" id="option3" value="tim" />
              <label for="option3">Tim</label>
            </div>
            <div>
              <input type="checkbox" id="option4" value="tom" />
              <label for="option4">Tom</label>
            </div>




          </div>

        </div>
        <div class="row">
          <div class="col">
            <div class="input-group " id="Kommentar">
              <span class="input-group-text">Kommentar</span>
              <textarea {...register("comment")} class="form-control" aria-label="Kommentar"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div>
              <button id="create" class="w-100 btn btn-lg btn-primary" type="submit">
                splitten
              </button>
            </div>
          </div>
        </div>
        <div class="row">
          <p class="text-start">Placeholder</p>
        </div>


      </form>
    </main >

  );


}

export default App;

