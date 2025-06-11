<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
    <!-- Alert Popup -->
    <div v-if="showAlert" class="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-md">
      <div class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full text-center transform transition-all duration-300 border border-white/70">
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
    <!-- Title -->
    <div class="mb-8 w-full flex justify-center">
      <div class="bg-white/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 flex items-center space-x-4 transition-all duration-300 border border-white/70 hover:shadow-blue-100/30">
        <img src="/input-jadwalhindari.png" alt="Icon Jadwal" class="w-16 h-16 object-contain" />
        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Input Jadwal Dihindari
        </h1>
      </div>
    </div>

    <!-- Form and List Container -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Input Form -->
      <div class="bg-white/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/70 hover:shadow-blue-100/30 transition-all duration-500 flex flex-col">
        <form @submit.prevent="submitForm" class="flex-1 flex flex-col">
          <div class="space-y-6 flex-1">
            <!-- Agenda -->
            <div>
              <label class="block text-gray-700 font-semibold mb-2">Agenda Hindari</label>
              <input 
                v-model="form.hindari_agenda" 
                type="text" 
                class="w-full p-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 shadow-inner" 
                placeholder="Masukkan agenda" 
                required 
              />
            </div>

            <!-- Hari Hindari -->
            <div>
              <label class="block text-gray-700 font-semibold mb-2">Hari Hindari</label>
              <div class="space-y-2">
                <div class="grid grid-cols-3 gap-2">
                  <label v-for="hari in hariListRow1" :key="hari" class="relative">
                    <input 
                      type="radio" 
                      v-model="form.hindari_hari" 
                      :value="hari" 
                      class="absolute opacity-0 w-full h-full cursor-pointer"
                    />
                    <div class="p-3 text-center rounded-xl border border-gray-200/50 cursor-pointer transition-all duration-300 shadow-sm"
                         :class="{'bg-green-50/70 backdrop-blur-xl border-green-500/70 text-green-600 shadow-md': form.hindari_hari === hari,
                                 'bg-white/40 backdrop-blur-xl hover:bg-gray-50/40': form.hindari_hari !== hari}">
                      {{ hari }}
                    </div>
                  </label>
                </div>
                <div class="grid grid-cols-3 gap-2">
                  <label v-for="hari in hariListRow2" :key="hari" class="relative">
                    <input 
                      type="radio" 
                      v-model="form.hindari_hari" 
                      :value="hari" 
                      class="absolute opacity-0 w-full h-full cursor-pointer"
                    />
                    <div class="p-3 text-center rounded-xl border border-gray-200/50 cursor-pointer transition-all duration-300 shadow-sm"
                         :class="{'bg-green-50/70 backdrop-blur-xl border-green-500/70 text-green-600 shadow-md': form.hindari_hari === hari,
                                 'bg-white/40 backdrop-blur-xl hover:bg-gray-50/40': form.hindari_hari !== hari}">
                      {{ hari }}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <!-- Sesi Hindari -->
            <div>
              <label class="block text-gray-700 font-semibold mb-2">Sesi Hindari</label>
              <div class="flex gap-2">
                <label v-for="sesi in sesiList" :key="sesi" class="relative flex-1">
                  <input 
                    type="radio" 
                    v-model="form.hindari_sesi" 
                    :value="sesi" 
                    class="absolute opacity-0 w-full h-full cursor-pointer"
                  />
                  <div class="p-3 text-center rounded-xl border border-gray-200/50 cursor-pointer transition-all duration-300 shadow-sm"
                       :class="{'bg-green-50/70 backdrop-blur-xl border-green-500/70 text-green-600 shadow-md': form.hindari_sesi === sesi,
                               'bg-white/40 backdrop-blur-xl hover:bg-gray-50/40': form.hindari_sesi !== sesi}">
                    {{ sesi }}
                  </div>
                </label>
              </div>
            </div>

            <!-- Semester Grid -->
            <div>
              <label class="block text-gray-700 font-semibold mb-3">Berlaku untuk Semester</label>
              <div class="mb-2 flex gap-2">
                <button type="button" @click="selectAllSemestersFn" class="px-3 py-1 bg-blue-600/70 hover:bg-blue-700/90 backdrop-blur-xl text-white rounded-lg text-xs font-semibold shadow-md hover:shadow-lg transition">Select All</button>
                <button type="button" @click="removeAllSemestersFn" class="px-3 py-1 bg-gray-300/70 hover:bg-gray-400/90 backdrop-blur-xl text-gray-700 rounded-lg text-xs font-semibold shadow-md hover:shadow-lg transition">Remove All</button>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <label v-for="n in 8" :key="n" class="inline-flex items-center p-2 rounded-lg hover:bg-gray-50/40 transition-colors duration-300 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="selectedSemesters" 
                    :value="n" 
                    class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span class="ml-2 text-gray-700">Semester {{ n }}</span>
                </label>
              </div>
            </div>
          </div>
          
          <!-- Submit and Cancel Buttons -->
          <div class="flex gap-4 mt-6">
            <button 
              type="submit" 
              class="flex-1 bg-gradient-to-r from-blue-600/70 to-indigo-600/70 backdrop-blur-xl text-white py-3 px-6 rounded-xl
                     hover:from-blue-700/90 hover:to-indigo-700/90 transition-colors duration-300
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
            >
              {{ editIndex !== null ? 'Update' : 'Submit' }}
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

      <!-- Daftar Jadwal Hindari -->
      <div class="bg-white/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/70 hover:shadow-blue-100/30 transition-all duration-500 flex flex-col">
        <!-- Title with Icon and Counter -->
        <div class="flex items-center justify-between mb-5 border-b pb-3">
          <div class="flex items-center">
            <i class="fas fa-list-ul text-blue-600 text-xl mr-3"></i>
            <h2 class="text-xl font-bold text-blue-600">Daftar Jadwal Hindari</h2>
          </div>
          <div class="flex items-center gap-2">
            <div class="bg-blue-100/50 backdrop-blur-xl text-blue-700 px-4 py-1.5 rounded-md text-base font-medium flex items-center h-8">
              <i class="fas fa-calendar-times mr-2"></i>
              {{ sortedJadwalHindariList.length }} Jadwal
            </div>
            <button 
              @click="toggleFullscreen" 
              class="p-1.5 bg-gray-100/50 backdrop-blur-xl hover:bg-gray-200/50 rounded-md text-gray-700 transition-colors shadow-sm"
              title="Lihat semua jadwal"
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
              placeholder="Cari jadwal hindari..."
              class="w-full pl-10 pr-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            />
          </div>
        </div>

        <!-- Filters -->
        <div class="flex items-center gap-4 mb-4">
          <div class="flex flex-wrap gap-2 flex-grow">
            <!-- Hari Filter -->
            <select 
              v-model="hariFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Hari</option>
              <option v-for="hari in [...hariListRow1, ...hariListRow2]" :key="hari" :value="hari">{{ hari }}</option>
            </select>
            
            <!-- Sesi Filter -->
            <select 
              v-model="sesiFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Sesi</option>
              <option v-for="sesi in sesiList" :key="sesi" :value="sesi">{{ sesi }}</option>
            </select>
            
            <!-- Semester Filter -->
            <select 
              v-model="semesterFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Semester</option>
              <option v-for="n in 8" :key="n" :value="n">Semester {{ n }}</option>
            </select>
          </div>
            
          <!-- Reset Filter Button -->
          <button 
            v-if="searchQuery || hariFilter !== 'all' || sesiFilter !== 'all' || semesterFilter !== 'all'"
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
            v-if="sortedJadwalHindariList.length === 0" 
            class="flex flex-col items-center justify-center py-12 text-gray-500 h-full"
          >
            <i class="fas fa-filter text-4xl mb-4 text-blue-300"></i>
            <p class="text-center font-medium">
              {{
                searchQuery
                  ? "Tidak ada jadwal yang sesuai dengan pencarian."
                  : hariFilter !== 'all' || sesiFilter !== 'all' || semesterFilter !== 'all'
                    ? "Tidak ada jadwal pada filter yang dipilih."
                    : "Belum ada jadwal hindari yang diinputkan."
              }}
            </p>
          </div>

          <!-- Jadwal Hindari List -->
          <div v-else class="overflow-y-auto h-full pr-2">
            <ul class="grid grid-cols-1 gap-4 pb-3">
              <li 
                v-for="(jadwal, index) in sortedJadwalHindariList" 
                :key="index" 
                class="bg-blue-50/40 backdrop-blur-xl p-3 rounded-xl border border-blue-100/50 hover:bg-indigo-50/40 hover:border-indigo-200/50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div class="flex flex-col h-full">
                  <!-- Top section with title and buttons -->
                  <div>
                    <div class="flex justify-between items-start">
                      <div class="w-4/5">
                        <h3 class="font-bold text-gray-800 text-lg">
                          {{ jadwal.hindari_agenda }}
                        </h3>
                      </div>
                      
                      <!-- Action Buttons -->
                      <div class="flex space-x-1">
                        <button 
                          @click="editJadwalHindari(sortedJadwalHindariList.indexOf(jadwal))" 
                          class="p-1.5 text-blue-600 hover:text-white hover:bg-blue-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                          title="Edit jadwal"
                        >
                          <i class="fas fa-edit"></i>
                        </button>
                        <button 
                          @click="deleteJadwalHindari(sortedJadwalHindariList.indexOf(jadwal))" 
                          class="p-1.5 text-red-600 hover:text-white hover:bg-red-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                          title="Hapus jadwal"
                        >
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Spacer to push content to bottom -->
                  <div class="flex-grow"></div>
                  
                  <!-- Bottom section with details -->
                  <div class="mt-2 pt-2">
                    <!-- Semester info above the line -->
                    <div class="mb-2">
                      <div class="flex flex-wrap gap-1">
                        <span 
                          v-for="sem in jadwal.hindari_smt" 
                          :key="sem" 
                          class="inline-flex items-center px-2 py-1 bg-indigo-100/60 backdrop-blur-sm text-indigo-600 rounded-lg text-xs font-medium shadow-sm"
                        >
                          <i class="fas fa-graduation-cap mr-1"></i> Semester {{ sem }}
                        </span>
                      </div>
                    </div>
                    
                    <!-- Hari and Sesi info below the line -->
                    <div class="border-t pt-2">
                      <div class="text-xs text-gray-600">
                        <div class="mb-2">
                          <div class="flex">
                            <div class="min-w-[80px] w-[80px]">
                              <span class="inline-flex items-center justify-center gap-1 px-2 py-1 bg-indigo-100/60 backdrop-blur-sm text-indigo-700 rounded-md font-medium w-full text-center shadow-sm">
                                <i class="fas fa-clock"></i>
                                Sesi {{ jadwal.hindari_sesi === 'SATU' ? '1' : jadwal.hindari_sesi === 'DUA' ? '2' : '3' }}
                              </span>
                            </div>
                            <div class="w-[20px] text-center flex items-center justify-center">
                              <span class="text-gray-400">:</span>
                            </div>
                            <div class="flex-1">
                              <div class="grid grid-cols-2 sm:grid-cols-3 gap-1">
                                <span class="inline-flex items-center justify-center gap-1 px-2 py-1 bg-blue-100/60 backdrop-blur-sm text-blue-700 rounded-md text-center mb-1 font-medium min-w-[100px] shadow-sm">
                                  <i class="fas fa-calendar-day mr-1"></i>
                                  {{ jadwal.hindari_hari }}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-[60]">
      <div class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300 border border-white/70">
        <div class="text-center">
          <div class="w-16 h-16 bg-red-100/70 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-exclamation-triangle text-2xl text-red-600"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Konfirmasi Hapus</h3>
          <p class="text-gray-600 mb-6">
            Apakah Anda yakin ingin menghapus data jadwal hindari ini?
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
    <div v-if="showEditConfirm" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-[60]">
      <div class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300 border border-white/70">
        <div class="text-center">
          <div class="w-16 h-16 bg-blue-100/70 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-pencil-alt text-2xl text-blue-600"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Konfirmasi Edit</h3>
          <p class="text-gray-600 mb-6">
            Apakah Anda yakin ingin mengedit data jadwal hindari ini?
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
    
    <!-- Fullscreen Popup -->
    <div v-if="isFullscreen" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-8">
      <div class="bg-white rounded-2xl shadow-2xl border border-white/70 w-full max-w-6xl h-[85vh] flex flex-col p-6 relative">
        <div class="flex items-center justify-between mb-4 border-b pb-3">
          <div class="flex items-center">
            <i class="fas fa-th-list text-blue-600 text-2xl mr-3"></i>
            <h2 class="text-2xl font-bold text-blue-600">Daftar Jadwal Hindari</h2>
          </div>
          <div class="flex items-center gap-2">
            <div class="bg-blue-100/50 backdrop-blur-xl text-blue-700 px-4 py-1.5 rounded-md text-base font-medium flex items-center h-8">
              <i class="fas fa-calendar-times mr-2"></i>
              {{ sortedJadwalHindariList.length }} Jadwal
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
              placeholder="Cari jadwal hindari..."
              class="w-full pl-10 pr-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            />
          </div>
        </div>
        
        <!-- Filters for Fullscreen -->
        <div class="flex items-center gap-4 mb-6">
          <div class="flex flex-wrap gap-2 flex-grow">
            <!-- Hari Filter -->
            <select 
              v-model="hariFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Hari</option>
              <option v-for="hari in [...hariListRow1, ...hariListRow2]" :key="hari" :value="hari">{{ hari }}</option>
            </select>
            
            <!-- Sesi Filter -->
            <select 
              v-model="sesiFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Sesi</option>
              <option v-for="sesi in sesiList" :key="sesi" :value="sesi">{{ sesi }}</option>
            </select>
            
            <!-- Semester Filter -->
            <select 
              v-model="semesterFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Semester</option>
              <option v-for="n in 8" :key="n" :value="n">Semester {{ n }}</option>
            </select>
          </div>
          
          <!-- Reset Filter Button -->
          <button 
            v-if="searchQuery || hariFilter !== 'all' || sesiFilter !== 'all' || semesterFilter !== 'all'"
            @click="resetFilters" 
            class="px-4 py-3 bg-blue-100/50 backdrop-blur-xl text-blue-700 rounded-lg hover:bg-blue-200/50 flex items-center whitespace-nowrap shadow-md hover:shadow-lg transition-all duration-300"
          >
            <i class="fas fa-undo mr-2"></i> Reset filter
          </button>
        </div>

        <!-- Multi-column List -->
        <div class="flex-1 overflow-y-auto pr-2">
          <div v-if="sortedJadwalHindariList.length === 0" class="flex flex-col items-center justify-center h-full text-gray-500">
            <i class="fas fa-filter text-6xl mb-4 text-blue-300"></i>
            <p class="text-center font-medium">
              {{
                searchQuery
                  ? "Tidak ada jadwal yang sesuai dengan pencarian."
                  : hariFilter !== 'all' || sesiFilter !== 'all' || semesterFilter !== 'all'
                    ? "Tidak ada jadwal pada filter yang dipilih."
                    : "Belum ada jadwal hindari yang diinputkan."
              }}
            </p>
          </div>
          <ul v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            <li 
              v-for="(jadwal, index) in sortedJadwalHindariList" 
              :key="index" 
              class="bg-blue-50/40 backdrop-blur-xl p-4 rounded-xl border border-blue-100/50 hover:bg-indigo-50/40 hover:border-indigo-200/50 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <div class="flex flex-col h-full">
                <!-- Top section with title and buttons -->
                <div>
                  <div class="flex justify-between items-start">
                    <div class="w-4/5">
                      <h3 class="font-bold text-gray-800 text-lg">
                        {{ jadwal.hindari_agenda }}
                      </h3>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex space-x-1">
                      <button
                        @click="editJadwalHindari(sortedJadwalHindariList.indexOf(jadwal)); toggleFullscreen()"
                        class="p-1.5 text-blue-600 hover:text-white hover:bg-blue-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                        title="Edit jadwal"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button
                        @click="deleteJadwalHindari(sortedJadwalHindariList.indexOf(jadwal))"
                        class="p-1.5 text-red-600 hover:text-white hover:bg-red-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                        title="Hapus jadwal"
                      >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Bottom section with details -->
                <div class="mt-auto pt-2">
                  <!-- Semester info above the line -->
                  <div class="mb-2">
                    <div class="flex flex-wrap gap-1">
                      <span 
                        v-for="sem in jadwal.hindari_smt" 
                        :key="sem" 
                        class="inline-flex items-center px-2 py-1 bg-indigo-100/60 backdrop-blur-sm text-indigo-600 rounded-lg text-xs font-medium shadow-sm"
                      >
                        <i class="fas fa-graduation-cap mr-1"></i> Semester {{ sem }}
                      </span>
                    </div>
                  </div>
                  
                  <!-- Hari and Sesi info below the line -->
                  <div class="border-t pt-2">
                    <div class="text-xs text-gray-600">
                      <div class="mb-2">
                        <div class="flex">
                          <div class="min-w-[80px] w-[80px]">
                            <span class="inline-flex items-center justify-center gap-1 px-2 py-1 bg-indigo-100/60 backdrop-blur-sm text-indigo-700 rounded-md font-medium w-full text-center shadow-sm">
                              <i class="fas fa-clock"></i>
                              Sesi {{ jadwal.hindari_sesi === 'SATU' ? '1' : jadwal.hindari_sesi === 'DUA' ? '2' : '3' }}
                            </span>
                          </div>
                          <div class="w-[20px] text-center flex items-center justify-center">
                            <span class="text-gray-400">:</span>
                          </div>
                          <div class="flex-1">
                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-1">
                              <span class="inline-flex items-center justify-center gap-1 px-2 py-1 bg-blue-100/60 backdrop-blur-sm text-blue-700 rounded-md text-center mb-1 font-medium min-w-[100px] shadow-sm">
                                <i class="fas fa-calendar-day mr-1"></i>
                                {{ jadwal.hindari_hari }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import axios from 'axios'

// Form data
const form = ref({
  hindari_agenda: '',
  hindari_hari: '',
  hindari_sesi: '',
  hindari_smt: []
})

const hariListRow1 = ['SENIN', 'SELASA', 'RABU']
const hariListRow2 = ['KAMIS', 'JUMAT']
const sesiList = ['SESI 1', 'SESI 2', 'SESI 3'];

// Mapping for submission (SESI to SATU, DUA, TIGA)
const sesiMap = {
  'SESI 1': 'SATU',
  'SESI 2': 'DUA',
  'SESI 3': 'TIGA'
}

// Reverse mapping for form display (SATU to SESI 1)
const reverseSesiMap = {
  'SATU': 'SESI 1',
  'DUA': 'SESI 2',
  'TIGA': 'SESI 3'
}

const jadwalList = ref([])
const editIndex = ref(null)

const selectedSemesters = ref([])
const selectAllSemesters = ref(false)

const searchQuery = ref("");
const hariFilter = ref("all");
const sesiFilter = ref("all");
const semesterFilter = ref("all");
const isFullscreen = ref(false);

// Add new refs for confirmation popups
const showDeleteConfirm = ref(false);
const showEditConfirm = ref(false);
const selectedIndex = ref(null);

// Add alert state
const showAlert = ref(false);
const alertMessage = ref('');
const showSuccess = ref(false);
const successMessage = ref('');

// Computed property for filtered jadwal hindari list
const filteredJadwalHindariList = computed(() => {
  let filtered = jadwalList.value;
  
  // Apply search filter
  if (searchQuery.value) {
  const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(jadwal => 
    jadwal.hindari_agenda.toLowerCase().includes(query) ||
    jadwal.hindari_hari.toLowerCase().includes(query) ||
    jadwal.hindari_sesi.toLowerCase().includes(query) ||
    jadwal.hindari_smt.some(semester => semester.toString().includes(query))
  );
  }
  
  // Apply hari filter
  if (hariFilter.value !== 'all') {
    filtered = filtered.filter(jadwal => jadwal.hindari_hari === hariFilter.value);
  }
  
  // Apply sesi filter
  if (sesiFilter.value !== 'all') {
    filtered = filtered.filter(jadwal => {
      const sesiValue = sesiMap[sesiFilter.value] || sesiFilter.value;
      return jadwal.hindari_sesi === sesiValue;
    });
  }
  
  // Apply semester filter
  if (semesterFilter.value !== 'all') {
    filtered = filtered.filter(jadwal => 
      jadwal.hindari_smt.includes(parseInt(semesterFilter.value))
    );
  }
  
  return filtered;
});

// Computed property for sorted jadwal hindari list (newest first)
const sortedJadwalHindariList = computed(() => {
  // Create a copy of the filtered list to avoid modifying the original
  const sorted = [...filteredJadwalHindariList.value];
  
  // Sort by newest first (assuming there's a createdAt field)
  // If there's no createdAt field, we'll reverse the array to show "newest" first
  return sorted.reverse();
});

const toggleSelectAll = () => {
  if (selectAllSemesters.value) {
    selectedSemesters.value = Array.from({ length: 8 }, (_, i) => i + 1)
  } else {
    selectedSemesters.value = []
  }
}

const formatHari = (hari) => {
  return hari || '';
}

const formatSesi = (sesi) => {
  // Menampilkan nilai sesi langsung tanpa perubahan
  return sesi || '';
}

const pollingInterval = ref(null);

const fetchJadwal = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get('http://10.4.90.25:3000/jadwal_hindari', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    
    // Update the jadwalList with the response data
    jadwalList.value = response.data;
  } catch (error) {
    console.error('Gagal mengambil data jadwal hindari', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
  }
};

const submitForm = async () => {
  // Validate form
  if (!form.value.hindari_agenda || !form.value.hindari_hari || !form.value.hindari_sesi || selectedSemesters.value.length === 0) {
    alertMessage.value = 'Semua field harus diisi dan minimal satu semester harus dipilih.';
    showAlert.value = true;
    return;
  }
  
  // For update, show confirmation first
  if (editIndex.value !== null) {
    showEditConfirm.value = true;
    return;
  }
  
  await submitData();
};

// Submit data after confirmation
const submitData = async () => {
  const newJadwal = {
    hindari_agenda: form.value.hindari_agenda,
    hindari_hari: form.value.hindari_hari,
    hindari_sesi: sesiMap[form.value.hindari_sesi] || form.value.hindari_sesi,
    hindari_smt: [...selectedSemesters.value],
  };

  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    let response;
    if (editIndex.value !== null) {
      const jadwalId = jadwalList.value[editIndex.value].id_hindari;
      response = await axios.patch(`http://10.4.90.25:3000/jadwal_hindari/${jadwalId}`, newJadwal, { headers });
      
      // Update the local list with the new data
      jadwalList.value[editIndex.value] = response.data.data;
      
      resetForm();
      editIndex.value = null;
      showSuccessAlert('Data jadwal hindari berhasil diperbarui!');
    } else {
      response = await axios.post('http://10.4.90.25:3000/jadwal_hindari', newJadwal, { headers });
      
      // Add the new jadwal to the list
      jadwalList.value.push(response.data.data);

    resetForm();
      showSuccessAlert('Data jadwal hindari berhasil ditambahkan!');
    }
  } catch (error) {
    console.error('Error in submitForm:', error);
    let msg = 'Gagal mengupdate data: ';
    if (error.response && error.response.data && error.response.data.error) {
      msg += error.response.data.error;
    } else if (error.message) {
      msg += error.message;
    } else {
      msg += 'Terjadi kesalahan.';
    }
    alertMessage.value = msg;
    showAlert.value = true;
  }
};

const fetchJadwalList = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get('http://10.4.90.25:3000/jadwal_hindari', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    jadwalList.value = response.data; // Ensure jadwalList is updated correctly
  } catch (error) {
    console.error('Gagal mengambil data jadwal hindari', error);
  }
};

const editJadwalHindari = (index) => {
  const jadwal = sortedJadwalHindariList.value[index];
  selectedIndex.value = jadwalList.value.findIndex(j => j.id_hindari === jadwal.id_hindari);
  
  // Directly edit without confirmation
  const index2 = selectedIndex.value;
  const jadwalHindari = jadwalList.value[index2];
  
  // Set form values
  form.value.hindari_agenda = jadwalHindari.hindari_agenda;
  form.value.hindari_hari = jadwalHindari.hindari_hari;
  
  // Convert sesi format (SATU -> SESI 1)
  form.value.hindari_sesi = reverseSesiMap[jadwalHindari.hindari_sesi] || jadwalHindari.hindari_sesi;
  
  // Set semester values
  form.value.hindari_smt = [...jadwalHindari.hindari_smt];
  selectedSemesters.value = [...jadwalHindari.hindari_smt];
  selectAllSemesters.value = jadwalHindari.hindari_smt.length === 8;
  
  // Set edit mode
  editIndex.value = index2;
};

const confirmEdit = () => {
  showEditConfirm.value = false;
  submitData();
};

const cancelEdit = () => {
  resetForm()
  editIndex.value = null
}

const deleteJadwal = async (index) => {
  if (!confirm('Yakin ingin menghapus jadwal ini?')) return;
  
  const jadwalId = jadwalList.value[index].id_hindari;
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    await axios.delete(`http://10.4.90.25:3000/jadwal_hindari/${jadwalId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    // Remove the deleted jadwal from the list
    jadwalList.value.splice(index, 1);
  } catch (error) {
    console.error('Gagal menghapus data jadwal hindari', error);
  }
}

const resetForm = () => {
  form.value = { hindari_agenda: '', hindari_hari: '', hindari_sesi: '', hindari_smt: [] }
  selectedSemesters.value = []
  selectAllSemesters.value = false
}

// Update delete function to show confirmation
const deleteJadwalHindari = (index) => {
  const jadwal = sortedJadwalHindariList.value[index];
  selectedIndex.value = jadwalList.value.findIndex(j => j.id_hindari === jadwal.id_hindari);
  showDeleteConfirm.value = true;
};

// Confirm delete function
const confirmDelete = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const jadwalHindari = jadwalList.value[selectedIndex.value];
    await axios.delete(`http://10.4.90.25:3000/jadwal_hindari/${jadwalHindari.id_hindari}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    jadwalList.value.splice(selectedIndex.value, 1);
    showDeleteConfirm.value = false;
    showSuccessAlert('Data jadwal hindari berhasil dihapus!');
  } catch (error) {
    console.error('Error deleting jadwal hindari:', error);
    let msg = 'Gagal menghapus data jadwal hindari: ';
    if (error.response && error.response.data && error.response.data.error) {
      msg += error.response.data.error;
    } else if (error.message) {
      msg += error.message;
    } else {
      msg += 'Terjadi kesalahan.';
    }
    alertMessage.value = msg;
    showAlert.value = true;
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

// Select All & Remove All for semester selection
const selectAllSemestersFn = () => {
  selectedSemesters.value = Array.from({ length: 8 }, (_, i) => i + 1);
};
const removeAllSemestersFn = () => {
  selectedSemesters.value = [];
};

// Function to reset filters
const resetFilters = () => {
  searchQuery.value = "";
  hariFilter.value = "all";
  sesiFilter.value = "all";
  semesterFilter.value = "all";
};

// Toggle fullscreen
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};

onMounted(() => {
  fetchJadwal();
  pollingInterval.value = setInterval(fetchJadwal, 10000); // 10 detik
});

onUnmounted(() => {
  if (pollingInterval.value) clearInterval(pollingInterval.value);
});
</script>
