<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8"
  >
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
          <ul class="space-y-3">
            <li
              v-for="mk in mataKuliahList"
              :key="mk.matkul_kode"
              class="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
            >
              <p class="font-semibold text-gray-800">{{ mk.matkul_nama }}</p>
              <p class="text-sm text-gray-600">{{ mk.matkul_kode }}</p>
            </li>
          </ul>
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
          <ul class="space-y-3">
            <li
              v-for="dosen in dosenList"
              :key="dosen.dosen_kode"
              class="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
            >
              <p class="font-semibold text-gray-800">{{ dosen.dosen_nama }}</p>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-sm text-gray-600">{{
                  dosen.dosen_kode
                }}</span>
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
          <ul class="space-y-3">
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
          <ul class="space-y-3">
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
                {{ match.kelas.nama_kelas }}
              </p>
              <p class="text-sm text-gray-600 mt-1">
                {{ match.dosen.dosen_nama }}
              </p>
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
      <div class="flex justify-end mb-4">
        <button
          @click="exportExcel"
          class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
        >
          <i class="fas fa-file-excel mr-2"></i> Export ke Excel
        </button>
      </div>
      <div
        class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-100">
                <th
                  class="px-6 py-4 text-left text-sm font-semibold text-gray-700 sticky left-0 bg-gray-50"
                >
                  Hari
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-semibold text-gray-700 sticky left-[140px] bg-gray-50"
                >
                  Sesi
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-semibold text-gray-700"
                >
                  Kelas
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-semibold text-gray-700"
                >
                  Semester
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-semibold text-gray-700"
                >
                  Dosen
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-semibold text-gray-700"
                >
                  Ruangan
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="(row, index) in jadwalGenerated"
                :key="index"
                class="hover:bg-blue-50 transition-colors duration-200"
              >
                <td
                  class="px-6 py-4 text-sm text-gray-700 sticky left-0 bg-white"
                >
                  {{ row.hari }}
                </td>
                <td
                  class="px-6 py-4 text-sm text-gray-700 sticky left-[140px] bg-white"
                >
                  {{ row.sesi }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">{{ row.kelas }}</td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  <span
                    v-for="(sem, idx) in row.semester || row.mk_kelas_sem || []"
                    :key="idx"
                    class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium mr-1"
                  >
                    Semester {{ sem }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  <span v-if="Array.isArray(row.dosen)">
                    {{ row.dosen.map((d) => d.dosen_kode || d).join(" & ") }}
                  </span>
                  <span v-else>
                    {{ row.dosen?.dosen_kode || row.dosen }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  {{ row.ruangan }}
                </td>
              </tr>
            </tbody>
          </table>
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
      "http://localhost:5000/mata_kuliah",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    mataKuliahList.value = mataKuliahResponse.data;

    // Fetch Ruang Kelas
    const ruangKelasResponse = await axios.get(
      "http://localhost:5000/ruangan",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    ruangKelasList.value = ruangKelasResponse.data;

    // Fetch Dosen
    const dosenResponse = await axios.get("http://localhost:5000/dosen", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dosenList.value = dosenResponse.data;

    // Fetch Jadwal Hindari
    const jadwalHindariResponse = await axios.get(
      "http://localhost:5000/jadwal_hindari",
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
    const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
    if (!token) throw new Error("User is not authenticated");

    const response = await axios.get("http://localhost:5000/mk_dosen", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Ensure the response data is properly handled
    if (response.data && Array.isArray(response.data)) {
      matchingList.value = response.data.map((match) => ({
        id_mk_kelas_dosen: match.id_mk_kelas_dosen,
        kelas: match.mata_kuliah_kelas,
        dosen: match.dosen,
      }));
    } else {
      matchingList.value = [];
      console.error("Invalid matching data format received.");
    }
  } catch (error) {
    console.error("Gagal mengambil data matching", error);
  }
};

onMounted(() => {
  fetchData();
  fetchMatchingData();
});

// Tambahan helper untuk format nama dosen
function formatDosenNames(dosen) {
  if (!dosen) return "-";
  const array = Array.isArray(dosen) ? dosen : [dosen];
  return array.map((d) => d.dosen_kode || d).join(" & ");
}

const generateJadwal = async () => {
  try {
    isGenerating.value = true;
    const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
    if (!token) throw new Error("User is not authenticated");

    const [mkDosenResponse, ruanganResponse, jadwalHindariResponse] =
      await Promise.all([
        axios.get("http://10.15.41.68:3000/mk_dosen", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://10.15.41.68:3000/ruangan", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://10.15.41.68:3000/jadwal_hindari", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

    const mkDosen = mkDosenResponse.data;
    const ruangan = ruanganResponse.data;
    const jadwalHindariData = jadwalHindariResponse.data;

    const blockedSlots = new Set();
    jadwalHindariData.forEach((jh) => {
      (jh.hindari_smt || []).forEach((sem) => {
        blockedSlots.add(`${jh.hindari_hari}|${jh.hindari_sesi}|${sem}`);
      });
    });

    const groupedByKelas = {};
    for (const item of mkDosen) {
      const id = item.id_mk_kelas;
      if (!groupedByKelas[id]) groupedByKelas[id] = [];
      groupedByKelas[id].push(item);
    }

    const mergedGroup = Object.values(groupedByKelas).map((group) => {
      const merged = { ...group[0] };
      merged.dosen = group.flatMap((g) =>
        Array.isArray(g.dosen) ? g.dosen : [g.dosen]
      );
      merged._dosen_nama_joined = formatDosenNames(merged.dosen);
      merged.kelas = group[0].mata_kuliah_kelas?.nama_kelas || "-";
      return merged;
    });

    const sortedGroup = mergedGroup.sort((a, b) => {
      const aIsSolo = Array.isArray(a.dosen) && a.dosen.length === 1;
      const bIsSolo = Array.isArray(b.dosen) && b.dosen.length === 1;

      const aD = Array.isArray(a.dosen) ? a.dosen[0] : a.dosen;
      const bD = Array.isArray(b.dosen) ? b.dosen[0] : b.dosen;

      const aJadwal =
        dosenList.value.find((d) => d.dosen_kode === (aD?.dosen_kode || aD))
          ?.jadwal_dosen || [];
      const bJadwal =
        dosenList.value.find((d) => d.dosen_kode === (bD?.dosen_kode || bD))
          ?.jadwal_dosen || [];

      if (aIsSolo && bIsSolo) return aJadwal.length - bJadwal.length;
      if (aIsSolo) return -1;
      if (bIsSolo) return 1;

      return getPrioritas(a.dosen) - getPrioritas(b.dosen);
    });

    const finalJadwal = [];
    const usedSlots = new Map();
    const semesterKelasSlots = new Set();
    const dosenSlotMap = new Set();
    const slotToItemMap = new Map();
    const semesterKelasLabelSet = new Set();
    const kelasTerjadwal = new Set(); // prevent duplicate jadwal for same kelas (team teaching)

    function getPrioritas(dosen) {
      if (Array.isArray(dosen))
        return Math.min(...dosen.map((d) => d.dosen_prioritas ?? 99));
      return dosen?.dosen_prioritas ?? 99;
    }

    function extractDosen(item) {
      return Array.isArray(item.dosen)
        ? item.dosen.map((d) => d.dosen_kode || d)
        : [item.dosen?.dosen_kode || item.dosen];
    }

    function extractSemester(item) {
      return Array.isArray(item.mk_kelas_sem)
        ? item.mk_kelas_sem
        : [item.mk_kelas_sem];
    }

    function getAvailableSlots(item) {
      const dosenArray = extractDosen(item);
      const slots = [];

      for (const hari of hariList) {
        for (const sesi of sesiList) {
          if (
            item.matkul_tipe === "PENGAYAAN" &&
            !(hari === "JUMAT" && sesi === "TIGA")
          )
            continue;

          const allAvailable = dosenArray.every((dk) => {
            const d = dosenList.value.find((dd) => dd.dosen_kode === dk);
            return d?.jadwal_dosen?.some(
              (j) => j.dosen_sedia_hari === hari && j.dosen_sedia_sesi === sesi
            );
          });
          if (!allAvailable) continue;

          slots.push({ hari, sesi });
        }
      }

      return shuffleArray(slots);
    }

    function placeItem(
      slotKey,
      item,
      hari,
      sesi,
      ruang,
      semesters,
      dosenArray,
      kelasLabel
    ) {
      const jadwalItem = {
        ...item,
        hari,
        sesi,
        ruangan: ruang.ruangan_kode,
        ruangan_kapasitas: ruang.ruangan_kapasitas,
      };
      usedSlots.set(slotKey, jadwalItem);
      slotToItemMap.set(slotKey, jadwalItem);
      semesters.forEach((sem) => {
        semesterKelasSlots.add(`${sem}|${kelasLabel}|${hari}|${sesi}`);
        semesterKelasLabelSet.add(`${sem}|${hari}|${sesi}`);
      });
      dosenArray.forEach((d) => dosenSlotMap.add(`${d}|${hari}|${sesi}`));
      finalJadwal.push(jadwalItem);
      kelasTerjadwal.add(item.id_mk_kelas);
    }

    function unplaceItem(slotKey, item, semesters, dosenArray, kelasLabel) {
      usedSlots.delete(slotKey);
      slotToItemMap.delete(slotKey);
      semesters.forEach((sem) => {
        semesterKelasSlots.delete(
          `${sem}|${kelasLabel}|${item.hari}|${item.sesi}`
        );
        semesterKelasLabelSet.delete(`${sem}|${item.hari}|${item.sesi}`);
      });
      dosenArray.forEach((d) =>
        dosenSlotMap.delete(`${d}|${item.hari}|${item.sesi}`)
      );
      const idx = finalJadwal.findIndex(
        (f) => f.id_mk_kelas_dosen === item.id_mk_kelas_dosen
      );
      if (idx !== -1) finalJadwal.splice(idx, 1);
      kelasTerjadwal.delete(item.id_mk_kelas);
    }

    function tryReassign(slotKey, item) {
      const existing = slotToItemMap.get(slotKey);
      if (!existing) return false;
      if (getPrioritas(item.dosen) >= getPrioritas(existing.dosen))
        return false;

      const altSlots = getAvailableSlots(existing);
      const existingDosen = extractDosen(existing);
      const existingSem = extractSemester(existing);
      const kelasLabel = idToLabelMap[existing.id_mk_kelas] || "-";

      for (const { hari, sesi } of altSlots) {
        if (
          existingSem.some((sem) => blockedSlots.has(`${hari}|${sesi}|${sem}`))
        )
          continue;

        for (const ruang of ruangan) {
          const newKey = `${hari}|${sesi}|${ruang.ruangan_kode}`;
          const semKey = existingSem.map(
            (sem) => `${sem}|${kelasLabel}|${hari}|${sesi}`
          );
          const bentrok =
            semKey.some((k) => semesterKelasSlots.has(k)) ||
            existingDosen.some((d) =>
              dosenSlotMap.has(`${d}|${hari}|${sesi}`)
            ) ||
            existingSem.some((sem) =>
              semesterKelasLabelSet.has(`${sem}|${hari}|${sesi}`)
            );

          if (bentrok || usedSlots.has(newKey)) continue;

          unplaceItem(
            slotKey,
            existing,
            existingSem,
            existingDosen,
            kelasLabel
          );
          placeItem(
            newKey,
            existing,
            hari,
            sesi,
            ruang,
            existingSem,
            existingDosen,
            kelasLabel
          );
          return true;
        }
      }

      return false;
    }

    for (const item of sortedGroup) {
      if (kelasTerjadwal.has(item.id_mk_kelas)) continue; // skip team-teaching duplikat

      const semesters = extractSemester(item);
      const dosenArray = extractDosen(item);
      const kelasLabel = idToLabelMap[item.id_mk_kelas] || "-";
      let placed = false;

      const idealSlots = getAvailableSlots(item);
      for (const { hari, sesi } of idealSlots) {
        if (semesters.some((sem) => blockedSlots.has(`${hari}|${sesi}|${sem}`)))
          continue;

        for (const ruang of ruangan) {
          const slotKey = `${hari}|${sesi}|${ruang.ruangan_kode}`;
          const semKey = semesters.map(
            (sem) => `${sem}|${kelasLabel}|${hari}|${sesi}`
          );
          const bentrok =
            semKey.some((k) => semesterKelasSlots.has(k)) ||
            semesters.some((sem) =>
              semesterKelasLabelSet.has(`${sem}|${hari}|${sesi}`)
            ) ||
            dosenArray.some((d) => dosenSlotMap.has(`${d}|${hari}|${sesi}`));

          if (!usedSlots.has(slotKey) && !bentrok) {
            placeItem(
              slotKey,
              item,
              hari,
              sesi,
              ruang,
              semesters,
              dosenArray,
              kelasLabel
            );
            placed = true;
            break;
          }

          if (usedSlots.has(slotKey)) {
            const reassignable = tryReassign(slotKey, item);
            if (reassignable) {
              placeItem(
                slotKey,
                item,
                hari,
                sesi,
                ruang,
                semesters,
                dosenArray,
                kelasLabel
              );
              placed = true;
              break;
            }
          }
        }
        if (placed) break;
      }

      if (!placed) {
        for (const hari of shuffleArray(hariList)) {
          for (const sesi of shuffleArray(sesiList)) {
            if (
              item.matkul_tipe === "PENGAYAAN" &&
              !(hari === "JUMAT" && sesi === "TIGA")
            )
              continue;
            if (
              semesters.some((sem) =>
                blockedSlots.has(`${hari}|${sesi}|${sem}`)
              )
            )
              continue;

            for (const ruang of shuffleArray(ruangan)) {
              const slotKey = `${hari}|${sesi}|${ruang.ruangan_kode}`;
              placeItem(
                slotKey,
                item,
                hari,
                sesi,
                ruang,
                semesters,
                dosenArray,
                kelasLabel
              );
              placed = true;
              break;
            }
            if (placed) break;
          }
          if (placed) break;
        }
      }
    }

    jadwalGenerated.value = finalJadwal;
    showSuccessAlert("Jadwal berhasil digenerate!");
  } catch (err) {
    console.error("Final error:", err);
    alertMessage.value = "Terjadi kesalahan saat generate jadwal.";
    showAlert.value = true;
  } finally {
    isGenerating.value = false;
  }
};

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Function to export jadwal to Excel
const exportExcel = () => {
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

  const groupedData = {};
  jadwalGenerated.value.forEach((item) => {
    const key = `${item.hari}|${item.sesi}`;
    if (!groupedData[key]) groupedData[key] = {};
    groupedData[key][item.ruangan] = `${
      item.kelas || item.mata_kuliah_kelas?.nama_kelas || "-"
    } - ${item._dosen_nama_joined || "-"} (Semester ${(
      item.semester ||
      item.mk_kelas_sem || ["-"]
    ).join(", ")})`;
  });

  allTimeSlots.forEach((timeSlot) => {
    const [hari, sesi] = timeSlot.split("|");
    const row = [hari, sesi];
    allRooms.forEach((room) => {
      const classData = groupedData[timeSlot]?.[room] || "";
      row.push(classData);
    });
    matrixData.push(row);
  });

  const worksheet = XLSX.utils.aoa_to_sheet(matrixData);
  const colWidths = [
    { wch: 15 },
    { wch: 15 },
    ...allRooms.map(() => ({ wch: 50 })),
  ];
  worksheet["!cols"] = colWidths;
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Jadwal");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, "jadwal.xlsx");
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
</script>
