import './App.css';
// import { Axios } from 'axios';
import axios from "axios";
import "./Box.css";
import Form from './Form.js';
import { LoremIpsum } from './TestData';


function App() {

  // HandleForm
  //Calls our API!

  function Title({ message="Box!" }) {
    return <div><b className="BoxStyles">{message}</b></div>;
  }
  function Instruction({ message=LoremIpsum }) {
    return <div><b className="InstructionStyles">{message}</b></div>;
  }

  // TODO:
  async function ShareBnB(){
    // const resp = await Axios.get('http://localhost:5001/api/listings')
    const resp = (await axios({ url: 'http://localhost:5000/api/listings',method:"get"})).data;
    console.log("resp.data = ",resp);
    return resp;
  }
  ShareBnB();

  // Need POST axios request
  // Get file submission to Flask to pass to AWS
  // takes a file from form (formData)
  // passed to axios POST request /api/listings
  // resp.data -> new listing {}

  /** Accepts param file as
   *    fileInput.current.files[0]
  */
  async function createBnB(formData){
    console.log("in createBnB", formData);
    const resp = (await axios({ url: 'http://localhost:5000/api/listings',method:"post", data:formData}));
    console.log(resp.data);
  }


  return (
    <div className="App">

      <Title message={"Welcome to ShareBnB!"}></Title>
      <Instruction message={"API INSTYRUCTIUONS"}></Instruction>
      <Form handleSave={createBnB}></Form>




    </div>
  );
}

export default App;







// Form From

// <form encType="multipart/form-data" action="http://localhost:5001/" className="pb-4" method="POST">

// <label htmlFor="file">File:
//   <input type="file" name="file" id="file" required/>
// </label>
// <br/>


// <label htmlFor="title">Title:
//   <input type="text" name="title" id="title" required/>
// </label>
// <br/>


// <label htmlFor="description">Description:
//   <input type="text" name="description" id="description" required/>
// </label>
// <br/>


// <label htmlFor="price">Price:
//   <input type="text" name="price" id="price" required/>
// </label>
// <br/>

// <label htmlFor="zipcode">Zipcode:
//   <input type="text" name="zipcode" id="zipcode" required/>
// </label>
// <br/>

// <button className="btn btn-primary btn-lg w-100">
//   Uploads a File!
// </button>
// </form>
