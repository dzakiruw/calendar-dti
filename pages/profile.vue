<template>
  <div class="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
    <div class="bg-white p-8 shadow-md rounded-lg w-96">
      <h2 class="text-3xl font-bold text-center mb-6">Profile</h2>
      
      <!-- Display User Profile if logged in -->
      <div v-if="user.username">
        <p class="text-xl font-semibold text-center mb-4">Welcome, {{ user.username }} !</p>
        <p class="text-sm text-gray-600 text-center mb-6">i love you </p>

        <!-- Profile Picture -->
        <div class="flex items-center justify-center mb-4">
          <img :src="profilePic" alt="Profile Picture" class="w-24 h-24 rounded-full object-cover" />
        </div>

        <!-- Profile Picture Upload -->
        <div class="mb-4">
          <label for="file-upload" class="w-full text-center py-2 px-4 bg-blue-600 text-white rounded-lg cursor-pointer">
            Edit Photo
          </label>
          <input type="file" id="file-upload" @change="uploadProfilePic" class="hidden" />
        </div>
        
        <!-- Logout Button -->
        <button @click="logout" class="w-full bg-red-600 text-white py-2 px-4 rounded-lg mt-4">
          Logout
        </button>
      </div>
      
      <!-- Prompt for Login if not logged in -->
      <div v-else>
        <p class="text-red-600 font-semibold text-center">You need to log in to view your profile.</p>
        <div class="mt-4 flex justify-center space-x-4">
          <NuxtLink to="/login" class="bg-blue-600 text-white py-2 px-4 rounded-lg">Login</NuxtLink>
          <NuxtLink to="/register" class="bg-green-600 text-white py-2 px-4 rounded-lg">Register</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// Initialize state
const user = ref({});
const profilePic = ref(''); // Store the profile picture URL
const router = useRouter();

// Fetch user data from localStorage on component mount
onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser) {
    user.value = storedUser;
    // Load profile picture from localStorage if available
    profilePic.value = localStorage.getItem('profilePic') || ''; // Default to an empty string if no profile pic
  }

  // Listen for changes in the localStorage to handle auth updates
  window.addEventListener('storage', () => {
    const updatedUser = JSON.parse(localStorage.getItem('user'));
    if (updatedUser) {
      user.value = updatedUser;
    }
    // Update the profile picture as well if it's available
    profilePic.value = localStorage.getItem('profilePic') || '';
  });
});

// Function to handle profile picture upload
const uploadProfilePic = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    
    reader.onload = () => {
      // Save the uploaded image to localStorage
      localStorage.setItem('profilePic', reader.result);
      profilePic.value = reader.result; // Update profilePic state with the uploaded image
    };
    
    reader.readAsDataURL(file); // Convert image to base64 and save it in localStorage
  } else {
    alert("Please upload a valid image file.");
  }
};

// Logout function: Clears user data, reloads the page, and redirects to login page
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('profilePic'); // Clear profile picture from localStorage
  user.value = {}; // Clear user state
  window.localStorage.setItem('user', JSON.stringify({})); // Clear in localStorage as well
  window.location.reload(); // Force a page refresh to reflect the logout
};
</script>

<style scoped>
/* Center the profile container */
.bg-white {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Hide the default file input text and style the label */
input[type="file"] {
  display: none;
}

label[for="file-upload"] {
  display: block;
  text-align: center;
  padding: 12px;
  background-color: #1D4ED8;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

button {
  margin-top: 16px;
}

/* Adjust the profile picture size and margin */
img {
  margin-bottom: 16px;
}

/* Add text alignment for center */
.text-center {
  text-align: center;
}

/* Add spacing between elements */
.mb-4 {
  margin-bottom: 16px;
}
</style>
