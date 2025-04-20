<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
    <!-- Title -->
    <div class="mb-8 w-full flex justify-center">
      <div class="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4 transform hover:scale-105 transition-all duration-300">
        <div class="w-16 h-16 flex items-center justify-center text-blue-600">
          <i class="fas fa-user-circle text-4xl"></i>
        </div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Profile
        </h1>
      </div>
    </div>

    <!-- Profile Container -->
    <div class="max-w-2xl mx-auto">
      <div class="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
        <!-- Display User Profile if logged in -->
        <div v-if="user.username" class="space-y-8">
          <!-- Profile Picture Section -->
          <div class="flex flex-col items-center">
            <div class="relative group">
              <div v-if="!profilePic" class="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-blue-100 group-hover:border-blue-200 transition-all duration-300 shadow-lg">
                <i class="fas fa-user text-5xl text-gray-400"></i>
              </div>
              <img 
                v-else
                :src="profilePic" 
                alt="Profile Picture" 
                class="w-32 h-32 rounded-full object-cover border-4 border-blue-100 group-hover:border-blue-200 transition-all duration-300 shadow-lg"
              />
              <label 
                for="file-upload" 
                class="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer
                       transform hover:scale-110 transition-all duration-300"
              >
                <i class="fas fa-camera text-blue-600"></i>
                <input type="file" id="file-upload" @change="uploadProfilePic" class="hidden" accept="image/*" />
              </label>
            </div>
          </div>

          <!-- User Info -->
          <div class="text-center space-y-3">
            <h2 class="text-2xl font-bold text-gray-800">
              Welcome, {{ user.username }}!
            </h2>
            <p class="text-gray-600">
              <i class="fas fa-user-circle mr-2"></i>
              {{ user.role || 'User' }}
            </p>
          </div>

          <!-- Additional Info Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
              <div class="flex items-center space-x-3">
                <i class="fas fa-envelope text-blue-600"></i>
                <div>
                  <p class="text-sm text-gray-500">Email</p>
                  <p class="font-medium text-gray-800">{{ user.email || 'Not set' }}</p>
                </div>
              </div>
            </div>
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
              <div class="flex items-center space-x-3">
                <i class="fas fa-clock text-blue-600"></i>
                <div>
                  <p class="text-sm text-gray-500">Member Since</p>
                  <p class="font-medium text-gray-800">{{ new Date().toLocaleDateString() }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-center gap-4">
            <button 
              @click="logout"
              class="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl
                     hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-lg"
            >
              <i class="fas fa-sign-out-alt mr-2"></i>
              Logout
            </button>
          </div>
        </div>

        <!-- Prompt for Login if not logged in -->
        <div v-else class="text-center py-8">
          <i class="fas fa-user-lock text-6xl text-gray-300 mb-4"></i>
          <p class="text-red-600 font-semibold mb-4">You need to log in to view your profile.</p>
          <NuxtLink 
            to="/login"
            class="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl
                   hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
          >
            <i class="fas fa-sign-in-alt mr-2"></i>
            Login
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";

// Initialize state
const user = ref({});
const profilePic = ref(''); // Store the profile picture URL
const router = useRouter();

// Inject auth state from layout
const { updateAuthState } = inject('authState');

// Fetch user data from localStorage on component mount
onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser && storedUser.accessToken) {
    user.value = storedUser;
    // Load profile picture from localStorage if available
    profilePic.value = localStorage.getItem('profilePic') || ''; // Default to an empty string if no profile pic
  } else {
    // If no valid user data, update state only
    updateAuthState(null);
  }

  // Listen for changes in the localStorage to handle auth updates
  window.addEventListener('storage', () => {
    const updatedUser = JSON.parse(localStorage.getItem('user'));
    if (updatedUser && updatedUser.accessToken) {
      user.value = updatedUser;
    } else {
      updateAuthState(null);
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

// Logout function: Clears user data and redirects to home page
const logout = () => {
  // Clear all auth-related data
  localStorage.removeItem('user');
  localStorage.removeItem('profilePic');
  
  // Clear state
  user.value = {};
  profilePic.value = '';
  
  // Update auth state in layout
  updateAuthState(null);
  
  // Navigate to home page
  router.push('/');
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
