import fetch from 'cross-fetch';
import { tokenUtil } from '../utils/token';

const uploadImage = data => {

    const getObject = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
			"Authorization" :"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtSzl0MkRBMVkwMTQiLCJpYXQiOjE1NTIwMTY5NjEsImV4cCI6MTU1MjYyMTc2MSwicm9sZSI6IlVTRVIifQ.yhbthxBwA74zHsIYtyklNkH5f4qyKsLIElqFJLjcTBlkVX8FtTqBipf0dP2i7lmjOu-PpsxbEHqO1QFPKAGz_Q"
        },
        body: JSON.stringify(data)
     };
     let url =  'http://localhost:8080/albums/saveAlbum' ;
    //  tokenUtil.updateOrCreateHeader(getObject);
     return fetch(url, getObject) .then(responseData => {
        // tokenUtil.checkAuthorizedStatus(responseData);
        if (responseData.status >= 400) {
           throw new Error(responseData.statusText);
        }
        return responseData.json();
     })
     .then(data => {
        if (data.errorCode === 0) {
           return data;
        }
     })
     .catch(err => {
        return err;
     });
}
export const albumService = {
    uploadImage
}