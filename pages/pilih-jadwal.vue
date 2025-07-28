<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8"
  >
    <!-- Alert Popup -->
    <div v-if="showAlert" class="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-md" @click="showAlert = false">
      <div class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full text-center transform transition-all duration-300 border border-white/70 hover:shadow-blue-100/30" @click.stop>
        <div class="mb-4 text-red-600 text-2xl"><i class="fas fa-exclamation-circle"></i></div>
        <div class="mb-4 text-gray-800 font-semibold">{{ alertMessage }}</div>
        <button @click="showAlert = false" class="px-6 py-2 bg-blue-600/70 hover:bg-blue-700/90 backdrop-blur-xl text-white rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg">
          Tutup
        </button>
      </div>
    </div>
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
          src="/pilih-jadwal.png"
          alt="Icon Pilih Jadwal"
          class="w-16 h-16 object-contain"
        />
        <h1
          class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          Pilih Jadwal
        </h1>
      </div>
    </div>

    <!-- Informasi Daftar Data -->
    <div class="max-w-7xl mx-auto mb-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <!-- Total Matching Card -->
        <div class="bg-white/50 backdrop-blur-xl rounded-xl shadow-md p-4 border border-white/70 hover:shadow-blue-100/30 transition-all duration-300">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100/70 mr-4 w-12 h-12 flex items-center justify-center">
              <i class="fas fa-link text-blue-600 text-xl"></i>
            </div>
            <div>
              <p class="text-sm text-gray-500 font-medium">Total Matching</p>
              <p class="text-xl font-bold text-gray-800">{{ matchingList.length }}</p>
            </div>
          </div>
        </div>
        
        <!-- Total Dosen Card -->
        <div class="bg-white/50 backdrop-blur-xl rounded-xl shadow-md p-4 border border-white/70 hover:shadow-blue-100/30 transition-all duration-300">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-indigo-100/70 mr-4 w-12 h-12 flex items-center justify-center">
              <i class="fas fa-user-tie text-indigo-600 text-xl"></i>
            </div>
            <div>
              <p class="text-sm text-gray-500 font-medium">Total Dosen</p>
              <p class="text-xl font-bold text-gray-800">{{ dosenList.length }}</p>
            </div>
          </div>
        </div>
        
        <!-- Total Mata Kuliah Card -->
        <div class="bg-white/50 backdrop-blur-xl rounded-xl shadow-md p-4 border border-white/70 hover:shadow-blue-100/30 transition-all duration-300">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100/70 mr-4 w-12 h-12 flex items-center justify-center">
              <i class="fas fa-book text-green-600 text-xl"></i>
            </div>
            <div>
              <p class="text-sm text-gray-500 font-medium">Total Mata Kuliah</p>
              <p class="text-xl font-bold text-gray-800">{{ mataKuliahList.length }}</p>
            </div>
          </div>
        </div>
        
        <!-- Total Ruang Kelas Card -->
        <div class="bg-white/50 backdrop-blur-xl rounded-xl shadow-md p-4 border border-white/70 hover:shadow-blue-100/30 transition-all duration-300">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100/70 mr-4 w-12 h-12 flex items-center justify-center">
              <i class="fas fa-chalkboard-teacher text-purple-600 text-xl"></i>
            </div>
            <div>
              <p class="text-sm text-gray-500 font-medium">Total Ruang Kelas</p>
              <p class="text-xl font-bold text-gray-800">{{ ruangKelasList.length }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <!-- Left Column - 3 boxes -->
        <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <!-- Mata Kuliah -->
          <div
            class="bg-white/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/70 hover:shadow-blue-100/30 transition-all duration-500"
          >
            <div class="flex items-center justify-between mb-4 border-b pb-3">
              <h2
                class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center"
              >
                <i class="fas fa-book mr-3"></i> Mata Kuliah
              </h2>
              <button 
                @click="toggleMataKuliahFullscreen" 
                class="p-1.5 bg-gray-100/50 hover:bg-gray-200/50 backdrop-blur-xl rounded-md text-gray-700 transition-colors shadow-sm hover:shadow-md"
                title="Lihat semua mata kuliah"
              >
                <i class="fas fa-expand"></i>
              </button>
            </div>
            <div class="h-[200px] overflow-y-auto pr-2">
              <ul v-if="mataKuliahList.length" class="space-y-3">
                <li
                  v-for="mk in mataKuliahList"
                  :key="mk.matkul_kode"
                  class="bg-blue-50/40 backdrop-blur-xl p-4 rounded-xl border border-blue-100/50 hover:bg-indigo-50/40 hover:border-indigo-200/50 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div class="flex flex-col h-full justify-between">
                    <div>
                      <h3 class="font-bold text-gray-800 text-lg">{{ mk.matkul_nama }}</h3>
                    </div>
                    <div class="mt-auto pt-1">
                      <!-- Course Code and SKS -->
                      <div class="flex items-center gap-2 mt-1 border-t pt-2">
                        <div class="text-blue-600 text-sm font-medium">{{ mk.matkul_kode }}</div>
                        <span class="px-3 py-1 bg-blue-100/60 backdrop-blur-sm text-blue-700 text-sm font-medium rounded-md flex items-center shadow-sm">
                          <i class="fas fa-book-open mr-1.5"></i> {{ mk.matkul_sks }} SKS
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-else class="flex flex-col items-center justify-center h-full text-gray-500">
                <i class="fas fa-book-open text-3xl mb-2"></i>
                <p class="text-center">Belum ada data mata kuliah.</p>
              </div>
            </div>
          </div>

          <!-- Dosen -->
          <div
            class="bg-white/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/70 hover:shadow-blue-100/30 transition-all duration-500"
          >
            <div class="flex items-center justify-between mb-4 border-b pb-3">
              <h2
                class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center"
              >
                <i class="fas fa-user-tie mr-3"></i> Dosen
              </h2>
              <button 
                @click="toggleDosenFullscreen" 
                class="p-1.5 bg-gray-100/50 hover:bg-gray-200/50 backdrop-blur-xl rounded-md text-gray-700 transition-colors shadow-sm hover:shadow-md"
                title="Lihat semua dosen"
              >
                <i class="fas fa-expand"></i>
              </button>
            </div>
            <div class="h-[200px] overflow-y-auto pr-2">
              <ul v-if="dosenList.length" class="space-y-3">
                <li
                  v-for="dosen in dosenList"
                  :key="dosen.dosen_kode"
                  class="bg-blue-50/40 backdrop-blur-xl p-4 rounded-xl border border-blue-100/50 hover:bg-indigo-50/40 hover:border-indigo-200/50 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div class="flex flex-col h-full">
                    <div>
                      <h3 class="font-bold text-gray-800 text-lg">{{ dosen.dosen_nama }}</h3>
                    </div>
                    <div class="mt-2 pt-2 border-t">
                      <div class="flex items-center gap-2">
                        <div class="text-blue-600 text-sm font-medium">{{ dosen.dosen_kode }}</div>
                        <span 
                          :class="{
                            'px-2 py-0.5 rounded-md text-xs font-medium inline-flex items-center gap-1 shadow-sm': true,
                            'bg-green-100/60 backdrop-blur-sm text-green-600': dosen.dosen_prioritas === 'PRIORITAS',
                            'bg-red-100/60 backdrop-blur-sm text-red-600': dosen.dosen_prioritas !== 'PRIORITAS'
                          }"
                        >
                          <i :class="{
                            'fas fa-xs': true,
                            'fa-star': dosen.dosen_prioritas === 'PRIORITAS',
                            'fa-exclamation-circle': dosen.dosen_prioritas !== 'PRIORITAS'
                          }"></i>
                          {{ dosen.dosen_prioritas === "PRIORITAS" ? "Prioritas" : "Non Prioritas" }}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-else class="flex flex-col items-center justify-center h-full text-gray-500">
                <i class="fas fa-user-slash text-3xl mb-2"></i>
                <p class="text-center">Belum ada data dosen.</p>
              </div>
            </div>
          </div>

          <!-- Ruang Kelas -->
          <div
            class="bg-white/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/70 hover:shadow-blue-100/30 transition-all duration-500"
          >
            <div class="flex items-center justify-between mb-4 border-b pb-3">
              <h2
                class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center"
              >
                <i class="fas fa-chalkboard-teacher mr-3"></i> Ruang Kelas
              </h2>
              <button 
                @click="toggleRuangKelasFullscreen" 
                class="p-1.5 bg-gray-100/50 hover:bg-gray-200/50 backdrop-blur-xl rounded-md text-gray-700 transition-colors shadow-sm hover:shadow-md"
                title="Lihat semua ruang kelas"
              >
                <i class="fas fa-expand"></i>
              </button>
            </div>
            <div class="h-[200px] overflow-y-auto pr-2">
              <ul v-if="ruangKelasList.length" class="space-y-3">
                <li
                  v-for="ruang in ruangKelasList"
                  :key="ruang.ruangan_kode"
                  class="bg-blue-50/40 backdrop-blur-xl p-4 rounded-xl border border-blue-100/50 hover:bg-indigo-50/40 hover:border-indigo-200/50 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div class="flex flex-col h-full justify-between">
                    <!-- Top section with title -->
                    <div>
                      <h3 class="font-bold text-gray-800 text-lg">
                        {{ ruang.ruangan_kode }}
                      </h3>
                    </div>
                    
                    <!-- Bottom section with capacity -->
                    <div class="mt-auto pt-2 border-t border-blue-100/50">
                      <span class="inline-flex items-center px-3 py-1 bg-indigo-100/60 backdrop-blur-sm text-indigo-600 rounded-md text-sm font-medium shadow-sm">
                        <i class="fas fa-users mr-1.5"></i>
                        Kapasitas: {{ ruang.ruangan_kapasitas }}
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-else class="flex flex-col items-center justify-center h-full text-gray-500">
                <i class="fas fa-chalkboard text-3xl mb-2"></i>
                <p class="text-center">Belum ada data ruang kelas.</p>
              </div>
            </div>
          </div>

          <!-- Jadwal Hindari -->
          <div
            class="bg-white/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/70 hover:shadow-blue-100/30 transition-all duration-500"
          >
            <div class="flex items-center justify-between mb-4 border-b pb-3">
              <h2
                class="text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent flex items-center"
              >
                <i class="fas fa-calendar-times mr-3"></i> Jadwal Hindari
              </h2>
              <button 
                @click="toggleJadwalHindariFullscreen" 
                class="p-1.5 bg-gray-100/50 hover:bg-gray-200/50 backdrop-blur-xl rounded-md text-gray-700 transition-colors shadow-sm hover:shadow-md"
                title="Lihat semua jadwal hindari"
              >
                <i class="fas fa-expand"></i>
              </button>
            </div>
            <div class="h-[200px] overflow-y-auto pr-2">
              <ul v-if="jadwalHindari.length" class="space-y-3">
                              <li
                v-for="hindari in jadwalHindari"
                :key="hindari.id"
                class="bg-blue-50/40 backdrop-blur-xl p-4 rounded-xl border border-blue-100/50 hover:bg-indigo-50/40 hover:border-indigo-200/50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div class="flex flex-col h-full">
                  <!-- Top section with title -->
                  <div>
                    <h3 class="font-bold text-gray-800 text-lg">
                      {{ hindari.hindari_agenda }}
                    </h3>
                  </div>
                  
                  <!-- Bottom section with details -->
                  <div class="mt-auto pt-2">
                    <!-- Semester info above the line -->
                    <div class="mb-2">
                      <div class="flex flex-wrap gap-1">
                        <span 
                          v-for="sem in hindari.hindari_smt" 
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
                              <span class="inline-flex items-center justify-center gap-1 px-2 py-1 bg-indigo-100/50 backdrop-blur-sm text-indigo-700 rounded-md font-medium w-full text-center shadow-sm">
                                <i class="fas fa-clock"></i>
                                Sesi {{ hindari.hindari_sesi === 'SATU' ? '1' : hindari.hindari_sesi === 'DUA' ? '2' : '3' }}
                              </span>
                            </div>
                            <div class="w-[20px] text-center flex items-center justify-center">
                              <span class="text-gray-400">:</span>
                            </div>
                            <div class="flex-1">
                              <div class="grid grid-cols-2 sm:grid-cols-3 gap-1">
                                <span class="inline-flex items-center justify-center gap-1 px-2 py-1 bg-blue-100/50 backdrop-blur-sm text-blue-700 rounded-md text-center mb-1 font-medium shadow-sm">
                                  <i class="fas fa-calendar-day mr-1"></i>
                                  {{ hindari.hindari_hari }}
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
              <div v-else class="flex flex-col items-center justify-center h-full text-gray-500">
                <i class="fas fa-calendar-times text-3xl mb-2"></i>
                <p class="text-center">Belum ada data jadwal hindari.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Daftar Matching -->
        <div
          class="lg:col-span-2 bg-white/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/70 hover:shadow-blue-100/30 transition-all duration-500"
        >
          <div class="flex items-center justify-between mb-4 border-b pb-3">
            <h2
              class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center"
            >
              <i class="fas fa-list-ul mr-3"></i> Daftar Matching
            </h2>
            <button 
              @click="toggleMatchingFullscreen" 
              class="p-1.5 bg-gray-100/50 hover:bg-gray-200/50 backdrop-blur-xl rounded-md text-gray-700 transition-colors shadow-sm hover:shadow-md"
              title="Lihat semua matching"
            >
              <i class="fas fa-expand"></i>
            </button>
          </div>
          
          <div class="h-[540px] overflow-y-auto pr-2">
            <!-- Empty State -->
            <div
              v-if="filteredMatchingList.length === 0"
              class="flex flex-col items-center justify-center h-full text-gray-500"
            >
              <i class="fas fa-clipboard-list text-4xl mb-2"></i>
              <p>Belum ada data matching.</p>
            </div>

            <!-- Matching List Grouped by Dosen -->
            <div v-else class="space-y-6">
              <div v-for="(matches, dosenName) in filteredGroupedMatches" :key="dosenName" class="space-y-3">
                <!-- Dosen Header -->
                <div class="sticky top-0 bg-white/90 backdrop-blur-sm py-2 z-10">
                  <h3 class="font-semibold text-gray-800 flex items-center">
                    <i class="fas fa-user-tie text-blue-600 mr-2"></i>
                    {{ dosenName }}
                  </h3>
                </div>
                
                <!-- Matches for this Dosen -->
                <ul class="space-y-3">
                  <li
                    v-for="(match, index) in matches"
                    :key="index"
                    class="bg-blue-50/40 backdrop-blur-xl p-4 rounded-xl border border-blue-100/50 hover:bg-indigo-50/40 hover:border-indigo-200/50 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <div class="flex flex-col h-full">
                      <!-- Top section with title -->
                      <div>
                        <h3 class="font-bold text-gray-800 text-lg">
                          {{ match.kelas && match.kelas.nama_kelas ? match.kelas.nama_kelas : (match.mata_kuliah_kelas?.nama_kelas || '-') }}
                        </h3>
                        <div class="flex items-center gap-2 mt-1">
                          <div class="text-blue-600 text-sm font-medium">{{ match.mata_kuliah_kelas?.matkul_kode || '-' }}</div>
                          <span class="px-3 py-1 bg-blue-100/60 backdrop-blur-sm text-blue-700 text-sm font-medium rounded-md flex items-center shadow-sm">
                            <i class="fas fa-book-open mr-1.5"></i> {{ getSKS(match) }} SKS
                          </span>
                        </div>
                      </div>
                      
                      <!-- Bottom section with details -->
                      <div class="mt-2 pt-2 border-t border-blue-100/50">
                        <div class="flex flex-wrap gap-2">
                          <span v-if="match.matkul_tipe" class="inline-flex items-center px-2 py-1 bg-indigo-100/60 backdrop-blur-sm text-indigo-600 rounded-lg text-xs font-medium shadow-sm">
                            <i class="fas fa-tag mr-1"></i> {{ match.matkul_tipe }}
                          </span>
                          
                          <span 
                            v-for="sem in getSemesterArray(match)" 
                            :key="sem" 
                            class="inline-flex items-center px-2 py-1 bg-blue-100/60 backdrop-blur-sm text-blue-600 rounded-lg text-xs font-medium shadow-sm"
                          >
                            <i class="fas fa-graduation-cap mr-1"></i> Semester {{ sem }}
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

    <!-- Matching Fullscreen Popup -->
    <div v-if="isMatchingFullscreen" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-8" @click="toggleMatchingFullscreen">
      <div class="bg-white rounded-2xl shadow-2xl p-6 max-w-6xl w-full h-[85vh] flex flex-col relative border border-white/70" @click.stop>
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
              @click="toggleMatchingFullscreen"
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
              v-model="matchingSearchQuery"
              placeholder="Cari matching..."
              class="w-full pl-10 pr-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            />
          </div>
        </div>
        
        <!-- Filters for Matching -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex flex-wrap gap-2">
            <!-- Type Filter -->
            <select 
              v-model="matchingTypeFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Jenis</option>
              <option value="DEPRTEMEN">Departemen</option>
              <option value="PENGAYAAN">Pengayaan</option>
            </select>
            
            <!-- Semester Filter -->
            <select 
              v-model="matchingSemesterFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Semester</option>
              <option v-for="sem in [1,2,3,4,5,6,7,8]" :key="sem" :value="sem">Semester {{ sem }}</option>
            </select>
          </div>
          
          <!-- Reset Filter Button -->
          <button 
            v-if="matchingSearchQuery || matchingTypeFilter !== 'all' || matchingSemesterFilter !== 'all'"
            @click="resetMatchingFilters" 
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
              {{ matchingSearchQuery ? "Tidak ada matching yang sesuai dengan pencarian." : "Belum ada matching yang diinputkan." }}
            </p>
          </div>
          <div v-else class="space-y-4">
            <div v-for="(matches, dosenName) in filteredGroupedMatches" :key="dosenName" class="mb-6 last:mb-0">
              <h3 class="text-lg font-semibold mb-3 text-gray-700 sticky top-0 bg-white/90 backdrop-blur-sm py-2 z-10 border-b">
                <i class="fas fa-user-tie text-blue-600 mr-2"></i>
                {{ dosenName }}
              </h3>
              <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <li
                  v-for="(match, index) in matches"
                  :key="index"
                  class="bg-blue-50/40 backdrop-blur-xl p-4 rounded-xl border border-blue-100/50 hover:bg-indigo-50/40 hover:border-indigo-200/50 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <div class="flex flex-col h-full">
                    <div>
                      <h3 class="font-bold text-gray-800 text-lg">
                        {{ match.kelas && match.kelas.nama_kelas ? match.kelas.nama_kelas : (match.mata_kuliah_kelas?.nama_kelas || '-') }}
                      </h3>
                      <div class="flex items-center gap-2 mt-1">
                        <div class="text-blue-600 text-sm font-medium">{{ match.mata_kuliah_kelas?.matkul_kode || '-' }}</div>
                        <span class="px-3 py-1 bg-blue-100/60 backdrop-blur-sm text-blue-700 text-sm font-medium rounded-md flex items-center shadow-sm">
                          <i class="fas fa-book-open mr-1.5"></i> {{ getSKS(match) }} SKS
                        </span>
                      </div>
                    </div>
                    
                    <!-- Bottom section with details -->
                    <div class="mt-2 pt-2 border-t border-blue-100/50">
                      <div class="flex flex-wrap gap-2">
                        <span v-if="match.matkul_tipe" class="inline-flex items-center px-2 py-1 bg-indigo-100/60 backdrop-blur-sm text-indigo-600 rounded-lg text-xs font-medium shadow-sm">
                          <i class="fas fa-tag mr-1"></i> {{ match.matkul_tipe }}
                        </span>
                        
                        <span 
                          v-for="sem in getSemesterArray(match)" 
                          :key="sem" 
                          class="inline-flex items-center px-2 py-1 bg-blue-100/60 backdrop-blur-sm text-blue-600 rounded-lg text-xs font-medium shadow-sm"
                        >
                          <i class="fas fa-graduation-cap mr-1"></i> Semester {{ sem }}
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

    <!-- Mata Kuliah Fullscreen Popup -->
    <div v-if="isMataKuliahFullscreen" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-8" @click="toggleMataKuliahFullscreen">
      <div class="bg-white rounded-2xl shadow-2xl p-6 max-w-6xl w-full h-[85vh] flex flex-col relative border border-white/70" @click.stop>
        <div class="flex items-center justify-between mb-4 border-b pb-3">
          <div class="flex items-center">
            <i class="fas fa-book text-blue-600 text-2xl mr-3"></i>
            <h2 class="text-2xl font-bold text-blue-600">Daftar Mata Kuliah</h2>
          </div>
          <div class="flex items-center gap-2">
            <div class="bg-blue-100/50 backdrop-blur-xl text-blue-700 px-4 py-1.5 rounded-md text-base font-medium flex items-center h-8">
              <i class="fas fa-book mr-2"></i>
              {{ mataKuliahList.length }} Mata Kuliah
            </div>
            <button
              @click="toggleMataKuliahFullscreen"
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
              v-model="mataKuliahSearchQuery"
              placeholder="Cari mata kuliah..."
              class="w-full pl-10 pr-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            />
          </div>
        </div>
        
        <!-- Filters for Mata Kuliah -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex flex-wrap gap-2">
            <!-- SKS Filter -->
            <select 
              v-model="mkSksFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua SKS</option>
              <option value="2">2 SKS</option>
              <option value="3">3 SKS</option>
              <option value="4">4 SKS</option>
            </select>
          </div>
          
          <!-- Reset Filter Button -->
          <button 
            v-if="mataKuliahSearchQuery || mkSksFilter !== 'all'"
            @click="resetMkFilters" 
            class="px-4 py-3 bg-blue-100/50 backdrop-blur-xl text-blue-700 rounded-lg hover:bg-blue-200/50 flex items-center whitespace-nowrap shadow-md hover:shadow-lg transition-all duration-300"
          >
            <i class="fas fa-undo mr-2"></i> Reset filter
          </button>
        </div>
        
        <!-- Multi-column List -->
        <div class="flex-1 overflow-y-auto pr-2">
          <div v-if="filteredMataKuliahList.length === 0" class="flex flex-col items-center justify-center h-full text-gray-500">
            <i class="fas fa-filter text-6xl mb-4 text-blue-300"></i>
            <p class="text-center font-medium text-xl">
              {{ mataKuliahSearchQuery ? "Tidak ada mata kuliah yang sesuai dengan pencarian." : "Belum ada mata kuliah yang diinputkan." }}
            </p>
          </div>
          <ul v-else class="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
            <li
              v-for="mk in filteredMataKuliahList"
              :key="mk.matkul_kode"
              class="bg-blue-50 p-4 rounded-xl border border-blue-100 hover:bg-indigo-50 hover:border-indigo-200 transition-all duration-300"
            >
              <div class="flex flex-col h-full justify-between">
                <!-- Top section with title -->
                <div>
                  <h3 class="font-bold text-gray-800 text-lg">
                    {{ mk.matkul_nama }}
                  </h3>
                </div>
                
                <!-- Bottom section with details -->
                <div class="mt-auto pt-2">
                  <!-- Course Code and SKS -->
                  <div class="flex items-center gap-2 mb-2">
                    <div class="text-blue-600 text-sm font-medium">{{ mk.matkul_kode }}</div>
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-md flex items-center">
                      <i class="fas fa-book-open mr-1.5"></i> {{ mk.matkul_sks }} SKS
                    </span>
                  </div>
                  
                  <!-- Classes -->
                  <div class="flex flex-wrap gap-2 items-center border-t pt-2">
                    <span
                      v-for="kelas in mk.mata_kuliah_kelas"
                      :key="kelas.kelas_mk"
                      :class="getKelasColor(kelas.kelas_mk)"
                      class="px-2 py-0.5 rounded-md text-xs font-medium flex items-center"
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
    
    <!-- Dosen Fullscreen Popup -->
    <div v-if="isDosenFullscreen" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-8" @click="toggleDosenFullscreen">
      <div class="bg-white rounded-2xl shadow-2xl p-6 max-w-6xl w-full h-[85vh] flex flex-col relative border border-white/70" @click.stop>
        <div class="flex items-center justify-between mb-4 border-b pb-3">
          <div class="flex items-center">
            <i class="fas fa-user-tie text-blue-600 text-2xl mr-3"></i>
            <h2 class="text-2xl font-bold text-blue-600">Daftar Dosen</h2>
          </div>
          <div class="flex items-center gap-2">
            <div class="bg-blue-100/50 backdrop-blur-xl text-blue-700 px-4 py-1.5 rounded-md text-base font-medium flex items-center h-8">
              <i class="fas fa-user-tie mr-2"></i>
              {{ dosenList.length }} Dosen
            </div>
            <button
              @click="toggleDosenFullscreen"
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
              v-model="dosenSearchQuery"
              placeholder="Cari dosen..."
              class="w-full pl-10 pr-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            />
          </div>
        </div>
        
        <!-- Filters for Dosen -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex flex-wrap gap-2">
            <!-- Prioritas Filter -->
            <select 
              v-model="dosenPrioritasFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Prioritas</option>
              <option value="PRIORITAS">Prioritas</option>
              <option value="NON_PRIORITAS">Non Prioritas</option>
            </select>
            
            <!-- Hari Filter -->
            <select 
              v-model="dosenHariFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Hari</option>
              <option v-for="hari in ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT']" :key="hari" :value="hari">{{ hari }}</option>
            </select>
            
            <!-- Sesi Filter -->
            <select 
              v-model="dosenSesiFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Sesi</option>
              <option value="SATU">Sesi 1</option>
              <option value="DUA">Sesi 2</option>
              <option value="TIGA">Sesi 3</option>
            </select>
          </div>
          
          <!-- Reset Filter Button -->
          <button 
            v-if="dosenSearchQuery || dosenPrioritasFilter !== 'all' || dosenHariFilter !== 'all' || dosenSesiFilter !== 'all'"
            @click="resetDosenFilters" 
            class="px-4 py-3 bg-blue-100/50 backdrop-blur-xl text-blue-700 rounded-lg hover:bg-blue-200/50 flex items-center whitespace-nowrap shadow-md hover:shadow-lg transition-all duration-300"
          >
            <i class="fas fa-undo mr-2"></i> Reset filter
          </button>
        </div>
        
        <!-- Multi-column List -->
        <div class="flex-1 overflow-y-auto pr-2">
          <div v-if="filteredDosenList.length === 0" class="flex flex-col items-center justify-center h-full text-gray-500">
            <i class="fas fa-filter text-6xl mb-4 text-blue-300"></i>
            <p class="text-center font-medium text-xl">
              {{ dosenSearchQuery ? "Tidak ada dosen yang sesuai dengan pencarian." : "Belum ada dosen yang diinputkan." }}
            </p>
          </div>
          <ul v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            <li
              v-for="dosen in filteredDosenList"
              :key="dosen.dosen_kode"
              class="bg-blue-50/40 backdrop-blur-xl p-4 rounded-xl border border-blue-100/50 hover:bg-indigo-50/40 hover:border-indigo-200/50 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <div class="flex flex-col h-full">
                <!-- Top section with title -->
                <div>
                  <h3 class="font-bold text-gray-800 text-lg">
                    {{ dosen.dosen_nama }}
                  </h3>
                </div>
                
                <!-- Spacer to push content to bottom -->
                <div class="flex-grow"></div>
                
                <!-- Bottom section with details -->
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
                        'bg-red-100/50 backdrop-blur-sm text-red-600': dosen.dosen_prioritas !== 'PRIORITAS'
                      }"
                    >
                      <i :class="{
                        'fas fa-xs': true,
                        'fa-star': dosen.dosen_prioritas === 'PRIORITAS',
                        'fa-exclamation-circle': dosen.dosen_prioritas !== 'PRIORITAS'
                      }"></i>
                      {{ dosen.dosen_prioritas === 'PRIORITAS' ? 'Prioritas' : 'Non Prioritas' }}
                    </span>
                  </div>
                  
                  <!-- Ketersediaan Dosen -->
                  <div class="border-t pt-2">
                    <div v-if="dosen.jadwal_dosen && dosen.jadwal_dosen.length > 0" class="text-xs text-gray-600">
                      <div v-for="(sesi, sesiName) in groupDosenAvailability(dosen.jadwal_dosen)" :key="sesiName" class="mb-2">
                        <div class="flex">
                          <div class="min-w-[80px] w-[80px]">
                            <span class="inline-flex items-center justify-center gap-1 px-2 py-1 bg-indigo-100/50 backdrop-blur-sm text-indigo-700 rounded-md font-medium w-full text-center shadow-sm">
                              <i class="fas fa-clock"></i>
                              Sesi {{ sesiName === 'SATU' ? '1' : sesiName === 'DUA' ? '2' : '3' }}
                            </span>
                          </div>
                          <div class="w-[20px] text-center flex items-center justify-center">
                            <span class="text-gray-400">:</span>
                          </div>
                          <div class="flex-1">
                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-1">
                              <span 
                                v-for="hari in sesi" 
                                :key="hari"
                                class="inline-flex items-center justify-center gap-1 px-2 py-1 bg-blue-100/50 backdrop-blur-sm text-blue-700 rounded-md w-full text-center mb-1 font-medium shadow-sm"
                              >
                                <i class="fas fa-calendar-day mr-1"></i>
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
    
    <!-- Ruang Kelas Fullscreen Popup -->
    <div v-if="isRuangKelasFullscreen" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-8" @click="toggleRuangKelasFullscreen">
      <div class="bg-white rounded-2xl shadow-2xl p-6 max-w-6xl w-full h-[85vh] flex flex-col relative border border-white/70" @click.stop>
        <div class="flex items-center justify-between mb-4 border-b pb-3">
          <div class="flex items-center">
            <i class="fas fa-chalkboard-teacher text-blue-600 text-2xl mr-3"></i>
            <h2 class="text-2xl font-bold text-blue-600">Daftar Ruang Kelas</h2>
          </div>
          <div class="flex items-center gap-2">
            <div class="bg-blue-100/50 backdrop-blur-xl text-blue-700 px-4 py-1.5 rounded-md text-base font-medium flex items-center h-8">
              <i class="fas fa-chalkboard-teacher mr-2"></i>
              {{ ruangKelasList.length }} Ruang Kelas
            </div>
            <button
              @click="toggleRuangKelasFullscreen"
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
              v-model="ruangKelasSearchQuery"
              placeholder="Cari ruang kelas..."
              class="w-full pl-10 pr-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            />
          </div>
        </div>
        
        <!-- Multi-column List -->
        <div class="flex-1 overflow-y-auto pr-2">
          <div v-if="filteredRuangKelasList.length === 0" class="flex flex-col items-center justify-center h-full text-gray-500">
            <i class="fas fa-filter text-6xl mb-4 text-blue-300"></i>
            <p class="text-center font-medium text-xl mb-4">
              {{ ruangKelasSearchQuery ? "Tidak ada ruang kelas yang sesuai dengan pencarian." : "Belum ada ruang kelas yang diinputkan." }}
            </p>
            <button 
              v-if="ruangKelasSearchQuery"
              @click="resetRuangKelasFilters" 
              class="px-4 py-3 bg-blue-100/50 backdrop-blur-xl text-blue-700 rounded-lg hover:bg-blue-200/50 flex items-center whitespace-nowrap shadow-md hover:shadow-lg transition-all duration-300"
            >
              <i class="fas fa-undo mr-2"></i> Reset filter
            </button>
          </div>
          <ul v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
            <li
              v-for="ruang in filteredRuangKelasList"
              :key="ruang.ruangan_kode"
              class="bg-blue-50/40 backdrop-blur-xl p-4 rounded-xl border border-blue-100/50 hover:bg-indigo-50/40 hover:border-indigo-200/50 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <div class="flex flex-col h-full justify-between">
                <!-- Top section with title -->
                <div>
                  <h3 class="font-bold text-gray-800 text-lg">
                    {{ ruang.ruangan_kode }}
                  </h3>
                </div>
                
                <!-- Bottom section with capacity -->
                <div class="mt-auto pt-2 border-t border-blue-100/50">
                  <span class="inline-flex items-center px-3 py-1 bg-indigo-100/60 backdrop-blur-sm text-indigo-600 rounded-md text-sm font-medium shadow-sm">
                    <i class="fas fa-users mr-1.5"></i>
                    Kapasitas: {{ ruang.ruangan_kapasitas }}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Jadwal Hindari Fullscreen Popup -->
    <div v-if="isJadwalHindariFullscreen" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-8" @click="toggleJadwalHindariFullscreen">
      <div class="bg-white rounded-2xl shadow-2xl p-6 max-w-6xl w-full h-[85vh] flex flex-col relative border border-white/70" @click.stop>
        <div class="flex items-center justify-between mb-4 border-b pb-3">
          <div class="flex items-center">
            <i class="fas fa-calendar-times text-red-600 text-2xl mr-3"></i>
            <h2 class="text-2xl font-bold text-red-600">Daftar Jadwal Hindari</h2>
          </div>
          <div class="flex items-center gap-2">
            <div class="bg-red-100/50 backdrop-blur-xl text-red-700 px-4 py-1.5 rounded-md text-base font-medium flex items-center h-8">
              <i class="fas fa-calendar-times mr-2"></i>
              {{ jadwalHindari.length }} Jadwal
            </div>
            <button
              @click="toggleJadwalHindariFullscreen"
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
              v-model="jadwalHindariSearchQuery"
              placeholder="Cari jadwal hindari..."
              class="w-full pl-10 pr-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            />
          </div>
        </div>
        
        <!-- Filters for Jadwal Hindari -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex flex-wrap gap-2">
            <!-- Hari Filter -->
            <select 
              v-model="hindariHariFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Hari</option>
              <option v-for="hari in ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT']" :key="hari" :value="hari">{{ hari }}</option>
            </select>
            
            <!-- Sesi Filter -->
            <select 
              v-model="hindariSesiFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Sesi</option>
              <option value="SATU">Sesi 1</option>
              <option value="DUA">Sesi 2</option>
              <option value="TIGA">Sesi 3</option>
            </select>
            
            <!-- Semester Filter -->
            <select 
              v-model="hindariSemesterFilter" 
              class="px-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            >
              <option value="all">Semua Semester</option>
              <option v-for="n in 8" :key="n" :value="n">Semester {{ n }}</option>
            </select>
          </div>
          
          <!-- Reset Filter Button -->
          <button 
            v-if="jadwalHindariSearchQuery || hindariHariFilter !== 'all' || hindariSesiFilter !== 'all' || hindariSemesterFilter !== 'all'"
            @click="resetJadwalHindariFilters" 
            class="px-4 py-3 bg-blue-100/50 backdrop-blur-xl text-blue-700 rounded-lg hover:bg-blue-200/50 flex items-center whitespace-nowrap shadow-md hover:shadow-lg transition-all duration-300"
          >
            <i class="fas fa-undo mr-2"></i> Reset filter
          </button>
        </div>
        
        <!-- Multi-column List -->
        <div class="flex-1 overflow-y-auto pr-2">
          <div v-if="filteredJadwalHindariList.length === 0" class="flex flex-col items-center justify-center h-full text-gray-500">
            <i class="fas fa-filter text-6xl mb-4 text-blue-300"></i>
            <p class="text-center font-medium text-xl">
              {{ jadwalHindariSearchQuery ? "Tidak ada jadwal hindari yang sesuai dengan pencarian." : "Belum ada jadwal hindari yang diinputkan." }}
            </p>
          </div>
          <ul v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            <li
              v-for="hindari in filteredJadwalHindariList"
              :key="hindari.id"
              class="bg-blue-50 p-4 rounded-xl border border-blue-100 hover:bg-indigo-50 hover:border-indigo-200 transition-all duration-300"
            >
              <div class="flex flex-col h-full">
                <!-- Top section with title -->
                <div>
                  <h3 class="font-bold text-gray-800 text-lg">
                    {{ hindari.hindari_agenda }}
                  </h3>
                </div>
                
                <!-- Bottom section with details -->
                <div class="mt-auto pt-2">
                  <!-- Semester info above the line -->
                  <div class="mb-2">
                    <div class="flex flex-wrap gap-1">
                      <span 
                        v-for="sem in hindari.hindari_smt" 
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
                            <span class="inline-flex items-center justify-center gap-1 px-2 py-1 bg-indigo-100/50 backdrop-blur-sm text-indigo-700 rounded-md font-medium w-full text-center shadow-sm">
                              <i class="fas fa-clock"></i>
                              Sesi {{ hindari.hindari_sesi === 'SATU' ? '1' : hindari.hindari_sesi === 'DUA' ? '2' : '3' }}
                            </span>
                          </div>
                          <div class="w-[20px] text-center flex items-center justify-center">
                            <span class="text-gray-400">:</span>
                          </div>
                          <div class="flex-1">
                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-1">
                              <span class="inline-flex items-center justify-center gap-1 px-2 py-1 bg-blue-100/50 backdrop-blur-sm text-blue-700 rounded-md text-center mb-1 font-medium min-w-[100px] shadow-sm">
                                <i class="fas fa-calendar-day mr-1"></i>
                                {{ hindari.hindari_hari }}
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

    <!-- Tombol Aksi -->
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 mb-8">
      <button
        @click="generateJadwal"
        class="flex-1 bg-gradient-to-r from-green-600/70 to-green-700/70 backdrop-blur-xl text-white py-3 px-6 rounded-xl hover:from-green-700/90 hover:to-green-800/90 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-opacity-50 shadow-lg hover:shadow-xl flex items-center justify-center"
      >
        <i class="fas fa-cogs mr-2"></i> Generate Jadwal
      </button>
    </div>

    <!-- Hasil Jadwal -->
    <div v-if="jadwalGenerated.length" class="max-w-7xl mx-auto">
      <h2
        class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center mb-4"
      >
        <i class="fas fa-calendar-alt mr-3"></i> Hasil Jadwal
      </h2>
      <div class="flex flex-col sm:flex-row justify-end mb-4 gap-2">
        <button
          @click="exportExcel"
          class="bg-gradient-to-r from-blue-600/70 to-indigo-600/70 backdrop-blur-xl text-white py-2 px-6 rounded-xl hover:from-blue-700/90 hover:to-indigo-700/90 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-opacity-50 shadow-lg hover:shadow-xl flex items-center justify-center"
        >
          <i class="fas fa-file-excel mr-2"></i> Export ke Excel
        </button>
      </div>
      <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-[700px] w-full">
            <thead>
                              <tr class="bg-gray-50 border-b border-gray-100">
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700 sticky left-0 bg-gray-50">Hari</th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700 sticky left-[140px] bg-gray-50">Waktu</th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700">Mata Kuliah & Kelas</th>
                <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700">SKS</th>
                <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700">Semester</th>
                <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700">Dosen</th>
                <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700">Ruangan</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="(row, index) in jadwalGenerated.filter(j => j.status !== 'unplaced')"
                :key="index"
                class="group hover:bg-blue-50 transition-colors duration-200"
              >
                <td class="px-6 py-4 text-sm text-gray-700 bg-white group-hover:bg-blue-50 text-center">{{ row.hari }}</td>
                <td class="px-6 py-4 text-sm text-gray-700 bg-white group-hover:bg-blue-50 text-center">{{ getSesiTimeRange(row.sesi) }}</td>
                <td class="px-6 py-4 text-sm text-gray-700 bg-white group-hover:bg-blue-50 text-center">
                  <div class="font-medium">{{ row.mata_kuliah_kelas?.nama_kelas || '-' }}</div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 bg-white group-hover:bg-blue-50 text-center">{{ getSKS(row) }} SKS</td>
                <td class="px-6 py-4 text-sm text-gray-700 bg-white group-hover:bg-blue-50 text-center">
                  <span v-for="(sem, idx) in row.semester || row.mk_kelas_sem || []" :key="idx" class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium mr-1">
                    Semester {{ sem }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 bg-white group-hover:bg-blue-50 text-center">{{ getTeamTeachingLecturers(row) }}</td>
                <td class="px-6 py-4 text-sm text-gray-700 bg-white group-hover:bg-blue-50 text-center">{{ row.ruangan }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Unplaced Table -->
      <div v-if="jadwalGenerated.some(j => j.status === 'unplaced')" class="mt-10">
        <h3 class="text-xl font-bold text-red-600 mb-4 flex items-center">
          <i class="fas fa-exclamation-triangle mr-2"></i> Jadwal Tidak Terjadwal (Unplaced)
        </h3>
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-[600px] w-full">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-100">
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700">Mata Kuliah & Kelas</th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700">SKS</th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700">Semester</th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700">Dosen</th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700">Alasan</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="(item, idx) in jadwalGenerated.filter(j => j.status === 'unplaced')" :key="idx">
                  <td class="px-6 py-4 text-sm text-gray-700 bg-white text-center">
                    <div class="font-medium">{{ item.mata_kuliah_kelas?.nama_kelas || '-' }}</div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-700 bg-white text-center">{{ getSKS(item) }} SKS</td>
                  <td class="px-6 py-4 text-sm text-gray-700 bg-white text-center">
                    <span v-for="(sem, sidx) in item.semester || item.mk_kelas_sem || []" :key="sidx" class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium mr-1">
                      Semester {{ sem }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-700 bg-white text-center">{{ getTeamTeachingLecturers(item) }}</td>
                  <td class="px-6 py-4 text-sm text-red-600 bg-white text-center">Tidak ada slot tersedia</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";

// Get runtime config for API base URL
const config = useRuntimeConfig();
const apiBaseUrl = config.public.apiBaseUrl;

// Define constants for days and sessions
const hariList = ["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT"];
const sesiList = ["SATU", "DUA", "TIGA"];

// Define refs for storing lists of data
const mataKuliahList = ref([]);
const dosenList = ref([]);
const ruangKelasList = ref([]);
const jadwalHindari = ref([]);
const matchingList = ref([]);
const jadwalGenerated = ref([]);
const showSuccess = ref(false);
const successMessage = ref("");
const isGenerating = ref(false);
const alertMessage = ref("");
const showAlert = ref(false);
const selectedSemesters = ref([]);
const selectAllSemesters = ref(false);

// Tambahkan set untuk booking dosen
const dosenBookings = new Set();

// Tambahkan set untuk booking kelas-semester-slot
const kelasSemesterBookings = new Set();

// Buat mapping id_mk_kelas ke label kelas
const idToLabelMap = {};
mataKuliahList.value.forEach((mk) => {
  if (Array.isArray(mk.mata_kuliah_kelas)) {
    mk.mata_kuliah_kelas.forEach((kelasObj) => {
      if (kelasObj.id_mk_kelas && kelasObj.kelas_mk) {
        idToLabelMap[kelasObj.id_mk_kelas] = (kelasObj.kelas_mk + "")
          .trim()
          .toUpperCase();
      }
    });
  }
});

// Fetch Data function
const getToken = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
  return token || null;
};

const fetchData = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error("User is not authenticated");

    // Fetch Mata Kuliah
    const mataKuliahResponse = await axios.get(
      `${apiBaseUrl}/mata_kuliah`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    mataKuliahList.value = mataKuliahResponse.data;

    // Fetch Ruang Kelas
    const ruangKelasResponse = await axios.get(
      `${apiBaseUrl}/ruangan`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    ruangKelasList.value = ruangKelasResponse.data;

    // Fetch Dosen
    const dosenResponse = await axios.get(`${apiBaseUrl}/dosen`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dosenList.value = dosenResponse.data;

    // Fetch Jadwal Hindari
    const jadwalHindariResponse = await axios.get(
      `${apiBaseUrl}/jadwal_hindari`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    jadwalHindari.value = jadwalHindariResponse.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

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

    // Debug log to check data structure
    console.log('Matching Data Response:', response.data);

    // Ensure the response data is properly handled
    if (response.data && Array.isArray(response.data)) {
      matchingList.value = response.data.map(match => {
        // Debug log for each match
        console.log('Processing match:', match);
        return {
          id_mk_kelas_dosen: match.id_mk_kelas_dosen,
          mata_kuliah_kelas: match.mata_kuliah_kelas,
          dosen: match.dosen,
          mk_kelas_sem: match.mk_kelas_sem,
          matkul_tipe: match.matkul_tipe
        };
      });
    } else {
      matchingList.value = [];
      console.error('Invalid matching data format received.');
    }
  } catch (error) {
    console.error('Gagal mengambil data matching', error);
  }
};

onMounted(() => {
  fetchData();
  fetchMatchingData();
});

// Helper untuk ambil label kelas dari id_mk_kelas
const getKelasLabel = (id_mk_kelas) => {
  for (const mk of mataKuliahList.value) {
    if (Array.isArray(mk.mata_kuliah_kelas)) {
      for (const kelasObj of mk.mata_kuliah_kelas) {
        if (kelasObj.id_mk_kelas === id_mk_kelas) {
          return (kelasObj.kelas_mk + "").trim().toUpperCase();
        }
      }
    }
  }
  return "-";
};

// Helper untuk ambil array semester dari mk_kelas_sem
function getSemesters(match) {
  if (!match || !match.mk_kelas_sem) return [];
  if (Array.isArray(match.mk_kelas_sem)) return match.mk_kelas_sem.filter(Boolean);
  return match.mk_kelas_sem ? [match.mk_kelas_sem] : [];
}

// Fungsi backtracking untuk penjadwalan
function scheduleWithBacktracking(
  classes,
  ruangan,
  hariList,
  sesiList,
  dosenList,
  jadwalHindariData
) {
  const jadwal = [];
  const semesterKelasBookings = new Set();
  const dosenBookings = new Set();
  const usedSlots = new Set();
  // Buat blockedSlots: Set(hari|sesi|semester)
  const blockedSlots = new Set();
  jadwalHindariData.forEach((jh) => {
    if (Array.isArray(jh.hindari_smt)) {
      jh.hindari_smt.forEach((sem) => {
        blockedSlots.add(
          `${jh.hindari_hari}|${jh.hindari_sesi}|${(sem + "")
            .trim()
            .toUpperCase()}`
        );
      });
    }
  });

  function backtrack(idx) {
    if (idx === classes.length) return true; // selesai
    const jadwalItem = classes[idx];
    // Ambil label kelas dari id_mk_kelas
    const kelasLabel = getKelasLabel(jadwalItem.id_mk_kelas);
    // Ambil semester dari mk_kelas_sem (array, normalisasi string)
    const semesters = Array.isArray(jadwalItem.mk_kelas_sem)
      ? jadwalItem.mk_kelas_sem.map((s) => (s + "").trim().toUpperCase())
      : [(jadwalItem.mk_kelas_sem + "").trim().toUpperCase()];
    // Ambil kode matkul
    const matkulKode = (jadwalItem.mata_kuliah_kelas?.matkul_kode || "")
      .trim()
      .toUpperCase();
    // Dukung team teaching: array dosen
    let allLecturers = [];
    if (Array.isArray(jadwalItem.dosen)) {
      allLecturers = jadwalItem.dosen.map((d) => d.dosen_kode || d);
    } else if (jadwalItem.dosen?.dosen_kode) {
      allLecturers = [jadwalItem.dosen.dosen_kode];
    } else if (jadwalItem.dosen) {
      allLecturers = [jadwalItem.dosen];
    }
    // Coba semua slot
    for (const hari of hariList) {
      for (const sesi of sesiList) {
        // Constraint: matkul_tipe PENGAYAAN hanya boleh di hari JUMAT sesi TIGA, selain pengayaan tidak boleh di Jumat sesi TIGA
        if (
          (jadwalItem.matkul_tipe === "PENGAYAAN" &&
            (hari !== "JUMAT" || sesi !== "TIGA")) ||
          (jadwalItem.matkul_tipe !== "PENGAYAAN" &&
            hari === "JUMAT" &&
            sesi === "TIGA")
        ) {
          continue;
        }
        // Constraint jadwal hindari
        let blocked = false;
        for (const sem of semesters) {
          if (blockedSlots.has(`${hari}|${sesi}|${sem}`)) {
            blocked = true;
            break;
          }
        }
        if (blocked) continue;
        // Constraint kelas/semester/slot
        let conflict = false;
        for (const sem of semesters) {
          if (
            semesterKelasBookings.has(`${sem}|${kelasLabel}|${hari}|${sesi}`)
          ) {
            conflict = true;
            break;
          }
        }
        if (conflict) continue;
        // Cek kesediaan dosen di slot ini
        const slotKey = `${hari}|${sesi}`;
        const availableLecturers = allLecturers.filter((lect) => {
          const dosenObj = dosenList.value.find((d) => d.dosen_kode === lect);
          if (!dosenObj?.jadwal_dosen) return false;

          // Cek kesediaan dosen
          const isAvailable = dosenObj.jadwal_dosen.some(
            (j) => j.dosen_sedia_hari === hari && j.dosen_sedia_sesi === sesi
          );

          // Cek apakah dosen sudah mengajar mata kuliah yang sama di slot ini
          const isTeachingSameSubject = jadwal.some(
            (j) =>
              j.dosen &&
              (Array.isArray(j.dosen)
                ? j.dosen.some((d) => d.dosen_kode === lect)
                : j.dosen.dosen_kode === lect) &&
              j.matkul_kode === matkulKode &&
              j.hari === hari &&
              j.sesi === sesi
          );

          return isAvailable || isTeachingSameSubject;
        });
        if (availableLecturers.length === 0) continue;
        // Cek dosen tidak double booking di slot ini
        let dosenDoubleBooking = false;
        for (const lect of allLecturers) {
          if (dosenBookings.has(`${lect}|${hari}|${sesi}`)) {
            dosenDoubleBooking = true;
            break;
          }
        }
        if (dosenDoubleBooking) continue;
        // Coba semua ruangan
        for (const ruang of ruangan) {
          const slotRuangKey = `${hari}-${sesi}-${ruang.ruangan_kode}`;
          if (usedSlots.has(slotRuangKey)) continue;
          // Simpan state
          jadwal.push({
            id_mk_kelas_dosen: jadwalItem.id_mk_kelas_dosen,
            id_mk_kelas: jadwalItem.id_mk_kelas,
            mata_kuliah_kelas: jadwalItem.mata_kuliah_kelas,
            matkul_kode: matkulKode,
            dosen: jadwalItem.dosen,
            mk_kelas_sem: jadwalItem.mk_kelas_sem,
            matkul_tipe: jadwalItem.matkul_tipe,
            hari,
            sesi,
            ruangan: ruang.ruangan_kode,
            ruangan_kapasitas: ruang.ruangan_kapasitas,
            kelas: kelasLabel,
            semester: semesters,
          });
          usedSlots.add(slotRuangKey);
          allLecturers.forEach((lect) =>
            dosenBookings.add(`${lect}|${hari}|${sesi}`)
          );
          for (const sem of semesters) {
            semesterKelasBookings.add(`${sem}|${kelasLabel}|${hari}|${sesi}`);
          }
          // Rekursi
          if (backtrack(idx + 1)) return true;
          // Undo
          jadwal.pop();
          usedSlots.delete(slotRuangKey);
          allLecturers.forEach((lect) =>
            dosenBookings.delete(`${lect}|${hari}|${sesi}`)
          );
          for (const sem of semesters) {
            semesterKelasBookings.delete(
              `${sem}|${kelasLabel}|${hari}|${sesi}`
            );
          }
        }
      }
    }
    // Jika tidak ada slot valid, unplaced
    jadwal.push({
      ...jadwalItem,
      hari: null,
      sesi: null,
      ruangan: null,
      ruangan_kapasitas: null,
      status: "unplaced",
      kelas: kelasLabel,
      semester: semesters,
      matkul_kode: matkulKode,
      id_mk_kelas: jadwalItem.id_mk_kelas,
    });
    if (backtrack(idx + 1)) return true;
    jadwal.pop();
    return false;
  }

  backtrack(0);
  return jadwal;
}

// Fungsi untuk shuffle array
function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Fungsi iterative improvement (simulated annealing sederhana)
function generateWithIterativeImprovement(
  classes,
  ruangan,
  hariList,
  sesiList,
  dosenList,
  jadwalHindariData,
  iterations = 30
) {
  let bestJadwal = null;
  let minUnplaced = Infinity;
  for (let iter = 0; iter < iterations; iter++) {
    // Randomisasi urutan kelas dan hari
    const shuffledClasses = shuffleArray(classes);
    const shuffledHariList = shuffleArray(hariList);
    // Gunakan backtracking dengan urutan acak
    const jadwal = scheduleWithBacktracking(
      shuffledClasses,
      ruangan,
      shuffledHariList,
      sesiList,
      dosenList,
      jadwalHindariData
    );
    const unplacedCount = jadwal.filter((j) => j.status === "unplaced").length;
    if (unplacedCount < minUnplaced) {
      minUnplaced = unplacedCount;
      bestJadwal = jadwal;
      // Jika sudah optimal (0 unplaced), break
      if (minUnplaced === 0) break;
    }
  }
  return bestJadwal;
}

// Post-processing team teaching setelah jadwal tergenerate (hanya pakai mk_dosen & dosen)
function enrichTeamTeaching(jadwal, mkDosen, dosenList) {
  for (const slot of jadwal) {
    if (!slot.hari || !slot.sesi || !slot.mata_kuliah_kelas) continue;
    const namaKelas = slot.mata_kuliah_kelas.nama_kelas;
    const semesterArr = Array.isArray(slot.semester)
      ? slot.semester
      : [slot.semester];
    const hari = slot.hari;
    const sesi = slot.sesi;
    const matkulKode = slot.matkul_kode;
    // Cari semua dosen yang memenuhi syarat team teaching dari mk_dosen
    const teamDosen = mkDosen
      .filter((mkd) => {
        // Cek semester
        const mkdSems = Array.isArray(mkd.mk_kelas_sem)
          ? mkd.mk_kelas_sem.map((s) => (s + "").trim())
          : [(mkd.mk_kelas_sem + "").trim()];
        const semMatch = mkdSems.some((s) => semesterArr.includes(s));
        if (!semMatch) return false;
        // Cek nama_kelas
        if (
          !mkd.mata_kuliah_kelas ||
          mkd.mata_kuliah_kelas.nama_kelas !== namaKelas
        )
          return false;
        // Cek matkul_kode
        if (
          (mkd.mata_kuliah_kelas?.matkul_kode || "").trim().toUpperCase() !==
          matkulKode
        )
          return false;
        // Cek ketersediaan dosen di hari & sesi
        const dosenObj = dosenList.find(
          (d) => d.dosen_kode === (mkd.dosen?.dosen_kode || mkd.dosen)
        );
        if (!dosenObj || !dosenObj.jadwal_dosen) return false;
        const available = dosenObj.jadwal_dosen.some(
          (jd) => jd.dosen_sedia_hari === hari && jd.dosen_sedia_sesi === sesi
        );
        return available;
      })
      .map((mkd) => mkd.dosen?.dosen_kode || mkd.dosen);
    // Gabungkan dosen utama dan team teaching, hilangkan duplikat
    let dosenUtama = [];
    if (Array.isArray(slot.dosen)) {
      dosenUtama = slot.dosen.map((d) => d.dosen_kode || d);
    } else if (slot.dosen?.dosen_kode) {
      dosenUtama = [slot.dosen.dosen_kode];
    } else if (slot.dosen) {
      dosenUtama = [slot.dosen];
    }
    const allDosen = [...new Set([...dosenUtama, ...teamDosen])];
    slot.dosen_team_teaching = allDosen;
  }
}

// Update getTeamTeachingLecturers agar mengambil dari dosen_team_teaching
const getTeamTeachingLecturers = (item) => {
  if (item.dosen_team_teaching && item.dosen_team_teaching.length) {
    return item.dosen_team_teaching.join(" - ");
  }
  // fallback lama
  const matkulKode = (
    item.matkul_kode ||
    item.mata_kuliah_kelas?.matkul_kode ||
    ""
  )
    .trim()
    .toUpperCase();
  const hari = item.hari;
  const sesi = item.sesi;
  const dosenCodes = jadwalGenerated.value
    .filter(
      (j) => j.matkul_kode === matkulKode && j.hari === hari && j.sesi === sesi
    )
    .map((j) => {
      if (Array.isArray(j.dosen)) {
        return j.dosen.map((d) => d.dosen_kode || d).join(" - ");
      } else if (j.dosen?.dosen_kode) {
        return j.dosen.dosen_kode;
      } else if (j.dosen) {
        return j.dosen;
      }
      return "";
    })
    .join(" - ");
  const uniqueDosen = [
    ...new Set(dosenCodes.split(" - ").filter(Boolean)),
  ].join(" - ");
  return uniqueDosen;
};

// Add computed property for semester handling
const getSemesterArray = (match) => {
  if (!match) return [];
  if (Array.isArray(match.mk_kelas_sem)) {
    return match.mk_kelas_sem.filter(Boolean);
  }
  return match.mk_kelas_sem ? [match.mk_kelas_sem] : [];
};

// Add computed property for grouped matches
const groupedMatches = computed(() => {
  const groups = {};
  matchingList.value.forEach(match => {
    const dosenName = match.dosen?.dosen_nama || match.dosen_nama || 'Unknown';
    if (!groups[dosenName]) {
      groups[dosenName] = [];
    }
    groups[dosenName].push(match);
  });
  return groups;
});

// Add computed property for filtered matching list
const filteredMatchingList = computed(() => {
  let filtered = matchingList.value;
  
  if (matchingSearchQuery.value) {
    const query = matchingSearchQuery.value.toLowerCase();
    filtered = filtered.filter(match => {
      const kelasName = match.kelas && match.kelas.nama_kelas 
        ? match.kelas.nama_kelas 
        : (match.mata_kuliah_kelas?.nama_kelas || '');
      
      const dosenName = match.dosen?.dosen_nama || match.dosen_nama || '';
      const matkulType = match.matkul_tipe || '';
      const semesters = getSemesterArray(match).join(' ');
      
      return kelasName.toLowerCase().includes(query) ||
             dosenName.toLowerCase().includes(query) ||
             matkulType.toLowerCase().includes(query) ||
             semesters.toLowerCase().includes(query);
    });
  }
  
  // Apply type filter
  if (matchingTypeFilter.value !== 'all') {
    filtered = filtered.filter(match => match.matkul_tipe === matchingTypeFilter.value);
  }
  
  // Apply semester filter
  if (matchingSemesterFilter.value !== 'all') {
    filtered = filtered.filter(match => {
      const semesters = getSemesterArray(match);
      return semesters.includes(parseInt(matchingSemesterFilter.value)) || 
             semesters.includes(matchingSemesterFilter.value);
    });
  }
  
  return filtered;
});

// Updated grouped matches to use filteredMatchingList
const filteredGroupedMatches = computed(() => {
  const groups = {};
  filteredMatchingList.value.forEach(match => {
    const dosenName = match.dosen?.dosen_nama || match.dosen_nama || 'Unknown';
    if (!groups[dosenName]) {
      groups[dosenName] = [];
    }
    groups[dosenName].push(match);
  });
  return groups;
});

// Ganti generateJadwal agar menggunakan iterative improvement
const generateJadwal = async () => {
  // Cek data yang kosong sebelum generate
  const emptyFields = [];
  if (!dosenList.value.length) emptyFields.push('dosen');
  if (!mataKuliahList.value.length) emptyFields.push('mata kuliah');
  if (!ruangKelasList.value.length) emptyFields.push('ruang kelas');
  if (!matchingList.value.length) emptyFields.push('matching');
  if (emptyFields.length) {
    alertMessage.value = `Tidak dapat generate jadwal karena: ${emptyFields.map(f => `daftar ${f} kosong`).join(', ')}.`;
    showAlert.value = true;
    return;
  }
  try {
    isGenerating.value = true;
    const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
    if (!token) {
      throw new Error("User is not authenticated");
    }

    // Fetch all data
    const [
      mkDosenResponse,
      ruanganResponse,
      jadwalHindariResponse,
      dosenResponse,
    ] = await Promise.all([
      axios.get(`${apiBaseUrl}/mk_dosen`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${apiBaseUrl}/ruangan`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${apiBaseUrl}/jadwal_hindari`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${apiBaseUrl}/dosen`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    const mkDosen = mkDosenResponse.data;
    const ruangan = ruanganResponse.data;
    const jadwalHindariData = jadwalHindariResponse.data;
    const dosenListData = dosenResponse.data;

    // Gabungkan team teaching berdasarkan id_mk_kelas + semester
    const groupedMKDosen = mkDosen.reduce((acc, current) => {
      const key = `${current.id_mk_kelas}-${JSON.stringify(
        current.mk_kelas_sem
      )}`;
      if (!acc[key]) {
        acc[key] = {
          ...current,
          dosen_list: [current.dosen?.dosen_kode || current.dosen],
        };
      } else {
        const kode = current.dosen?.dosen_kode || current.dosen;
        if (!acc[key].dosen_list.includes(kode)) {
          acc[key].dosen_list.push(kode);
        }
      }
      return acc;
    }, {});

    const groupedJadwal = Object.values(groupedMKDosen).map((item) => ({
      ...item,
      dosen: item.dosen_list, // Ganti ke array dosen
    }));

    // Urutkan berdasarkan apakah ada yang prioritas
    const sortedJadwal = groupedJadwal.sort((a, b) => {
      const aPrioritas = a.dosen.some((kode) => {
        const d = dosenListData.find((x) => x.dosen_kode === kode);
        return d?.dosen_prioritas === "PRIORITAS";
      })
        ? 1
        : 0;
      const bPrioritas = b.dosen.some((kode) => {
        const d = dosenListData.find((x) => x.dosen_kode === kode);
        return d?.dosen_prioritas === "PRIORITAS";
      })
        ? 1
        : 0;
      return bPrioritas - aPrioritas;
    });

    // Gunakan iterative improvement untuk penjadwalan
    const jadwal = generateWithIterativeImprovement(
      sortedJadwal,
      ruangan,
      hariList,
      sesiList,
      dosenList,
      jadwalHindariData,
      40
    );
    // Post-processing team teaching
    enrichTeamTeaching(jadwal, mkDosen, dosenListData);
    jadwalGenerated.value = jadwal;
    showSuccessAlert("Jadwal berhasil tergenerate!");
  } catch (error) {
    console.error("Error generating schedule:", error);
    let msg = "Gagal generate jadwal: ";
    if (error.response?.data?.error) {
      msg += error.response.data.error;
    } else if (error.message) {
      msg += error.message;
    } else {
      msg += "Terjadi kesalahan.";
    }
    alertMessage.value = msg;
    showAlert.value = true;
  } finally {
    isGenerating.value = false;
  }
};

const exportExcel = () => {
  // Ambil semua kombinasi hari, sesi, dan ruangan
  const uniqueRooms = [
    ...new Set(jadwalGenerated.value.map((item) => item.ruangan)),
  ].sort();
  const allRooms = uniqueRooms.length
    ? uniqueRooms
    : ruangKelasList.value.map((r) => r.ruangan_kode).sort();
  const allTimeSlots = [];
  hariList.forEach((hari) => {
    sesiList.forEach((sesi) => {
      allTimeSlots.push(`${hari}|${sesi}`);
    });
  });

  const matrixData = [];
  const headerRow = ["Hari", "Waktu", ...allRooms];
  matrixData.push(headerRow);

  // Group data by hari, sesi, ruangan
  const groupedData = {};
  jadwalGenerated.value.forEach((item) => {
    const key = `${item.hari}|${item.sesi}`;
    if (!groupedData[key]) groupedData[key] = {};
    groupedData[key][item.ruangan] = item;
  });

  // Tambahkan semua kombinasi hari, sesi, ruangan ke matrixData
  allTimeSlots.forEach((timeSlot) => {
    const [hari, sesi] = timeSlot.split("|");
    const row = [hari, getSesiTimeRange(sesi)];
    allRooms.forEach((room) => {
      const item = groupedData[timeSlot]?.[room];
      if (item) {
        const dosenTeamTeaching = getTeamTeachingLecturers(item);
        const namaMatkul = item.mata_kuliah_kelas?.nama_kelas || "-";
        const sks = getSKS(item);
        row.push(
          `${namaMatkul} (${sks} SKS) - ${
            dosenTeamTeaching || item.dosen?.dosen_kode || item.dosen || "-"
          }` +
            (item.semester
              ? ` (Semester ${(item.semester || ["-"]).join(", ")})`
              : "")
        );
      } else {
        row.push("");
      }
    });
    matrixData.push(row);
  });

  // Tambahkan baris unplaced di bawah tabel utama
  const unplaced = jadwalGenerated.value.filter(
    (item) => item.status === "unplaced"
  );
  if (unplaced.length > 0) {
    matrixData.push([]); // baris kosong pemisah
    matrixData.push([
      "Kelas Unplaced",
      "Mata Kuliah",
      "SKS",
      "Semester",
      "Dosen",
      "Alasan",
    ]);
    unplaced.forEach((item) => {
      const dosenTeamTeaching = getTeamTeachingLecturers(item);
      const namaMatkul = item.mata_kuliah_kelas?.nama_kelas || "-";
      const sks = getSKS(item);
      matrixData.push([
        item.kelas || "-",
        namaMatkul,
        sks,
        (item.semester || ["-"]).join(","),
        dosenTeamTeaching ||
          (Array.isArray(item.dosen)
            ? item.dosen.map((d) => d.dosen_kode || d).join(", ")
            : item.dosen?.dosen_kode || item.dosen || "-"),
        "Tidak ada slot tersedia",
      ]);
    });
  }

  const worksheet = XLSX.utils.aoa_to_sheet(matrixData);
  const colWidths = [
    { wch: 15 },
    { wch: 15 },
    ...allRooms.map(() => ({ wch: 50 })),
  ];
  worksheet["!cols"] = colWidths;
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Jadwal");
  
  // Generate Excel file with proper MIME type
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { 
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
  });
  
  // Create a temporary URL and trigger download
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `jadwal_${new Date().toISOString().split('T')[0]}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Add this helper function to get classes for a specific time slot
const getClassesForTimeSlot = (hari, sesi) => {
  return jadwalGenerated.value.filter(
    (kelas) => kelas.hari === hari && kelas.sesi === sesi
  );
};

const showSuccessAlert = (msg) => {
  successMessage.value = msg;
  showSuccess.value = true;
  setTimeout(() => {
    showSuccess.value = false;
  }, 3000);
};

// Fungsi untuk toggle select all semester
const toggleSelectAll = () => {
  if (selectAllSemesters.value) {
    selectedSemesters.value = Array.from({ length: 8 }, (_, i) => i + 1);
  } else {
    selectedSemesters.value = [];
  }
};

// Fungsi recursive multi-level swap (DFS)
function tryPlaceWithSwap(
  jadwal,
  item,
  hari,
  sesi,
  ruang,
  ruangan,
  hariList,
  sesiList,
  dosenList,
  semesterKelasBookings,
  blockedSlots,
  visited = new Set()
) {
  // Cek constraint pengayaan
  if (
    (item.matkul_tipe === "PENGAYAAN" &&
      (hari !== "JUMAT" || sesi !== "TIGA")) ||
    (item.matkul_tipe !== "PENGAYAAN" && hari === "JUMAT" && sesi === "TIGA")
  ) {
    return false;
  }
  // Cek constraint jadwal hindari
  const semesters = Array.isArray(item.mk_kelas_sem)
    ? item.mk_kelas_sem.map((s) => (s + "").trim().toUpperCase())
    : [(item.mk_kelas_sem + "").trim().toUpperCase()];
  for (const sem of semesters) {
    if (blockedSlots.has(`${hari}|${sesi}|${sem}`)) {
      return false;
    }
  }
  // Cek constraint kelas/semester/slot
  const kelasLabel = getKelasLabel(item.id_mk_kelas);
  for (const sem of semesters) {
    if (semesterKelasBookings.has(`${sem}|${kelasLabel}|${hari}|${sesi}`)) {
      return false;
    }
  }
  // Cek dosen available
  let allLecturers = [];
  if (Array.isArray(item.dosen)) {
    allLecturers = item.dosen.map((d) => d.dosen_kode || d);
  } else if (item.dosen?.dosen_kode) {
    allLecturers = [item.dosen.dosen_kode];
  } else if (item.dosen) {
    allLecturers = [item.dosen];
  }
  const availableLecturers = allLecturers.filter((lect) => {
    const dosenObj = dosenList.value.find((d) => d.dosen_kode === lect);
    if (!dosenObj?.jadwal_dosen) return false;
    return dosenObj.jadwal_dosen.some(
      (jd) => jd.dosen_sedia_hari === hari && jd.dosen_sedia_sesi === sesi
    );
  });
  if (availableLecturers.length === 0) return false;
  // Cek dosen tidak double booking di slot ini
  for (const lect of allLecturers) {
    if (
      jadwal.some(
        (j) =>
          j.hari === hari &&
          j.sesi === sesi &&
          j.ruangan === ruang.ruangan_kode &&
          j.status !== "unplaced" &&
          ((Array.isArray(j.dosen) &&
            j.dosen.some((d) => (d.dosen_kode || d) === lect)) ||
            (!Array.isArray(j.dosen) &&
              (j.dosen?.dosen_kode || j.dosen) === lect))
      )
    ) {
      return false;
    }
  }
  // Cek visited agar tidak infinite loop
  const visitKey = `${item.id_mk_kelas}|${hari}|${sesi}|${ruang.ruangan_kode}`;
  if (visited.has(visitKey)) return false;
  visited.add(visitKey);
  // Cek apakah slot kosong
  const existing = jadwal.find(
    (j) =>
      j.hari === hari &&
      j.sesi === sesi &&
      j.ruangan === ruang.ruangan_kode &&
      j.status !== "unplaced"
  );
  if (!existing) {
    // Slot kosong, langsung isi
    // Simpan posisi lama
    const oldState = {
      hari: item.hari,
      sesi: item.sesi,
      ruangan: item.ruangan,
      ruangan_kapasitas: item.ruangan_kapasitas,
      status: item.status,
    };
    item.hari = hari;
    item.sesi = sesi;
    item.ruangan = ruang.ruangan_kode;
    item.ruangan_kapasitas = ruang.ruangan_kapasitas;
    item.status = undefined;
    for (const sem of semesters) {
      semesterKelasBookings.add(`${sem}|${kelasLabel}|${hari}|${sesi}`);
    }
    return true;
  } else {
    // Slot terisi, coba swap rekursif
    // Simpan posisi lama existing
    const oldExisting = {
      hari: existing.hari,
      sesi: existing.sesi,
      ruangan: existing.ruangan,
      ruangan_kapasitas: existing.ruangan_kapasitas,
      status: existing.status,
    };
    for (const hari2 of hariList) {
      for (const sesi2 of sesiList) {
        for (const ruang2 of ruangan) {
          if (
            hari2 === hari &&
            sesi2 === sesi &&
            ruang2.ruangan_kode === ruang.ruangan_kode
          )
            continue;
          if (
            tryPlaceWithSwap(
              jadwal,
              existing,
              hari2,
              sesi2,
              ruang2,
              ruangan,
              hariList,
              sesiList,
              dosenList,
              semesterKelasBookings,
              blockedSlots,
              visited
            )
          ) {
            // Jika berhasil, masukkan item ke slot lama
            const oldState = {
              hari: item.hari,
              sesi: item.sesi,
              ruangan: item.ruangan,
              ruangan_kapasitas: item.ruangan_kapasitas,
              status: item.status,
            };
            item.hari = hari;
            item.sesi = sesi;
            item.ruangan = ruang.ruangan_kode;
            item.ruangan_kapasitas = ruang.ruangan_kapasitas;
            item.status = undefined;
            for (const sem of semesters) {
              semesterKelasBookings.add(`${sem}|${kelasLabel}|${hari}|${sesi}`);
            }
            return true;
          }
        }
      }
    }
    // Jika swap gagal, kembalikan existing ke posisi semula
    existing.hari = oldExisting.hari;
    existing.sesi = oldExisting.sesi;
    existing.ruangan = oldExisting.ruangan;
    existing.ruangan_kapasitas = oldExisting.ruangan_kapasitas;
    existing.status = oldExisting.status;
    return false;
  }
}

// Setelah jadwal greedy selesai, lakukan reshuffle untuk kelas unplaced (pakai recursive swap)
function reshuffleUnplacedClasses(
  jadwal,
  ruangan,
  hariList,
  sesiList,
  dosenList,
  semesterKelasBookings
) {
  // Ambil blockedSlots dari jadwalHindariData
  const blockedSlots = new Set();
  if (Array.isArray(jadwalHindari.value)) {
    jadwalHindari.value.forEach((jh) => {
      if (Array.isArray(jh.hindari_smt)) {
        jh.hindari_smt.forEach((sem) => {
          blockedSlots.add(
            `${jh.hindari_hari}|${jh.hindari_sesi}|${(sem + "")
              .trim()
              .toUpperCase()}`
          );
        });
      }
    });
  }
  let changed = true;
  while (changed) {
    changed = false;
    // Cari kelas unplaced
    const unplaced = jadwal.filter((item) => item.status === "unplaced");
    for (const unplacedItem of unplaced) {
      let placed = false;
      for (const hari of hariList) {
        for (const sesi of sesiList) {
          for (const ruang of ruangan) {
            if (
              tryPlaceWithSwap(
                jadwal,
                unplacedItem,
                hari,
                sesi,
                ruang,
                ruangan,
                hariList,
                sesiList,
                dosenList,
                semesterKelasBookings,
                blockedSlots
              )
            ) {
              changed = true;
              placed = true;
              break;
            }
          }
          if (placed) break;
        }
        if (placed) break;
      }
    }
  }
}

// Setelah reshuffle, pastikan semua kelas yang tidak punya slot valid statusnya tetap 'unplaced'
function ensureUnplacedStatus(jadwal) {
  for (const item of jadwal) {
    if (!item.hari || !item.sesi || !item.ruangan) {
      item.status = "unplaced";
      item.hari = null;
      item.sesi = null;
      item.ruangan = null;
      item.ruangan_kapasitas = null;
    }
  }
}

const getSKS = (row) => {
  // Cek dari mata_kuliah_kelas
  if (row.mata_kuliah_kelas && row.mata_kuliah_kelas.matkul_sks) {
    return row.mata_kuliah_kelas.matkul_sks;
  }
  // Cek dari matkul_sks langsung (jaga-jaga)
  if (row.matkul_sks) {
    return row.matkul_sks;
  }
  // Cek dari mataKuliahList (by kode matkul)
  const mk = mataKuliahList.value.find(
    m => m.matkul_kode === (row.matkul_kode || row.mata_kuliah_kelas?.matkul_kode)
  );
  if (mk && mk.matkul_sks) {
    return mk.matkul_sks;
  }
  return '-';
};

// Function to get color class based on kelas name
const getKelasColor = (kelas) => {
  switch(kelas) {
    case 'A':
      return 'bg-green-100 text-green-700';
    case 'B':
      return 'bg-blue-100 text-blue-700';
    case 'C':
      return 'bg-purple-100 text-purple-700';
    case 'D':
      return 'bg-orange-100 text-orange-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

// Function to group dosen availability by session
const groupDosenAvailability = (jadwalDosen) => {
  if (!Array.isArray(jadwalDosen)) {
    return {};
  }
  
  // Group by session
  const result = {};
  
  jadwalDosen.forEach(item => {
    const sesi = item.dosen_sedia_sesi;
    const hari = item.dosen_sedia_hari;
    
    if (!result[sesi]) {
      result[sesi] = [];
    }
    
    if (!result[sesi].includes(hari)) {
      result[sesi].push(hari);
    }
  });
  
  return result;
};

const isMatchingFullscreen = ref(false);
const matchingSearchQuery = ref('');
const matchingSemesterFilter = ref('all');

const toggleMatchingFullscreen = () => {
  isMatchingFullscreen.value = !isMatchingFullscreen.value;
};

const isMataKuliahFullscreen = ref(false);
const isDosenFullscreen = ref(false);
const isRuangKelasFullscreen = ref(false);
const isJadwalHindariFullscreen = ref(false);

const toggleMataKuliahFullscreen = () => {
  isMataKuliahFullscreen.value = !isMataKuliahFullscreen.value;
};

const toggleDosenFullscreen = () => {
  isDosenFullscreen.value = !isDosenFullscreen.value;
};

const toggleRuangKelasFullscreen = () => {
  isRuangKelasFullscreen.value = !isRuangKelasFullscreen.value;
};

const toggleJadwalHindariFullscreen = () => {
  isJadwalHindariFullscreen.value = !isJadwalHindariFullscreen.value;
};

// Search query variables for each section
const mataKuliahSearchQuery = ref('');
const dosenSearchQuery = ref('');
const ruangKelasSearchQuery = ref('');
const jadwalHindariSearchQuery = ref('');

// Filter variables
const mkSksFilter = ref('all');
const mkSemesterFilter = ref('all');
const dosenPrioritasFilter = ref('all');
const dosenHariFilter = ref('all');
const dosenSesiFilter = ref('all');
const hindariHariFilter = ref('all');
const hindariSesiFilter = ref('all');
const hindariSemesterFilter = ref('all');
const matchingTypeFilter = ref('all');

// Computed property for filtered mata kuliah list
const filteredMataKuliahList = computed(() => {
  let filtered = mataKuliahList.value;
  
  // Apply search filter
  if (mataKuliahSearchQuery.value) {
    const query = mataKuliahSearchQuery.value.toLowerCase();
    filtered = filtered.filter(mk => 
      mk.matkul_nama.toLowerCase().includes(query) || 
      mk.matkul_kode.toLowerCase().includes(query)
    );
  }
  
  // Apply SKS filter
  if (mkSksFilter.value !== 'all') {
    filtered = filtered.filter(mk => mk.matkul_sks === parseInt(mkSksFilter.value));
  }
  
  // Apply semester filter
  if (mkSemesterFilter.value !== 'all') {
    filtered = filtered.filter(mk => {
      if (mk.mata_kuliah_kelas && Array.isArray(mk.mata_kuliah_kelas)) {
        return mk.mata_kuliah_kelas.some(kelas => 
          kelas.kelas_semester === parseInt(mkSemesterFilter.value) ||
          (kelas.mk_kelas_sem && 
           (Array.isArray(kelas.mk_kelas_sem) 
            ? kelas.mk_kelas_sem.includes(parseInt(mkSemesterFilter.value))
            : kelas.mk_kelas_sem === parseInt(mkSemesterFilter.value)))
        );
      }
      return true; // Include if can't determine semester
    });
  }
  
  return filtered;
});

// Computed property for filtered dosen list
const filteredDosenList = computed(() => {
  let filtered = dosenList.value;
  
  // Apply search filter
  if (dosenSearchQuery.value) {
    const query = dosenSearchQuery.value.toLowerCase();
    filtered = filtered.filter(dosen => 
      dosen.dosen_nama.toLowerCase().includes(query) ||
      dosen.dosen_kode.toLowerCase().includes(query)
    );
  }
  
  // Apply prioritas filter
  if (dosenPrioritasFilter.value !== 'all') {
    filtered = filtered.filter(dosen => dosen.dosen_prioritas === dosenPrioritasFilter.value);
  }
  
  // Apply hari filter
  if (dosenHariFilter.value !== 'all') {
    filtered = filtered.filter(dosen => {
      if (!dosen.jadwal_dosen || !Array.isArray(dosen.jadwal_dosen)) return false;
      return dosen.jadwal_dosen.some(jadwal => jadwal.dosen_sedia_hari === dosenHariFilter.value);
    });
  }
  
  // Apply sesi filter
  if (dosenSesiFilter.value !== 'all') {
    filtered = filtered.filter(dosen => {
      if (!dosen.jadwal_dosen || !Array.isArray(dosen.jadwal_dosen)) return false;
      return dosen.jadwal_dosen.some(jadwal => jadwal.dosen_sedia_sesi === dosenSesiFilter.value);
    });
  }
  
  return filtered;
});

// Computed property for filtered ruang kelas list
const filteredRuangKelasList = computed(() => {
  let filtered = ruangKelasList.value;
  
  // Apply search filter
  if (ruangKelasSearchQuery.value) {
    const query = ruangKelasSearchQuery.value.toLowerCase();
    filtered = filtered.filter(ruang => 
      ruang.ruangan_kode.toLowerCase().includes(query)
    );
  }
  
  return filtered;
});

// Computed property for filtered jadwal hindari list
const filteredJadwalHindariList = computed(() => {
  let filtered = jadwalHindari.value;
  
  // Apply search filter
  if (jadwalHindariSearchQuery.value) {
    const query = jadwalHindariSearchQuery.value.toLowerCase();
    filtered = filtered.filter(hindari => 
      hindari.hindari_agenda.toLowerCase().includes(query) ||
      hindari.hindari_hari.toLowerCase().includes(query)
    );
  }
  
  // Apply hari filter
  if (hindariHariFilter.value !== 'all') {
    filtered = filtered.filter(hindari => hindari.hindari_hari === hindariHariFilter.value);
  }
  
  // Apply sesi filter
  if (hindariSesiFilter.value !== 'all') {
    filtered = filtered.filter(hindari => hindari.hindari_sesi === hindariSesiFilter.value);
  }
  
  // Apply semester filter
  if (hindariSemesterFilter.value !== 'all') {
    filtered = filtered.filter(hindari => 
      hindari.hindari_smt && 
      Array.isArray(hindari.hindari_smt) && 
      hindari.hindari_smt.includes(parseInt(hindariSemesterFilter.value))
    );
  }
  
  return filtered;
});

// Reset filter functions
const resetMkFilters = () => {
  mataKuliahSearchQuery.value = "";
  mkSksFilter.value = "all";
};

const resetDosenFilters = () => {
  dosenSearchQuery.value = "";
  dosenPrioritasFilter.value = "all";
  dosenHariFilter.value = "all";
  dosenSesiFilter.value = "all";
};

const resetJadwalHindariFilters = () => {
  jadwalHindariSearchQuery.value = "";
  hindariHariFilter.value = "all";
  hindariSesiFilter.value = "all";
  hindariSemesterFilter.value = "all";
};

const resetMatchingFilters = () => {
  matchingSearchQuery.value = "";
  matchingTypeFilter.value = "all";
  matchingSemesterFilter.value = "all";
};

const resetRuangKelasFilters = () => {
  ruangKelasSearchQuery.value = "";
};

// First, let's add a helper function to get the time range from session code
const getSesiTimeRange = (sesi) => {
  if (sesi === 'SATU') return '07.00 - 09.55';
  if (sesi === 'DUA') return '10.00 - 12.55';
  if (sesi === 'TIGA') return '13.30 - 16.20';
  return '';
};
</script>