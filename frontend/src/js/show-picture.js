document.addEventListener('DOMContentLoaded', () => {
    // Fetch data from your server
    fetch(`/image/${4}`)
      .then(response => response.json()) // Assuming the response is JSON
      .then(data => {
        console.log(data);
        const decodedImage = atob(data.image);

        // Convert the decoded string into an ArrayBuffer
        const buffer = new Uint8Array(decodedImage.length);
        for (let i = 0; i < decodedImage.length; i++) {
          buffer[i] = decodedImage.charCodeAt(i);
        }

        // Convert the ArrayBuffer to a Blob
        const imageBlob = new Blob([buffer], { type: 'image/png' });

        // Create a URL for the Blob
        const imageUrl = URL.createObjectURL(imageBlob);
        document.getElementById('picture').src = imageUrl;
        document.getElementById('caption').innerText = data.tagline;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });