import React, { Component } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import logo from '../../assets/circles.png';
import '../Footer/Footer.css'
import axios from 'axios';

class Footer extends Component {
  state = {
    selectedFile: null,
    fileUploadedSuccesfully: false
  }

  onFileChange = event => {
    this.setState({selectedFile: event.target.files[0]});
  }

  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "demo file",
      this.state.selectedFile,
      this.state.selectedFile.name
    )

    //call api
    axios.post("https://zuw346yrn5.execute-api.eu-west-1.amazonaws.com/prod/file-upload", formData).then(() =>{
      this.setState({selectedFile: null});
      this.setState({fileUploadedSuccesfully: true});
    })
  }

  fileData = () => {
    //Display the file details to the user
    if (this.state.selectedFile) {
      return (
      <div>
        <br />
        <h2>File Details</h2>
        <p>File Name: {this.state.selectedFile.name}</p>
        <p>File Name: {this.state.selectedFile.type}</p>
      </div>
      );
    } else if (this.state.fileUploadedSuccesfully) {
      return (
      <div>
        <br />
        <h4>Your image has been uploaded!</h4>
      </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose a file to upload</h4>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <h2>Is there a book you are looking for that is not available?</h2>
        <br />
        <h5>Upload an image of your book and we will order it for you</h5>
        <br />
        <div>
          <input type = "file" onChange = {this.onFileChange} />
          <button onClick = {this.onFileUpload}>
            Upload
          </button>
        </div>
        {this.fileData()}
        <br />
        <br />
      </div>
    );
  }
}

export default Footer;