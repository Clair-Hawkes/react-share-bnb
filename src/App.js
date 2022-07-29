import './App.css';
import axios from "axios";
import "./Box.css";
import Form from './Form.js';
import { LoremIpsum } from './TestData';
import { useEffect, useState } from 'react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const AWS_URL = process.env.REACT_APP_AWS_BASE_URL;

function App() {
  const [listings, setListings] = useState("");
  // console.log("In App", listings);

  function Title({ message = "Box!" }) {
    return <div><b className="BoxStyles">{message}</b></div>;
  }
  function Instruction({ message = LoremIpsum }) {
    return <div><b className="InstructionStyles">{message}</b></div>;
  }
  function ListingCard({ listing }) {
    // console.log('AWS IMG URL = ',`${AWS_URL}${listing.img_key}`);
    return (
      <div className='listingStyles'>
        <h5>{listing.title}</h5>
        <p>{listing.description}</p>
        <p>{listing.price}</p>
        <p>{listing.zipcode}</p>
        <br></br>
        <img src={`${AWS_URL}${listing.img_key}`} alt={listing.title} className="listing"></img>
      </div>
    );
  }

  useEffect(function fetchListingsOnMount() {
    async function ShareBnB() {
      const resp = (await axios({ url: BASE_URL, method: "get" })).data;

      console.log("resp.data = ", resp);
      setListings(resp.listings);
      return resp;
    }
    ShareBnB();
  }, []);


  /** TODO: update docstring to reflect JS FormData Object usage
   * Creates new listing.
  */
  async function createBnB(formData) {
    console.log("in createBnB", formData);

    if (!formData) { delete formData.file; }
    const resp = (await axios({
      url: BASE_URL,
      method: "post",
      data: formData,
    }));
    setListings(listings => [resp.data.listing, ...listings]);
  }

  // TODO: This HAS TO BE DONE IN FLASK!
  // Flask Filter for listings
  // Grab test-data from API to Mock call
  //setListing([Listings that meet the distance requirement])


  return (
    <div className="App">

      <Title message={"Welcome to ShareBnB!"}></Title>
      <Instruction message={"API INSTRUCTIONS"}></Instruction>
      <Form handleSave={createBnB}></Form>
      {!listings
        ? <p>Loading!</p>
        : <div>{listings.map(listing =>
          <ListingCard key={listing.title} listing={listing} />)}
        </div>
      }

    </div>
  );
}

export default App;