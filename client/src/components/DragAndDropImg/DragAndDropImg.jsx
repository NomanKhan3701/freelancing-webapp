import React, { useState, useRef, useEffect } from "react";
import "./DragAndDropImg.scss";

const DragAndDropImg = () => {
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    console.log(files);
    
  }, [files])
  

  const handleFileInput = (e) => {
    let file = inputRef.current.files;
    let Files = files;
    for (let i = 0; i < file.length; i++) {
      if (Files.every((e) => e.name !== file[i].name)) Files.push(file[i]);
    }
    setFiles(Files);
    formRef.current.reset();
  };

  return (
    <div className = "drag-drop-img">
      <div className = "top">
        <p>Drag & drop image uploading</p>
        <button type = "button">Upload</button>
      </div>
      <form ref = {formRef} action = "/upload" method = "post" className="">
        <span className = "inner">
          Drag & drop image here or{" "}
          <span onClick = {() => inputRef.current.click()} className = "select">
            Browse
          </span>
        </span>
        <input
          onClick = {handleFileInput}
          ref = {inputRef}
          name = "file"
          type = "file"
          className = "file"
          multiple
        />
      </form>
      <div className = "container">
        {files
          ?files.map((file, index) => (
            <div key = {index} className = "image">
              <img src = {URL.createObjectURL(e)} alt = "image" />
              <span onclick = {delImage(i)}>&times;</span>
            </div>
          ))
          : ''}
      </div>
    </div>
  );
};

export default DragAndDropImg;
