// JavaScript code for handling navigation and generating image list
document.addEventListener('DOMContentLoaded', async function() {
    const imageList = document.getElementById('imageList');
    try {
      const response =  await fetch("/user/post");
      const data = await response.json();
  
      console.log(data);
  
      data.post.forEach((item) => {
  
        const resultContainer = document.createElement('div');
        const h1 = document.createElement("h1");
        h1.textContent = item.Caption;
        console.log(item.Caption);
  
        const decodedImage = atob(item.Image);
  
        // Convert the decoded string into an ArrayBuffer
        const buffer = new Uint8Array(decodedImage.length);
        for (let i = 0; i < decodedImage.length; i++) {
          buffer[i] = decodedImage.charCodeAt(i);
        }

        // Convert the ArrayBuffer to a Blob
        const imageBlob = new Blob([buffer], { type: 'image/jpg' });
  
        // Create a URL for the Blob
        const imageUrl = URL.createObjectURL(imageBlob);
        const imageItem = document.createElement('img');

        imageItem.className = 'imageItem';
        imageItem.src = imageUrl;

        resultContainer.appendChild(imageItem);
        resultContainer.appendChild(h1);

        imageList.appendChild(resultContainer);
      });
    }catch (error) {
      console.error("Error fetching data:", error);
    }
  });
  