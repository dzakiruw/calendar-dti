<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8"
  >
    <!-- Alert Popup -->
    <div
      v-if="showAlert"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-md"
      @click="showAlert = false"
    >
      <div
        class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full text-center transform transition-all duration-300 border border-white/70"
        @click.stop
      >
        <div :class="['mb-4 text-2xl', isUpdateConfirmation ? 'text-blue-600' : 'text-red-600']">
          <i :class="isUpdateConfirmation ? 'fas fa-question-circle' : 'fas fa-exclamation-circle'"></i>
        </div>
        <div class="mb-4 text-gray-800 font-semibold">{{ alertMessage }}</div>
        
        <!-- Regular alert has only close button -->
        <div v-if="!isUpdateConfirmation" class="flex justify-center">
          <button
            @click="showAlert = false"
            class="px-6 py-2 bg-blue-600/70 hover:bg-blue-700/90 text-white rounded-lg transition-colors duration-300 backdrop-blur-xl shadow-md hover:shadow-lg"
          >
            Tutup
          </button>
        </div>
        
        <!-- Update confirmation has Yes/No buttons -->
        <div v-else class="flex justify-center space-x-4">
          <button
            @click="confirmUpdateAction"
            class="px-6 py-2 bg-blue-600/70 hover:bg-blue-700/90 text-white rounded-lg transition-colors duration-300 backdrop-blur-xl shadow-md hover:shadow-lg"
          >
            Ya, Update
          </button>
          <button
            @click="cancelUpdateAction"
            class="px-6 py-2 bg-gray-600/70 hover:bg-gray-700/90 text-white rounded-lg transition-colors duration-300 backdrop-blur-xl shadow-md hover:shadow-lg"
          >
            Batal
          </button>
        </div>
      </div>
    </div>

    <!-- Success Alert -->
    <div
      v-if="showSuccess"
      class="fixed top-4 right-4 bg-white/60 backdrop-blur-xl border border-green-200/70 text-green-700 p-4 rounded-lg shadow-xl transform transition-all duration-300 z-50"
    >
      <div class="flex items-center">
        <div class="py-1">
          <i class="fas fa-check-circle text-xl mr-3"></i>
        </div>
        <div>
          <p class="font-semibold">{{ successMessage }}</p>
        </div>
        <button
          @click="showSuccess = false"
          class="ml-4 text-green-700 hover:text-green-900"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <!-- Title -->
    <div class="mb-8 w-full flex justify-center">
      <div
        class="bg-white/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 flex items-center space-x-4 transition-all duration-300 border border-white/70 hover:shadow-blue-100/30"
      >
        <img
          src="/input-matkul.png"
          alt="Book Icon"
          class="w-16 h-16 object-contain"
        />
        <h1
          class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          Input Mata Kuliah
        </h1>
      </div>
    </div>

    <!-- Mata Kuliah Form and List Container -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Mata Kuliah Form -->
      <div
        class="bg-white/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/70 hover:shadow-blue-100/30 transition-all duration-500 lg:h-[525px]"
      >
        <form @submit.prevent="submitMataKuliah" class="space-y-4">
          <div>
            <label class="block text-gray-700 font-semibold mb-2"
              >Kode Mata Kuliah</label
            >
            <div v-if="editIndex !== null">
              <p class="text-lg font-bold text-blue-600">{{ kode }}</p>
            </div>
            <div v-else>
              <input
                type="text"
                v-model="kode"
                class="w-full p-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 shadow-inner"
                placeholder="ET234602"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2"
              >Nama Mata Kuliah</label
            >
            <input
              type="text"
              v-model="nama"
              class="w-full p-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 shadow-inner"
              placeholder="Capstone Project"
              required
            />
          </div>

          <!-- Pilih Kelas -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2"
              >Pilih Kelas</label
            >
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <label
                v-for="kelas in ['A', 'B', 'C', 'D']"
                :key="kelas"
                class="relative"
              >
                <input
                  type="checkbox"
                  v-model="kelasDipilih"
                  :value="kelas"
                  class="hidden peer"
                />
                <div
                  class="p-3 text-center border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-xl cursor-pointer transition-all duration-300 peer-checked:bg-green-50/90 peer-checked:border-green-500/80 peer-checked:text-green-600 hover:bg-gray-50/90"
                >
                  Kelas {{ kelas }}
                </div>
              </label>
            </div>
          </div>

          <!-- SKS Mata Kuliah -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2"
              >Pilih SKS</label
            >
            <div class="grid grid-cols-3 gap-4">
              <label v-for="sks in [2, 3, 4]" :key="sks" class="relative">
                <input
                  type="radio"
                  v-model="sksDipilih"
                  :value="sks"
                  class="hidden peer"
                  name="sks"
                />
                <div
                  class="p-3 text-center border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-xl cursor-pointer transition-all duration-300 peer-checked:bg-green-50/90 peer-checked:border-green-500/80 peer-checked:text-green-600 hover:bg-gray-50/90"
                >
                  {{ sks }} SKS
                </div>
              </label>
            </div>
          </div>

          <!-- Submit and Cancel Buttons -->
          <div class="flex gap-4 pt-4">
            <button
              type="submit"
              class="flex-1 bg-gradient-to-r from-blue-600/70 to-indigo-600/70 backdrop-blur-xl text-white py-3 px-6 rounded-xl hover:from-blue-700/90 hover:to-indigo-700/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
            >
              {{ editIndex !== null ? "Update" : "Submit" }}
            </button>

            <button
              v-if="editIndex !== null"
              type="button"
              @click="cancelEdit"
              class="flex-1 bg-gradient-to-r from-gray-600/70 to-gray-700/70 backdrop-blur-xl text-white py-3 px-6 rounded-xl hover:from-gray-700/90 hover:to-gray-800/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Daftar Mata Kuliah -->
      <div
        class="bg-white/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/70 hover:shadow-blue-100/30 transition-all duration-500 lg:h-[525px] flex flex-col"
      >
        <!-- Title with Icon and Counter -->
        <div class="flex items-center justify-between mb-5 border-b pb-3">
          <div class="flex items-center">
            <i class="fas fa-list-ul text-blue-600 text-xl mr-3"></i>
            <h2 class="text-xl font-bold text-blue-600">Daftar Mata Kuliah</h2>
          </div>
          <div class="flex items-center gap-2">
            <div class="bg-blue-100/50 backdrop-blur-xl text-blue-700 px-3 py-1 rounded-md text-sm font-medium flex items-center h-8">
              <i class="fas fa-book mr-1.5"></i>
              {{ filteredMataKuliahList.length }} Mata Kuliah
            </div>
            <button 
              @click="toggleFullscreen" 
              class="p-1.5 bg-gray-100/50 backdrop-blur-xl hover:bg-gray-200/50 rounded-md text-gray-700 transition-colors shadow-sm"
              title="Lihat semua mata kuliah"
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
              placeholder="Cari mata kuliah..."
              class="w-full pl-10 pr-4 py-2 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            />
          </div>
        </div>
        
        <!-- Filters -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex flex-wrap gap-2">
            <!-- SKS Filter -->
            <select 
              v-model="sksFilter" 
              class="px-4 py-2 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner min-w-[140px]"
            >
              <option value="all">Semua SKS</option>
              <option value="2">2 SKS</option>
              <option value="3">3 SKS</option>
              <option value="4">4 SKS</option>
            </select>
          </div>
          
          <!-- Reset Filter Button -->
          <button 
            v-if="searchQuery || sksFilter !== 'all'"
            @click="resetFilters" 
            class="px-4 py-3 bg-blue-100/50 backdrop-blur-xl text-blue-700 rounded-lg hover:bg-blue-200/50 flex items-center whitespace-nowrap shadow-sm"
          >
            <i class="fas fa-undo mr-2"></i> Reset filter
          </button>
        </div>

        <!-- Content Area -->
        <div class="flex-1 overflow-hidden">
          <!-- Empty State -->
          <div
            v-if="filteredMataKuliahList.length === 0"
            class="flex flex-col items-center justify-center py-12 text-gray-500"
          >
            <i class="fas fa-filter text-4xl mb-4 text-blue-300"></i>
            <p class="text-center font-medium">
              {{
                searchQuery
                  ? "Tidak ada mata kuliah yang sesuai dengan pencarian."
                  : sksFilter !== 'all'
                    ? `Tidak ada mata kuliah dengan ${sksFilter} SKS.`
                    : "Belum ada mata kuliah yang diinputkan."
              }}
            </p>
          </div>

          <!-- Mata Kuliah List -->
          <div v-else class="overflow-y-auto h-[360px] pr-2 pb-8">
            <ul class="grid grid-cols-1 gap-4 mb-4">
              <li
                v-for="(mk, index) in sortedMataKuliahList"
                :key="index"
                class="bg-blue-50/40 backdrop-blur-xl p-4 rounded-xl border border-blue-100/50 hover:bg-indigo-50/40 hover:border-indigo-200/50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div class="flex flex-col h-full justify-between">
                  <!-- Top section with title and buttons -->
                  <div>
                    <div class="flex justify-between items-start">
                      <div class="w-4/5">
                        <h3 class="font-bold text-gray-800 text-lg">
                          {{ mk.matkul_nama }}
                        </h3>
                      </div>
                      
                      <!-- Action Buttons -->
                      <div class="flex space-x-1">
                        <button
                          @click="editMataKuliah(filteredMataKuliahList.indexOf(mk))"
                          class="p-1.5 text-blue-600 hover:text-white hover:bg-blue-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                          title="Edit mata kuliah"
                        >
                          <i class="fas fa-edit"></i>
                        </button>
                        <button
                          @click="deleteMataKuliah(filteredMataKuliahList.indexOf(mk))"
                          class="p-1.5 text-red-600 hover:text-white hover:bg-red-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                          title="Hapus mata kuliah"
                        >
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Bottom section with code and classes - forced to bottom but not too far -->
                  <div class="mt-auto pt-2">
                    <!-- Course Code and SKS -->
                    <div class="flex items-center gap-2 mb-2">
                      <div class="text-blue-600 text-sm font-medium">{{ mk.matkul_kode }}</div>
                      <span class="px-3 py-1 bg-blue-100/50 backdrop-blur-sm text-blue-700 text-sm font-medium rounded-md flex items-center shadow-sm">
                        <i class="fas fa-book-open mr-1.5"></i> {{ mk.matkul_sks }} SKS
                      </span>
                    </div>
                    
                    <!-- Classes -->
                    <div class="flex flex-wrap gap-2 items-center border-t pt-2">
                      <span
                        v-for="kelas in mk.mata_kuliah_kelas"
                        :key="kelas.kelas_mk"
                        :class="{
                          'px-2 py-0.5 rounded-md text-xs font-medium flex items-center': true,
                          'bg-green-100/50 backdrop-blur-sm text-green-600': kelas.kelas_mk === 'A',
                          'bg-blue-100/50 backdrop-blur-sm text-blue-600': kelas.kelas_mk === 'B',
                          'bg-purple-100/50 backdrop-blur-sm text-purple-600': kelas.kelas_mk === 'C',
                          'bg-orange-100/50 backdrop-blur-sm text-orange-600': kelas.kelas_mk === 'D',
                          'bg-gray-100/50 backdrop-blur-sm text-gray-600': !['A', 'B', 'C', 'D'].includes(kelas.kelas_mk)
                        }"
                      >
                        <i class="fas fa-chalkboard-teacher mr-1"></i> Kelas {{ kelas.kelas_mk }}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

          <!-- Fullscreen Popup -->
    <div v-if="isFullscreen" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-8" @click="toggleFullscreen">
      <div class="bg-white rounded-2xl shadow-2xl border border-white/70 w-full max-w-6xl h-[80vh] flex flex-col p-6 relative" @click.stop>
        <div class="flex items-center justify-between mb-4 border-b pb-3">
          <div class="flex items-center">
            <i class="fas fa-th-list text-blue-600 text-2xl mr-3"></i>
            <h2 class="text-2xl font-bold text-blue-600">Daftar Mata Kuliah</h2>
          </div>
          <div class="flex items-center gap-2">
            <div class="bg-blue-100/50 backdrop-blur-xl text-blue-700 px-4 py-1.5 rounded-md text-base font-medium flex items-center h-8">
              <i class="fas fa-book mr-2"></i>
              {{ filteredMataKuliahList.length }} Mata Kuliah
            </div>
            <button
              @click="toggleFullscreen"
              class="w-8 h-8 flex items-center justify-center bg-gray-200/50 hover:bg-gray-300/70 backdrop-blur-xl rounded-full text-gray-700 transition-colors shadow-md hover:shadow-lg"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

          <!-- Search and Filter for Fullscreen -->
          <div class="w-full mb-4">
            <div class="relative">
              <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Cari mata kuliah..."
                class="w-full pl-10 pr-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
              />
            </div>
          </div>
          
          <!-- Filters -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex flex-wrap gap-2">
              <select 
                v-model="sksFilter" 
                class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner min-w-[160px]"
              >
                <option value="all">Semua SKS</option>
                <option value="2">2 SKS</option>
                <option value="3">3 SKS</option>
                <option value="4">4 SKS</option>
              </select>
            </div>
            
            <!-- Reset Filter Button -->
            <button 
              v-if="searchQuery || sksFilter !== 'all'"
              @click="resetFilters" 
              class="px-4 py-3 bg-blue-100/50 backdrop-blur-xl text-blue-700 rounded-lg hover:bg-blue-200/50 flex items-center whitespace-nowrap shadow-sm"
            >
              <i class="fas fa-undo mr-2"></i> Reset filter
            </button>
          </div>

          <!-- Multi-column List -->
          <div class="flex-1 overflow-y-auto pr-2 pb-8">
            <div v-if="filteredMataKuliahList.length === 0" class="flex flex-col items-center justify-center h-full text-gray-500">
              <i class="fas fa-filter text-6xl mb-4 text-blue-300"></i>
              <p class="text-center text-xl font-medium">
                {{
                  searchQuery
                    ? "Tidak ada mata kuliah yang sesuai dengan pencarian."
                    : sksFilter !== 'all'
                      ? `Tidak ada mata kuliah dengan ${sksFilter} SKS.`
                      : "Belum ada mata kuliah yang diinputkan."
                }}
              </p>
            </div>
            <ul v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <li
                v-for="(mk, index) in sortedMataKuliahList"
                :key="index"
                class="bg-blue-50/40 backdrop-blur-xl p-4 rounded-xl border border-blue-100/50 hover:bg-indigo-50/40 hover:border-indigo-200/50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div class="flex flex-col h-full justify-between">
                  <!-- Top section with title and buttons -->
                  <div>
                    <div class="flex justify-between items-start">
                      <div class="w-4/5">
                        <h3 class="font-bold text-gray-800 text-lg">
                          {{ mk.matkul_nama }}
                        </h3>
                      </div>
                      
                      <!-- Action Buttons -->
                      <div class="flex space-x-1">
                        <button
                          @click="editMataKuliah(filteredMataKuliahList.indexOf(mk)); toggleFullscreen()"
                          class="p-1.5 text-blue-600 hover:text-white hover:bg-blue-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                          title="Edit mata kuliah"
                        >
                          <i class="fas fa-edit"></i>
                        </button>
                        <button
                          @click="deleteMataKuliah(filteredMataKuliahList.indexOf(mk))"
                          class="p-1.5 text-red-600 hover:text-white hover:bg-red-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                          title="Hapus mata kuliah"
                        >
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Bottom section with code and classes - forced to bottom but not too far -->
                  <div class="mt-auto pt-2">
                    <!-- Course Code and SKS -->
                    <div class="flex items-center gap-2 mb-2">
                      <div class="text-blue-600 text-sm font-medium">{{ mk.matkul_kode }}</div>
                      <span class="px-3 py-1 bg-blue-100/50 backdrop-blur-sm text-blue-700 text-sm font-medium rounded-md flex items-center shadow-sm">
                        <i class="fas fa-book-open mr-1.5"></i> {{ mk.matkul_sks }} SKS
                      </span>
                    </div>
                    
                    <!-- Classes -->
                    <div class="flex flex-wrap gap-2 items-center border-t pt-2">
                      <span
                        v-for="kelas in mk.mata_kuliah_kelas"
                        :key="kelas.kelas_mk"
                        :class="{
                          'px-2 py-0.5 rounded-md text-xs font-medium flex items-center': true,
                          'bg-green-100/50 backdrop-blur-sm text-green-600': kelas.kelas_mk === 'A',
                          'bg-blue-100/50 backdrop-blur-sm text-blue-600': kelas.kelas_mk === 'B',
                          'bg-purple-100/50 backdrop-blur-sm text-purple-600': kelas.kelas_mk === 'C',
                          'bg-orange-100/50 backdrop-blur-sm text-orange-600': kelas.kelas_mk === 'D',
                          'bg-gray-100/50 backdrop-blur-sm text-gray-600': !['A', 'B', 'C', 'D'].includes(kelas.kelas_mk)
                        }"
                      >
                        <i class="fas fa-chalkboard-teacher mr-1"></i> Kelas {{ kelas.kelas_mk }}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup Konfirmasi Delete -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-[60]"
      @click="showDeleteConfirm = false"
    >
      <div
        class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300 border border-white/70"
        @click.stop
      >
        <div class="text-center">
          <div
            class="w-16 h-16 bg-red-100/70 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <i class="fas fa-exclamation-triangle text-2xl text-red-600"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Konfirmasi Hapus</h3>
          <p class="text-gray-600 mb-6">
            Apakah Anda yakin ingin menghapus mata kuliah ini?
          </p>
          <div class="flex justify-center space-x-4">
            <button
              @click="confirmDelete"
              class="px-4 py-2 bg-red-600/70 hover:bg-red-700/90 backdrop-blur-xl text-white rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Ya, Hapus
            </button>
            <button
              @click="showDeleteConfirm = false"
              class="px-4 py-2 bg-gray-200/70 hover:bg-gray-300/90 backdrop-blur-xl text-gray-700 rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg"
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
import { ref, onMounted, computed, onUnmounted } from "vue";
import axios from "axios";

const kode = ref("");
const nama = ref("");
const kelasDipilih = ref([]);
const sksDipilih = ref(null);
const mataKuliahList = ref([]);
const editIndex = ref(null);
const searchQuery = ref("");
const sksFilter = ref("all");
const showDeleteConfirm = ref(false);
const selectedIndex = ref(null);
const showAlert = ref(false);
const alertMessage = ref("");
const showSuccess = ref(false);
const successMessage = ref("");
const isFullscreen = ref(false);
const isUpdateConfirmation = ref(false);
let pollingInterval = null;

// Computed property for filtered mata kuliah list
const filteredMataKuliahList = computed(() => {
  let filtered = mataKuliahList.value;
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (mk) =>
        mk.matkul_kode.toLowerCase().includes(query) ||
        mk.matkul_nama.toLowerCase().includes(query) ||
        mk.mata_kuliah_kelas.some((k) => k.kelas_mk.toLowerCase().includes(query))
    );
  }
  
  // Apply SKS filter
  if (sksFilter.value !== 'all') {
    filtered = filtered.filter(mk => mk.matkul_sks === parseInt(sksFilter.value));
  }
  
  return filtered;
});

// Computed property for sorted mata kuliah list (newest first)
const sortedMataKuliahList = computed(() => {
  // Create a copy of the filtered list to avoid modifying the original
  const sorted = [...filteredMataKuliahList.value];
  
  // Sort by newest first (assuming there's a createdAt field)
  // If there's no createdAt field, you can sort by other criteria
  // For this example, we'll reverse the array to show "newest" first
  return sorted.reverse();
});

// Fetch Mata Kuliah Data from API
const fetchMataKuliah = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
    if (!token) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.get("http://10.4.90.25:3000/mata_kuliah", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    mataKuliahList.value = response.data;
  } catch (error) {
    console.error("Gagal mengambil data mata kuliah", error);
  }
};

// Function to show success message
const showSuccessAlert = (message) => {
  successMessage.value = message;
  showSuccess.value = true;
  setTimeout(() => {
    showSuccess.value = false;
  }, 3000); // Hide after 3 seconds
};

// Submit Mata Kuliah (Add or Update)
const submitMataKuliah = async () => {
  kode.value = kode.value.trim();
  if (!kode.value) {
    alertMessage.value =
      "Kode mata kuliah tidak boleh kosong atau hanya spasi.";
    showAlert.value = true;
    return;
  }
  
  // For update, show confirmation first
  if (editIndex.value !== null) {
    confirmUpdate();
    return;
  }
  
  await submitData();
};

// Confirm update function
const confirmUpdate = () => {
  // Show confirmation dialog
  alertMessage.value = "Apakah Anda yakin ingin mengupdate mata kuliah ini?";
  showAlert.value = true;
  
  // Set update confirmation flag
  isUpdateConfirmation.value = true;
};

// Submit data after confirmation
const submitData = async () => {
  const newMataKuliah = {
    matkul_kode: kode.value,
    matkul_nama: nama.value,
    matkul_sks: sksDipilih.value,
    kelas: kelasDipilih.value.map((k) => ({ kelas_mk: k })),
  };

  try {
    const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
    if (!token) {
      throw new Error("User is not authenticated");
    }

    if (editIndex.value !== null) {
      // Update Mata Kuliah
      const mataKuliahKode = mataKuliahList.value[editIndex.value].matkul_kode;
      await axios.patch(
        `http://10.4.90.25:3000/mata_kuliah/${mataKuliahKode}`,
        newMataKuliah,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // After update, fetch the list again to ensure consistency
      await fetchMataKuliah();
      resetForm();
      editIndex.value = null;
      showSuccessAlert("Data mata kuliah berhasil diperbarui!");
    } else {
      // Add New Mata Kuliah
      await axios.post("http://10.4.90.25:3000/mata_kuliah", newMataKuliah, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Fetch updated mata kuliah list
      await fetchMataKuliah();
      resetForm();
      showSuccessAlert("Data mata kuliah berhasil ditambahkan!");
    }
  } catch (error) {
    console.error("Gagal mengirim data mata kuliah", error);
    let msg = "Gagal mengupdate data: ";
    if (error.response && error.response.data && error.response.data.error) {
      msg += error.response.data.error;
    } else if (error.message) {
      msg += error.message;
    } else {
      msg += "Terjadi kesalahan.";
    }
    alertMessage.value = msg;
    showAlert.value = true;
  }
};

// Edit Mata Kuliah
const editMataKuliah = (index) => {
  const mk = filteredMataKuliahList.value[index];
  selectedIndex.value = mataKuliahList.value.findIndex(
    (m) => m.matkul_kode === mk.matkul_kode
  );
  
  const index2 = selectedIndex.value;
  const mk2 = mataKuliahList.value[index2];
  kode.value = mk2.matkul_kode;
  nama.value = mk2.matkul_nama;
  kelasDipilih.value = mk2.mata_kuliah_kelas.map((k) => k.kelas_mk);
  sksDipilih.value = mk2.matkul_sks;
  editIndex.value = index2;
};

// Cancel Edit
const cancelEdit = () => {
  resetForm();
  editIndex.value = null; // Reset to allow adding new mata kuliah
};

// Delete Mata Kuliah
const deleteMataKuliah = (index) => {
  const mk = filteredMataKuliahList.value[index];
  selectedIndex.value = mataKuliahList.value.findIndex(
    (m) => m.matkul_kode === mk.matkul_kode
  );
  showDeleteConfirm.value = true;
};

// Confirm delete function
const confirmDelete = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
    if (!token) {
      throw new Error("User is not authenticated");
    }

    const mk = mataKuliahList.value[selectedIndex.value];
    await axios.delete(
      `http://10.4.90.25:3000/mata_kuliah/${mk.matkul_kode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    mataKuliahList.value.splice(selectedIndex.value, 1);
    showDeleteConfirm.value = false;
    showSuccessAlert("Data mata kuliah berhasil dihapus!");
  } catch (error) {
    console.error("Error deleting mata kuliah:", error);
    let msg = "Gagal menghapus mata kuliah: ";
    if (error.response && error.response.data && error.response.data.error) {
      msg += error.response.data.error;
    } else if (error.message) {
      msg += error.message;
    } else {
      msg += "Terjadi kesalahan.";
    }
    alertMessage.value = msg;
    showAlert.value = true;
  }
};

// Reset Form after submit
const resetForm = () => {
  kode.value = "";
  nama.value = "";
  kelasDipilih.value = [];
  sksDipilih.value = null;
};

// Function to reset filters
const resetFilters = () => {
  searchQuery.value = "";
  sksFilter.value = "all";
};

// Toggle fullscreen
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};

// Handle confirmation of update
const confirmUpdateAction = async () => {
  // Hide alert and reset flag
  showAlert.value = false;
  isUpdateConfirmation.value = false;
  
  // Submit the data
  await submitData();
};

// Cancel update action
const cancelUpdateAction = () => {
  // Just hide alert and reset flag
  showAlert.value = false;
  isUpdateConfirmation.value = false;
};

// Fetch mata kuliah data when component is mounted
onMounted(() => {
  fetchMataKuliah();
  pollingInterval = setInterval(fetchMataKuliah, 10000); // 10 detik
});

onUnmounted(() => {
  if (pollingInterval) clearInterval(pollingInterval);
});
</script>
