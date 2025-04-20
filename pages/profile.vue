<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
    <!-- Profile Card -->
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <!-- Header with Background -->
        <div class="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        
        <!-- Profile Content -->
        <div class="relative px-8 pb-8">
          <!-- Profile Picture -->
          <div class="relative -mt-16 mb-6 flex justify-center">
            <div class="relative">
              <img 
                :src="getProfileImage"
                alt="Profile Picture"
                class="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-gray-100"
                @error="handleImageError"
              />
              
              <!-- Upload Button -->
              <label 
                class="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 p-2 rounded-full shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-110"
                title="Upload Photo"
              >
                <input 
                  type="file" 
                  @change="handleFileUpload" 
                  accept="image/*" 
                  class="hidden"
                />
                <i class="fas fa-camera text-white"></i>
              </label>
            </div>
          </div>

          <!-- Profile Info -->
          <div class="text-center">
            <h1 class="text-2xl font-bold text-gray-800 mb-2">{{ userData?.username || 'User Name' }}</h1>
            <p class="text-gray-600 mb-6">{{ userData?.role || 'Role' }}</p>
            
            <!-- Divider -->
            <div class="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6 rounded-full"></div>

            <!-- Logout Button -->
            <button 
              @click="handleLogout"
              class="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-xl
                     hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                     shadow-lg"
            >
              <i class="fas fa-sign-out-alt mr-2"></i>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userData = ref(null);
const profilePicture = ref(null);

// Computed property for profile image
const getProfileImage = computed(() => {
  return profilePicture.value || '/avatar.svg';
});

onMounted(() => {
  const user = localStorage.getItem('user');
  if (user) {
    userData.value = JSON.parse(user);
    const savedProfilePic = localStorage.getItem('profilePic');
    if (savedProfilePic) {
      profilePicture.value = savedProfilePic;
    }
  }
});

const handleImageError = (e) => {
  e.target.src = '/avatar.svg';
  console.log('Loading default avatar');
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profilePicture.value = e.target.result;
      localStorage.setItem('profilePic', e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

const handleLogout = () => {
  // Clear all auth-related data
  localStorage.removeItem('user');
  localStorage.removeItem('profilePic');
  localStorage.removeItem('dropdowns');
  
  // Update auth state
  updateAuthState(null);
  
  // Trigger storage event for sidebar update
  window.dispatchEvent(new Event('storage'));
  
  // Navigate to home page
  router.push('/');
};

const updateAuthState = (user) => {
  // Dispatch auth state change event
  window.dispatchEvent(new CustomEvent('auth-state-changed', { 
    detail: user 
  }));
  
  // Also trigger storage event for components that listen to storage changes
  window.dispatchEvent(new Event('storage'));
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
