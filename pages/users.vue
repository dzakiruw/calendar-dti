<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
    <!-- Alert Popup -->
    <div v-if="showAlert" class="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-md" @click="showAlert = false">
      <div class="bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl p-6 max-w-sm w-full text-center transform transition-all duration-300 border border-white/70 hover:shadow-blue-100/30" @click.stop>
        <div class="mb-4 text-red-600 text-2xl"><i class="fas fa-exclamation-circle"></i></div>
        <div class="mb-4 text-gray-800 font-semibold">{{ alertMessage }}</div>
        <button @click="showAlert = false" class="px-6 py-2 bg-blue-600/80 hover:bg-blue-700/90 text-white rounded-lg transition-colors duration-300 backdrop-blur-xl shadow-md hover:shadow-lg">
          Tutup
        </button>
      </div>
    </div>

    <!-- Success Alert -->
    <div v-if="showSuccess" class="fixed top-4 right-4 bg-white/70 backdrop-blur-xl border border-green-200/70 text-green-700 p-4 rounded-lg shadow-xl transform transition-all duration-300 z-50">
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
      <div class="bg-white/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 flex items-center space-x-4 transition-all duration-300 border border-white/70 hover:shadow-blue-100/30">
        <img src="/user-mgmt.png" alt="Icon Users" class="w-16 h-16 object-contain" />
        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Manajemen Pengguna
        </h1>
      </div>
    </div>

    <!-- Form and List Container -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Input Form -->
      <div class="bg-white/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/70 hover:shadow-blue-100/30 transition-all duration-500">
        <div class="flex items-center justify-between mb-5 border-b pb-3">
          <div class="flex items-center">
            <i class="fas fa-user-plus text-blue-600 text-xl mr-3"></i>
            <h2 class="text-xl font-bold text-blue-600">{{ isEditing ? 'Edit Pengguna' : 'Tambah Pengguna Baru' }}</h2>
          </div>
        </div>
        <div v-if="editInfoMessage" class="mb-4 bg-blue-100/50 backdrop-blur-xl border-l-4 border-blue-500/70 text-blue-700 p-4 rounded-lg flex items-center">
          <i class="fas fa-info-circle mr-2"></i>
          <span>{{ editInfoMessage }}</span>
          <button @click="editInfoMessage = ''" class="ml-auto text-blue-700 hover:text-blue-900">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full p-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 shadow-inner"
              placeholder="Masukkan email"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Nama</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full p-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 shadow-inner"
              placeholder="Masukkan nama"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Username</label>
            <input
              v-model="form.username"
              type="text"
              required
              class="w-full p-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 shadow-inner"
              placeholder="Masukkan username"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              v-model="form.password"
              type="password"
              :required="!isEditing"
              class="w-full p-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 shadow-inner"
              :placeholder="isEditing ? 'Kosongkan jika tidak ingin mengubah password' : 'Masukkan password'"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Role</label>
            <select
              v-model="form.role"
              required
              class="w-full p-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 shadow-inner"
            >
              <option value="OPERATOR">OPERATOR</option>
              <option value="ADMINISTRATOR">ADMINISTRATOR</option>
            </select>
          </div>

          <div class="flex gap-4 pt-4">
            <button
              type="submit"
              class="flex-1 bg-gradient-to-r from-blue-600/70 to-indigo-600/70 backdrop-blur-xl text-white py-3 px-6 rounded-xl hover:from-blue-700/90 hover:to-indigo-700/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
            >
              {{ isEditing ? 'Update' : 'Submit' }}
            </button>
            <button
              v-if="isEditing"
              type="button"
              @click="cancelEdit"
              class="flex-1 bg-gradient-to-r from-gray-600/70 to-gray-700/70 backdrop-blur-xl text-white py-3 px-6 rounded-xl hover:from-gray-700/90 hover:to-gray-800/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Users List -->
      <div class="bg-white/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/70 hover:shadow-blue-100/30 transition-all duration-500 flex flex-col">
        <div class="flex items-center justify-between mb-5 border-b pb-3">
          <div class="flex items-center">
            <i class="fas fa-list-ul text-blue-600 text-xl mr-3"></i>
            <h2 class="text-xl font-bold text-blue-600">Daftar Pengguna</h2>
          </div>
          <div class="flex items-center gap-2">
            <div class="bg-blue-100/50 backdrop-blur-xl text-blue-700 px-3 py-1 rounded-md text-sm font-medium flex items-center h-8 shadow-sm">
              <i class="fas fa-users mr-1.5"></i>
              {{ filteredUsers.length }} Pengguna
            </div>
            <button 
              @click="toggleFullscreen" 
              class="p-1.5 bg-gray-100/50 backdrop-blur-xl hover:bg-gray-200/50 rounded-md text-gray-700 transition-colors shadow-sm"
              title="Lihat semua pengguna"
            >
              <i class="fas fa-expand"></i>
            </button>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="w-full mb-4">
          <div class="relative">
            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Cari pengguna..."
              class="w-full pl-10 pr-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            />
          </div>
        </div>
        
        <!-- Filters -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex flex-wrap gap-2">
            <!-- Role Filter -->
            <select 
              v-model="roleFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Role</option>
              <option value="ADMINISTRATOR">Administrator</option>
              <option value="OPERATOR">Operator</option>
            </select>
          </div>
          
          <!-- Reset Filter Button -->
          <button 
            v-if="searchQuery || roleFilter !== 'all'"
            @click="resetFilters" 
            class="px-4 py-3 bg-blue-100/50 backdrop-blur-xl text-blue-700 rounded-lg hover:bg-blue-200/50 flex items-center whitespace-nowrap shadow-sm"
          >
            <i class="fas fa-undo mr-2"></i> Reset filter
          </button>
        </div>

        <!-- Empty State -->
        <div 
          v-if="filteredUsers.length === 0" 
          class="flex-1 flex flex-col items-center justify-center text-gray-500"
        >
          <i class="fas fa-filter text-4xl mb-4 text-blue-300"></i>
          <p class="text-center font-medium mb-4">
            {{ searchQuery ? 'Tidak ditemukan pengguna yang sesuai.' : 'Belum ada pengguna yang ditambahkan.' }}
          </p>
        </div>

        <!-- Users List -->
        <div v-else class="overflow-y-auto pr-2 h-[450px]">
          <ul class="space-y-4">
            <li 
              v-for="user in filteredUsers" 
              :key="user.id" 
              class="bg-blue-50/40 backdrop-blur-xl p-4 rounded-xl border border-blue-100/50 hover:bg-indigo-50/40 hover:border-indigo-200/50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div class="flex flex-col h-full">
                <!-- Top section with title and buttons -->
                <div>
                  <div class="flex justify-between items-start">
                    <div class="w-4/5">
                      <h3 class="font-bold text-gray-800 text-lg">{{ user.name }}</h3>
                      <span 
                        :class="{
                          'px-2 py-0.5 rounded-md text-xs font-medium inline-flex items-center gap-1 mt-1': true,
                          'bg-green-100/50 backdrop-blur-xl text-green-600': user.role === 'ADMINISTRATOR',
                          'bg-gray-100/50 backdrop-blur-xl text-gray-600': user.role === 'OPERATOR'
                        }"
                      >
                        <i :class="{
                          'fas fa-xs': true,
                          'fa-user-shield': user.role === 'ADMINISTRATOR',
                          'fa-user-cog': user.role === 'OPERATOR'
                        }"></i>
                        {{ user.role }}
                      </span>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex space-x-1">
                      <button 
                        @click="editUser(user)" 
                        class="p-1.5 text-blue-600 hover:text-white hover:bg-blue-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                        title="Edit pengguna"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button 
                        @click="deleteUser(user.id)" 
                        class="p-1.5 text-red-600 hover:text-white hover:bg-red-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                        title="Hapus pengguna"
                      >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Bottom section with details -->
                <div class="mt-2 pt-2 border-t border-blue-100">
                  <div class="flex flex-wrap gap-2 mb-2">
                    <span class="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium">
                      <i class="fas fa-envelope"></i>
                      {{ user.email }}
                    </span>
                    <span class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-sm font-medium">
                      <i class="fas fa-user"></i>
                      {{ user.username }}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Popup -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-[70]" @click="showDeleteConfirm = false">
      <div class="bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300 border border-white/70 hover:shadow-blue-100/30" @click.stop>
        <div class="text-center">
          <div class="w-16 h-16 bg-red-100/70 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <i class="fas fa-exclamation-triangle text-2xl text-red-600"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Konfirmasi Hapus</h3>
          <p class="text-gray-600 mb-6">
            Apakah Anda yakin ingin menghapus pengguna ini?
          </p>
          <div class="flex justify-center space-x-4">
            <button 
              @click="confirmDelete" 
              class="px-4 py-2 bg-red-600/80 backdrop-blur-xl text-white rounded-xl hover:bg-red-700/90 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Ya, Hapus
            </button>
            <button 
              @click="showDeleteConfirm = false" 
              class="px-4 py-2 bg-gray-200/80 backdrop-blur-xl text-gray-700 rounded-xl hover:bg-gray-300/90 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Fullscreen Popup -->
    <div v-if="isFullscreen" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-8" @click="toggleFullscreen">
      <div class="bg-white rounded-2xl shadow-2xl border border-white/70 w-full max-w-6xl h-[80vh] flex flex-col p-6 relative" @click.stop>
        <div class="flex items-center justify-between mb-4 border-b pb-3">
          <div class="flex items-center">
            <i class="fas fa-th-list text-blue-600 text-2xl mr-3"></i>
            <h2 class="text-2xl font-bold text-blue-600">Daftar Pengguna</h2>
          </div>
          <div class="flex items-center gap-2">
            <div class="bg-blue-100/50 backdrop-blur-xl text-blue-700 px-4 py-1.5 rounded-md text-base font-medium flex items-center h-8">
              <i class="fas fa-users mr-2"></i>
              {{ filteredUsers.length }} Pengguna
            </div>
            <button
              @click="toggleFullscreen"
              class="w-8 h-8 flex items-center justify-center bg-gray-200/50 hover:bg-gray-300/70 backdrop-blur-xl rounded-full text-gray-700 transition-colors shadow-md hover:shadow-lg"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <!-- Search Bar for Fullscreen -->
        <div class="w-full mb-4">
          <div class="relative">
            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Cari pengguna..."
              class="w-full pl-10 pr-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            />
          </div>
        </div>
        
        <!-- Filters -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex flex-wrap gap-2">
            <!-- Role Filter -->
            <select 
              v-model="roleFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Role</option>
              <option value="ADMINISTRATOR">Administrator</option>
              <option value="OPERATOR">Operator</option>
            </select>
          </div>
          
          <!-- Reset Filter Button -->
          <button 
            v-if="searchQuery || roleFilter !== 'all'"
            @click="resetFilters" 
            class="px-4 py-3 bg-blue-100/50 backdrop-blur-xl text-blue-700 rounded-lg hover:bg-blue-200/50 flex items-center whitespace-nowrap shadow-sm"
          >
            <i class="fas fa-undo mr-2"></i> Reset filter
          </button>
        </div>

        <!-- Multi-column List -->
        <div class="flex-1 overflow-y-auto pr-2 pb-8">
          <div v-if="filteredUsers.length === 0" class="flex flex-col items-center justify-center h-full text-gray-500">
            <i class="fas fa-filter text-6xl mb-4 text-blue-300"></i>
            <p class="text-center text-xl font-medium">
              {{ searchQuery ? 'Tidak ditemukan pengguna yang sesuai.' : 'Belum ada pengguna yang ditambahkan.' }}
            </p>
          </div>
          <ul v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <li 
              v-for="user in filteredUsers" 
              :key="user.id" 
              class="bg-blue-50/40 backdrop-blur-xl p-4 rounded-xl border border-blue-100/50 hover:bg-indigo-50/40 hover:border-indigo-200/50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div class="flex flex-col h-full">
                <!-- Top section with title and buttons -->
                <div>
                  <div class="flex justify-between items-start">
                    <div class="w-4/5">
                      <h3 class="font-bold text-gray-800 text-lg">{{ user.name }}</h3>
                      <span 
                        :class="{
                          'px-2 py-0.5 rounded-md text-xs font-medium inline-flex items-center gap-1 mt-1': true,
                          'bg-green-100/50 backdrop-blur-sm text-green-600': user.role === 'ADMINISTRATOR',
                          'bg-gray-100/50 backdrop-blur-sm text-gray-600': user.role === 'OPERATOR'
                        }"
                      >
                        <i :class="{
                          'fas fa-xs': true,
                          'fa-user-shield': user.role === 'ADMINISTRATOR',
                          'fa-user-cog': user.role === 'OPERATOR'
                        }"></i>
                        {{ user.role }}
                      </span>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex space-x-1">
                      <button 
                        @click="editUser(user); toggleFullscreen()" 
                        class="p-1.5 text-blue-600 hover:text-white hover:bg-blue-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                        title="Edit pengguna"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button 
                        @click="deleteUser(user.id)" 
                        class="p-1.5 text-red-600 hover:text-white hover:bg-red-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                        title="Hapus pengguna"
                      >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Bottom section with details -->
                <div class="mt-2 pt-2 border-t border-blue-100/50">
                  <div class="flex flex-wrap gap-2 mb-2">
                    <span class="inline-flex items-center gap-2 px-3 py-1 bg-blue-100/50 backdrop-blur-sm text-blue-600 rounded-lg text-sm font-medium shadow-sm">
                      <i class="fas fa-envelope"></i>
                      {{ user.email }}
                    </span>
                    <span class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100/50 backdrop-blur-sm text-indigo-600 rounded-lg text-sm font-medium shadow-sm">
                      <i class="fas fa-user"></i>
                      {{ user.username }}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Edit Confirmation Popup -->
    <div v-if="showEditConfirm" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-[70]" @click="showEditConfirm = false">
      <div class="bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300 border border-white/70 hover:shadow-blue-100/30" @click.stop>
        <div class="text-center">
          <div class="w-16 h-16 bg-blue-100/70 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <i class="fas fa-pencil-alt text-2xl text-blue-600"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Konfirmasi Update</h3>
          <p class="text-gray-600 mb-6">
            Apakah Anda yakin ingin mengupdate data pengguna ini?
          </p>
          <div class="flex justify-center space-x-4">
            <button 
              @click="confirmEdit" 
              class="px-4 py-2 bg-blue-600/80 backdrop-blur-xl text-white rounded-xl hover:bg-blue-700/90 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Ya, Update
            </button>
            <button 
              @click="showEditConfirm = false" 
              class="px-4 py-2 bg-gray-200/80 backdrop-blur-xl text-gray-700 rounded-xl hover:bg-gray-300/90 transition-colors duration-300 shadow-md hover:shadow-lg"
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
const roleFilter = ref('all')
const showDeleteConfirm = ref(false)
const showEditConfirm = ref(false)
const selectedUserId = ref(null)
const showAlert = ref(false)
const alertMessage = ref('')
const showSuccess = ref(false)
const successMessage = ref('')
const editInfoMessage = ref('')
const isFullscreen = ref(false)

const form = ref({
  email: '',
  name: '',
  username: '',
  password: '',
  role: 'OPERATOR'
})

// Computed property for filtered users
const filteredUsers = computed(() => {
  // Create a new array to avoid modifying the original
  let filtered = [...users.value];
  
  // Sort by newest first (assuming higher id means newer)
  filtered.sort((a, b) => b.id - a.id);
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(user => 
      user.email.toLowerCase().includes(query) ||
      user.name.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );
  }
  
  // Apply role filter
  if (roleFilter.value !== 'all') {
    filtered = filtered.filter(user => user.role === roleFilter.value);
  }
  
  return filtered;
});

// Toggle fullscreen
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};

// Function to reset filters
const resetFilters = () => {
  searchQuery.value = "";
  roleFilter.value = "all";
};

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

    const response = await axios.get('http://10.4.90.25:3000/user', {
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
  if (isEditing.value) {
    showEditConfirm.value = true;
  } else {
    await submitData();
  }
};

// Confirm edit function
const confirmEdit = async () => {
  showEditConfirm.value = false;
  await submitData();
};

// Submit data after confirmation
const submitData = async () => {
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
      await axios.patch(`http://10.4.90.25:3000/user/${editingId.value}`, submitData, { headers });
      showSuccessMessage('Pengguna berhasil diperbarui');
    } else {
      await axios.post('http://10.4.90.25:3000/user', submitData, { headers });
      showSuccessMessage('Pengguna berhasil ditambahkan');
    }
    
    resetForm();
    await fetchUsers();
  } catch (error) {
    console.error('Error saving user:', error);
    showAlertMessage('Gagal menyimpan data pengguna');
  }
};

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
  editInfoMessage.value = `Anda sedang mengedit profil pengguna: ${user.name}`;
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

    await axios.delete(`http://10.4.90.25:3000/user/${selectedUserId.value}`, {
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
  editInfoMessage.value = '';
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

const cancelEdit = () => {
  isEditing.value = false;
  editingId.value = null;
  editInfoMessage.value = '';
  resetForm();
}
</script> 