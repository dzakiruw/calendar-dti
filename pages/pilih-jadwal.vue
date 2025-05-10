<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8"
  >
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
    <div
      v-if="showSuccess"
      class="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-lg transform transition-all duration-300 z-50"
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
        class="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4 transform hover:scale-105 transition-all duration-300"
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
    <div
      class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
    >
      <!-- Mata Kuliah -->
      <div
        class="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100"
      >
        <h2
          class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center mb-4"
        >
          <i class="fas fa-book mr-3"></i> Mata Kuliah
        </h2>
        <div class="h-[200px] overflow-y-auto pr-2">
          <ul v-if="mataKuliahList.length" class="space-y-3">
            <li
              v-for="mk in mataKuliahList"
              :key="mk.matkul_kode"
              class="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
            >
              <p class="font-semibold text-gray-800">{{ mk.matkul_nama }}</p>
              <p class="text-sm text-gray-600">{{ mk.matkul_kode }}</p>
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
        class="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100"
      >
        <h2
          class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center mb-4"
        >
          <i class="fas fa-user-tie mr-3"></i> Dosen
        </h2>
        <div class="h-[200px] overflow-y-auto pr-2">
          <ul v-if="dosenList.length" class="space-y-3">
            <li
              v-for="dosen in dosenList"
              :key="dosen.dosen_kode"
              class="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
            >
              <p class="font-semibold text-gray-800">{{ dosen.dosen_nama }}</p>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-sm text-gray-600">{{ dosen.dosen_kode }}</span>
                <span
                  :class="{
                    'px-2 py-1 rounded-lg text-xs font-medium': true,
                    'bg-green-100 text-green-600':
                      dosen.dosen_prioritas === 'PRIORITAS',
                    'bg-red-100 text-red-600':
                      dosen.dosen_prioritas !== 'PRIORITAS',
                  }"
                >
                  {{
                    dosen.dosen_prioritas === "PRIORITAS"
                      ? "Prioritas"
                      : "Non Prioritas"
                  }}
                </span>
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
        class="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100"
      >
        <h2
          class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center mb-4"
        >
          <i class="fas fa-chalkboard-teacher mr-3"></i> Ruang Kelas
        </h2>
        <div class="h-[200px] overflow-y-auto pr-2">
          <ul v-if="ruangKelasList.length" class="space-y-3">
            <li
              v-for="ruang in ruangKelasList"
              :key="ruang.ruangan_kode"
              class="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
            >
              <p class="font-semibold text-gray-800">
                {{ ruang.ruangan_kode }}
              </p>
              <span
                class="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-xs font-medium mt-1"
              >
                Kapasitas: {{ ruang.ruangan_kapasitas }}
              </span>
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
        class="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100"
      >
        <h2
          class="text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent flex items-center mb-4"
        >
          <i class="fas fa-calendar-times mr-3"></i> Jadwal Hindari
        </h2>
        <div class="h-[200px] overflow-y-auto pr-2">
          <ul v-if="jadwalHindari.length" class="space-y-3">
            <li
              v-for="hindari in jadwalHindari"
              :key="hindari.id"
              class="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-red-50 hover:border-red-200 transition-all duration-300"
            >
              <p class="font-semibold text-gray-800">
                {{ hindari.hindari_agenda }}
              </p>
              <div class="flex flex-wrap gap-2 mt-2">
                <div class="flex items-center">
                  <span
                    class="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-l-lg text-sm font-medium border-r border-red-200"
                  >
                    <i class="fas fa-calendar-day mr-2"></i>
                    {{ hindari.hindari_hari }}
                  </span>
                  <span
                    class="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 rounded-r-lg text-sm font-medium"
                  >
                    <i class="fas fa-clock mr-2"></i>
                    Sesi {{ hindari.hindari_sesi }}
                  </span>
                </div>
                <div class="flex flex-wrap gap-1 mt-1">
                  <span
                    v-for="sem in hindari.hindari_smt"
                    :key="sem"
                    class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium"
                  >
                    Semester {{ sem }}
                  </span>
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

      <!-- Matching -->
      <div
        class="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100"
      >
        <h2
          class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center mb-4"
        >
          <i class="fas fa-list-ul mr-3"></i> Daftar Matching
        </h2>
        <div class="h-[200px] overflow-y-auto pr-2">
          <!-- Empty State -->
          <div
            v-if="matchingList.length === 0"
            class="flex flex-col items-center justify-center h-full text-gray-500"
          >
            <i class="fas fa-clipboard-list text-4xl mb-2"></i>
            <p>Belum ada data matching.</p>
          </div>

          <!-- Matching List -->
          <ul v-else class="space-y-3">
            <li
              v-for="(match, index) in matchingList"
              :key="index"
              class="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
            >
              <p class="font-semibold text-gray-800">
                {{ match.kelas && match.kelas.nama_kelas ? match.kelas.nama_kelas : (match.mata_kuliah_kelas?.nama_kelas || '-') }}
              </p>
              <p class="text-sm text-gray-600 mt-1">
                {{ match.dosen && match.dosen.dosen_nama ? match.dosen.dosen_nama : (match.dosen_nama || '-') }}
              </p>
              <div class="flex flex-wrap gap-2 mt-2">
                <span v-if="match.matkul_tipe" class="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-xs font-medium">
                  {{ match.matkul_tipe }}
                </span>
                <span 
                  v-for="sem in getSemesterArray(match)" 
                  :key="sem" 
                  class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium"
                >
                  Semester {{ sem }}
                </span>
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
        class="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg"
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
          class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
        >
          <i class="fas fa-file-excel mr-2"></i> Export ke Excel
        </button>
      </div>
      <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-[700px] w-full">
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
              <tr
                v-for="(row, index) in jadwalGenerated.filter(j => j.status !== 'unplaced')"
                :key="index"
                class="group hover:bg-blue-50 transition-colors duration-200"
              >
                <td class="px-6 py-4 text-sm text-gray-700 bg-white group-hover:bg-blue-50">{{ row.hari }}</td>
                <td class="px-6 py-4 text-sm text-gray-700 bg-white group-hover:bg-blue-50">{{ row.sesi }}</td>
                <td class="px-6 py-4 text-sm text-gray-700 group-hover:bg-blue-50">{{ row.kelas }}</td>
                <td class="px-6 py-4 text-sm text-gray-700 group-hover:bg-blue-50">
                  <span v-for="(sem, idx) in row.semester || row.mk_kelas_sem || []" :key="idx" class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium mr-1">
                    Semester {{ sem }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 group-hover:bg-blue-50">{{ getTeamTeachingLecturers(row) }}</td>
                <td class="px-6 py-4 text-sm text-gray-700 group-hover:bg-blue-50">{{ row.ruangan }}</td>
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
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Kelas</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Mata Kuliah</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Semester</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Dosen</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Alasan</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="(item, idx) in jadwalGenerated.filter(j => j.status === 'unplaced')" :key="idx">
                  <td class="px-6 py-4 text-sm text-gray-700">{{ item.kelas || '-' }}</td>
                  <td class="px-6 py-4 text-sm text-gray-700">{{ item.mata_kuliah_kelas?.nama_kelas || '-' }}</td>
                  <td class="px-6 py-4 text-sm text-gray-700">
                    <span v-for="(sem, sidx) in item.semester || item.mk_kelas_sem || []" :key="sidx" class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium mr-1">
                      Semester {{ sem }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-700">{{ getTeamTeachingLecturers(item) }}</td>
                  <td class="px-6 py-4 text-sm text-red-600">Tidak ada slot tersedia</td>
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
import { ref, onMounted } from "vue";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";

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
      "http://10.15.41.68:3000/mata_kuliah",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    mataKuliahList.value = mataKuliahResponse.data;

    // Fetch Ruang Kelas
    const ruangKelasResponse = await axios.get(
      "http://10.15.41.68:3000/ruangan",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    ruangKelasList.value = ruangKelasResponse.data;

    // Fetch Dosen
    const dosenResponse = await axios.get("http://10.15.41.68:3000/dosen", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dosenList.value = dosenResponse.data;

    // Fetch Jadwal Hindari
    const jadwalHindariResponse = await axios.get(
      "http://10.15.41.68:3000/jadwal_hindari",
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

    const response = await axios.get('http://10.15.41.68:3000/mk_dosen', {
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
      axios.get("http://10.15.41.68:3000/mk_dosen", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get("http://10.15.41.68:3000/ruangan", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get("http://10.15.41.68:3000/jadwal_hindari", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get("http://10.15.41.68:3000/dosen", {
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
  const headerRow = ["Hari", "Sesi", ...allRooms];
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
    const row = [hari, sesi];
    allRooms.forEach((room) => {
      const item = groupedData[timeSlot]?.[room];
      if (item) {
        const dosenTeamTeaching = getTeamTeachingLecturers(item);
        const namaMatkul = item.mata_kuliah_kelas?.nama_kelas || "-";
        row.push(
          `${namaMatkul} - ${
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
      "Semester",
      "Dosen",
      "Alasan",
    ]);
    unplaced.forEach((item) => {
      const dosenTeamTeaching = getTeamTeachingLecturers(item);
      const namaMatkul = item.mata_kuliah_kelas?.nama_kelas || "-";
      matrixData.push([
        item.kelas || "-",
        namaMatkul,
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
      (j) => j.dosen_sedia_hari === hari && j.dosen_sedia_sesi === sesi
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
</script>
