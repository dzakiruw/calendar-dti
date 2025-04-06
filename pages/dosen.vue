<template>
  <div class="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
    <h1 class="text-3xl font-bold flex items-center mb-8 text-center">
      <img src="/input-dosen.png" alt="Dosen Icon" class="w-14 h-14 mr-2" />
      Input Dosen
    </h1>

    <!-- Form + List -->
    <div class="flex flex-col sm:flex-row flex-wrap w-full max-w-6xl gap-6 justify-center">
      <!-- Dosen Input Form -->
      <form @submit.prevent="submitDosen" class="bg-white p-6 shadow-md rounded-lg w-full sm:w-96">
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Kode Dosen</label>
          <input v-model="kodeDosen" type="text" class="w-full mt-2 p-2 border rounded-lg" placeholder="D123" required />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Nama Dosen</label>
          <input v-model="namaDosen" type="text" class="w-full mt-2 p-2 border rounded-lg" placeholder="Dr. John Doe" required />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Level Dosen</label>
          <input v-model="levelDosen" type="number" class="w-full mt-2 p-2 border rounded-lg" placeholder="Level Dosen (angka)" required />
        </div>

        <!-- Ketersediaan Dosen -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Ketersediaan Dosen (Sesi)</label>
          <div class="overflow-auto">
            <table class="w-full text-sm text-center border border-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th class="border px-2 py-1">Sesi / Hari</th>
                  <th v-for="hari in hariList" :key="hari" class="border px-2 py-1">{{ hari }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, sesiIndex) in sesiList" :key="sesiIndex">
                  <td class="border font-semibold">Sesi {{ sesiIndex + 1 }}</td>
                  <td v-for="(col, hariIndex) in hariList" :key="hariIndex" class="border px-2 py-1">
                    <input type="checkbox" v-model="ketersediaan[sesiIndex][hariIndex]" class="w-4 h-4" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
          {{ editIndex !== null ? 'Update' : 'Submit' }}
        </button>
      </form>

      <!-- Dosen List -->
      <div class="flex-1 w-full sm:w-96 bg-white p-6 shadow-md rounded-lg mt-6 sm:mt-0">
        <h2 class="text-xl font-bold mb-4">
          <i class="fas fa-list-ul mr-2"></i> Daftar Dosen
        </h2>

        <!-- Empty State -->
        <div v-if="dosenList.length === 0" class="text-gray-500">
          Belum ada dosen yang diinputkan.
        </div>

        <!-- Dosen List -->
        <ul v-else class="space-y-4">
          <li
            v-for="(dosen, index) in dosenList"
            :key="index"
            class="bg-gray-100 p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <p class="font-bold text-base">{{ dosen.dosen_nama }}<br /><span class="text-sm font-normal">{{ dosen.dosen_kode }}</span></p>
              <p class="text-sm text-gray-600 mt-1">
                <span class="font-bold">Level:</span> {{ dosen.dosen_level }}<br />
                <span class="font-bold">Ketersediaan:</span>
              </p>
              <ul class="text-sm text-gray-600 list-disc ml-5 mt-1 space-y-0.5">
                <li
                  v-for="(result, sesiIndex) in getFilteredSessions(dosen.kesediaan)"
                  :key="sesiIndex"
                >
                  Sesi {{ result.sesi }}: {{ result.hari.join(', ') }}
                </li>
                <li
                  v-if="getFilteredSessions(dosen.kesediaan).length === 0"
                  class="italic text-gray-400 list-none"
                >
                  Tidak tersedia
                </li>
              </ul>
            </div>

            <div class="flex flex-col space-y-2 ml-4">
              <button @click="editDosen(index)" class="text-gray-600 hover:text-gray-900" title="Edit">
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button @click="deleteDosen(index)" class="text-red-600 hover:text-red-900" title="Hapus">
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

const hariList = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT']; // Hari sesuai dengan API
const sesiList = ['SATU', 'DUA', 'TIGA']; // Sesi sesuai dengan API

const kodeDosen = ref('');
const namaDosen = ref('');
const levelDosen = ref('');
const ketersediaan = ref([...Array(3)].map(() => Array(5).fill(false))); // Menyimpan ketersediaan dosen

const dosenList = ref([]);
const editIndex = ref(null);

// Fungsi untuk mendapatkan sesi yang difilter
const getFilteredSessions = (kesediaan) => {
  // Pastikan data kesediaan tidak kosong dan memiliki format yang sesuai
  if (!kesediaan || !Array.isArray(kesediaan)) {
    return []; // Jika kesediaan kosong atau tidak sesuai format, kembalikan array kosong
  }

  return kesediaan.map((sesi, index) => {
    return {
      sesi: sesiList[index],
      hari: sesi
        .map((available, hariIndex) => available ? hariList[hariIndex] : null)
        .filter(Boolean),
    };
  }).filter((session) => session.hari.length > 0);
};

onMounted(async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get('http://10.15.41.68:3000/dosen', {
      headers: {
        'Authorization': `Bearer ${token}`, // Menambahkan token ke header
      },
    });
    dosenList.value = response.data;
  } catch (error) {
    console.error('Gagal mengambil data dosen', error);
  }
});

const submitDosen = async () => {
  const newDosen = {
    dosen_kode: kodeDosen.value,
    dosen_nama: namaDosen.value,
    dosen_level: levelDosen.value,
    kesediaan: formatKetersediaan(ketersediaan.value), // Format kesediaan sesuai API
  };

  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;

    if (!token) {
      throw new Error('User is not authenticated');
    }

    if (editIndex.value !== null) {
      await axios.patch(`http://10.15.41.68:3000/dosen/${dosenList.value[editIndex.value].dosen_kode}`, newDosen, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      dosenList.value[editIndex.value] = newDosen;
    } else {
      const response = await axios.post('http://10.15.41.68:3000/dosen', newDosen, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      dosenList.value.push(response.data.data);
    }

    resetForm();
  } catch (error) {
    console.error('Gagal menambahkan data dosen', error);
  }
};

const formatKetersediaan = (ketersediaan) => {
  return ketersediaan.flatMap((sesi, sesiIndex) => {
    return sesi
      .map((available, hariIndex) => {
        if (available) {
          return {
            hari: hariList[hariIndex], 
            sesi: sesiList[sesiIndex], 
          };
        }
        return null;
      })
      .filter(Boolean); 
  });
};

const editDosen = (index) => {
  const dosen = dosenList.value[index];
  kodeDosen.value = dosen.dosen_kode;
  namaDosen.value = dosen.dosen_nama;
  levelDosen.value = dosen.dosen_level;
  ketersediaan.value = [...Array(3)].map(() => Array(5).fill(false)); 
  dosen.kesediaan.forEach(item => {
    const sesiIndex = sesiList.indexOf(item.sesi);
    const hariIndex = hariList.indexOf(item.hari);
    if (sesiIndex !== -1 && hariIndex !== -1) {
      ketersediaan.value[sesiIndex][hariIndex] = true;
    }
  });
  editIndex.value = index;
};

const deleteDosen = async (index) => {
  const dosenKode = dosenList.value[index].dosen_kode;
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;

    if (!token) {
      throw new Error('User is not authenticated');
    }

    await axios.delete(`http://10.15.41.68:3000/dosen/${dosenKode}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    dosenList.value.splice(index, 1);
  } catch (error) {
    console.error('Gagal menghapus data dosen', error);
  }
};

const resetForm = () => {
  kodeDosen.value = '';
  namaDosen.value = '';
  levelDosen.value = '';
  ketersediaan.value = [...Array(3)].map(() => Array(5).fill(false));
};
</script>
