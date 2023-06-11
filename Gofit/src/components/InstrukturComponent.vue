<template>
  <br>
  
  <center>
    <q-card>
      <q-card-section>
        <q-item-label style="font-family: 'Courier New', Courier, monospace; font-size: 30px; font-weight: bold;">INSTRUKTUR</q-item-label>
      </q-card-section>
    </q-card>
  </center>

  <br>
  
  <div class="float-right">
    <q-btn color="green" icon="add" @click="showAddDialog"> INSTRUKTUR</q-btn>
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
            <th class="text-left" style="width: 2.5cm">NAMA</th>
            <th class="text-left" style="width: 6.5cm">ALAMAT</th>
            <th class="text-left" style="width: 4.5cm">TELEPON</th>
            <th class="text-left" style="width: 3.5cm">TANGGAL LAHIR</th>
            <th class="text-left" style="width: 6cm">USERNAME</th>
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
        <div class="text-h6 text-center">Add Instruktur</div>
      </q-card-section>

      <q-card-section >
        <q-form @submit.prevent="saveNewData" @reset="closeNewDialog" class="q-gutter-md">
          <q-input
            v-model="newData.NAMA_INSTRUKTUR.value"
            label="Nama Instruktur"
            outlined
            lazy-rules
            :rules="[(val) => val.length > 0 || 'Nama tidak boleh kosong']"
          ></q-input>

          <q-input
            v-model="newData.ALAMAT_INSTRUKTUR.value"
            type="textarea"
            label="Alamat"
            outlined
            lazy-rules
            :rules="[(val) => val.length > 0 || 'Alamat tidak boleh kosong']"
          ></q-input>

          <q-input
            v-model="newData.TELEPON_INSTRUKTUR.value"
            label="Telepon"
            outlined
            lazy-rules
            :rules="[(val) => val.length > 0 || 'Nomor telepon tidak boleh kosong']"
          ></q-input>

          <q-input outlined  v-model="newData.TANGGAL_LAHIR_INSTRUKTUR.value" mask="date" :rules="['date']" label="Tanggal Lahir ">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="newData.TANGGAL_LAHIR_INSTRUKTUR.value">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            v-model="newData.EMAIL_INSTRUKTUR.value"
            label="Email"
            outlined
            lazy-rules
            :rules="[(val) => val.length > 0 || 'Email tidak boleh kosong']"
          ></q-input>

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
                  dense outlined v-model="editData.ID_INSTRUKTUR.value"
                  label="ID"
                  disable
                  />
              </q-card-section>

              <q-card-section class="q-pb-none q-pt-lg">
                <q-input
                  dense outlined v-model="editData.NAMA_INSTRUKTUR.value"
                  label="Name"
                  :rules="[val => !!val || 'Nama tidak boleh kosong']" />
              </q-card-section>

              <q-card-section class="q-pb-none q-pt-sm">
                <q-input
                 dense type="textarea"
                 outlined v-model="editData.ALAMAT_INSTRUKTUR.value"
                 label="Alamat"
                :rules="[val => !!val || 'Alamat tidak boleh kosong']" />
              </q-card-section>

              <q-card-section class="q-pb-none q-pt-sm">
                <q-input
                 dense outlined v-model="editData.TELEPON_INSTRUKTUR.value"
                 label="Telepon"
                :rules="[val => !!val || 'Nomor telepon tidak boleh kosong']" />
              </q-card-section>

              <q-card-section class="q-pb-none q-pt-sm">
                <q-input dense outlined v-model="editData.TANGGAL_LAHIR_INSTRUKTUR.value" mask="date"
                    :rules="[val => !!val || 'Tanggal lahir tidak boleh kosong', 'date']"
                    label="Tanggal Lahir"
                  >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="editData.TANGGAL_LAHIR_INSTRUKTUR.value">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </q-card-section>

              <q-card-section class="q-pb-none q-pt-sm">
                <q-input
                 dense outlined v-model="editData.EMAIL_INSTRUKTUR.value"
                 label="Email"
                :rules="[val => !!val || 'Email tidak boleh kosong']" />
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
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'InstrukturComponent',
  setup() {
    const $q = useQuasar();

    const columns = [
      {
        name: 'id',
        required: false,
        label: 'ID',
        align: 'left',
        field: (row) => row.ID_INSTRUKTUR,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'nama',
        required: false,
        label: 'NAMA',
        align: 'left',
        field: (row) => row.NAMA_INSTRUKTUR,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'alamat',
        required: false,
        label: 'ALAMAT',
        align: 'left',
        field: (row) => row.ALAMAT_INSTRUKTUR,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'telepon',
        required: false,
        label: 'TELEPON',
        align: 'left',
        field: (row) => row.TELEPON_INSTRUKTUR,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'tanggal_lahir',
        required: false,
        label: 'TANGGAL LAHIR',
        align: 'left',
        field: (row) => row.TANGGAL_LAHIR_INSTRUKTUR,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'username',
        required: false,
        label: 'USERNAME',
        align: 'left',
        field: (row) => row.EMAIL_INSTRUKTUR,
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

    const rows = ref([]);

    const addDialog = ref(false);

    const editDialog = ref(false);

    const editData = {
      ID_INSTRUKTUR: ref(''),
      NAMA_INSTRUKTUR: ref(''),
      ALAMAT_INSTRUKTUR: ref(''),
      TELEPON_INSTRUKTUR: ref(''),
      TANGGAL_LAHIR_INSTRUKTUR: ref(''),
      EMAIL_INSTRUKTUR: ref(''),
      password_instruktur: ref(''),
      username: ref(''),
    };

    const newData = {
      ID_INSTRUKTUR: ref(''),
      NAMA_INSTRUKTUR: ref(''),
      TANGGAL_LAHIR_INSTRUKTUR: ref(''),
      ALAMAT_INSTRUKTUR: ref(''),
      TELEPON_INSTRUKTUR: ref(''),
      EMAIL_INSTRUKTUR: ref(''),
      password_instruktur: ref(''),
      username: ref(''),
    };

    const searchString = ref('');

    function getInstrukturs() {
      rows.value = [];
      api
        .get('/api/instruktur', {
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

    function showAddDialog() {
      $q.dialog({
        title: 'Confirm',
        message: 'Do you want to add new data ?',
        cancel: true,
        persistent: true,
        ok: {
          color: 'positive',
          label: 'Add'
        }
      }).onOk(() => {
        addDialog.value = true;
      })
    }

    function showEditDialog(user) {
      editDialog.value = true;
      editData.ID_INSTRUKTUR.value = user.ID_INSTRUKTUR;
      editData.NAMA_INSTRUKTUR.value = user.NAMA_INSTRUKTUR;
      editData.TANGGAL_LAHIR_INSTRUKTUR.value = user.TANGGAL_LAHIR_INSTRUKTUR.replace("-","/").replace("-","/");
      editData.ALAMAT_INSTRUKTUR.value = user.ALAMAT_INSTRUKTUR;
      editData.TELEPON_INSTRUKTUR.value = user.TELEPON_INSTRUKTUR;
      editData.EMAIL_INSTRUKTUR.value = user.EMAIL_INSTRUKTUR;
    }

    function closeEditDialog() {
      editDialog.value = false
      editData.ID_INSTRUKTUR.value = '';
      editData.NAMA_INSTRUKTUR.value = '';
      editData.TANGGAL_LAHIR_INSTRUKTUR.value = '';
      editData.ALAMAT_INSTRUKTUR.value = '';
      editData.TELEPON_INSTRUKTUR.value = '';
      editData.EMAIL_INSTRUKTUR.value = '';
    }

    function closeNewDialog() {
      addDialog.value = false;
      newData.ID_INSTRUKTUR.value = '';
      newData.NAMA_INSTRUKTUR.value = '';
      newData.TANGGAL_LAHIR_INSTRUKTUR.value = '';
      newData.ALAMAT_INSTRUKTUR.value = '';
      newData.TELEPON_INSTRUKTUR.value = '';
      newData.EMAIL_INSTRUKTUR.value = '';
    }

    function deleteData(ID_INSTRUKTUR) {
      api
        .delete(
          '/api/instruktur/' + ID_INSTRUKTUR,
          {
            // ID_INSTRUKTUR: ID_INSTRUKTUR,
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
          getInstrukturs();
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
        deleteData(user.ID_INSTRUKTUR)
      })
    }

    function saveNewData() {
      api
        .post(
          '/api/instruktur',
          {
            NAMA_INSTRUKTUR: newData.NAMA_INSTRUKTUR.value,
            TANGGAL_LAHIR_INSTRUKTUR: newData.TANGGAL_LAHIR_INSTRUKTUR.value,
            ALAMAT_INSTRUKTUR: newData.ALAMAT_INSTRUKTUR.value,
            TELEPON_INSTRUKTUR: newData.TELEPON_INSTRUKTUR.value,
            EMAIL_INSTRUKTUR: newData.EMAIL_INSTRUKTUR.value,
          },
          { withCredentials: true }
        )
        .then(() => {
          $q.notify({
            message: 'Successfully add Instruktur',
            color: 'positive',
            icon: 'check_circle',
            position: 'top-right',
          });
          getInstrukturs();
        })
        .catch(() => {
          $q.notify({
            message: 'Failed to add Instruktur',
            color: 'negative',
            icon: 'cancel',
            position: 'top-right',
          });
        });
      closeNewDialog();
    }

    function saveEditData() {
      $q.dialog({
        title: 'Confirm',
        message: 'Do you want to edit this data ?',
        cancel: true,
        persistent: true,
        ok: {
          color: 'positive',
          label: 'Edit'
        }
      }).onOk(() => {
        api.put('/api/instruktur/' + editData.ID_INSTRUKTUR.value,
          {
            NAMA_INSTRUKTUR: editData.NAMA_INSTRUKTUR.value,
            TANGGAL_LAHIR_INSTRUKTUR: editData.TANGGAL_LAHIR_INSTRUKTUR.value,
            ALAMAT_INSTRUKTUR: editData.ALAMAT_INSTRUKTUR.value,
            TELEPON_INSTRUKTUR: editData.TELEPON_INSTRUKTUR.value,
            EMAIL_INSTRUKTUR: editData.EMAIL_INSTRUKTUR.value,
          }, { withCredentials: true })
          .then(() => {
            $q.notify({
              message: 'Successfully update Instruktur',
              color: 'positive',
              icon: 'check_circle',
              position: 'top-right'
            })
            getInstrukturs()
          })
          .catch(() => {
            $q.notify({
              message: 'Failed to update Instruktur',
              color: 'negative',
              icon: 'cancel',
              position: 'top-right'
            })
          })
          closeEditDialog()
        })
      }

    onMounted(() => {
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
      closeNewDialog,
      saveNewData,
      searchString,
      getInstrukturs,
      showEditDialog,
      editDialog,
      closeEditDialog,
      saveEditData,
    };
  },
});
</script>