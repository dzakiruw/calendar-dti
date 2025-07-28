<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
    <!-- Alert Popup -->
    <div v-if="showAlert" class="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-md" @click="showAlert = false">
      <div class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full text-center transform transition-all duration-300 border border-white/70" @click.stop>
        <div class="mb-4 text-red-600 text-2xl"><i class="fas fa-exclamation-circle"></i></div>
        <div class="mb-4 text-gray-800 font-semibold">{{ alertMessage }}</div>
        <button @click="showAlert = false" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg">
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
        <img src="/input-dosen.png" alt="Dosen Icon" class="w-16 h-16 object-contain" />
        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Input Dosen
        </h1>
      </div>
    </div>

    <!-- Dosen Form and List Container -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <!-- Dosen Form -->
      <div class="bg-white/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/70 hover:shadow-blue-100/30 transition-all duration-500">
        <form @submit.prevent="submitDosen" class="space-y-6">
          <div class="space-y-6">
            <div>
              <label class="block text-gray-700 font-semibold mb-2">Kode Dosen</label>
              <div v-if="editIndex !== null">
                <p class="text-lg font-bold text-blue-600">{{ kode }}</p>
              </div>
              <div v-else>
                <input 
                  type="text" 
                  v-model="kode" 
                  class="w-full p-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 shadow-inner" 
                  placeholder="AI" 
                  required 
                />
              </div>
            </div>

            <div>
              <label class="block text-gray-700 font-semibold mb-2">Nama Dosen</label>
              <input 
                type="text" 
                v-model="nama" 
                class="w-full p-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 shadow-inner" 
                placeholder="Annisaa Sri Indrawanti, S.T., M.T." 
                required 
              />
            </div>

            <!-- Prioritas Selection -->
            <div>
              <label class="block text-gray-700 font-semibold mb-2">Prioritas</label>
              <div class="relative">
                <select 
                  v-model="prioritas" 
                  class="w-full p-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 cursor-pointer shadow-inner appearance-none hover:border-blue-400"
                  required
                >
                  <option disabled value="">Pilih Prioritas</option>
                  <option value="PRIORITAS">Prioritas</option>
                  <option value="NON_PRIORITAS">Non Prioritas</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <i class="fas fa-chevron-down text-gray-400"></i>
                </div>
              </div>
            </div>

            <!-- Ketersediaan Dosen -->
            <div>
              <label class="block text-gray-700 font-semibold mb-4">Ketersediaan Dosen (Sesi)</label>
              <div class="flex gap-2 mb-2">
                <button type="button" @click="selectAllKetersediaan" class="px-3 py-1 bg-blue-600/70 hover:bg-blue-700/90 backdrop-blur-xl text-white rounded-lg text-xs font-semibold shadow hover:shadow-lg transition">Select All</button>
                <button type="button" @click="removeAllKetersediaan" class="px-3 py-1 bg-gray-300/70 hover:bg-gray-400/90 backdrop-blur-xl text-gray-700 rounded-lg text-xs font-semibold shadow hover:shadow-lg transition">Remove All</button>
              </div>
              <div class="w-full rounded-xl border border-gray-200/50 overflow-x-auto md:overflow-x-visible bg-white/30 backdrop-blur-sm shadow-inner">
                <table class="min-w-[600px] md:min-w-0 w-full text-xs md:text-sm border-collapse border border-gray-200/60">
                  <thead class="bg-blue-100/60 backdrop-blur-sm">
                    <tr>
                      <th class="sticky left-0 z-10 bg-blue-100/70 backdrop-blur-sm border border-gray-200/60 px-2 py-2 md:px-3 md:py-3 text-xs md:text-sm text-blue-700 text-center">Sesi / Hari</th>
                      <th v-for="hari in hariList" :key="hari" class="border border-gray-200/60 px-2 py-2 md:px-3 md:py-3 text-xs md:text-sm text-blue-700 text-center bg-blue-100/60 backdrop-blur-sm">
                        {{ hari }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, sesiIndex) in sesiList" :key="sesiIndex">
                      <td class="sticky left-0 z-10 bg-indigo-100/70 backdrop-blur-sm border border-gray-200/60 px-2 py-2 md:px-3 md:py-3 font-semibold text-xs md:text-sm text-indigo-700 text-center">
                        Sesi {{ sesiIndex + 1 }}
                      </td>
                      <td v-for="(col, hariIndex) in hariList" :key="hariIndex" 
                          class="border border-gray-200/60 px-2 py-2 md:px-3 md:py-3 text-center bg-white/40 backdrop-blur-sm">
                        <input 
                          type="checkbox" 
                          v-model="ketersediaan[sesiIndex][hariIndex]" 
                          class="w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all duration-300 cursor-pointer"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Submit and Cancel Buttons -->
          <div class="flex gap-4 pt-4">
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

      <!-- Daftar Dosen -->
      <div class="bg-white/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/70 hover:shadow-blue-100/30 transition-all duration-500">
        <div class="flex flex-col h-full">
          <!-- Title with Icon and Counter -->
          <div class="flex items-center justify-between mb-5 border-b pb-3">
            <div class="flex items-center">
              <i class="fas fa-list-ul text-blue-600 text-xl mr-3"></i>
              <h2 class="text-xl font-bold text-blue-600">Daftar Dosen</h2>
            </div>
            <div class="flex items-center gap-2">
              <div class="bg-blue-100/50 backdrop-blur-xl text-blue-700 px-3 py-1 rounded-md text-sm font-medium flex items-center">
                <i class="fas fa-user-tie mr-1.5"></i>
                {{ sortedDosenList.length }} Dosen
              </div>
              <button 
                @click="toggleFullscreen" 
                class="p-1.5 bg-gray-100/50 backdrop-blur-xl hover:bg-gray-200/50 rounded-md text-gray-700 transition-colors shadow-sm"
                title="Lihat semua dosen"
              >
                <i class="fas fa-expand"></i>
              </button>
            </div>
          </div>
          
          <!-- Search Bar -->
          <div class="w-full mb-4">
            <div class="relative">
              <i
                class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              ></i>
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Cari dosen..."
                class="w-full pl-10 pr-4 py-2 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
              />
            </div>
          </div>

          <!-- Filters -->
          <div class="flex items-center gap-4 mb-4">
            <div class="flex flex-wrap gap-2 flex-grow">
              <!-- Prioritas Filter -->
              <select 
                v-model="prioritasFilter" 
                class="px-4 py-2 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
              >
                <option value="all">Semua Prioritas</option>
                <option value="PRIORITAS">Prioritas</option>
                <option value="NON_PRIORITAS">Non Prioritas</option>
              </select>
              
              <!-- Hari Filter -->
              <select 
                v-model="hariFilter" 
                class="px-4 py-2 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
              >
                <option value="all">Semua Hari</option>
                <option v-for="hari in hariList" :key="hari" :value="hari">{{ hari }}</option>
              </select>
              
              <!-- Sesi Filter -->
              <select 
                v-model="sesiFilter" 
                class="px-4 py-2 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
              >
                <option value="all">Semua Sesi</option>
                <option v-for="sesi in sesiList" :key="sesi" :value="sesi">Sesi {{ sesi }}</option>
              </select>
            </div>
            
            <!-- Reset Filter Button -->
            <button 
              v-if="searchQuery || prioritasFilter !== 'all' || hariFilter !== 'all' || sesiFilter !== 'all'"
              @click="resetFilters" 
              class="px-4 py-3 bg-blue-100/50 backdrop-blur-xl text-blue-700 rounded-lg hover:bg-blue-200/50 flex items-center whitespace-nowrap shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <i class="fas fa-undo mr-2"></i> Reset filter
            </button>
          </div>

          <!-- Content Area -->
          <div class="h-[505px] overflow-hidden">
          <!-- Empty State -->
          <div 
              v-if="sortedDosenList.length === 0"
              class="flex flex-col items-center justify-center py-12 text-gray-500 h-full"
          >
              <i class="fas fa-filter text-4xl mb-4 text-blue-300"></i>
              <p class="text-center font-medium">
                {{
                  searchQuery
                    ? "Tidak ada dosen yang sesuai dengan pencarian."
                    : prioritasFilter !== 'all' || hariFilter !== 'all' || sesiFilter !== 'all'
                      ? "Tidak ada jadwal pada filter yang dipilih."
                      : "Belum ada dosen yang diinputkan."
                }}
            </p>
          </div>

          <!-- Dosen List -->
            <div v-else class="overflow-y-auto h-full pr-2">
              <ul class="grid grid-cols-1 gap-4 pb-3">
              <li 
                  v-for="(dosen, index) in sortedDosenList" 
                :key="index" 
                  class="bg-blue-50/40 backdrop-blur-xl p-4 rounded-xl border border-blue-100/50 hover:bg-indigo-50/40 hover:border-indigo-200/50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                  <div class="flex flex-col h-full">
                    <!-- Top section with title and buttons -->
                    <div>
                <div class="flex justify-between items-start">
                        <div class="w-4/5">
                          <h3 class="font-bold text-gray-800 text-lg">
                            {{ dosen.dosen_nama }}
                          </h3>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="flex space-x-1">
                          <button
                            @click="editDosen(sortedDosenList.indexOf(dosen))"
                            class="p-1.5 text-blue-600 hover:text-white hover:bg-blue-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                            title="Edit dosen"
                          >
                            <i class="fas fa-edit"></i>
                          </button>
                          <button
                            @click="deleteDosen(sortedDosenList.indexOf(dosen))"
                            class="p-1.5 text-red-600 hover:text-white hover:bg-red-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                            title="Hapus dosen"
                          >
                            <i class="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Spacer to push content to bottom -->
                    <div class="flex-grow"></div>
                    
                    <!-- Bottom section with code and classes -->
                  <div>
                      <!-- Dosen Code and Priority -->
                      <div class="flex items-center gap-2 mb-2">
                        <div class="text-blue-600 text-sm font-medium">
                          {{ dosen.dosen_kode }}
                        </div>
                    <span 
                      :class="{
                            'px-2 py-0.5 rounded-md text-xs font-medium inline-flex items-center gap-1': true,
                        'bg-green-100/50 backdrop-blur-sm text-green-600': dosen.dosen_prioritas === 'PRIORITAS',
                        'bg-red-100/50 backdrop-blur-sm text-red-600': dosen.dosen_prioritas === 'NON_PRIORITAS'
                      }"
                    >
                      <i :class="{
                            'fas fa-xs': true,
                        'fa-star': dosen.dosen_prioritas === 'PRIORITAS',
                        'fa-exclamation-circle': dosen.dosen_prioritas === 'NON_PRIORITAS'
                      }"></i>
                      {{ dosen.dosen_prioritas === 'PRIORITAS' ? 'Prioritas' : 'Non Prioritas' }}
                    </span>
                      </div>
                      
                      <!-- Ketersediaan Dosen -->
                      <div class="border-t pt-2">
                        <div v-if="getGroupedSessions(dosen.jadwal_dosen).length > 0" class="text-xs text-gray-600">
                          <div v-for="(result, sesiIndex) in getGroupedSessions(dosen.jadwal_dosen)" :key="sesiIndex" class="mb-2">
                            <div class="flex">
                              <div class="min-w-[80px] w-[80px]">
                                <span class="inline-flex items-center justify-center gap-1 px-2 py-1 bg-indigo-100/50 backdrop-blur-sm text-indigo-700 rounded-md font-medium w-full text-center">
                                  <i class="fas fa-clock"></i>
                                  Sesi {{ result.sesi === 'SATU' ? '1' : result.sesi === 'DUA' ? '2' : '3' }}
                            </span>
                              </div>
                              <div class="w-[20px] text-center flex items-center justify-center">
                                <span class="text-gray-400">:</span>
                              </div>
                              <div class="flex-1">
                                <div class="grid grid-cols-2 sm:grid-cols-3 gap-1">
                              <span 
                                v-for="hari in result.hari" 
                                :key="hari"
                                    class="inline-flex items-center justify-center gap-1 px-2 py-1 bg-blue-100/50 backdrop-blur-sm text-blue-700 rounded-md w-full text-center mb-1 font-medium"
                              >
                                    <i class="fas fa-calendar-day"></i>
                                {{ hari }}
                              </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else class="text-xs text-gray-400 italic">
                          <i class="fas fa-calendar-times mr-1"></i> Tidak tersedia
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
            Apakah Anda yakin ingin menghapus data dosen ini?
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
          <h3 class="text-lg font-bold text-gray-900 mb-2">Konfirmasi Update</h3>
          <p class="text-gray-600 mb-6">
            Apakah Anda yakin ingin mengupdate data dosen ini?
          </p>
          <div class="flex justify-center space-x-4">
            <button 
              @click="confirmEdit" 
              class="px-4 py-2 bg-blue-600/70 hover:bg-blue-700/90 backdrop-blur-xl text-white rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Ya, Update
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
    <div v-if="isFullscreen" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-8" @click="toggleFullscreen">
      <div class="bg-white rounded-2xl shadow-2xl border border-white/70 w-full max-w-6xl h-[85vh] flex flex-col p-6 relative" @click.stop>
        <div class="flex items-center justify-between mb-4 border-b pb-3">
          <div class="flex items-center">
            <i class="fas fa-th-list text-blue-600 text-2xl mr-3"></i>
            <h2 class="text-2xl font-bold text-blue-600">Daftar Dosen</h2>
          </div>
          <div class="flex items-center gap-2">
            <div class="bg-blue-100/50 backdrop-blur-xl text-blue-700 px-4 py-1.5 rounded-md text-base font-medium flex items-center h-8">
              <i class="fas fa-user-tie mr-2"></i>
              {{ sortedDosenList.length }} Dosen
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
              placeholder="Cari dosen..."
              class="w-full pl-10 pr-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            />
          </div>
        </div>
        
        <!-- Filters for Fullscreen -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex flex-wrap gap-2">
            <!-- Prioritas Filter -->
            <select 
              v-model="prioritasFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Prioritas</option>
              <option value="PRIORITAS">Prioritas</option>
              <option value="NON_PRIORITAS">Non Prioritas</option>
            </select>
            
            <!-- Hari Filter -->
            <select 
              v-model="hariFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Hari</option>
              <option v-for="hari in hariList" :key="hari" :value="hari">{{ hari }}</option>
            </select>
            
            <!-- Sesi Filter -->
            <select 
              v-model="sesiFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Sesi</option>
              <option v-for="sesi in sesiList" :key="sesi" :value="sesi">Sesi {{ sesi }}</option>
            </select>
          </div>
          
          <!-- Reset Filter Button -->
          <button 
            v-if="searchQuery || prioritasFilter !== 'all' || hariFilter !== 'all' || sesiFilter !== 'all'"
            @click="resetFilters" 
            class="px-4 py-3 bg-blue-100/50 backdrop-blur-xl text-blue-700 rounded-lg hover:bg-blue-200/50 flex items-center whitespace-nowrap shadow-md hover:shadow-lg transition-all duration-300"
          >
            <i class="fas fa-undo mr-2"></i> Reset filter
          </button>
        </div>

        <!-- Multi-column List -->
        <div class="flex-1 overflow-y-auto pr-2">
          <div v-if="sortedDosenList.length === 0" class="flex flex-col items-center justify-center h-full text-gray-500">
            <i class="fas fa-filter text-6xl mb-4 text-blue-300"></i>
            <p class="text-center font-medium text-xl">
              {{
                searchQuery
                  ? "Tidak ada dosen yang sesuai dengan pencarian."
                  : prioritasFilter !== 'all' || hariFilter !== 'all' || sesiFilter !== 'all'
                    ? "Tidak ada jadwal pada filter yang dipilih."
                    : "Belum ada dosen yang diinputkan."
              }}
            </p>
          </div>
          <ul v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            <li 
              v-for="(dosen, index) in sortedDosenList" 
              :key="index" 
              class="bg-blue-50/40 backdrop-blur-xl p-4 rounded-xl border border-blue-100/50 hover:bg-indigo-50/40 hover:border-indigo-200/50 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <div class="flex flex-col h-full">
                <!-- Top section with title and buttons -->
                <div>
                  <div class="flex justify-between items-start">
                    <div class="w-4/5">
                      <h3 class="font-bold text-gray-800 text-lg">
                        {{ dosen.dosen_nama }}
                      </h3>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex space-x-1">
                      <button
                        @click="editDosen(sortedDosenList.indexOf(dosen)); toggleFullscreen()"
                        class="p-1.5 text-blue-600 hover:text-white hover:bg-blue-500 rounded-md transition-colors duration-300"
                        title="Edit dosen"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button
                        @click="deleteDosen(sortedDosenList.indexOf(dosen))"
                        class="p-1.5 text-red-600 hover:text-white hover:bg-red-500 rounded-md transition-colors duration-300"
                        title="Hapus dosen"
                      >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Spacer to push content to bottom -->
                <div class="flex-grow"></div>
                
                <!-- Bottom section with code and classes -->
                <div>
                  <!-- Dosen Code and Priority -->
                  <div class="flex items-center gap-2 mb-2">
                    <div class="text-blue-600 text-sm font-medium">
                      {{ dosen.dosen_kode }}
                    </div>
                    <span 
                      :class="{
                        'px-2 py-0.5 rounded-md text-xs font-medium inline-flex items-center gap-1': true,
                        'bg-green-100 text-green-600': dosen.dosen_prioritas === 'PRIORITAS',
                        'bg-red-100 text-red-600': dosen.dosen_prioritas === 'NON_PRIORITAS'
                      }"
                    >
                      <i :class="{
                        'fas fa-xs': true,
                        'fa-star': dosen.dosen_prioritas === 'PRIORITAS',
                        'fa-exclamation-circle': dosen.dosen_prioritas === 'NON_PRIORITAS'
                      }"></i>
                      {{ dosen.dosen_prioritas === 'PRIORITAS' ? 'Prioritas' : 'Non Prioritas' }}
                    </span>
                  </div>
                  
                  <!-- Ketersediaan Dosen -->
                  <div class="border-t pt-2">
                    <div v-if="getGroupedSessions(dosen.jadwal_dosen).length > 0" class="text-xs text-gray-600">
                      <div v-for="(result, sesiIndex) in getGroupedSessions(dosen.jadwal_dosen)" :key="sesiIndex" class="mb-2">
                        <div class="flex">
                          <div class="min-w-[80px] w-[80px]">
                            <span class="inline-flex items-center justify-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md font-medium w-full text-center">
                              <i class="fas fa-clock"></i>
                              Sesi {{ result.sesi === 'SATU' ? '1' : result.sesi === 'DUA' ? '2' : '3' }}
                            </span>
                          </div>
                          <div class="w-[20px] text-center flex items-center justify-center">
                            <span class="text-gray-400">:</span>
                          </div>
                          <div class="flex-1">
                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-1">
                              <span 
                                v-for="hari in result.hari" 
                                :key="hari"
                                class="inline-flex items-center justify-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-md w-full text-center mb-1 font-medium"
                              >
                                <i class="fas fa-calendar-day"></i>
                                {{ hari }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-xs text-gray-400 italic">
                      <i class="fas fa-calendar-times mr-1"></i> Tidak tersedia
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
import { ref, onMounted, computed, onUnmounted } from 'vue';
import axios from 'axios';

// Get runtime config for API base URL
const config = useRuntimeConfig();
const apiBaseUrl = config.public.apiBaseUrl;

const hariList = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT'];
const sesiList = ['SATU', 'DUA', 'TIGA'];

const kode = ref("");
const nama = ref("");
const prioritas = ref("");
const ketersediaan = ref([...Array(3)].map(() => Array(5).fill(false)));
const dosenList = ref([]);
const editIndex = ref(null);
const searchQuery = ref("");
const prioritasFilter = ref("all");
const hariFilter = ref("all");
const sesiFilter = ref("all");

// Add new refs for confirmation popups
const showDeleteConfirm = ref(false);
const showEditConfirm = ref(false);
const selectedIndex = ref(null);

// Add alert state
const showAlert = ref(false);
const alertMessage = ref('');
const showSuccess = ref(false);
const successMessage = ref('');

let pollingInterval = null;

// Computed property for filtered dosen list
const filteredDosenList = computed(() => {
  let filtered = dosenList.value;
  
  // Apply search filter
  if (searchQuery.value) {
  const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(dosen => 
    dosen.dosen_nama.toLowerCase().includes(query) ||
    dosen.dosen_kode.toLowerCase().includes(query) ||
    dosen.dosen_prioritas.toLowerCase().includes(query)
  );
  }
  
  // Apply prioritas filter
  if (prioritasFilter.value !== 'all') {
    filtered = filtered.filter(dosen => dosen.dosen_prioritas === prioritasFilter.value);
  }
  
  // Apply hari filter
  if (hariFilter.value !== 'all') {
    filtered = filtered.filter(dosen => {
      if (!dosen.jadwal_dosen || !Array.isArray(dosen.jadwal_dosen)) return false;
      return dosen.jadwal_dosen.some(jadwal => jadwal.dosen_sedia_hari === hariFilter.value);
    });
  }
  
  // Apply sesi filter
  if (sesiFilter.value !== 'all') {
    filtered = filtered.filter(dosen => {
      if (!dosen.jadwal_dosen || !Array.isArray(dosen.jadwal_dosen)) return false;
      return dosen.jadwal_dosen.some(jadwal => jadwal.dosen_sedia_sesi === sesiFilter.value);
    });
  }
  
  return filtered;
});

// Computed property for sorted dosen list (newest first)
const sortedDosenList = computed(() => {
  // Create a copy of the filtered list to avoid modifying the original
  const sorted = [...filteredDosenList.value];
  
  // Sort by newest first (assuming there's a createdAt field)
  // If there's no createdAt field, we'll reverse the array to show "newest" first
  return sorted.reverse();
});

// Fungsi untuk mendapatkan sesi yang difilter dan mengelompokkan hari berdasarkan sesi
const getGroupedSessions = (jadwalDosen) => {
  if (!Array.isArray(jadwalDosen)) {
    console.warn('Invalid jadwal_dosen format:', jadwalDosen);
    return [];
  }

  const grouped = sesiList.map((sesi) => {
    const hariListForSesi = jadwalDosen
      .filter((item) => item.dosen_sedia_sesi === sesi)
      .map((item) => item.dosen_sedia_hari);

    return {
      sesi,
      hari: hariListForSesi,
    };
  });

  return grouped.filter((group) => group.hari.length > 0);
};

const formatKetersediaan = (ketersediaan) => {
  return ketersediaan.flatMap((sesi, sesiIndex) => {
    return sesi
      .map((available, hariIndex) => {
        if (available) {
          return {
            dosen_sedia_hari: hariList[hariIndex],
            dosen_sedia_sesi: sesiList[sesiIndex]
          };
        }
        return null;
      })
      .filter(Boolean);
  });
};

// Fetch Dosen Data from API
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
    dosenList.value = response.data;
  } catch (error) {
    console.error('Gagal mengambil data dosen', error);
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

// Submit Dosen (Add or Update)
const submitDosen = async () => {
  try {
    // Trim kode
    kode.value = kode.value.trim();
    if (!kode.value) {
      alertMessage.value = 'Kode dosen tidak boleh kosong atau hanya spasi.';
      showAlert.value = true;
      return;
    }
    
    // For update, show confirmation first
    if (editIndex.value !== null) {
      showEditConfirm.value = true;
      return;
    }
    
    await submitData();
  } catch (error) {
    console.error('Gagal mengirim data dosen', error);
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

// Submit data after confirmation
const submitData = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    // Format kesediaan
    const kesediaan = [];
    ketersediaan.value.forEach((sesi, sesiIndex) => {
      sesi.forEach((available, hariIndex) => {
        if (available) {
          kesediaan.push({
            hari: hariList[hariIndex],
            sesi: sesiList[sesiIndex]
          });
        }
      });
    });

    if (editIndex.value !== null) {
      // Update Dosen
      const updateData = {
        dosen_kode: kode.value,
        dosen_nama: nama.value,
        dosen_prioritas: prioritas.value,
        kesediaan: kesediaan
      };

      const dosenKode = dosenList.value[editIndex.value].dosen_kode;
      await axios.patch(`${apiBaseUrl}/dosen/${dosenKode}`, updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      // After update, fetch the list again to ensure consistency
      await fetchDosen();
      resetForm();
      editIndex.value = null;
      showEditConfirm.value = false;
      showSuccessAlert('Data dosen berhasil diperbarui!');
    } else {
      // Add New Dosen
      const newDosen = {
        dosen_kode: kode.value,
        dosen_nama: nama.value,
        dosen_prioritas: prioritas.value,
        kesediaan: kesediaan
      };

      await axios.post(`${apiBaseUrl}/dosen`, newDosen, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      // Fetch updated dosen list
      await fetchDosen();
      resetForm();
      showSuccessAlert('Data dosen berhasil ditambahkan!');
    }
  } catch (error) {
    console.error('Gagal mengirim data dosen', error);
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

// Update edit function to show confirmation
const editDosen = (index) => {
  const dosen = sortedDosenList.value[index];
  selectedIndex.value = dosenList.value.findIndex(d => d.dosen_kode === dosen.dosen_kode);

  // Directly edit without confirmation
  const index2 = selectedIndex.value;
  const dosen2 = dosenList.value[index2];
  kode.value = dosen2.dosen_kode;
  nama.value = dosen2.dosen_nama;
  prioritas.value = dosen2.dosen_prioritas;
  
  // Reset ketersediaan array
  ketersediaan.value = Array(sesiList.length).fill().map(() => Array(hariList.length).fill(false));
  
  // Set ketersediaan based on jadwal_dosen
  if (dosen2.jadwal_dosen && Array.isArray(dosen2.jadwal_dosen)) {
    dosen2.jadwal_dosen.forEach(jadwal => {
      const sesiIndex = sesiList.indexOf(jadwal.dosen_sedia_sesi);
      const hariIndex = hariList.indexOf(jadwal.dosen_sedia_hari);
      if (sesiIndex >= 0 && hariIndex >= 0) {
        ketersediaan.value[sesiIndex][hariIndex] = true;
      }
    });
  }
  
  editIndex.value = index2;
};

// Update delete function to show confirmation
const deleteDosen = (index) => {
  const dosen = sortedDosenList.value[index];
  selectedIndex.value = dosenList.value.findIndex(d => d.dosen_kode === dosen.dosen_kode);
  showDeleteConfirm.value = true;
};

// Confirm delete function
const confirmDelete = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const dosen = dosenList.value[selectedIndex.value];
    await axios.delete(`${apiBaseUrl}/dosen/${dosen.dosen_kode}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dosenList.value.splice(selectedIndex.value, 1);
    showDeleteConfirm.value = false;
    showSuccessAlert('Data dosen berhasil dihapus!');
  } catch (error) {
    console.error('Error deleting dosen:', error);
    let msg = 'Gagal menghapus data dosen: ';
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

// Cancel Edit
const cancelEdit = () => {
  resetForm();
  editIndex.value = null;
  showEditConfirm.value = false;
};

// Reset Form after submit
const resetForm = () => {
  kode.value = "";
  nama.value = "";
  prioritas.value = "";
  ketersediaan.value = Array(sesiList.length).fill().map(() => Array(hariList.length).fill(false));
};

// Select All & Remove All for ketersediaan
const selectAllKetersediaan = () => {
  for (let i = 0; i < ketersediaan.value.length; i++) {
    for (let j = 0; j < ketersediaan.value[i].length; j++) {
      ketersediaan.value[i][j] = true;
    }
  }
};
const removeAllKetersediaan = () => {
  for (let i = 0; i < ketersediaan.value.length; i++) {
    for (let j = 0; j < ketersediaan.value[i].length; j++) {
      ketersediaan.value[i][j] = false;
    }
  }
};

// Fetch dosen data when component is mounted
onMounted(() => {
  fetchDosen();
  pollingInterval = setInterval(fetchDosen, 10000); // 10 detik
});

onUnmounted(() => {
  if (pollingInterval) clearInterval(pollingInterval);
});

// Fullscreen functionality
const isFullscreen = ref(false);
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};

// Function to reset filters
const resetFilters = () => {
  searchQuery.value = "";
  prioritasFilter.value = "all";
  hariFilter.value = "all";
  sesiFilter.value = "all";
};

// Confirm edit function
const confirmEdit = async () => {
  showEditConfirm.value = false;
  await submitData();
};
</script>

<style>
.last-row:last-child td {
  border-bottom: 0;
}
</style>