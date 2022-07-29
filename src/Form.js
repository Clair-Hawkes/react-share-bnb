import React, { useState, useRef } from "react";
// TODO: useRef


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
 * { TodoApp, EditableTodo } -> TodoForm
 */

// TODO: handleSubmit

function ListingForm({ initialFormData = defaultInitialFormData, handleSave }) {
  const [formData, setFormData] = useState(initialFormData);
  // console.log("ListingForm",formData);

  // FIXME:
  // const fileInput = React.createRef();
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
    // handleSave(formData);
    // setFormData(initialFormData);
    // console.log('form-Data', formData);
    // console.log(`Selected file - ${fileInput.current.files[0].name}`);
    //TODO: FormData Object has unqiue name:
    //to remind developer of the existance of the FormData Obj.

    // FIXME: Removing reaching into DOM.
    // const form = document.querySelector('#createlisting');
    // const jsFormDataObj = new FormData(form);

    const jsFormDataObj = new FormData();


    // FIXME: Move back to appending data not reaching into DOM
    jsFormDataObj.append('file', fileInput.current.files[0]);
    // jsFormDataObj.append('data', formData);

      jsFormDataObj.append('title', formData.title);
    // TODO: append all form inputs with corresponding name attribute
      jsFormDataObj.append('description', formData.description);
      jsFormDataObj.append('price', formData.price);
      jsFormDataObj.append('zipcode', formData.zipcode);





    // jsFormDataObj.append('test','test');

    for(let item of jsFormDataObj){
      console.log("item in jsFormDataObj = ",item);
    }
    // formData.file = fileInput.current.files[0];
    // console.log('jsFormData = ',jsFormDataObj);
    handleSave(jsFormDataObj);
    // alert(
    //   `Selected file - ${fileInput.current.files[0].name}`
    // );

  }

  return (
    <form className="NewTodoForm" encType="multipart/form-data" onSubmit={handleSubmit} id="createlisting">

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
