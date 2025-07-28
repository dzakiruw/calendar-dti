<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
    <!-- Title -->
    <div class="mb-8 w-full flex justify-center">
      <div class="bg-white/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 flex items-center space-x-4 transition-all duration-300 border border-white/70 hover:shadow-blue-100/30">
        <img src="/matching-dosenmatkul.png" alt="Icon Matching" class="w-16 h-16 object-contain" />
        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Matching Dosen & Mata Kuliah
        </h1>
      </div>
    </div>

    <!-- Layout Form + List -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Form -->
      <div class="bg-white/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/70 hover:shadow-blue-100/30 transition-all duration-500">
        <form @submit.prevent="submitMatching" class="space-y-6">
          <!-- Mata Kuliah -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Pilih Mata Kuliah</label>
            <select 
              v-model="selectedMataKuliah" 
              @change="updateKelas" 
              class="w-full p-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 shadow-inner"
              required
            >
              <option disabled value="">Pilih Mata Kuliah</option>
              <option v-for="mk in mataKuliahList" :key="mk.matkul_kode" :value="mk">
                {{ mk.matkul_kode }} - {{ mk.matkul_nama }} ({{ mk.matkul_sks }} SKS)
              </option>
            </select>
          </div>

          <!-- Mata Kuliah Type -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Jenis Mata Kuliah</label>
            <select 
              v-model="selectedMataKuliahType" 
              class="w-full p-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 shadow-inner"
              required
            >
              <option disabled value="">Pilih Jenis Mata Kuliah</option>
              <option value="DEPARTEMEN">Departemen</option>
              <option value="PENGAYAAN">Pengayaan</option>
            </select>
          </div>

          <!-- Mata Kuliah Kelas -->
          <div v-if="selectedMataKuliah">
            <label class="block text-gray-700 font-semibold mb-2">Pilih Kelas</label>
            <select 
              v-model="selectedKelas" 
              class="w-full p-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 shadow-inner"
              required
            >
              <option disabled value="">Pilih Kelas</option>
              <option v-for="kelas in selectedMataKuliah.mata_kuliah_kelas" :key="kelas.id_mk_kelas" :value="kelas">
                {{ kelas.nama_kelas }}
              </option>
            </select>
          </div>

          <!-- Dosen Dropdown -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Pilih Dosen</label>
            <select 
              v-model="selectedDosen" 
              class="w-full p-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 shadow-inner"
              required
            >
              <option disabled value="">Pilih Dosen</option>
              <option v-for="dosen in dosenList" :key="dosen.dosen_kode" :value="dosen">
                {{ dosen.dosen_kode }} - {{ dosen.dosen_nama }}
              </option>
            </select>
          </div>

          <!-- Semester Checkbox -->
          <div>
            <label class="block text-gray-700 font-semibold mb-3">Pilih Semester</label>
            <div class="mb-2 flex gap-2">
              <button type="button" @click="selectAllSemestersFn" class="px-3 py-1 bg-blue-600/70 hover:bg-blue-700/90 backdrop-blur-xl text-white rounded-lg text-xs font-semibold shadow-md hover:shadow-lg transition">Select All</button>
              <button type="button" @click="removeAllSemestersFn" class="px-3 py-1 bg-gray-300/70 hover:bg-gray-400/90 backdrop-blur-xl text-gray-700 rounded-lg text-xs font-semibold shadow-md hover:shadow-lg transition">Remove All</button>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <label v-for="semester in 8" :key="semester" class="inline-flex items-center p-2 rounded-lg hover:bg-gray-50/40 transition-colors duration-300 cursor-pointer">
                <input 
                  type="checkbox" 
                  :value="semester" 
                  v-model="selectedSemesters" 
                  class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="ml-2 text-gray-700">Semester {{ semester }}</span>
              </label>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex gap-4">
            <button 
              type="submit" 
              class="flex-1 bg-gradient-to-r from-blue-600/70 to-indigo-600/70 backdrop-blur-xl text-white py-3 px-6 rounded-xl
                     hover:from-blue-700/90 hover:to-indigo-700/90 transition-colors duration-300
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Submitting...' : editIndex !== null ? 'Update' : 'Submit' }}
            </button>

            <button 
              v-if="editIndex !== null"
              type="button" 
              @click="cancelEdit" 
              class="flex-1 bg-gradient-to-r from-gray-600/70 to-gray-700/70 backdrop-blur-xl text-white py-3 px-6 rounded-xl
                     hover:from-gray-700/90 hover:to-gray-800/90 transition-colors duration-300
                     focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Daftar Matching -->
      <div class="bg-white/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/70 hover:shadow-blue-100/30 transition-all duration-500">
        <!-- Title with Icon and Counter -->
        <div class="flex items-center justify-between mb-5 border-b pb-3">
          <div class="flex items-center">
            <i class="fas fa-list-ul text-blue-600 text-xl mr-3"></i>
            <h2 class="text-xl font-bold text-blue-600">Daftar Matching</h2>
          </div>
          <div class="flex items-center gap-2">
            <div class="bg-blue-100/50 backdrop-blur-xl text-blue-700 px-3 py-1 rounded-md text-sm font-medium flex items-center h-8">
              <i class="fas fa-link mr-1.5"></i>
              {{ filteredMatchingList.length }} Matching
            </div>
            <button 
              @click="toggleFullscreen" 
              class="p-1.5 bg-gray-100/50 backdrop-blur-xl hover:bg-gray-200/50 rounded-md text-gray-700 transition-colors shadow-sm"
              title="Lihat semua matching"
            >
              <i class="fas fa-expand"></i>
            </button>
          </div>
        </div>
          
        <!-- Search Input -->
        <div class="w-full mb-4">
          <div class="relative">
            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Cari matching..."
              class="w-full pl-10 pr-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            />
          </div>
        </div>
        
        <!-- Filters -->
        <div class="flex items-center gap-4 mb-4">
          <div class="flex flex-wrap gap-2 flex-grow">
            <!-- Mata Kuliah Type Filter -->
            <select 
              v-model="typeFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Jenis</option>
              <option value="DEPARTEMEN">Departemen</option>
              <option value="PENGAYAAN">Pengayaan</option>
            </select>
            
            <!-- Semester Filter -->
            <select 
              v-model="semesterFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Semester</option>
              <option v-for="n in 8" :key="n" :value="n">Semester {{ n }}</option>
            </select>
            
            <!-- SKS Filter -->
            <select 
              v-model="sksFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua SKS</option>
              <option value="1">1 SKS</option>
              <option value="2">2 SKS</option>
              <option value="3">3 SKS</option>
              <option value="4">4 SKS</option>
            </select>
          </div>
            
                      <!-- Reset Filter Button -->
          <button 
            v-if="searchQuery || typeFilter !== 'all' || semesterFilter !== 'all' || sksFilter !== 'all'"
            @click="resetFilters" 
            class="px-4 py-3 bg-blue-100/50 backdrop-blur-xl text-blue-700 rounded-lg hover:bg-blue-200/50 flex items-center whitespace-nowrap shadow-md hover:shadow-lg transition-all duration-300"
          >
            <i class="fas fa-undo mr-2"></i> Reset filter
          </button>
        </div>

        <!-- Content Area -->
        <div class="h-[505px] overflow-hidden">
          <!-- Empty State -->
          <div 
            v-if="filteredMatchingList.length === 0" 
            class="flex flex-col items-center justify-center py-12 text-gray-500 h-full"
          >
            <i class="fas fa-filter text-4xl mb-4 text-blue-300"></i>
            <p class="text-center font-medium">
              {{
                searchQuery
                  ? "Tidak ada matching yang sesuai dengan pencarian."
                  : typeFilter !== 'all' || semesterFilter !== 'all'
                    ? "Tidak ada matching pada filter yang dipilih."
                    : "Belum ada matching yang diinputkan."
              }}
            </p>
          </div>

          <!-- Matching List -->
          <div v-else class="overflow-y-auto h-full pr-2">
            <div class="space-y-4 pr-2">
              <div v-for="(classes, dosenName) in groupedMatchingList" :key="dosenName" class="mb-4 last:mb-0">
                <h3 class="text-lg font-semibold mb-2 text-gray-700 sticky top-0 bg-white/90 backdrop-blur-sm py-2 z-10">
                  <i class="fas fa-user-tie text-blue-600 mr-2"></i>
                    {{ dosenName }}
                </h3>
                <ul class="space-y-3">
                                  <li 
                  v-for="(matching, index) in classes" 
                  :key="index" 
                  class="bg-blue-50/40 backdrop-blur-xl p-4 rounded-xl border border-blue-100/50 hover:bg-indigo-50/40 hover:border-indigo-200/50 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div class="flex flex-col h-full">
                    <!-- Top section with title and buttons -->
                    <div>
                      <div class="flex justify-between items-start">
                        <div class="w-4/5">
                          <h3 class="font-bold text-gray-800 text-lg">
                            {{ matching.mata_kuliah_kelas.nama_kelas }}
                          </h3>
                          <div class="flex items-center gap-2 mt-1">
                            <div class="text-blue-600 text-sm font-medium">
                              {{ matching.mata_kuliah_kelas.matkul_kode }}
                            </div>
                            <span class="px-3 py-1 bg-blue-100/60 backdrop-blur-sm text-blue-700 text-sm font-medium rounded-md flex items-center shadow-sm">
                              <i class="fas fa-book-open mr-1.5"></i> {{ getMatkulSKS(matching) }} SKS
                            </span>
                          </div>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="flex space-x-1">
                          <button 
                            @click="editJadwal(matching)" 
                            class="p-1.5 text-blue-600 hover:text-white hover:bg-blue-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                            title="Edit matching"
                          >
                            <i class="fas fa-edit"></i>
                          </button>
                          <button 
                            @click="deleteJadwal(matching)" 
                            class="p-1.5 text-red-600 hover:text-white hover:bg-red-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                            title="Hapus matching"
                          >
                            <i class="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Bottom section with details -->
                    <div class="mt-2 pt-2 border-t border-blue-100/50">
                      <div class="flex flex-wrap gap-2">
                        <span 
                          v-for="semester in matching.mk_kelas_sem" 
                          :key="semester"
                          class="inline-flex items-center px-2 py-1 bg-blue-100/60 backdrop-blur-sm text-blue-600 rounded-lg text-xs font-medium shadow-sm"
                        >
                          <i class="fas fa-graduation-cap mr-1"></i> Semester {{ semester }}
                        </span>
                        <span class="inline-flex items-center px-2 py-1 bg-indigo-100/60 backdrop-blur-sm text-indigo-600 rounded-lg text-xs font-medium shadow-sm">
                          <i class="fas fa-tag mr-1"></i> {{ matching.matkul_tipe }}
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
      </div>
    </div>

    <!-- Popup Konfirmasi Delete -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-[60]" @click="showDeleteConfirm = false">
      <div class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300 border border-white/70" @click.stop>
        <div class="text-center">
          <div class="w-16 h-16 bg-red-100/70 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-exclamation-triangle text-2xl text-red-600"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Konfirmasi Hapus</h3>
          <p class="text-gray-600 mb-6">
            Apakah Anda yakin ingin menghapus data jadwal ini?
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

    <!-- Popup Konfirmasi Edit -->
    <div v-if="showEditConfirm" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-[60]" @click="showEditConfirm = false">
      <div class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300 border border-white/70" @click.stop>
        <div class="text-center">
          <div class="w-16 h-16 bg-blue-100/70 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-pencil-alt text-2xl text-blue-600"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Konfirmasi Edit</h3>
          <p class="text-gray-600 mb-6">
            Apakah Anda yakin ingin mengedit data jadwal ini?
          </p>
          <div class="flex justify-center space-x-4">
            <button 
              @click="confirmEdit" 
              class="px-4 py-2 bg-blue-600/70 hover:bg-blue-700/90 backdrop-blur-xl text-white rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Ya, Edit
            </button>
            <button 
              @click="showEditConfirm = false" 
              class="px-4 py-2 bg-gray-200/70 hover:bg-gray-300/90 backdrop-blur-xl text-gray-700 rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Alert Popup -->
    <div v-if="showAlert" class="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-md" @click="showAlert = false">
      <div class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full text-center transform transition-all duration-300 border border-white/70" @click.stop>
        <div class="mb-4 text-red-600 text-2xl"><i class="fas fa-exclamation-circle"></i></div>
        <div class="mb-4 text-gray-800 font-semibold">{{ alertMessage }}</div>
        <button @click="showAlert = false" class="px-6 py-2 bg-blue-600/70 hover:bg-blue-700/90 backdrop-blur-xl text-white rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg">
          Tutup
        </button>
      </div>
    </div>

    <!-- Success Alert -->
    <div v-if="showSuccess" class="fixed top-4 right-4 bg-white/60 backdrop-blur-xl border border-green-200/70 text-green-700 p-4 rounded-lg shadow-xl transform transition-all duration-300 z-50">
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

    <!-- Fullscreen Popup -->
    <div v-if="isFullscreen" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-8" @click="toggleFullscreen">
      <div class="bg-white rounded-2xl shadow-2xl border border-white/70 w-full max-w-6xl h-[85vh] flex flex-col p-6 relative" @click.stop>
        <div class="flex items-center justify-between mb-4 border-b pb-3">
          <div class="flex items-center">
            <i class="fas fa-th-list text-blue-600 text-2xl mr-3"></i>
            <h2 class="text-2xl font-bold text-blue-600">Daftar Matching</h2>
          </div>
          <div class="flex items-center gap-2">
            <div class="bg-blue-100/50 backdrop-blur-xl text-blue-700 px-4 py-1.5 rounded-md text-base font-medium flex items-center h-8">
              <i class="fas fa-link mr-2"></i>
              {{ filteredMatchingList.length }} Matching
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
              placeholder="Cari matching..."
              class="w-full pl-10 pr-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            />
          </div>
        </div>
        
        <!-- Filters for Fullscreen -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex flex-wrap gap-2">
            <!-- Mata Kuliah Type Filter -->
            <select 
              v-model="typeFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Jenis</option>
              <option value="DEPARTEMEN">Departemen</option>
              <option value="PENGAYAAN">Pengayaan</option>
            </select>
            
            <!-- Semester Filter -->
            <select 
              v-model="semesterFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Semester</option>
              <option v-for="n in 8" :key="n" :value="n">Semester {{ n }}</option>
            </select>
            
            <!-- SKS Filter -->
            <select 
              v-model="sksFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua SKS</option>
              <option value="1">1 SKS</option>
              <option value="2">2 SKS</option>
              <option value="3">3 SKS</option>
              <option value="4">4 SKS</option>
            </select>
          </div>
          
          <!-- Reset Filter Button -->
          <button 
            v-if="searchQuery || typeFilter !== 'all' || semesterFilter !== 'all' || sksFilter !== 'all'"
            @click="resetFilters" 
            class="px-4 py-3 bg-blue-100/50 backdrop-blur-xl text-blue-700 rounded-lg hover:bg-blue-200/50 flex items-center whitespace-nowrap shadow-md hover:shadow-lg transition-all duration-300"
          >
            <i class="fas fa-undo mr-2"></i> Reset filter
          </button>
        </div>

        <!-- Multi-column List -->
        <div class="flex-1 overflow-y-auto pr-2">
          <div v-if="filteredMatchingList.length === 0" class="flex flex-col items-center justify-center h-full text-gray-500">
            <i class="fas fa-filter text-6xl mb-4 text-blue-300"></i>
            <p class="text-center font-medium text-xl">
              {{
                searchQuery
                  ? "Tidak ada matching yang sesuai dengan pencarian."
                  : typeFilter !== 'all' || semesterFilter !== 'all'
                    ? "Tidak ada matching pada filter yang dipilih."
                    : "Belum ada matching yang diinputkan."
              }}
            </p>
          </div>
          <div v-else class="space-y-4">
            <div v-for="(classes, dosenName) in groupedMatchingList" :key="dosenName" class="mb-6 last:mb-0">
              <h3 class="text-lg font-semibold mb-3 text-gray-700 sticky top-0 bg-white/90 backdrop-blur-sm py-2 z-10 border-b">
                <i class="fas fa-user-tie text-blue-600 mr-2"></i>
                    {{ dosenName }}
              </h3>
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li 
                  v-for="(matching, index) in classes" 
                  :key="index" 
                  class="bg-blue-50/40 backdrop-blur-xl p-4 rounded-xl border border-blue-100/50 hover:bg-indigo-50/40 hover:border-indigo-200/50 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <div class="flex flex-col h-full">
                    <!-- Top section with title and buttons -->
                    <div>
                      <div class="flex justify-between items-start">
                        <div class="w-4/5">
                          <h3 class="font-bold text-gray-800 text-lg">
                            {{ matching.mata_kuliah_kelas.nama_kelas }}
                          </h3>
                          <div class="flex items-center gap-2 mt-1">
                            <div class="text-blue-600 text-sm font-medium">
                              {{ matching.mata_kuliah_kelas.matkul_kode }}
                            </div>
                            <span class="px-3 py-1 bg-blue-100/60 backdrop-blur-sm text-blue-700 text-sm font-medium rounded-md flex items-center shadow-sm">
                              <i class="fas fa-book-open mr-1.5"></i> {{ getMatkulSKS(matching) }} SKS
                            </span>
                          </div>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="flex space-x-1">
                          <button 
                            @click="editJadwal(matching)" 
                            class="p-1.5 text-blue-600 hover:text-white hover:bg-blue-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                            title="Edit matching"
                          >
                            <i class="fas fa-edit"></i>
                          </button>
                          <button 
                            @click="deleteJadwal(matching)" 
                            class="p-1.5 text-red-600 hover:text-white hover:bg-red-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                            title="Hapus matching"
                          >
                            <i class="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Bottom section with details -->
                    <div class="mt-2 pt-2 border-t border-blue-100/50">
                      <div class="flex flex-wrap gap-2">
                        <span 
                          v-for="semester in matching.mk_kelas_sem" 
                          :key="semester"
                          class="inline-flex items-center px-2 py-1 bg-blue-100/60 backdrop-blur-sm text-blue-600 rounded-lg text-xs font-medium shadow-sm"
                        >
                          <i class="fas fa-graduation-cap mr-1"></i> Semester {{ semester }}
                        </span>
                        <span class="inline-flex items-center px-2 py-1 bg-indigo-100/60 backdrop-blur-sm text-indigo-600 rounded-lg text-xs font-medium shadow-sm">
                          <i class="fas fa-tag mr-1"></i> {{ matching.matkul_tipe }}
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import axios from 'axios'

// Get runtime config for API base URL
const config = useRuntimeConfig();
const apiBaseUrl = config.public.apiBaseUrl;

const mataKuliahList = ref([])  
const dosenList = ref([])  
const matchingList = ref([])  
const selectedMataKuliah = ref(null)
const selectedMataKuliahType = ref("DEPARTEMEN")
const selectedKelas = ref(null)
const selectedSemesters = ref([])
const selectedDosen = ref(null)
const editIndex = ref(null)
const isSubmitting = ref(false)
const searchQuery = ref("")
const typeFilter = ref("all")
const semesterFilter = ref("all")
const sksFilter = ref("all")
const isFullscreen = ref(false)

// Add new refs for confirmation popups
const showDeleteConfirm = ref(false);
const showEditConfirm = ref(false);
const selectedIndex = ref(null);

// Add alert state
const showAlert = ref(false);
const alertMessage = ref('');

// Add success state
const showSuccess = ref(false);
const successMessage = ref("");

// Function to show alert
const showErrorAlert = (msg) => {
  alertMessage.value = msg;
  showAlert.value = true;
};

const showSuccessAlert = (msg) => {
  successMessage.value = msg;
  showSuccess.value = true;
  setTimeout(() => {
    showSuccess.value = false;
  }, 3000);
};

// Fetch Data Mata Kuliah
const fetchMataKuliah = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get(`${apiBaseUrl}/mata_kuliah`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    mataKuliahList.value = response.data;
  } catch (error) {
    showErrorAlert('Gagal mengambil data mata kuliah: ' + (error.response?.data?.error || error.message || 'Terjadi kesalahan.'));
  }
}

// Fetch Data Dosen
const fetchDosen = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get(`${apiBaseUrl}/dosen`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    dosenList.value = response.data || [];
  } catch (error) {
    showErrorAlert('Gagal mengambil data dosen: ' + (error.response?.data?.error || error.message || 'Terjadi kesalahan.'));
    dosenList.value = [];
  }
}

// Fetch Matching Data
const fetchMatchingData = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get(`${apiBaseUrl}/mk_dosen`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    
    // Update the matchingList with the response data
    matchingList.value = response.data;
  } catch (error) {
    showErrorAlert('Gagal mengambil data matching: ' + (error.response?.data?.error || error.message || 'Terjadi kesalahan.'));
  }
}

// Helper to get dosen name from dosen_kode
const getDosenName = (dosenKode) => {
  if (!Array.isArray(dosenList.value)) return 'Unknown';
  const dosen = dosenList.value.find(d => d.dosen_kode === dosenKode);
  return dosen ? dosen.dosen_nama : 'Unknown';
}

// Format semesters for display
const formatSemesters = (semesters) => {
  if (!semesters || !Array.isArray(semesters)) return '';
  return semesters.sort((a, b) => a - b).join(', ');
}

let pollingInterval = null;

onMounted(() => {
  fetchMataKuliah();
  fetchDosen();
  fetchMatchingData();
  pollingInterval = setInterval(fetchMatchingData, 10000); // 10 detik
})

onUnmounted(() => {
  if (pollingInterval) clearInterval(pollingInterval);
});

const resetForm = () => {
  selectedMataKuliah.value = null
  selectedMataKuliahType.value = "DEPARTEMEN"
  selectedKelas.value = null
  selectedDosen.value = null
  selectedSemesters.value = []
}

// Update Kelas when Mata Kuliah changes
const updateKelas = () => {
  selectedKelas.value = null;
}

// Edit matching data
const editJadwal = (jadwal) => {
  // Store the jadwal object directly instead of finding by index
  selectedIndex.value = jadwal;
  
  // Close fullscreen mode if it's open
  if (isFullscreen.value) {
    toggleFullscreen();
  }
  
  // For editing, directly set up form without confirmation
  const jadwal2 = jadwal;
  
  // Find mata kuliah based on matkul_kode from jadwal
  const matkul = mataKuliahList.value.find(mk => 
    mk.matkul_kode === jadwal2.mata_kuliah_kelas.matkul_kode
  );
  
  if (matkul) {
    selectedMataKuliah.value = matkul;
    
    // Find and set kelas after mata kuliah is set
    const kelas = matkul.mata_kuliah_kelas.find(
      k => k.id_mk_kelas === jadwal2.mata_kuliah_kelas.id_mk_kelas
    );
    selectedKelas.value = kelas;
  }
  
  // Set mata kuliah type
  selectedMataKuliahType.value = jadwal2.matkul_tipe;
  
  // Find and set dosen
  const dosen = dosenList.value.find(
    d => d.dosen_kode === jadwal2.dosen_kode
  );
  selectedDosen.value = dosen;
  
  // Set semester values - ensure it's a new array
  selectedSemesters.value = [...jadwal2.mk_kelas_sem];
  
  // Set edit mode - find the index in matchingList for the selected jadwal
  editIndex.value = matchingList.value.findIndex(
    item => item.id_mk_kelas_dosen === jadwal2.id_mk_kelas_dosen
  );
};

// Submit Matching or Update if Edit Mode is Active
const submitMatching = async () => {
  if (!selectedMataKuliah.value || !selectedDosen.value || !selectedKelas.value) {
    showErrorAlert('Form belum lengkap, tidak dapat submit.');
    return;
  }

  // For update, show confirmation first
  if (editIndex.value !== null) {
    showEditConfirm.value = true;
    return;
  } else {
    // If not editing, submit directly
    await submitData();
  }
};

// Submit data after confirmation
const submitData = async () => {
  try {
    isSubmitting.value = true;

    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    if (editIndex.value !== null) {
      // Update the existing data
      const match = matchingList.value[editIndex.value];
      
      const updateData = {
        id_mk_kelas: selectedKelas.value.id_mk_kelas,
        dosen_kode: selectedDosen.value.dosen_kode,
        mk_kelas_sem: selectedSemesters.value,
        matkul_tipe: selectedMataKuliahType.value
      };
      
      const response = await axios.put(
        `${apiBaseUrl}/mk_dosen/${match.id_mk_kelas_dosen}`, 
        updateData, 
        { headers }
      );

      if (response.status === 200) {
        // Update the local list with the new data
        matchingList.value[editIndex.value] = {
          ...match,
          ...response.data.data
        };
        showSuccessAlert('Data matching berhasil diperbarui!');
      }
    } else {
      // Create new data
      const postData = {
        nama_kelas: selectedKelas.value.nama_kelas,
        dosen_kode: selectedDosen.value.dosen_kode,
        mk_kelas_sem: selectedSemesters.value,
        matkul_tipe: selectedMataKuliahType.value
      };

      const response = await axios.post(`${apiBaseUrl}/mk_dosen`, postData, { headers });

      if (response.status === 200 || response.status === 201) {
        // Add the new matching to the list
        matchingList.value.push(response.data.data);
        showSuccessAlert('Data matching berhasil ditambahkan!');
      }
    }

    resetForm();
    editIndex.value = null;
  } catch (error) {
    showErrorAlert('Gagal submit matching: ' + (error.response?.data?.error || error.message || 'Terjadi kesalahan.'));
  } finally {
    isSubmitting.value = false;
  }
};

// Delete matching data
const deleteMatching = async (index) => {
  if (!confirm('Yakin ingin menghapus matching ini?')) return;
  
  const match = matchingList.value[index];

  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) throw new Error('User is not authenticated');

    await axios.delete(`${apiBaseUrl}/mk_dosen/${match.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    // Remove the deleted matching from the list
    matchingList.value.splice(index, 1);
    showSuccessAlert('Data matching berhasil dihapus!');
  } catch (error) {
    showErrorAlert('Gagal menghapus matching: ' + (error.response?.data?.error || error.message || 'Terjadi kesalahan.'));
  }
}

const cancelEdit = () => {
  resetForm();
  editIndex.value = null;
}

// Computed property for filtered matching list
const filteredMatchingList = computed(() => {
  let filtered = matchingList.value;
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(matching => 
      matching.mata_kuliah_kelas.nama_kelas.toLowerCase().includes(query) ||
      matching.mata_kuliah_kelas.matkul_kode.toLowerCase().includes(query) ||
      matching.dosen.dosen_nama.toLowerCase().includes(query) ||
      matching.mk_kelas_sem.join(', ').toLowerCase().includes(query) ||
      matching.matkul_tipe.toLowerCase().includes(query)
    );
  }
  
  // Apply type filter
  if (typeFilter.value !== 'all') {
    filtered = filtered.filter(matching => matching.matkul_tipe === typeFilter.value);
  }
  
  // Apply semester filter
  if (semesterFilter.value !== 'all') {
    filtered = filtered.filter(matching => 
      matching.mk_kelas_sem.includes(parseInt(semesterFilter.value))
    );
  }
  
  // Apply SKS filter
  if (sksFilter.value !== 'all') {
    filtered = filtered.filter(matching => {
      const matkul = mataKuliahList.value.find(mk => 
        mk.matkul_kode === matching.mata_kuliah_kelas.matkul_kode
      );
      return matkul && matkul.matkul_sks === parseInt(sksFilter.value);
    });
  }
  
  return filtered;
});

// Computed property to group matchings by lecturer
const groupedMatchingList = computed(() => {
  const groups = {};
  
  // Sort by newest first (assuming we're using the array order as an indicator of recency)
  const sortedList = [...filteredMatchingList.value].reverse();
  
  sortedList.forEach(matching => {
    const dosenName = matching.dosen.dosen_nama;
    if (!groups[dosenName]) {
      groups[dosenName] = [];
    }
    groups[dosenName].push(matching);
  });
  
  return groups;
});

// Confirm edit function
const confirmEdit = () => {
  const jadwal = selectedIndex.value;
  
  // Find mata kuliah based on matkul_kode from jadwal
  const matkul = mataKuliahList.value.find(mk => 
    mk.matkul_kode === jadwal.mata_kuliah_kelas.matkul_kode
  );
  
  if (matkul) {
    selectedMataKuliah.value = matkul;
    
    // Find and set kelas after mata kuliah is set
    const kelas = matkul.mata_kuliah_kelas.find(
      k => k.id_mk_kelas === jadwal.mata_kuliah_kelas.id_mk_kelas
    );
    selectedKelas.value = kelas;
  }
  
  // Set mata kuliah type
  selectedMataKuliahType.value = jadwal.matkul_tipe;
  
  // Find and set dosen
  const dosen = dosenList.value.find(
    d => d.dosen_kode === jadwal.dosen_kode
  );
  selectedDosen.value = dosen;
  
  // Set semester values - ensure it's a new array
  selectedSemesters.value = [...jadwal.mk_kelas_sem];
  
  // Set edit mode - find the index in matchingList for the selected jadwal
  editIndex.value = matchingList.value.findIndex(
    item => item.id_mk_kelas_dosen === jadwal.id_mk_kelas_dosen
  );
  
  showEditConfirm.value = false;
};

// Update delete function to show confirmation
const deleteJadwal = (jadwal) => {
  // Store the jadwal object directly instead of finding index
  selectedIndex.value = jadwal;
  showDeleteConfirm.value = true;
};

// Confirm delete function
const confirmDelete = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const jadwal = selectedIndex.value;

    const response = await axios.delete(`${apiBaseUrl}/mk_dosen/${jadwal.id_mk_kelas_dosen}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      // Remove the item from the list
      const deleteIndex = matchingList.value.findIndex(
        item => item.id_mk_kelas_dosen === jadwal.id_mk_kelas_dosen
      );
      if (deleteIndex > -1) {
        matchingList.value.splice(deleteIndex, 1);
      }
    }
    
    showDeleteConfirm.value = false;
    showSuccessAlert('Data matching berhasil dihapus!');
  } catch (error) {
    showErrorAlert('Gagal menghapus data jadwal: ' + (error.response?.data?.error || error.message || 'Terjadi kesalahan.'));
  }
};

// Function to reset filters
const resetFilters = () => {
  searchQuery.value = "";
  typeFilter.value = "all";
  semesterFilter.value = "all";
  sksFilter.value = "all";
};

// Toggle fullscreen
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};

// Select All & Remove All for semester selection
const selectAllSemestersFn = () => {
  selectedSemesters.value = Array.from({ length: 8 }, (_, i) => i + 1);
};
const removeAllSemestersFn = () => {
  selectedSemesters.value = [];
};

// Add this function in the script section
const getMatkulSKS = (matching) => {
  // Try to find the mata kuliah in mataKuliahList
  const matkul = mataKuliahList.value.find(mk => 
    mk.matkul_kode === matching.mata_kuliah_kelas.matkul_kode
  );
  return matkul?.matkul_sks || '-';
};
</script>