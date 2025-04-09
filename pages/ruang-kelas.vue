<template>
  <div class="h-screen flex flex-col items-center justify-start bg-gray-50 p-6">
    <!-- Title with Image -->
    <div class="mb-6 w-full sm:w-auto">
      <h1 class="text-3xl font-bold flex items-center">
        <img src="/input-kelas.png" alt="Kelas Icon" class="inline-block w-16 h-16 mr-2" />
        Input Kelas
      </h1>
    </div>

    <!-- Layout for Form & List -->
    <div class="flex flex-col sm:flex-row w-full sm:w-auto gap-6">
      <!-- Input Form -->
      <form @submit.prevent="submitForm" class="bg-white p-6 shadow-md rounded-lg w-full sm:w-96 mb-6 sm:mb-0">
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Kode Ruangan</label>
          <input
            v-model="form.kodeRuangan"
            type="text"
            class="w-full mt-2 p-2 border rounded-lg"
            placeholder="Masukkan kode ruangan"
            required
            :readonly="editIndex !== null" 
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Kapasitas Ruangan</label>
          <input
            v-model="form.kapasitasRuangan"
            type="number"
            class="w-full mt-2 p-2 border rounded-lg"
            placeholder="Masukkan kapasitas ruangan"
            required
          />
        </div>

        <button
          type="submit"
          class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700"
        >
          {{ editIndex !== null ? 'Update' : 'Submit' }}
        </button>

        <!-- Cancel Edit Button -->
        <button 
          v-if="editIndex !== null"
          type="button"
          @click="cancelEdit"
          class="bg-gray-500 text-white py-2 px-4 rounded-lg w-full mt-2 hover:bg-gray-600"
        >
          Cancel Edit
        </button>
      </form>

      <!-- Daftar Ruang Kelas -->
      <div class="flex-1 bg-white p-6 shadow-md rounded-lg w-full sm:w-96">
        <h2 class="text-xl font-bold mb-4">
          <i class="fas fa-list-ul mr-2"></i> Daftar Ruang Kelas
        </h2>

        <div v-if="ruangKelasList.length === 0" class="text-gray-500">
          Belum ada data ruang kelas.
        </div>

        <ul v-else class="space-y-4">
          <li
            v-for="(ruangKelas, index) in ruangKelasList"
            :key="index"
            class="bg-gray-100 p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <p><strong>{{ ruangKelas.ruangan_kode }}</strong></p>
              <p class="text-sm text-gray-600">
                <span class="font-bold">Kapasitas:</span> {{ ruangKelas.ruangan_kapasitas }}
              </p>
            </div>
            <div class="flex space-x-4">
              <button @click="editRuangKelas(index)" class="text-gray-600 hover:text-gray-900">
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button @click="deleteRuangKelas(index)" class="text-red-600 hover:text-red-900">
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
import { ref, onMounted, nextTick } from 'vue';
import axios from 'axios';

// Reactive Variables
const form = ref({
  kodeRuangan: '',
  kapasitasRuangan: '',
});

const ruangKelasList = ref([]);
const editIndex = ref(null);

// Fetch Ruang Kelas Data from API
const fetchRuangKelas = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get('http://10.15.41.68:3000/ruangan', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    ruangKelasList.value = response.data;
  } catch (error) {
    console.error('Gagal mengambil data ruang kelas', error);
  }
};

// Submit Form (Add or Update)
const submitForm = async () => {
  const newRuangKelas = {
    ruangan_kode: form.value.kodeRuangan,
    ruangan_kapasitas: form.value.kapasitasRuangan,
  };

  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    if (editIndex.value !== null) {
      // Update Ruang Kelas
      const ruangKelasKode = ruangKelasList.value[editIndex.value].ruangan_kode;
      const response = await axios.put(`http://10.15.41.68:3000/ruangan/${ruangKelasKode}`, newRuangKelas, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Update the local list without needing to refetch
      ruangKelasList.value[editIndex.value] = response.data.data;

      resetForm();
      editIndex.value = null;
    } else {
      // Add New Ruang Kelas
      const response = await axios.post('http://10.15.41.68:3000/ruangan', newRuangKelas, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Add the newly created room directly to the list
      ruangKelasList.value.push(response.data.data);

      resetForm();
    }
  } catch (error) {
    console.error('Gagal mengirim data ruang kelas', error);
  }
};

// Edit Ruang Kelas
const editRuangKelas = async (index) => {
  const ruangKelas = ruangKelasList.value[index];

  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get(`http://10.15.41.68:3000/ruangan/${ruangKelas.ruangan_kode}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Wait for the DOM to update
    nextTick(() => {
      // Explicitly set the values to ensure the form is reactive
      form.value.kodeRuangan = response.data.ruangan_kode;
      form.value.kapasitasRuangan = response.data.ruangan_kapasitas;
      
      // Ensure form is updated and check the value
      console.log('Updated Form Value:', form.value);
      editIndex.value = index;
    });
  } catch (error) {
    console.error('Gagal mengambil data ruang kelas untuk edit', error);
  }
};

// Cancel Edit
const cancelEdit = () => {
  resetForm();
  editIndex.value = null;
};

// Delete Ruang Kelas
const deleteRuangKelas = async (index) => {
  const ruangKelasKode = ruangKelasList.value[index].ruangan_kode;
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    await axios.delete(`http://10.15.41.68:3000/ruangan/${ruangKelasKode}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Remove the deleted room directly from the local list
    ruangKelasList.value.splice(index, 1);
  } catch (error) {
    console.error('Gagal menghapus data ruang kelas', error);
  }
};

// Reset Form after submit
const resetForm = () => {
  form.value = {
    kodeRuangan: '',
    kapasitasRuangan: '',
  };
};

// Fetch ruang kelas data when component is mounted
onMounted(() => {
  fetchRuangKelas();
});
</script>
