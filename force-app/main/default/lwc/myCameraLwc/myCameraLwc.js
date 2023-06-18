import { LightningElement } from 'lwc';

export default class MyCameraLwc extends LightningElement {
    width = 320;
    height = 0;
    streaming = false;
  
  
    video;
    canvas;
    photo;
    startbutton;
  
    get acceptedFormats() {
      return ['.pdf', '.png'];
    }
  
    renderedCallback() {
      this.video = document.querySelector("#video");
      this.canvas = document.querySelector("#canvas");
      this.photo = document.querySelector("#photo");
      this.startbutton = document.querySelector("#startbutton");
  
      console.log(!!navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(function(stream) {
          video.srcObject = stream;
          video.play();
      })
      .catch(function(err) {
          console.log("An error occurred: " + err);
      });
    }
  
    handlePlay(e) {
      if (!this.streaming) {
        this.height = this.video.videoHeight / (this.video.videoWidth/this.width);
      
        video.setAttribute('width', this.width);
        video.setAttribute('height', this.height);
        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', this.height);
        streaming = true;
      }
    }
  
    handleUploadFinished(event) {
      // Get the list of uploaded files
      const uploadedFiles = event.detail.files;
      alert("No. of files uploaded : " + uploadedFiles.length);
    }
}