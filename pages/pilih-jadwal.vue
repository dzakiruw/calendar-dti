<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
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

      <button
        @click="exportExcel"
        class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl
               hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
      >
        <i class="fas fa-file-excel mr-2"></i> Export ke Excel
      </button>
    </div>

    <!-- Hasil Jadwal -->
    <div v-if="jadwalGenerated.length" class="max-w-7xl mx-auto">
      <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center mb-4">
        <i class="fas fa-calendar-alt mr-3"></i> Hasil Jadwal
      </h2>
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
                  <span v-for="(sem, idx) in row.semester" :key="idx" 
                        class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium mr-1">
                    Semester {{ sem }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">{{ row.dosen }}</td>
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
    console.log('Starting enhanced backtracking...');
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) throw new Error('User is not authenticated');

    // Fetch data
    const [mataKuliahRes, dosenRes, ruanganRes, jadwalHindariRes, mkDosenRes] = await Promise.all([
      axios.get('http://10.15.41.68:3000/mata_kuliah', { headers: { Authorization: `Bearer ${token}` } }),
      axios.get('http://10.15.41.68:3000/dosen', { headers: { Authorization: `Bearer ${token}` } }),
      axios.get('http://10.15.41.68:3000/ruangan', { headers: { Authorization: `Bearer ${token}` } }),
      axios.get('http://10.15.41.68:3000/jadwal_hindari', { headers: { Authorization: `Bearer ${token}` } }),
      axios.get('http://10.15.41.68:3000/mk_dosen', { headers: { Authorization: `Bearer ${token}` } })
    ]);

    const courses = mkDosenRes.data.reduce((acc, current) => {
      // Ensure mk_kelas_sem exists and is an array
      if (!current.mk_kelas_sem || !Array.isArray(current.mk_kelas_sem)) return acc;
      
      const existing = acc.find(c => 
        c.id_mk_kelas === current.id_mk_kelas && 
        JSON.stringify(c.mk_kelas_sem) === JSON.stringify(current.mk_kelas_sem)
      );
      
      if (existing) {
        if (!existing.secondary_lecturers.includes(current.dosen_kode)) {
          existing.secondary_lecturers.push(current.dosen_kode);
        }
      } else {
        acc.push({
          ...current,
          id: `${current.id_mk_kelas}-${JSON.stringify(current.mk_kelas_sem)}`,
          kelas: current.mata_kuliah_kelas?.nama_kelas,
          matkul_nama: mataKuliahRes.data.find(mk => 
            mk.matkul_kode === current.mata_kuliah_kelas?.matkul_kode)?.matkul_nama,
          primary_lecturer: current.dosen_kode,
          secondary_lecturers: [],
          priority: current.dosen_kode === 'KG' ? 0 : // bisa ganti jadi current.matkul_tipe === 'SKPB' kalo perlu
                  (current.matkul_tipe === 'DEPARTEMEN' ? 1 : 
                  (current.matkul_tipe === 'PENGAYAAN' ? 2 : 3))
        });
      }
      return acc;
    }, []).sort((a, b) => a.priority - b.priority);
    
    // Get all unique semester values from mkDosenRes.data (flattening the arrays)
    const activeSemesters = new Set(
      courses.flatMap(course => course.mk_kelas_sem)
    );

    // Create blocked slots only for the active semesters
    const blockedSlots = new Set(
      jadwalHindariRes.data
        .filter(jh => {
          if (!jh.hindari_sem || !Array.isArray(jh.hindari_sem)) return false;
          return jh.hindari_sem.some(sem => activeSemesters.has(sem));
        })
        .map(jh => `${jh.hindari_hari}|${jh.hindari_sesi}`)
    );

    console.log(`Processing ${courses.length} unique course sections`);

    const lecturers = dosenRes.data.reduce((acc, d) => {
      const availableSlots = d.jadwal_dosen
        .map(j => `${j.dosen_sedia_hari}|${j.dosen_sedia_sesi}`)
        .filter(slot => !blockedSlots.has(slot));

      acc[d.dosen_kode] = {
        nama: d.dosen_nama,
        availableSlots,
        totalSlots: d.jadwal_dosen.length,
        availableCount: availableSlots.length
      };
      return acc;
    }, {});

    const rooms = ruanganRes.data.map(r => r.ruangan_kode);

    const schedule = [];
    const bestSolution = { schedule: [], score: -Infinity };
    const lecturerBookings = {};
    const roomBookings = {};
    let nodesVisited = 0;
    const MAX_NODES = 10000;

    hariList.forEach(day => {
      sesiList.forEach(session => {
        roomBookings[`${day}|${session}`] = new Set();
      });
    });

    // scoring
    function evaluateSchedule(currentSchedule) {
      let score = currentSchedule.length * 1000; // Base score per scheduled course
      
      currentSchedule.forEach(entry => {
        // Priority bonus
        score += (3 - entry.priority) * 100;
        
        // Team teaching bonus
        if (entry.secondary_lecturers.length > 0) score += 200;
        
        // earlier = better
        const dayValue = hariList.indexOf(entry.hari);
        const sessionValue = sesiList.indexOf(entry.sesi);
        score += (100 - (dayValue * 10 + sessionValue * 3));
      });
      return score;
    }

    // backtracking
    function backtrack(coursesToSchedule, index, currentSchedule) {
      nodesVisited++;
      if (nodesVisited > MAX_NODES) return false;
      
      if (index >= coursesToSchedule.length) {
        const currentScore = evaluateSchedule(currentSchedule);
        if (currentScore > bestSolution.score) {
          bestSolution.schedule = [...currentSchedule];
          bestSolution.score = currentScore;
          // console.log(`New best score: ${currentScore} (${currentSchedule.length} courses)`);
        }
        return currentSchedule.length === coursesToSchedule.length;
      }

      const course = coursesToSchedule[index];
      const allLecturers = [course.primary_lecturer, ...course.secondary_lecturers];

      // Get all possible slots from all lecturers, excluding blocked slots
      let possibleSlots = [];
      allLecturers.forEach(lect => {
        lecturers[lect]?.availableSlots.forEach(slot => {
          // Only consider non-blocked slots
          if (!blockedSlots.has(slot)) {
            const [day, session] = slot.split('|');
            possibleSlots.push({ day, session });
          }
        });
      });

      const uniqueSlots = Array.from(new Set(possibleSlots.map(s => `${s.day}|${s.session}`)))
        .map(s => {
          const [day, session] = s.split('|');
          return { day, session };
        })
        .sort((a, b) => {
          // Prefer earlier days and sessions
          const dayDiff = hariList.indexOf(a.day) - hariList.indexOf(b.day);
          if (dayDiff !== 0) return dayDiff;
          return sesiList.indexOf(a.session) - sesiList.indexOf(b.session);
        });

      let slotSet = new Set();
      allLecturers.forEach(lect => {
        lecturers[lect]?.availableSlots.forEach(slot => {
          slotSet.add(slot);
        });
      });

      for (const { slot, day, session } of possibleSlots) {
        const slotKey = `${day}|${session}`;
        if (blockedSlots.has(slotKey)) continue;

        const availableRoom = rooms.find(r => !roomBookings[slotKey].has(r));
        if (!availableRoom) continue;

        // team teaching
        const availableLecturers = allLecturers.filter(lecturer =>
          !lecturerBookings[`${lecturer}|${day}|${session}`]
        );
        if (availableLecturers.length === 0) continue;

        const newEntry = {
          hari: day,
          sesi: session,
          matkul: course.matkul_nama,
          dosen: availableLecturers.join(' & '),
          secondary_lecturers: availableLecturers.slice(1),
          ruangan: availableRoom,
          kelas: course.kelas,
          matkul_tipe: course.matkul_tipe,
          priority: course.priority
        };

        currentSchedule.push(newEntry);

        // tanda ruang kelas dan sesi dosen sudah diisi
        availableLecturers.forEach(lecturer => {
          lecturerBookings[`${lecturer}|${day}|${session}`] = true;
        });
        roomBookings[slotKey].add(availableRoom);

        if (backtrack(coursesToSchedule, index + 1, currentSchedule)) {
          return true;
        }

        // Backtrack
        currentSchedule.pop();
        availableLecturers.forEach(lecturer => {
          delete lecturerBookings[`${lecturer}|${day}|${session}`];
        });
        roomBookings[slotKey].delete(availableRoom);
      }
      
      // skip matkul kalau gagal
      return backtrack(coursesToSchedule, index + 1, currentSchedule);
    }

    console.log('Starting backtracking...');
    const startTime = Date.now();
    const foundCompleteSolution = backtrack(courses, 0, []);
    const endTime = Date.now();

    console.log('Backtracking results:', {
      executionTime: `${(endTime - startTime)/1000}s`,
      nodesVisited,
      bestScore: bestSolution.score,
      coursesScheduled: bestSolution.schedule.length,
      totalCourses: courses.length,
      solutionComplete: foundCompleteSolution
    });
    
    const scheduledIds = new Set(bestSolution.schedule.map(s => `${s.kelas}-${s.matkul}`));
    const unscheduledCourses = courses.filter(c => 
      !scheduledIds.has(`${c.kelas}-${c.matkul_nama}`)
    );

    console.warn(`Total Unscheduled Courses: ${unscheduledCourses.length}`);

    unscheduledCourses.forEach(c => {
      console.warn(`Could not schedule: "${c.matkul_nama}" (${c.kelas}) [${c.primary_lecturer}${c.secondary_lecturers.length ? ' + ' + c.secondary_lecturers.join(', ') : ''}]`);
    });

    // Handle results
    jadwalGenerated.value = bestSolution.schedule;

    return bestSolution.schedule;

  } catch (error) {
    console.error('Scheduling error:', error);
    alert(`Error: ${error.message}`);
    return null;
  }
};

// Function to export jadwal to Excel
const exportExcel = () => {
  // Get unique rooms and sort them
  const uniqueRooms = [...new Set(jadwalGenerated.value.map(item => item.ruangan))].sort();
  
  // Get unique time slots (hari + sesi combinations) and sort them
  const uniqueTimeSlots = [...new Set(jadwalGenerated.value.map(item => `${item.hari}|${item.sesi}`))].sort((a, b) => {
    const [hariA, sesiA] = a.split('|');
    const [hariB, sesiB] = b.split('|');
    const hariOrder = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT'];
    const sesiOrder = ['SATU', 'DUA', 'TIGA'];
    return hariOrder.indexOf(hariA) - hariOrder.indexOf(hariB) || 
           sesiOrder.indexOf(sesiA) - sesiOrder.indexOf(sesiB);
  });
  
  // Create a matrix of data
  const matrixData = [];
  
  // Add header row with room capacity
  const headerRow = ['Hari', 'Sesi', ...uniqueRooms];
  matrixData.push(headerRow);
  
  // Group data by hari and sesi
  const groupedData = {};
  jadwalGenerated.value.forEach(item => {
    const key = `${item.hari}|${item.sesi}`;
    if (!groupedData[key]) {
      groupedData[key] = {
        hari: item.hari,
        sesi: item.sesi,
        classes: {}
      };
    }
    
    // Format the output as "Kelas - Dosen (Semester X, Y)"
    groupedData[key].classes[item.ruangan] = `${item.kelas} - ${item.dosen} (Semester ${(item.semester || item.mk_kelas_sem || ['-']).join(', ')})`;
  });
  
  // Add data rows
  uniqueTimeSlots.forEach(timeSlot => {
    const [hari, sesi] = timeSlot.split('|');
    const row = [hari, sesi];
    
    // Fill in class data for each room
    uniqueRooms.forEach(room => {
      const classData = groupedData[timeSlot]?.classes[room] || '';
      row.push(classData);
    });
    
    matrixData.push(row);
  });
  
  // Create worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(matrixData);
  
  // Set column widths
  const colWidths = [
    { wch: 15 }, // Hari
    { wch: 15 }, // Sesi
    ...uniqueRooms.map(() => ({ wch: 50 })) // Room columns
  ];
  worksheet['!cols'] = colWidths;
  
  // Add styling
  const range = XLSX.utils.decode_range(worksheet['!ref']);
  for (let R = range.s.r; R <= range.e.r; R++) {
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cell_address = { c: C, r: R };
      const cell_ref = XLSX.utils.encode_cell(cell_address);
      
      // Style header row
      if (R === 0) {
        worksheet[cell_ref].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "4F81BD" } },
          alignment: { wrapText: true, vertical: "center", horizontal: "center" }
        };
      } else {
        // Style data rows
        worksheet[cell_ref].s = {
          alignment: { wrapText: true, vertical: "center" },
          border: {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
        };
        
        // Alternate row colors
        if (R % 2 === 0) {
          worksheet[cell_ref].s.fill = { fgColor: { rgb: "F2F2F2" } };
        }
      }
    }
  }
  
  // Freeze header row and first two columns
  worksheet['!freeze'] = { xSplit: 2, ySplit: 1 };
  
  // Create workbook and save
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Jadwal');
  
  // Save the file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'jadwal.xlsx');
}

// Add this helper function to get classes for a specific time slot
const getClassesForTimeSlot = (hari, sesi) => {
  return jadwalGenerated.value.filter(
    kelas => kelas.hari === hari && kelas.sesi === sesi
  );
};
</script>
