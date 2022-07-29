import React, { useState, useRef } from "react";

const defaultInitialFormData = {
  title: "",
  file: "",
  description: "",
  price: 1,
  zipcode: "",
  priority: 1
};

/** Form for adding a listing.
 *
 * Props:
 * - initialFormData
 * - handleSave: function to call in parent.
 * 
 * State:
 * - formData
 *
 *  App -> ListingForm
 */

function ListingForm({ initialFormData = defaultInitialFormData, handleSave }) {
  const [formData, setFormData] = useState(initialFormData);
  // console.log("ListingForm",formData);

  const fileInput = useRef();

  /** Update form input. */
  function handleChange(evt) {
    const input = evt.target;
    setFormData(formData => ({
      ...formData,
      [input.name]: input.value,
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    const jsFormDataObj = new FormData();

    jsFormDataObj.append('file', fileInput.current.files[0]);
    jsFormDataObj.append('title', formData.title);
    jsFormDataObj.append('description', formData.description);
    jsFormDataObj.append('price', formData.price);
    jsFormDataObj.append('zipcode', formData.zipcode);

    // To view FormData Object: use loop or FormData.get(KEY_NAME)
    // for(let item of jsFormDataObj){
    //   console.log("item in jsFormDataObj = ",item);
    // }

    handleSave(jsFormDataObj);
  }

  return (
    <form className="NewTodoForm" encType="multipart/form-data"
      onSubmit={handleSubmit} id="createlisting">

      <div className="mb-3">
        <input
          id="newListing-title"
          name="title"
          className="form-control"
          placeholder="Title"
          onChange={handleChange}
          value={formData.title}
          aria-label="Title"
        />
      </div>

      <div className="mb-3">
        <textarea
          id="newTodo-description"
          name="description"
          className="form-control"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
          aria-label="Description"
        />
      </div>

      <div className="mb-3">
        <textarea
          id="newTodo-price"
          name="price"
          className="form-control"
          placeholder="Price"
          onChange={handleChange}
          value={formData.price}
          aria-label="price"
        />
      </div>

      <div className="mb-3">
        <textarea
          id="newTodo-zipcode"
          name="zipcode"
          className="form-control"
          placeholder="Zipcode"
          onChange={handleChange}
          value={formData.zipcode}
          aria-label="zipcode"
        />
      </div>


      <div className="mb-3">
        <div className="w-75 d-flex justify-content-between">

          <label htmlFor="newTodo-priority"
            className="d-inline-flex">Priority:&nbsp;&nbsp;
          </label>
          <select id="newTodo-priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-control form-control-sm d-inline-flex"
          >
            <option value={1}>1 Mile Away</option>
            <option value={2}>2 Mile Away</option>
            <option value={3}>3 Miles Away</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="file">File:
            <input type="file" name="file" id="file" ref={fileInput} />
          </label>
        </div>

        <button className="btn-primary btn btn-sm NewTodoForm-addBtn">
          Find Listing!
        </button>

      </div>



    </form>
  );
}

export default ListingForm;
