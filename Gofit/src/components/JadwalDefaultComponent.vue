<template>
  <br>
  
  <center>
    <q-card>
      <q-card-section>
        <q-item-label style="font-family: 'Courier New', Courier, monospace; font-size: 30px; font-weight: bold;">JADWAL DEFAULT</q-item-label>
      </q-card-section>
    </q-card>
  </center>
  
  <br>
  
  <div class="float-right">
    <q-btn color="green" icon="add" @click="showAddDialog"> JADWAL DEFAULT</q-btn>
  </div>
  
  <br>
  <br>
  <br>
  
  <div class="q-px-md">
    <div
    class="no-margin"
    :style="rows.length == 0 ? 'display: block' : 'display: none'"
    >
      <q-markup-table>
        <thead>
          <tr>
            <th class="no-border" colspan="5">
              <div class="row q-my-mb float-right">
                <q-input outlined dense v-model="searchString" label="Search..">
                  <template v-slot:append>
                    <q-icon
                    v-if="searchString !== ''"
                    name="close"
                    @click="searchString = ''"
                    class="cursor-pointer"
                    ></q-icon>
                    
                    <q-icon name="search"></q-icon>
                  </template>
                </q-input>
                
                <q-space></q-space>
              </div>
            </th>
          </tr>
          
          <tr>
            <th class="text-left" style="width: 0.5cm">ID</th>
            <th class="text-left" style="width: 2.5cm">NAMA INSTRUKTUR</th>
            <th class="text-left" style="width: 6.5cm">NAMA KELAS</th>
            <th class="text-left" style="width: 4.5cm">SESI</th>
            <th class="text-left" style="width: 3.5cm">HARI</th>
            <th class="text-left">ACTION</th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="n in 5" :key="n">
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="20px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="50px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="35px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="65px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="25px" />
            </td>
            <td class="text-left">
              <q-icon name="print" color="gray" size="sm" />
              <q-icon name="delete" color="negative" size="sm" />
            </td>
          </tr>
          
          <tr>
            <td class="text-right">
              <q-icon
              class="q-mr-md"
              name="navigate_before"
              color="grey"
              size="sm"
              />
              
              <q-icon
              class="q-mr-xs"
              name="navigate_next"
              color="grey"
              size="sm"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    
    <q-table
    :filter="searchString"
    :rows="rows"
    :columns="columns"
    row-key="id"
    :rows-per-page-options="[5]"
    :style="rows.length == 0 ? 'display: none' : 'display: block'"
    >
      <template v-slot:top>
        <q-input outlined dense v-model="searchString" label="Search...">
          <template v-slot:append>
            <q-icon
            v-if="searchString !== ''"
            name="close"
            @click="searchString = ''"
            class="cursor-pointer"
            ></q-icon>
            
            <q-icon name="search"></q-icon>
          </template>
        </q-input>
        
        <q-space></q-space>
      </template>
      
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn
          flat
          round
          color="positive"
          icon="edit"
          @click="showEditDialog(props.row)"
          ></q-btn>
          
          <q-btn
          flat
          round
          color="negative"
          icon="delete"
          @click="deleteDataDialog(props.row)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
  
  <q-dialog v-model="addDialog" persistent>
    <q-card style="min-width: 14cm">
      <q-card-section class="q-pb-none">
        <div class="text-h6 text-center">Add Jadwal Default</div>
      </q-card-section>
      
      <q-card-section >
        <q-form @submit.prevent="saveAddData" @reset="closeAddDialog" class="q-gutter-md">
          <q-select
            v-model="newData.ID_INSTRUKTUR.value"
            outlined
            :options="instrukturs"
            label="- Select Instruktur -"
            option-label="NAMA_INSTRUKTUR"
            option-value="ID_INSTRUKTUR"
          ></q-select>
          
          <q-select
            v-model="newData.ID_KELAS.value"
            outlined
            :options="kelas"
            label="- Select Kelas -"
            option-label="NAMA_KELAS"
            option-value="ID_KELAS"
          ></q-select>
          
          <q-select
            v-model="newData.SESI_JADWAL_DEFAULT.value"
            outlined
            :options="['08:00', '09:30' ,'11:00' ,'12:30' ,'14:00','15:30' ,'17:00' ,'18:30']"
            label="- Pilih Sesi -"
          ></q-select>
          
          <q-select
            v-model="newData.HARI_JADWAL_DEFAULT.value"
            outlined
            :options="['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']"
            label="- Pilih Hari -"
          ></q-select>
          
          <div class="row float-right q-mp-t">
            <q-btn
            class="q-mb-md q-ml-sm q-mr-md"
            label="Cancel"
            type="reset"
            color="primary"
            flat
            ></q-btn>
            
            <q-btn class="q-mb-md" label="Save" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  
  <q-dialog v-model="editDialog" persistent>
    <q-card style="min-width: 14cm;">
      <q-form @submit.prevent="saveEditData" @reset="closeEditDialog" class="q-gutter-md">
        <q-card-section class="q-pb-none">
          <div class="text-h6 text-center">Edit Instruktur</div>
        </q-card-section>
        
        <div class="row">
          <div class="col">
            <q-card-section class="q-pb-xs">
              <q-input
              outlined 
              v-model="editData.ID_JADWAL_DEFAULT.value"
              label="ID"
              disable
              />
            </q-card-section>
            
            <q-card-section class="q-pb-none q-pt-lg">
              <q-select
                v-model="editData.ID_INSTRUKTUR.value"
                outlined
                :options="instrukturs"
                label="- Select Instruktur -"
                option-label="NAMA_INSTRUKTUR"
                option-value="ID_INSTRUKTUR"
                mode="display"
              ></q-select>
            </q-card-section>
            
            
            <q-card-section class="q-pb-none q-pt-lg">
              <q-select
                v-model="editData.ID_KELAS.value"
                outlined
                :options="kelas"
                label="- Select Kelas -"
                option-label="NAMA_KELAS"
                option-value="ID_KELAS"
              ></q-select>
            </q-card-section>
            
            <q-card-section class="q-pb-none q-pt-lg">
              <q-select
                v-model="editData.SESI_JADWAL_DEFAULT.value"
                outlined
                :options="['08:00', '09:30' ,'11:00' ,'12:30' ,'14:00','15:30' ,'17:00' ,'18:30']"
                label="- Pilih Sesi -"
              ></q-select>
            </q-card-section>
            
            <q-card-section class="q-pb-none q-pt-lg">
              <q-select
                v-model="editData.HARI_JADWAL_DEFAULT.value"
                outlined
                :options="['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']"
                label="- Pilih Hari -"
              ></q-select>
            </q-card-section>
          </div>
        </div>
        
        <q-card-section>
          <div class="row justify-end">
            <q-btn class="q-mr-sm" label="Cancel" color="primary" flat @click="closeEditDialog()" />
            <q-btn type="submit" label="Save" color="primary" />
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>
  
<style scoped>
.float-right {
  margin-right: 25px;
}
</style>
  
<script>
import { defineComponent, onMounted, ref } from 'vue';
import axios, { api } from 'boot/axios';
import { useQuasar, QSelect } from 'quasar';


export default defineComponent({
  name: 'JadwalDefaultComponent',
  setup() {
    const $q = useQuasar();
    
    const columns = [
      {
        name: 'id',
        required: false,
        label: 'ID',
        align: 'left',
        field: (row) => row.ID_JADWAL_DEFAULT,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'namaInstruktur',
        required: false,
        label: 'NAMA INSTRUKTUR',
        align: 'left',
        field: (row) => row.NAMA_INSTRUKTUR,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'namaKelas',
        required: false,
        label: 'NAMA KELAS',
        align: 'left',
        field: (row) => row.NAMA_KELAS,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'sesi',
        required: false,
        label: 'SESI',
        align: 'left',
        field: (row) => row.SESI_JADWAL_DEFAULT,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'hari',
        required: false,
        label: 'HARI',
        align: 'left',
        field: (row) => row.HARI_JADWAL_DEFAULT,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'action',
        required: false,
        label: 'ACTION',
        align: 'left',
      },
    ];
    
    const kelas = ref([]);
    function getKelas() {
      kelas.value = []
      api.get('/api/kelas',{
        withCredentials: true,
      })
      .then((response) => {
        kelas.value = response.data.data;
      })
    }
    const instrukturs = ref([]);
    function getInstrukturs() {
      instrukturs.value = []
      api.get('/api/instruktur',{
        withCredentials: true,
      })
      .then((response) => {
        instrukturs.value = response.data.data;
      })
    }
    
    const rows = ref([]);
    
    const addDialog = ref(false);
    
    const editDialog = ref(false);
    
    const editData = {
      ID_JADWAL_DEFAULT: ref(''),
      ID_INSTRUKTUR: ref(''),
      ID_KELAS: ref(''),
      SESI_JADWAL_DEFAULT: ref(''),
      HARI_JADWAL_DEFAULT: ref(''),
    };
    
    const newData = {
      ID_INSTRUKTUR: ref(null),
      ID_KELAS: ref(null),
      SESI_JADWAL_DEFAULT: ref(''),
      HARI_JADWAL_DEFAULT: ref(''),
    };
    
    const searchString = ref('');
    
    function getJadwalDefault() {
      rows.value = [];
      api
      .get('/api/jadwal_default', {
        withCredentials: true,
      })
      .then((response) => {
        rows.value = response.data.data;
      })
      .catch(() => {
        $q.notify({
          message: 'Failed to load data[!]',
          color: 'negative',
          position: 'top-right',
        });
      });
    }
    
    function showEditDialog(user) {
      editDialog.value = true;
      editData.ID_JADWAL_DEFAULT.value = user.ID_JADWAL_DEFAULT;
      editData.ID_INSTRUKTUR.value = user.ID_INSTRUKTUR;
      editData.ID_KELAS.value = user.ID_KELAS;
      editData.SESI_JADWAL_DEFAULT.value = user.SESI_JADWAL_DEFAULT;
      editData.HARI_JADWAL_DEFAULT.value = user.HARI_JADWAL_DEFAULT;
    }
    
    function closeEditDialog() {
      editDialog.value = false
      editData.ID_JADWAL_DEFAULT.value = '';
      editData.ID_INSTRUKTUR.value = '';
      editData.ID_KELAS.value = '';
      editData.SESI_JADWAL_DEFAULT.value = '';
      editData.HARI_JADWAL_DEFAULT.value = '';
    }
    
    function showAddDialog() {
      addDialog.value = true;
    }
    
    function closeAddDialog() {
      addDialog.value = false;
      newData.ID_INSTRUKTUR.value = '';
      newData.ID_KELAS.value = '';
      newData.SESI_JADWAL_DEFAULT.value = '';
      newData.HARI_JADWAL_DEFAULT.value = '';
    }
    
    function deleteData(ID_JADWAL_DEFAULT) {
      api.delete(
        '/api/jadwal_default/' + ID_JADWAL_DEFAULT,
        {
          // ID_JADWAL_DEFAULT: ID_JADWAL_DEFAULT,
        },
        { withCredentials: true }
      )
      .then(() => {
        $q.notify({
          message: 'Successfully deleted data',
          color: 'positive',
          icon: 'check_circle',
          position: 'top-right',
        });
        getJadwalDefault();
      })
      .catch(() => {
        $q.notify({
          message: 'Failed to delete data[!]',
          color: 'negative',
          icon: 'cancel',
          position: 'top-right',
        });
      });
    }
    
    function deleteDataDialog(user) {
      $q.dialog({
        title: 'Confirm',
        message: 'Do you want to delete this data ?',
        cancel: true,
        persistent: true,
        ok: {
          color: 'negative',
          label: 'Delete'
        }
      }).onOk(() => {
        deleteData(user.ID_JADWAL_DEFAULT)
      })
    }
    
    function saveAddData() {
      api.post('/api/jadwal_default',
        {
          ID_INSTRUKTUR: newData.ID_INSTRUKTUR.value.ID_INSTRUKTUR,
          ID_KELAS: newData.ID_KELAS.value.ID_KELAS,
          SESI_JADWAL_DEFAULT: newData.SESI_JADWAL_DEFAULT.value,
          HARI_JADWAL_DEFAULT: newData.HARI_JADWAL_DEFAULT.value,
        },
        { withCredentials: true }
      )
      .then(() => {
        $q.notify({
          message: 'Successfully add Jadwal Default',
          color: 'positive',
          icon: 'check_circle',
          position: 'top-right',
        });
        getJadwalDefault();
      })
      .catch(() => {
        $q.notify({
          message: 'Jadwal bertabrakan dengan jadwal yang sudah',
          color: 'negative',
          icon: 'cancel',
          position: 'top-right',
        });
      });
      closeAddDialog();
    }
    
    function saveEditData() {
      api.put('/api/jadwal_default/' + editData.ID_JADWAL_DEFAULT.value,
      {
        ID_INSTRUKTUR: editData.ID_INSTRUKTUR.value,
        ID_KELAS: editData.ID_KELAS.value,
        SESI_JADWAL_DEFAULT: editData.SESI_JADWAL_DEFAULT.value,
        HARI_JADWAL_DEFAULT: editData.HARI_JADWAL_DEFAULT.value,
      }, { withCredentials: true })
      .then(() => {
        $q.notify({
          message: 'Successfully update Jadwal Default',
          color: 'positive',
          icon: 'check_circle',
          position: 'top-right'
        })
        getJadwalDefault()
      })
      .catch(() => {
        $q.notify({
          message: 'Failed to update Jadwal Default',
          color: 'negative',
          icon: 'cancel',
          position: 'top-right'
        })
      })
      closeEditDialog()
    }
    
    onMounted(() => {
      getJadwalDefault();
      getKelas();
      getInstrukturs();
    });
    
    return {
      columns,
      rows,
      deleteDataDialog,
      newData,
      addDialog,
      showAddDialog,
      editData,
      closeAddDialog,
      saveAddData,
      searchString,
      getJadwalDefault,
      kelas,
      getKelas,
      instrukturs,
      getInstrukturs,
      showEditDialog,
      editDialog,
      closeEditDialog,
      saveEditData,
    };
  },
});
</script>