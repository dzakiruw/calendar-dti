<template>
   <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
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
         <img src="/pilih-jadwal.png" alt="Icon Pilih Jadwal" class="w-16 h-16 object-contain" />
         <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
           Pilih Jadwal
         </h1>
       </div>
     </div>
 
     <!-- Informasi Daftar Data -->
     <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
       <!-- Mata Kuliah -->
       <div class="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100">
         <h2 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center mb-4">
           <i class="fas fa-book mr-3"></i> Mata Kuliah
         </h2>
         <div class="h-[200px] overflow-y-auto pr-2">
           <ul class="space-y-3">
             <li v-for="mk in mataKuliahList" :key="mk.matkul_kode" 
                 class="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300">
               <p class="font-semibold text-gray-800">{{ mk.matkul_nama }}</p>
               <p class="text-sm text-gray-600">{{ mk.matkul_kode }}</p>
           </li>
         </ul>
         </div>
       </div>
 
       <!-- Dosen -->
       <div class="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100">
         <h2 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center mb-4">
           <i class="fas fa-user-tie mr-3"></i> Dosen
         </h2>
         <div class="h-[200px] overflow-y-auto pr-2">
           <ul class="space-y-3">
             <li v-for="dosen in dosenList" :key="dosen.dosen_kode"
                 class="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300">
               <p class="font-semibold text-gray-800">{{ dosen.dosen_nama }}</p>
               <div class="flex items-center gap-2 mt-1">
                 <span class="text-sm text-gray-600">{{ dosen.dosen_kode }}</span>
                 <span :class="{
                   'px-2 py-1 rounded-lg text-xs font-medium': true,
                   'bg-green-100 text-green-600': dosen.dosen_prioritas === 'PRIORITAS',
                   'bg-red-100 text-red-600': dosen.dosen_prioritas !== 'PRIORITAS'
                 }">
                   {{ dosen.dosen_prioritas === 'PRIORITAS' ? 'Prioritas' : 'Non Prioritas' }}
                 </span>
               </div>
           </li>
         </ul>
         </div>
       </div>
 
       <!-- Ruang Kelas -->
       <div class="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100">
         <h2 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center mb-4">
           <i class="fas fa-chalkboard-teacher mr-3"></i> Ruang Kelas
         </h2>
         <div class="h-[200px] overflow-y-auto pr-2">
           <ul class="space-y-3">
             <li v-for="ruang in ruangKelasList" :key="ruang.ruangan_kode"
                 class="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300">
               <p class="font-semibold text-gray-800">{{ ruang.ruangan_kode }}</p>
               <span class="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-xs font-medium mt-1">
                 Kapasitas: {{ ruang.ruangan_kapasitas }}
               </span>
           </li>
         </ul>
         </div>
       </div>
 
       <!-- Jadwal Hindari -->
       <div class="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100">
         <h2 class="text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent flex items-center mb-4">
           <i class="fas fa-calendar-times mr-3"></i> Jadwal Hindari
         </h2>
         <div class="h-[200px] overflow-y-auto pr-2">
           <ul class="space-y-3">
             <li v-for="hindari in jadwalHindari" :key="hindari.id"
                 class="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-red-50 hover:border-red-200 transition-all duration-300">
               <p class="font-semibold text-gray-800">{{ hindari.hindari_agenda }}</p>
               <div class="flex flex-wrap gap-2 mt-2">
                 <div class="flex items-center">
                   <span class="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-l-lg text-sm font-medium border-r border-red-200">
                     <i class="fas fa-calendar-day mr-2"></i>
                     {{ hindari.hindari_hari }}
                   </span>
                   <span class="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 rounded-r-lg text-sm font-medium">
                     <i class="fas fa-clock mr-2"></i>
                     Sesi {{ hindari.hindari_sesi }}
                   </span>
                 </div>
                 <div class="flex flex-wrap gap-1 mt-1">
                   <span v-for="sem in hindari.hindari_smt" :key="sem" class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium">
                     Semester {{ sem }}
                   </span>
                 </div>
               </div>
           </li>
         </ul>
         </div>
       </div>
 
       <!-- Matching -->
       <div class="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100">
         <h2 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center mb-4">
           <i class="fas fa-list-ul mr-3"></i> Daftar Matching
       </h2>
         <div class="h-[200px] overflow-y-auto pr-2">
           <!-- Empty State -->
           <div v-if="matchingList.length === 0" 
                class="flex flex-col items-center justify-center h-full text-gray-500">
             <i class="fas fa-clipboard-list text-4xl mb-2"></i>
             <p>Belum ada data matching.</p>
       </div>
 
           <!-- Matching List -->
           <ul v-else class="space-y-3">
             <li v-for="(match, index) in matchingList" :key="index"
                 class="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300">
               <p class="font-semibold text-gray-800">{{ match.kelas.nama_kelas }}</p>
               <p class="text-sm text-gray-600 mt-1">{{ match.dosen.dosen_nama }}</p>
   </li>
 </ul>
         </div>
     </div>
     </div>
 
     <!-- Tombol Aksi -->
     <div class="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 mb-8">
       <button
         @click="generateJadwal"
         class="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl
                hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg"
       >
         <i class="fas fa-cogs mr-2"></i> Generate Jadwal
       </button>
     </div>
 
     <!-- Hasil Jadwal -->
     <div v-if="jadwalGenerated.length" class="max-w-7xl mx-auto">
       <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center mb-4">
         <i class="fas fa-calendar-alt mr-3"></i> Hasil Jadwal
       </h2>
       <div class="flex justify-end mb-4">
         <button
           @click="exportExcel"
           class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-6 rounded-xl
                  hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
         >
           <i class="fas fa-file-excel mr-2"></i> Export ke Excel
         </button>
       </div>
       <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
         <div class="overflow-x-auto">
           <table class="w-full">
             <thead>
               <tr class="bg-gray-50 border-b border-gray-100">
                 <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 sticky left-0 bg-gray-50">Hari</th>
                 <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 sticky left-[140px] bg-gray-50">Sesi</th>
                 <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Kelas</th>
                 <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Semester</th>
                 <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Dosen</th>
                 <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ruangan</th>
           </tr>
         </thead>
             <tbody class="divide-y divide-gray-100">
               <tr v-for="(row, index) in jadwalGenerated" :key="index"
                   class="hover:bg-blue-50 transition-colors duration-200">
                 <td class="px-6 py-4 text-sm text-gray-700 sticky left-0 bg-white">{{ row.hari }}</td>
                 <td class="px-6 py-4 text-sm text-gray-700 sticky left-[140px] bg-white">{{ row.sesi }}</td>
                 <td class="px-6 py-4 text-sm text-gray-700">{{ row.kelas }}</td>
                 <td class="px-6 py-4 text-sm text-gray-700">
                   <span v-for="(sem, idx) in row.semester || row.mk_kelas_sem || []" :key="idx" class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium mr-1">
                     Semester {{ sem }}
                   </span>
                 </td>
                 <td class="px-6 py-4 text-sm text-gray-700">{{ row.dosen?.dosen_kode || row.dosen }}</td>
                 <td class="px-6 py-4 text-sm text-gray-700">{{ row.ruangan }}</td>
           </tr>
         </tbody>
       </table>
         </div>
       </div>
     </div>
   </div>
 </template>
 
 <script setup>
 import { ref, onMounted } from 'vue'
 import * as XLSX from 'xlsx'
 import { saveAs } from 'file-saver'
 import axios from 'axios'
 
 // Define constants for days and sessions
 const hariList = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT']
 const sesiList = ['SATU', 'DUA', 'TIGA']
 
 // Define refs for storing lists of data
 const mataKuliahList = ref([]);
 const dosenList = ref([]);
 const ruangKelasList = ref([]);
 const jadwalHindari = ref([]);
 const matchingList = ref([]);
 const jadwalGenerated = ref([]);
 const showSuccess = ref(false);
 const successMessage = ref('');
 const isGenerating = ref(false);
 const alertMessage = ref('');
 const showAlert = ref(false);
 const selectedSemesters = ref([]);
 const selectAllSemesters = ref(false);
 
 // Tambahkan set untuk booking dosen
 const dosenBookings = new Set();
 
 // Fetch Data function
 const getToken = () => {
   const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
   return token || null;
 }
 
 const fetchData = async () => {
   try {
     const token = getToken();
     if (!token) throw new Error('User is not authenticated');
 
     // Fetch Mata Kuliah
     const mataKuliahResponse = await axios.get('http://10.15.41.68:3000/mata_kuliah', {
       headers: { Authorization: `Bearer ${token}` }
     });
     mataKuliahList.value = mataKuliahResponse.data;
 
     // Fetch Ruang Kelas
     const ruangKelasResponse = await axios.get('http://10.15.41.68:3000/ruangan', {
       headers: { Authorization: `Bearer ${token}` }
     });
     ruangKelasList.value = ruangKelasResponse.data;
 
     // Fetch Dosen
     const dosenResponse = await axios.get('http://10.15.41.68:3000/dosen', {
       headers: { Authorization: `Bearer ${token}` }
     });
     dosenList.value = dosenResponse.data;
 
     // Fetch Jadwal Hindari
     const jadwalHindariResponse = await axios.get('http://10.15.41.68:3000/jadwal_hindari', {
       headers: { Authorization: `Bearer ${token}` }
     });
     jadwalHindari.value = jadwalHindariResponse.data;
 
   } catch (error) {
     console.error('Error fetching data:', error);
   }
 }
 
 const fetchMatchingData = async () => {
   try {
     const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
     if (!token) throw new Error('User is not authenticated');
 
     const response = await axios.get('http://10.15.41.68:3000/mk_dosen', {
       headers: { Authorization: `Bearer ${token}` }
     });
 
     // Ensure the response data is properly handled
     if (response.data && Array.isArray(response.data)) {
       matchingList.value = response.data.map((match) => ({
         id_mk_kelas_dosen: match.id_mk_kelas_dosen,
         kelas: match.mata_kuliah_kelas,
         dosen: match.dosen
       }));
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
 })
 
 // Function to generate jadwal
 const generateJadwal = async () => {
   try {
     isGenerating.value = true;
     const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
     if (!token) {
       throw new Error('User is not authenticated');
     }

     // Fetch all data
     const [mkDosenResponse, ruanganResponse, jadwalHindariResponse] = await Promise.all([
       axios.get('http://10.15.41.68:3000/mk_dosen', {
         headers: { 'Authorization': `Bearer ${token}` },
       }),
       axios.get('http://10.15.41.68:3000/ruangan', {
         headers: { 'Authorization': `Bearer ${token}` },
       }),
       axios.get('http://10.15.41.68:3000/jadwal_hindari', {
         headers: { 'Authorization': `Bearer ${token}` },
       }),
     ]);

     const mkDosen = mkDosenResponse.data;
     const ruangan = ruanganResponse.data;
     const jadwalHindariData = jadwalHindariResponse.data;

     // Buat blockedSlots: Set(hari|sesi|semester)
     const blockedSlots = new Set();
     jadwalHindariData.forEach(jh => {
       if (Array.isArray(jh.hindari_smt)) {
         jh.hindari_smt.forEach(sem => {
           blockedSlots.add(`${jh.hindari_hari}|${jh.hindari_sesi}|${sem}`);
         });
       }
     });

     // Inisialisasi jadwal kosong
     const jadwal = [];
     const usedSlots = new Set();

     // Fungsi untuk mengecek apakah slot waktu valid (tidak bertabrakan)
     const isSlotValid = (hari, sesi, ruangan) => {
       const slotKey = `${hari}-${sesi}-${ruangan}`;
       return !usedSlots.has(slotKey);
     };

     // Urutkan jadwal berdasarkan prioritas dosen
     const sortedJadwal = [...mkDosen].sort((a, b) => {
       const prioritasA = a.dosen.dosen_prioritas === 'PRIORITAS' ? 1 : 0;
       const prioritasB = b.dosen.dosen_prioritas === 'PRIORITAS' ? 1 : 0;
       return prioritasB - prioritasA;
     });

     // Coba tempatkan setiap jadwal
     for (const jadwalItem of sortedJadwal) {
       let placed = false;
       const semester = Array.isArray(jadwalItem.mk_kelas_sem) ? jadwalItem.mk_kelas_sem[0] : jadwalItem.mk_kelas_sem;
       const dosenKode = jadwalItem.dosen?.dosen_kode || jadwalItem.dosen;
       // Cari data dosen lengkap dari dosenList
       const dosenObj = dosenList.value.find(d => d.dosen_kode === dosenKode);
       // Ambil array ketersediaan dosen
       const availableSlots = dosenObj?.jadwal_dosen?.map(j => `${j.dosen_sedia_hari}|${j.dosen_sedia_sesi}`) || [];

       for (const hari of hariList) {
         if (placed) break;
         for (const sesi of sesiList) {
           if (placed) break;

           // Cek apakah slot tersedia di jadwal dosen
           if (availableSlots.length && !availableSlots.includes(`${hari}|${sesi}`)) {
             continue;
           }

           // Skip jika slot termasuk dalam jadwal hindari untuk semester tersebut
           if (blockedSlots.has(`${hari}|${sesi}|${semester}`)) {
             continue;
           }

           // Cek apakah dosen sudah mengajar di slot ini
           if (dosenBookings.has(`${dosenKode}|${hari}|${sesi}`)) {
             continue;
           }

           for (const ruang of ruangan) {
             if (placed) break;
             if (isSlotValid(hari, sesi, ruang.ruangan_kode)) {
               jadwal.push({
                 id_mk_kelas_dosen: jadwalItem.id_mk_kelas_dosen,
                 mata_kuliah_kelas: jadwalItem.mata_kuliah_kelas,
                 dosen: jadwalItem.dosen,
                 mk_kelas_sem: jadwalItem.mk_kelas_sem,
                 matkul_tipe: jadwalItem.matkul_tipe,
                 hari,
                 sesi,
                 ruangan: ruang.ruangan_kode,
                 ruangan_kapasitas: ruang.ruangan_kapasitas
               });
               usedSlots.add(`${hari}-${sesi}-${ruang.ruangan_kode}`);
               dosenBookings.add(`${dosenKode}|${hari}|${sesi}`);
               placed = true;
             }
           }
         }
       }
       if (!placed) {
         jadwal.push({
           ...jadwalItem,
           hari: null,
           sesi: null,
           ruangan: null,
           ruangan_kapasitas: null,
           status: 'unplaced'
         });
       }
     }
     jadwalGenerated.value = jadwal;
     showSuccessAlert('Jadwal berhasil tergenerate!');
   } catch (error) {
     console.error('Error generating schedule:', error);
     let msg = 'Gagal generate jadwal: ';
     if (error.response?.data?.error) {
       msg += error.response.data.error;
     } else if (error.message) {
       msg += error.message;
     } else {
       msg += 'Terjadi kesalahan.';
     }
     alertMessage.value = msg;
     showAlert.value = true;
   } finally {
     isGenerating.value = false;
   }
 };
 
 // Function to export jadwal to Excel
 const exportExcel = () => {
   // Ambil semua kombinasi hari, sesi, dan ruangan
   const uniqueRooms = [...new Set(jadwalGenerated.value.map(item => item.ruangan))].sort();
   const allRooms = uniqueRooms.length ? uniqueRooms : ruangKelasList.value.map(r => r.ruangan_kode).sort();
   const allTimeSlots = [];
   hariList.forEach(hari => {
     sesiList.forEach(sesi => {
       allTimeSlots.push(`${hari}|${sesi}`);
     });
   });

   const matrixData = [];
   const headerRow = ['Hari', 'Sesi', ...allRooms];
   matrixData.push(headerRow);

   // Group data by hari, sesi, ruangan
   const groupedData = {};
   jadwalGenerated.value.forEach(item => {
     const key = `${item.hari}|${item.sesi}`;
     if (!groupedData[key]) groupedData[key] = {};
     groupedData[key][item.ruangan] = `${item.kelas || item.mata_kuliah_kelas?.nama_kelas || '-'} - ${item.dosen?.dosen_kode || item.dosen || '-'} (Semester ${(item.semester || item.mk_kelas_sem || ['-']).join(', ')})`;
   });

   // Tambahkan semua kombinasi hari, sesi, ruangan ke matrixData
   allTimeSlots.forEach(timeSlot => {
     const [hari, sesi] = timeSlot.split('|');
     const row = [hari, sesi];
     allRooms.forEach(room => {
       const classData = groupedData[timeSlot]?.[room] || '';
       row.push(classData);
     });
     matrixData.push(row);
   });

   const worksheet = XLSX.utils.aoa_to_sheet(matrixData);
   const colWidths = [
     { wch: 15 },
     { wch: 15 },
     ...allRooms.map(() => ({ wch: 50 }))
   ];
   worksheet['!cols'] = colWidths;
   const workbook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(workbook, worksheet, 'Jadwal');
   const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
   const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
   saveAs(blob, 'jadwal.xlsx');
 };
 
 // Add this helper function to get classes for a specific time slot
 const getClassesForTimeSlot = (hari, sesi) => {
   return jadwalGenerated.value.filter(
     kelas => kelas.hari === hari && kelas.sesi === sesi
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
 </script>