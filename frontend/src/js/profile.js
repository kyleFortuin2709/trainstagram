import * as api from "./service.js";
window.onload= function() { 
    console.log('onload')
    const response = api.getUserProfile();

    response.then((data) => {
        console.log('data: ', data);
        if(data.success) {
            document.getElementById("username").innerText = data.user.username;
            document.getElementById("biography").innerText = data.user.biography;
            const decodedImage = atob(data.user.profilePicture);
            // Convert the decoded string into an ArrayBuffer
            const buffer = new Uint8Array(decodedImage.length);
            for (let i = 0; i < decodedImage.length; i++) {
                buffer[i] = decodedImage.charCodeAt(i);
            }

            // Convert the ArrayBuffer to a Blob
            const imageBlob = new Blob([buffer], { type: 'image/png' });
            const imageUrl = URL.createObjectURL(imageBlob);
            // const img = document.createElement("img");
            document.getElementById("profilePicture").attributes("src") = imageUrl;
            // img.src = imageUrl;
        }
    });
 }; 