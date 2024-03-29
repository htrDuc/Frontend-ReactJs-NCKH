import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import "../scss/file-upload.scss";

const UploadForm = () => {
  const [selectFile, setSelectFile] = useState(null);
  const [output, setOutput] = useState(false);
  const [respFromServer, setRespFromServer] = useState(null);
  const { algorithm } = useParams();
  let path = "";

  if (algorithm === "naive-bayes-classifer") path = "predictNaiveBayesFile";
  else if (algorithm === "random-forest-classifer")
    path = "predictRandomForestFile";
  else if (algorithm === "decision-tree-classifer")
    path = "predictDecisionTreeFile";

  const handleFile = (event) => {
    setSelectFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const url = `http://localhost:8000/${path}`;
    const fileToSend = selectFile;
    console.log(fileToSend);
    var formdata = new FormData();
    if (selectFile != null) {
      formdata.append("filePath", selectFile, selectFile.name);
    }
    const reqOpt = { method: "POST", body: formdata };

    const resp = await fetch(url, reqOpt);
    const resp2 = await resp.json();

    setRespFromServer(resp2.result);
    setOutput(true);
  };

  const iterateData = respFromServer;
  const checkPoint = output;
  let finalTableData;

  if (checkPoint) {
    const tableData = iterateData.map((x) => {
      if (path === "predictRandomForestFile") {
        return (
          <tr>
            <td>{x[0]}</td>
            <td>{x[1] * 100} % </td>
          </tr>
        );
      } else {
        return (
          <tr>
            <td>{x[0]}</td>
            <td>{x[1]} </td>
          </tr>
        );
      }
    });

    finalTableData = (
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Probability</th>
          </tr>
          {tableData}
        </tbody>
      </table>
    );
  } else {
    finalTableData = "No result, please upload file!!!";
  }
  return (
    <div className="UploadForm">
      <h2>Batch Processing: using {algorithm}</h2>
      <form onSubmit={handleUpload} className="data-table-form">
        <input
          id="input-upload"
          type="file"
          name="selectFile"
          hidden
          onChange={handleFile}
        />
        <label htmlFor="input-upload">Click to choose file upload</label>
        <Button color="#3498db" name="Submit" type="submit" />
      </form>
      <div className="message-no-data"> {finalTableData}</div>
    </div>
  );
};

export default UploadForm;
