import React, { Component } from 'react';
import { storage } from '../src/firebase/config';
import {albumService}  from "./sevices";
import axios from 'axios';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  	image: null,
		  	url: '',
		  	progress: 0,
		  	album: {
				names: ["Huy"],
				urlImages: ["Huy"]
			},
		  	images: [],
			imageUrls: [],
		  	message: '',
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
	  }
	  handleChange = e => {
		if (e.target.files[0]) {
		  const image = e.target.files[0];
		  this.setState(() => ({ image }));
		}
		let images = [];
		let names= [];
		for(var i = 0; i < e.target.files.length; i++ ){
			images[i] = e.target.files.item(i);
			names[i] = e.target.files.item(i).name;
		}
		images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/));
		let message = `${images.length} valid image(s) selected`;
		this.setState({ images , message});
		this.setState({ album: {names : names, urlImages : []}});
	  }
	  handleUpload = () => {

		const uploaders = this.state.images.map(image => {

			const uploadTask = storage.ref(`images/${image.name}`).put(image);

			uploadTask.on('state_changed',
			(snapshot) => {
				// progrss function ....
				const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
				this.setState({ progress });
			},
			(error) => {
				// error function ....
				console.log(error);
			},
			() => {
				// complete function ....
				storage.ref('images').child(image.name).getDownloadURL().then(url => {
					console.log('URL : ' + url);
					this.setState({ url });
					this.setState({
						imageUrls: [ ...this.state.imageUrls,url]
					});
					this.setState({
						album: {urlImages: [...this.state.album.urlImages, url] , names: this.state.album.names}
					});	
				})
			});
		})	
		setTimeout(()=> {
			albumService.uploadImage(this.state.album).then(data =>{
				if(data && data.errorCode > 200){
					console.log("Fail");
					return;
				}else if(data && data.errorCode === 0){
					console.log("Success");
				}
			})
		},10000);
	}

	render() {
		const style = {
			height: '100vh',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center'
		};
		// console.log('D: '+ this.state.imageUrls);
		return (
		  <div style={style}>
			<progress value={this.state.progress} max="100" />
			<br />
			<input type="file" onChange={this.handleChange} multiple/>
			{ this.state.message? <p className="text-info">{this.state.message}</p>: ''}
			<button onClick={this.handleUpload}>Upload</button>
			<br />
			{/* <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400" /> */}
			<div className="row col-lg-12">
				{ 
					this.state.imageUrls.map((url, i) => (
							<div className="col-lg-2" key={i}>
								<img src={url || 'http://via.placeholder.com/400x300'} className="img-rounded img-responsive" alt="not available"/><br/>
							</div>
						))
				}
			</div>
		  </div>
		)
	}
}

export default App; 			