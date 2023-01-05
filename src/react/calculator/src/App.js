import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { appendErrors, useForm } from "react-hook-form";
import Select from 'react-select'
import useFetch from "react-fetch-hook";

const contributor = "Luca"



function App() {
  const { isLoading, data } = useFetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/mates");
  const { register, handleSubmit, formState: { errors } } = useForm();


  if (isLoading) {
    return <div>Is loading!</div>
  }

  const mates = data;


  const onSubmit = data =>
    fetch("/api/bills/?contributor=" + contributor + "&amount=" + data.amount + "&sharedWith=" + data.sharedWith + "&comment=" + data.comment,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT",
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
          <div class="col">
            <select {...register("sharedWith")} name="sharedWith" id="sharedWith" multiple>
              <option value="niklas">Niklas</option>
              <option value="luca">Luca</option>
              <option value="tim">Tim</option>
              <option value="tom">Tom</option>
            </select>

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
        <div class="row">
          {mates.map(mate => <label>
            <p>{mate.firstname}</p>
            <p>{mate.lastname}</p>
            <p>{mate.personID}</p>
            <p>{mate.groupID}</p>
          </label>)}
        </div>


      </form>
    </main >
  );


}

export default App;

