import { useState } from "react";

const TestUpload = () => {
  const [file, setFile] = useState();
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <img src={file} />
    </div>
  );
};

export default TestUpload;
