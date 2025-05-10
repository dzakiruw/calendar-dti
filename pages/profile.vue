<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
    <!-- Success Notification -->
    <div v-if="showSuccess" class="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-lg transform transition-all duration-300 z-50">
      <div class="flex items-center">
        <div class="py-1">
          <i class="fas fa-check-circle text-xl mr-3"></i>
        </div>
        <div>
          <p class="font-semibold">{{ successMessage }}</p>
        </div>
        <button @click="showSuccess = false" class="ml-4 text-green-700 hover:text-green-900">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <!-- Error Notification -->
    <div v-if="showError" class="fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-lg transform transition-all duration-300 z-50">
      <div class="flex items-center">
        <div class="py-1">
          <i class="fas fa-exclamation-circle text-xl mr-3"></i>
        </div>
        <div>
          <p class="font-semibold">{{ errorMessage }}</p>
        </div>
        <button @click="showError = false" class="ml-4 text-red-700 hover:text-red-900">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <!-- Alert Confirmation Popup -->
    <div v-if="showConfirmPopup" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div class="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center transform transition-all duration-300">
        <div class="mb-4 text-blue-600 text-2xl"><i class="fas fa-question-circle"></i></div>
        <div class="mb-4 text-gray-800 font-semibold">Apakah Anda yakin ingin mengganti password?</div>
        <div class="flex justify-center gap-4">
          <button @click="onConfirmChangePassword" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">Ya</button>
          <button @click="showConfirmPopup = false" class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300">Batal</button>
        </div>
      </div>
    </div>
    <!-- Profile Card -->
    <div class="max-w-lg w-full mx-auto">
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
                class="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 w-8 h-8 flex items-center justify-center rounded-full shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-110"
                title="Upload Photo"
              >
                <input 
                  type="file" 
                  @change="handleFileUpload" 
                  accept=".jpg,.jpeg,.png" 
                  class="hidden"
                />
                <i class="fas fa-camera text-white text-sm"></i>
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
            <!-- Change Password Confirmation Button -->
            <button v-if="!showChangePasswordForm" @click="showConfirmPopup = true" class="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Ubah Password</button>
            <!-- Change Password Form -->
            <form v-if="showChangePasswordForm" @submit.prevent="handleChangePassword" class="mt-10 max-w-xs mx-auto text-left">
              <h2 class="text-lg font-semibold mb-4 text-gray-800">Ubah Password</h2>
              <div class="mb-4">
                <label class="block text-gray-700 font-semibold mb-2">Password Lama</label>
                <input v-model="oldPassword" type="password" required class="w-full px-3 py-3 h-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" placeholder="Masukkan password lama" />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 font-semibold mb-2">Password Baru</label>
                <input v-model="newPassword" type="password" required class="w-full px-3 py-3 h-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" placeholder="Masukkan password baru" />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 font-semibold mb-2">Konfirmasi Password Baru</label>
                <input v-model="confirmPassword" type="password" required class="w-full px-3 py-3 h-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" placeholder="Konfirmasi password baru" />
                <div v-if="passwordError" class="w-full text-sm text-red-600 mt-1">{{ passwordError }}</div>
              </div>
              <div class="flex flex-col gap-3">
                <button type="submit" class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 text-sm rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Ubah Password</button>
                <button type="button" @click="handleCancelPassword" class="w-full bg-gray-200 text-gray-700 py-2 px-4 text-sm rounded-lg hover:bg-gray-300 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">Cancel</button>
              </div>
              <div v-if="passwordSuccess" class="mt-4 text-green-600">{{ passwordSuccess }}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

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
  // console.log('Loading default avatar');
};

const showError = ref(false);
const errorMessage = ref('');

function showErrorMessage(msg) {
  errorMessage.value = msg;
  showError.value = true;
  setTimeout(() => {
    showError.value = false;
  }, 3000);
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      showErrorMessage('Format file tidak didukung. Gunakan format JPG, JPEG, atau PNG.');
      return;
    }

    // Check file size (2MB = 2 * 1024 * 1024 bytes)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      showErrorMessage('Ukuran file terlalu besar. Maksimal ukuran file adalah 2MB.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      // Update profile picture
      profilePicture.value = e.target.result;
      
      // Update localStorage
      localStorage.setItem('profilePic', e.target.result);
      
      // Update user data in localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        user.profilePicture = e.target.result;
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      // Trigger storage event for sidebar update
      window.dispatchEvent(new Event('storage'));
      
      // Show success message
      showSuccessMessage('Foto profil berhasil diperbarui!');
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

// Change password state
const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const passwordError = ref('');
const passwordSuccess = ref('');
const showChangePasswordForm = ref(false);
const showConfirmPopup = ref(false);
const showSuccess = ref(false);
const successMessage = ref('');

const onConfirmChangePassword = () => {
  showChangePasswordForm.value = true;
  showConfirmPopup.value = false;
};

const handleChangePassword = async () => {
  passwordError.value = '';
  passwordSuccess.value = '';
  if (oldPassword.value === newPassword.value) {
    passwordError.value = 'Password baru harus berbeda dengan password lama.';
    return;
  }
  if (newPassword.value !== confirmPassword.value) {
    passwordError.value = 'Password baru dan konfirmasi tidak cocok.';
    return;
  }
  if (newPassword.value.length < 6) {
    passwordError.value = 'Password baru minimal 6 karakter.';
    return;
  }
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.accessToken;
    if (!token) throw new Error('User not authenticated');
    await axios.patch('http://10.15.41.68:3000/user/me', {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    // Reset form state and show notification
    passwordSuccess.value = '';
    oldPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
    showChangePasswordForm.value = false;
    showSuccessMessage('Password berhasil diubah!');
  } catch (err) {
    passwordError.value = err.response?.data?.message || 'Gagal mengubah password.';
  }
};

function showSuccessMessage(msg) {
  successMessage.value = msg;
  showSuccess.value = true;
  setTimeout(() => {
    showSuccess.value = false;
  }, 3000);
}

// Fungsi untuk handle cancel dan clear form
function handleCancelPassword() {
  oldPassword.value = '';
  newPassword.value = '';
  confirmPassword.value = '';
  passwordError.value = '';
  passwordSuccess.value = '';
  showChangePasswordForm.value = false;
}
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
