import './App.css';
import axios from 'axios';

function App() {

  // HandleForm
  //Calls our API!


  return (
    <div className="App">

      <form encType="multipart/form-data" action="http://localhost:5001/" className="pb-4" method="POST">

        <label htmlFor="file">File:
          <input type="file" name="file" id="file" required/>
        </label>
        <br/>


        <label htmlFor="title">Title:
          <input type="text" name="title" id="title" required/>
        </label>
        <br/>


        <label htmlFor="description">Description:
          <input type="text" name="description" id="description" required/>
        </label>
        <br/>


        <label htmlFor="price">Price:
          <input type="text" name="price" id="price" required/>
        </label>
        <br/>

        <label htmlFor="zipcode">Zipcode:
          <input type="text" name="zipcode" id="zipcode" required/>
        </label>
        <br/>

        <button className="btn btn-primary btn-lg w-100">
          Uploads a File!
        </button>
      </form>


    </div>
  );
}

export default App;
