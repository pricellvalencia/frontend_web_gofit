<template>
  <br>
  
  <center>
    <q-card>
      <q-card-section>
        <q-item-label style="font-family: 'Courier New', Courier, monospace; font-size: 30px; font-weight: bold;">IJIN INSTRUKTUR</q-item-label>
      </q-card-section>
    </q-card>
  </center>
  
  <br>
  
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
            <th class="text-left" style="width: 2.5cm">INSTRUKTUR</th>
            <th class="text-left" style="width: 6.5cm">WAKTU IJIN</th>
            <th class="text-left" style="width: 4.5cm">TANGGAL KONFIRMASI</th>
            <th class="text-left" style="width: 3.5cm">STATUS</th>
            <th class="text-left" style="width: 6cm">KETERANGAN</th>
            <th class="text-left">ACTION</th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="n in 6" :key="n">
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
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
            <td class="text-left">
              <q-icon class="q-mr-md" name="edit" color="positive" size="sm" />
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
            @click="konfirmasiIjin(props.row)"
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
</template>

<style scoped>
.float-right {
  margin-right: 25px;
}
</style>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'IjinInstrukturComponent',
  setup() {
    const $q = useQuasar();

    const columns = [
      {
        name: 'id',
        required: false,
        label: 'ID',
        align: 'left',
        field: (row) => row.ID_IJIN_INSTRUKTUR,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'ijin_instruktur',
        required: false,
        label: 'INSTRUKTUR',
        align: 'left',
        field: (row) => row.NAMA_INSTRUKTUR,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'waktu',
        required: false,
        label: 'WAKTU IJIN',
        align: 'left',
        field: (row) => row.TANGGAL_IJIN,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'konfir',
        required: false,
        label: 'TANGGAL KONFIRMASI',
        align: 'left',
        field: (row) => row.TGL_KONFIRMASI,
        format: (val) => val ? `${val}` : '-',
        sortable: true,
      },
      {
        name: 'status',
        required: false,
        label: 'STATUS',
        align: 'left',
        field: (row) => row.STATUS_IJIN,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'ket',
        required: false,
        label: 'KETERANGAN',
        align: 'left',
        field: (row) => row.KETERANGAN,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'action',
        required: false,
        label: 'ACTION',
        align: 'left',
      },
    ]

    const rows = ref([]);

    const searchString = ref('');

    function getIjin() {
      rows.value = [];
      api.get('/api/ijin_instruktur', {
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
    
    function deleteData(ID_IJIN_INSTRUKTUR) {
      api.delete(
        '/api/ijin_instruktur/' + ID_IJIN_INSTRUKTUR,
        {},
        { withCredentials: true }
      )
      .then(() => {
        $q.notify({
          message: 'Successfully deleted data',
          color: 'positive',
          icon: 'check_circle',
          position: 'top-right',
        });
        getIjin();
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
        deleteData(user.ID_IJIN_INSTRUKTUR)
      })
    }

    function konfirmasi(ID_IJIN_INSTRUKTUR) {
      api.put(
        '/api/ijin_instruktur/' + ID_IJIN_INSTRUKTUR,
        { withCredentials: true }
      )
      .then(() => {
        $q.notify({
          message: 'Berhasil mengonfirmasi ijin',
          color: 'positive',
          icon: 'check_circle',
          position: 'top-right'
        })
        getIjin()
      })
      .catch(() => {
        $q.notify({
          message: 'Failed [!]',
          color: 'negative',
          icon: 'cancel',
          position: 'top-right'
        })
      })
    }
    
    function konfirmasiIjin(user) {
      $q.dialog({
        title: 'Confirm',
        message: 'Konfirmasi Ijin ?',
        cancel: true,
        persistent: true,
        ok: {
          color: 'positive',
          label: 'Konfirmasi'
        }
      }).onOk(() => {
        konfirmasi(user.ID_IJIN_INSTRUKTUR)
      })
    }
    
    onMounted(() => {
      getIjin();
    });

    return {
      columns,
      rows,
      deleteDataDialog,
      searchString,
      getIjin,
      konfirmasiIjin,
    };
  },
});
</script>