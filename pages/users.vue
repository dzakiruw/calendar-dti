<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
    <!-- Alert Popup -->
    <div v-if="showAlert" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div class="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center transform transition-all duration-300">
        <div class="mb-4 text-red-600 text-2xl"><i class="fas fa-exclamation-circle"></i></div>
        <div class="mb-4 text-gray-800 font-semibold">{{ alertMessage }}</div>
        <button @click="showAlert = false" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
          Tutup
        </button>
      </div>
    </div>

    <!-- Success Alert -->
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

    <!-- Title -->
    <div class="mb-8 w-full flex justify-center">
      <div class="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4 transform hover:scale-105 transition-all duration-300">
        <img src="/input-jadwalhindari.png" alt="Icon Users" class="w-16 h-16 object-contain" />
        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Manajemen Pengguna
        </h1>
      </div>
    </div>

    <!-- Form and List Container -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Input Form -->
      <div class="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 class="text-xl font-semibold mb-6 text-gray-800">{{ isEditing ? 'Edit Pengguna' : 'Tambah Pengguna Baru' }}</h2>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Masukkan email"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Nama</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Masukkan nama"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Username</label>
            <input
              v-model="form.username"
              type="text"
              required
              class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Masukkan username"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              v-model="form.password"
              type="password"
              :required="!isEditing"
              class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              :placeholder="isEditing ? 'Kosongkan jika tidak ingin mengubah password' : 'Masukkan password'"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Role</label>
            <select
              v-model="form.role"
              required
              class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            >
              <option value="OPERATOR">OPERATOR</option>
              <option value="ADMINISTRATOR">ADMINISTRATOR</option>
            </select>
          </div>

          <div class="flex gap-4">
            <button
              v-if="isEditing"
              type="button"
              @click="cancelEdit"
              class="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-6 rounded-xl
                     hover:from-gray-700 hover:to-gray-800 transform hover:scale-105 transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl
                     hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {{ isEditing ? 'Update' : 'Simpan' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Users List -->
      <div class="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            <i class="fas fa-users mr-2"></i> Daftar Pengguna
          </h2>
          
          <!-- Search Input -->
          <div class="relative flex-1 max-w-xs ml-4">
            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Cari pengguna..."
              class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        <!-- Empty State -->
        <div 
          v-if="filteredUsers.length === 0" 
          class="flex-1 flex flex-col items-center justify-center text-gray-500"
        >
          <i class="fas fa-users text-4xl mb-4"></i>
          <p class="text-center">
            {{ searchQuery ? 'Tidak ditemukan pengguna yang sesuai.' : 'Belum ada pengguna yang ditambahkan.' }}
          </p>
        </div>

        <!-- Users List -->
        <div v-else class="overflow-y-auto pr-2" style="height: 600px;">
          <ul class="space-y-4">
            <li 
              v-for="user in filteredUsers" 
              :key="user.id" 
              class="group bg-gray-50 p-6 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-bold text-lg text-gray-800 mb-2">{{ user.name }}</h3>
                  <div class="space-y-2">
                    <div class="flex items-center gap-3">
                      <span class="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium">
                        <i class="fas fa-envelope"></i>
                        {{ user.email }}
                      </span>
                      <span class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-sm font-medium">
                        <i class="fas fa-user"></i>
                        {{ user.username }}
                      </span>
                    </div>
                    <div class="flex flex-wrap gap-2">
                      <span 
                        class="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium"
                      >
                        {{ user.role }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flex space-x-3">
                  <button 
                    @click="editUser(user)" 
                    class="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-300"
                    title="Edit"
                  >
                    <i class="fas fa-pencil-alt"></i>
                  </button>
                  <button 
                    @click="deleteUser(user.id)" 
                    class="p-2 text-gray-400 hover:text-red-600 transition-colors duration-300"
                    title="Hapus"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Popup -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300">
        <div class="text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-exclamation-triangle text-2xl text-red-600"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Konfirmasi Hapus</h3>
          <p class="text-gray-600 mb-6">
            Apakah Anda yakin ingin menghapus pengguna ini?
          </p>
          <div class="flex justify-center space-x-4">
            <button 
              @click="confirmDelete" 
              class="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-300"
            >
              Ya, Hapus
            </button>
            <button 
              @click="showDeleteConfirm = false" 
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors duration-300"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const users = ref([])
const isEditing = ref(false)
const editingId = ref(null)
const searchQuery = ref('')
const showDeleteConfirm = ref(false)
const selectedUserId = ref(null)
const showAlert = ref(false)
const alertMessage = ref('')
const showSuccess = ref(false)
const successMessage = ref('')

const form = ref({
  email: '',
  name: '',
  username: '',
  password: '',
  role: 'OPERATOR'
})

// Computed property for filtered users
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  
  const query = searchQuery.value.toLowerCase();
  return users.value.filter(user => 
    user.email.toLowerCase().includes(query) ||
    user.name.toLowerCase().includes(query) ||
    user.username.toLowerCase().includes(query) ||
    user.role.toLowerCase().includes(query)
  );
});

// Check user role on component mount
onMounted(async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user || user.role !== 'ADMINISTRATOR') {
    showAlertMessage('Akses ditolak. Anda tidak memiliki izin untuk mengakses halaman ini.')
    router.push('/')
    return
  }
  await fetchUsers()
})

// Fetch all users
const fetchUsers = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get('http://10.15.41.68:3000/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    showAlertMessage('Gagal mengambil data pengguna');
  }
}

// Handle form submission
const handleSubmit = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    // Prepare data for submission
    const submitData = {
      email: form.value.email,
      name: form.value.name,
      username: form.value.username,
      role: form.value.role
    };

    // Only include password if it's not empty
    if (form.value.password) {
      submitData.password = form.value.password;
    }

    if (isEditing.value) {
      await axios.patch(`http://10.15.41.68:3000/user/${editingId.value}`, submitData, { headers });
      showSuccessMessage('Pengguna berhasil diperbarui');
    } else {
      await axios.post('http://10.15.41.68:3000/user', submitData, { headers });
      showSuccessMessage('Pengguna berhasil ditambahkan');
    }
    
    resetForm();
    await fetchUsers();
  } catch (error) {
    console.error('Error saving user:', error);
    showAlertMessage('Gagal menyimpan data pengguna');
  }
}

// Edit user
const editUser = (user) => {
  isEditing.value = true;
  editingId.value = user.id;
  form.value = {
    email: user.email,
    name: user.name,
    username: user.username,
    role: user.role,
    password: '' // Reset password field
  };
}

// Cancel editing
const cancelEdit = () => {
  isEditing.value = false;
  editingId.value = null;
  resetForm();
}

// Delete user
const deleteUser = (id) => {
  selectedUserId.value = id;
  showDeleteConfirm.value = true;
}

// Confirm delete
const confirmDelete = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    await axios.delete(`http://10.15.41.68:3000/user/${selectedUserId.value}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    showDeleteConfirm.value = false;
    showSuccessMessage('Pengguna berhasil dihapus');
    await fetchUsers();
  } catch (error) {
    console.error('Error deleting user:', error);
    showAlertMessage('Gagal menghapus pengguna');
  }
}

// Reset form
const resetForm = () => {
  form.value = {
    email: '',
    name: '',
    username: '',
    password: '',
    role: 'OPERATOR'
  }
  isEditing.value = false;
  editingId.value = null;
}

// Show alert message
const showAlertMessage = (message) => {
  alertMessage.value = message;
  showAlert.value = true;
}

// Show success message
const showSuccessMessage = (message) => {
  successMessage.value = message;
  showSuccess.value = true;
  setTimeout(() => {
    showSuccess.value = false;
  }, 3000);
}
</script> 