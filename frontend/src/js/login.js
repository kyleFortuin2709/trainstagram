const form = document.getElementById("login-user");
form.addEventListener("submit", async (formEvent) => {
    formEvent.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("current-password").value;
    const formData = new FormData(formEvent.target);
    console.log({username, password});
    if (username && password) { 
      console.log('Trying To Fetch...');
      fetch("/loginuser", {
        method: "POST",
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({username,password})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          window.location.href = '/home';
          alert("Login Success");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Looks like your train got derailed! We'll choo-choo-try again to get it back on track!")
      });
      
    } else {
      alert("Please Fill In Your Username Or Password.");
    }
  
  });