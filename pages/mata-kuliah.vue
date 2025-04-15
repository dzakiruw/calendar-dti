<template>
  <div class="h-screen flex flex-col items-center justify-start bg-gray-50 p-6">
    <!-- Title -->
    <div class="mb-6 w-full sm:w-auto flex justify-center sm:justify-start">
      <h1 class="text-3xl font-bold flex items-center">
        <img src="/input-matkul.png" alt="Book Icon" class="inline-block w-14 h-14 mr-2" />
        Input Mata Kuliah
      </h1>
    </div>

    <!-- Mata Kuliah Form and Mata Kuliah List -->
    <div class="flex flex-col sm:flex-row w-full sm:w-auto gap-6">
      <!-- Mata Kuliah Form -->
      <form @submit.prevent="submitMataKuliah" class="bg-white p-6 shadow-md rounded-lg w-full sm:w-96 mb-6 sm:mb-0">
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Kode Mata Kuliah</label>
          <div v-if="editIndex !== null">
            <!-- Display as text when in edit mode -->
            <p class="text-gray-700"><strong>{{ kode }}</strong></p>
          </div>
          <div v-else>
            <!-- Input field for new mata kuliah -->
            <input type="text" v-model="kode" class="w-full mt-2 p-2 border rounded-lg" placeholder="ET234602" required />
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Nama Mata Kuliah</label>
          <input type="text" v-model="nama" class="w-full mt-2 p-2 border rounded-lg" placeholder="Capstone Project" required />
        </div>

        <!-- Jenis Mata Kuliah Selection -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Jenis Mata Kuliah</label>
          <select v-model="jenisMataKuliah" class="w-full mt-2 p-2 border rounded-lg" required>
            <option disabled value="">Pilih Jenis Mata Kuliah</option>
            <option value="DEPARTEMEN">Departemen</option>
            <option value="PENGAYAAN">Pengayaan</option>
          </select>
        </div>

        <!-- Pilih Kelas (Checkbox) -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Pilih Kelas</label>
          <div class="flex flex-wrap gap-4 mt-2">
            <label class="flex items-center">
              <input type="checkbox" v-model="kelas" value="A" class="mr-2" /> Kelas A
            </label>
            <label class="flex items-center">
              <input type="checkbox" v-model="kelas" value="B" class="mr-2" /> Kelas B
            </label>
            <label class="flex items-center">
              <input type="checkbox" v-model="kelas" value="C" class="mr-2" /> Kelas C
            </label>
            <label class="flex items-center">
              <input type="checkbox" v-model="kelas" value="D" class="mr-2" /> Kelas D
            </label>
          </div>
        </div>

        <!-- Submit and Cancel Buttons -->
        <div class="flex gap-4">
          <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
            {{ editIndex !== null ? 'Update' : 'Submit' }}
          </button>

          <!-- Cancel Edit Button -->
          <button 
            type="button" 
            @click="cancelEdit" 
            v-if="editIndex !== null" 
            class="bg-gray-600 text-white py-2 px-4 rounded-lg w-full hover:bg-gray-700">
            Cancel Edit
          </button>
        </div>
      </form>

      <!-- Daftar Mata Kuliah -->
      <div class="flex-1 w-full sm:w-96 bg-white p-6 shadow-md rounded-lg mt-6 sm:mt-0">
        <h2 class="text-xl font-bold mb-4">
          <i class="fas fa-list-ul mr-2"></i> Daftar Mata Kuliah
        </h2>

        <!-- Empty State -->
        <div v-if="mataKuliahList.length === 0" class="text-gray-500">
          Belum ada mata kuliah yang diinputkan.
        </div>

        <!-- Mata Kuliah List -->
        <ul v-else class="space-y-4">
          <li v-for="(mk, index) in mataKuliahList" :key="index" class="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p><strong>{{ mk.matkul_nama }}</strong><br>{{ mk.matkul_kode }}</p>
              <p class="text-sm text-gray-600">
                <span class="font-bold">Jenis:</span> {{ mk.matkul_tipe }}<br>
                <span class="font-bold">Kelas:</span> {{ mk.mata_kuliah_kelas.map(k => k.kelas_mk).join(", ") }}
              </p>
            </div>
            <div class="flex space-x-4">
              <button @click="editMataKuliah(index)" class="text-gray-600 hover:text-gray-900">
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button @click="deleteMataKuliah(index)" class="text-red-600 hover:text-red-900">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const kode = ref("");
const nama = ref("");
const jenisMataKuliah = ref("");
const kelasDipilih = ref([]);
const mataKuliahList = ref([]);
const editIndex = ref(null);

// Fetch Mata Kuliah Data from API
const fetchMataKuliah = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get('http://10.15.41.68:3000/mata_kuliah', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    mataKuliahList.value = response.data;
  } catch (error) {
    console.error('Gagal mengambil data mata kuliah', error);
  }
};

// Submit Mata Kuliah (Add or Update)
const submitMataKuliah = async () => {
  const newMataKuliah = () => ({
    matkul_kode: kode.value,
    matkul_nama: nama.value,
    matkul_tipe: jenisMataKuliah.value,
    kelas: kelasDipilih.value.map(k => ({ kelas_mk: k })),
  });

  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    if (editIndex.value !== null) {
      // Update Mata Kuliah
      const mataKuliahKode = mataKuliahList.value[editIndex.value].matkul_kode;
      await axios.patch(`http://10.15.41.68:3000/mata_kuliah/${mataKuliahKode}`, newMataKuliah, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // After update, fetch the list again to ensure consistency
      await fetchMataKuliah();
      resetForm();
      editIndex.value = null;
    } else {
      // Add New Mata Kuliah
      await axios.post('http://10.15.41.68:3000/mata_kuliah', newMataKuliah, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Fetch updated mata kuliah list
      await fetchMataKuliah();
      resetForm();
    }
  } catch (error) {
    console.error('Gagal mengirim data mata kuliah', error);
  }
};

// Edit Mata Kuliah
const editMataKuliah = (index) => {
  const mk = mataKuliahList.value[index];
  kode.value = mk.matkul_kode;
  nama.value = mk.matkul_nama;
  jenisMataKuliah.value = mk.matkul_tipe;
  kelas.value = mk.mata_kuliah_kelas.map(k => k.kelas_mk);
  editIndex.value = index;
};

// Cancel Edit
const cancelEdit = () => {
  resetForm();
  editIndex.value = null; // Reset to allow adding new mata kuliah
};

// Delete Mata Kuliah
const deleteMataKuliah = async (index) => {
  if (!confirm('Yakin ingin menghapus mata kuliah ini?')) return;
  const mataKuliahKode = mataKuliahList.value[index].matkul_kode;
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    await axios.delete(`http://10.15.41.68:3000/mata_kuliah/${mataKuliahKode}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    mataKuliahList.value.splice(index, 1);
  } catch (error) {
    console.error('Gagal menghapus data mata kuliah', error);
  }
};

// Reset Form after submit
const resetForm = () => {
  kode.value = "";
  nama.value = "";
  jenisMataKuliah.value = "";
  kelas.value = [];
};

// Fetch mata kuliah data when component is mounted
onMounted(() => {
  fetchMataKuliah();
});
</script>
