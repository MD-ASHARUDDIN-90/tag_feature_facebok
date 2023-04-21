import "./styles.css";
import { useState } from "react";
import { RiDeleteBack2Fill } from "react-icons/ri";
export default function App() {
  //dummy user list for suggestion
  const users = ["ashar", "raaj", "sinchan", "doraemon"];

  const [tags, setTags] = useState([]);
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);

  // add tags functionality  on Enter
  function handleAddTags(e) {
    //when user cliks enter then add tag
    if (e.key === "Enter") {
      //when user didnot type and then enter
      if (e.target.value === "") {
        return;
      }
      //creating newTags
      const newTags = {
        id: Math.random(),
        tag: e.target.value
      };
      //add tags to array of tags by setter function
      setTags([...tags, newTags]);
      //empty the input box after adding tag
      setValue("");
    }
    //when user press "@" then show suggestion
    if (e.key === "@") {
      setShow(true);
    }
    //when user want to hide the suggestion
    if (e.key === "Backspace") {
      setShow(false);
    }
  }

  //adding suggestion to tags
  function handleSuggestionAdd(tag) {
    //creating newTags
    const newTags = {
      id: Math.random(),
      tag: tag
    };
    //add suggestion to array of tags by setter function
    setTags([...tags, newTags]);
    // hide the suggestion
    setShow(false);
    //empty the input box after adding tag
    setValue("");
  }

  //delete tags function
  const handleDelete = (selectElement) => {
    //creating new array of tags by filtering out with id
    const newTags = tags.filter((element) => element.id !== selectElement.id);
    //using setter function to display new tags after deleting
    setTags(newTags);
  };

  const handleClear = () => {
    setTags([]);
  };
  return (
    <div className="App">
      <h1>Tag Feature and Get Suggestion on "@"</h1>
      <div className="tag_container">
        {tags.map((element, index) => {
          return (
            <span className="tags" key={element.id}>
              {element.tag}{" "}
              <RiDeleteBack2Fill
                className="icon"
                onClick={() => handleDelete(element)}
              />
            </span>
          );
        })}
        <div>
          <input
            type="text"
            value={value}
            placeholder="Enter Tags"
            onKeyUp={handleAddTags}
            onChange={(e) => setValue(e.target.value)}
          />

          {users.map((element, index) => {
            return show ? (
              <span
                key={index}
                className="suggestion"
                onClick={() => handleSuggestionAdd(element)}
              >
                {element}
              </span>
            ) : null;
          })}
        </div>
      </div>
      <button className="btn" onClick={handleClear}>
        Clear All Tags
      </button>
    </div>
  );
}
