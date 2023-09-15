document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("userForm");
    const responseDiv = document.getElementById("response");

    userForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        // Get user input
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        // Create a user object
        const user = { name, email };

        // Make a POST request to your server
        try {
            const response = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            if (response.status === 201) {
                const newUser = await response.json();
                responseDiv.textContent = `User created: ${newUser.name} (${newUser.email})`;
                userForm.reset(); // Clear the form
            } else {
                responseDiv.textContent = "Failed to create user.";
            }
        } catch (error) {
            responseDiv.textContent = "Error creating user: " + error.message;
        }
    });
});

//Challenge 5

document.getElementById("getUserDetails").addEventListener("click", () => {
    const userId = 123; // Replace with the desired user ID
    fetch(`/api/users/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        const userDetailsDiv = document.getElementById("userDetails");
        userDetailsDiv.innerHTML = `
          <p>User ID: ${data._id}</p>
          <p>Username: ${data.username}</p>
          <p>Email: ${data.email}</p>
          <p>First Name: ${data.firstName}</p>
          <p>Last Name: ${data.lastName}</p>
          <p>Age: ${data.age}</p>
        `;
      })
      .catch(error => {
        console.error("Fetch error:", error);
        const userDetailsDiv = document.getElementById("userDetails");
        userDetailsDiv.innerHTML = "Error fetching user details.";
      });
    })