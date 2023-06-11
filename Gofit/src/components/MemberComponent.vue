<template>
  <br>
  
  <center>
    <q-card>
      <q-card-section>
        <q-item-label style="font-family: 'Courier New', Courier, monospace; font-size: 30px; font-weight: bold;">MEMBER</q-item-label>
      </q-card-section>
    </q-card>
  </center>
  
  <br>
  
  <div>
    <div class="float-left">
      <q-btn color="info" @click="showExp">Expired Member</q-btn>

      <q-btn color="warning" @click="deactiveMember" class="q-ml-md">Deactive Member</q-btn>
    </div>

    <div class="float-right">
      <q-btn color="green" icon="add" @click="showAddDialog"> MEMBER</q-btn>
    </div>
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
            <th class="text-left" style="width: 6cm">EMAIL</th>
            <th class="text-left" style="width: 6cm">STATUS</th>
            <th class="text-left">ACTION</th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="n in 7" :key="n">
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
            color="gold"
            icon="key"
            class="text-gold"
            @click="reset(props.row)"
          ></q-btn>
          
          <q-btn
            flat
            round
            color="gray"
            icon="print"
            @click="printCard(props.row)"
          ></q-btn>
          
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
        <div class="text-h6 text-center">Add Member</div>
      </q-card-section>
      
      <q-card-section >
        <q-form @submit.prevent="saveNewData" @reset="closeAddDialog" class="q-gutter-md">
          <q-input
          v-model="addData.NAMA_MEMBER.value"
          label="Nama Member"
          outlined
          lazy-rules
          :rules="[(val) => val.length > 0 || 'Nama tidak boleh kosong']"
          ></q-input>
          
          <q-input
          v-model="addData.ALAMAT_MEMBER.value"
          type="textarea"
          label="Alamat"
          outlined
          lazy-rules
          :rules="[(val) => val.length > 0 || 'Alamat tidak boleh kosong']"
          ></q-input>
          
          <q-input
          v-model="addData.TELEPON_MEMBER.value"
          label="Telepon"
          outlined
          lazy-rules
          :rules="[(val) => val.length > 0 || 'Nomor telepon tidak boleh kosong']"
          ></q-input>
          
          <q-input outlined  v-model="addData.TANGGAL_LAHIR_MEMBER.value" mask="date" :rules="['date']" label="Tanggal Lahir ">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
                >
                  <q-date v-model="addData.TANGGAL_LAHIR_MEMBER.value">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          
          <q-input
          v-model="addData.EMAIL.value"
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
          <div class="text-h6 text-center">Edit Member</div>
        </q-card-section>
        
        <div class="row">
          <div class="col">
            <q-card-section class="q-pb-xs">
              <q-input
              dense outlined v-model="editData.ID_MEMBER.value"
              label="ID"
              disable
              />
            </q-card-section>
            
            <q-card-section class="q-pb-none q-pt-lg">
              <q-input
              dense outlined v-model="editData.NAMA_MEMBER.value"
              label="Name"
              :rules="[val => !!val || 'Nama tidak boleh kosong']" />
            </q-card-section>
            
            <q-card-section class="q-pb-none q-pt-sm">
              <q-input
              dense type="textarea"
              outlined v-model="editData.ALAMAT_MEMBER.value"
              label="Alamat"
              :rules="[val => !!val || 'Alamat tidak boleh kosong']" />
            </q-card-section>
            
            <q-card-section class="q-pb-none q-pt-sm">
              <q-input
              dense outlined v-model="editData.TELEPON_MEMBER.value"
              label="Telepon"
              :rules="[val => !!val || 'Nomor telepon tidak boleh kosong']" />
            </q-card-section>
            
            <q-card-section class="q-pb-none q-pt-sm">
              <q-input dense outlined v-model="editData.TANGGAL_LAHIR_MEMBER.value" mask="date"
              :rules="[val => !!val || 'Tanggal lahir tidak boleh kosong', 'date']"
              label="Tanggal Lahir"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="editData.TANGGAL_LAHIR_MEMBER.value">
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
              dense outlined v-model="editData.EMAIL.value"
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

  <q-dialog v-model="expDialog" persistent>
    <q-card style="min-width: 14cm">
      <q-card-section class="q-pb-none">
        <div class="text-h6 text-center">Member Ekspired per Hari Ini</div>
      </q-card-section>

      <q-card-section>
        <q-table
          :data="expired"
          :columns="expCol"
          row-key="id"
          hide-header
        />
      </q-card-section>

      <q-card-actions>
        <q-btn label="Close" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>


<style scoped>
.float-right {
  margin-right: 25px;
}
.float-left {
  margin-left: 25px;
}
</style>
  
<script>
import { defineComponent, onMounted, ref } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'MemberComponent',
  setup() {
    const $q = useQuasar();

    const columns = [
      {
        name: 'id',
        required: false,
        label: 'ID',
        align: 'left',
        field: (row) => row.ID_MEMBER,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'nama',
        required: false,
        label: 'NAMA',
        align: 'left',
        field: (row) => row.NAMA_MEMBER,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'alamat',
        required: false,
        label: 'ALAMAT',
        align: 'left',
        field: (row) => row.ALAMAT_MEMBER,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'telepon',
        required: false,
        label: 'TELEPON',
        align: 'left',
        field: (row) => row.TELEPON_MEMBER,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'tanggal_lahir',
        required: false,
        label: 'TANGGAL LAHIR',
        align: 'left',
        field: (row) => row.TANGGAL_LAHIR_MEMBER,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'email',
        required: false,
        label: 'EMAIL',
        align: 'left',
        field: (row) => row.EMAIL,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'status',
        required: false,
        label: 'STATUS',
        align: 'left',
        field: (row) => row.STATUS_MEMBER,
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

    const expCol = [
      {
        name: 'id',
        label: 'ID',
        align: 'left',
        field: (row) => row.ID_MEMBER,
      },
      {
        name: 'nama',
        label: 'NAMA MEMBER',
        align: 'left',
        field: (row) => row.NAMA_MEMBER,
      },
      {
        name: 'exp',
        label: 'EXPIRED',
        align: 'left',
        field: (row) => row.WAKTU_AKTIVASI_EKSPIRED,
      },
    ];
    
    const rows = ref([]);

    const expired = ref([]);
    
    const addDialog = ref(false);
    
    const editDialog = ref(false);

    const expDialog = ref(false);
    
    const editData = {
      ID_MEMBER: ref(''),
      NAMA_MEMBER: ref(''),
      ALAMAT_MEMBER: ref(''),
      TELEPON_MEMBER: ref(''),
      TANGGAL_LAHIR_MEMBER: ref(''),
      EMAIL: ref(''),
    };
    
    const addData = {
      ID_MEMBER: ref(''),
      NAMA_MEMBER: ref(''),
      TANGGAL_LAHIR_MEMBER: ref(''),
      ALAMAT_MEMBER: ref(''),
      TELEPON_MEMBER: ref(''),
      EMAIL: ref(''),
    };
    
    const searchString = ref('');
    
    function getMembers() {
      rows.value = [];
      api
      .get('/api/member', {
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

    function getExp() {
      expired.value = [];
      api.get('/api/exp', {
        withCredentials: true,
      })
      .then((response) => {
        expired.value = response.data;
      })
      .catch(() => {
        $q.notify({
          message: 'Tidak ada data member ekspired',
          color: 'negative',
          position: 'top-right',
        });
      });
    }

    function showExp() {
      expDialog.value = true;
      getExp();
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
      editData.ID_MEMBER.value = user.ID_MEMBER;
      editData.NAMA_MEMBER.value = user.NAMA_MEMBER;
      editData.ALAMAT_MEMBER.value = user.ALAMAT_MEMBER;
      editData.TELEPON_MEMBER.value = user.TELEPON_MEMBER;
      editData.TANGGAL_LAHIR_MEMBER.value = user.TANGGAL_LAHIR_MEMBER.replace("-","/").replace("-","/");
      editData.EMAIL.value = user.EMAIL;
    }
    
    function closeEditDialog() {
      editDialog.value = false
      editData.ID_MEMBER.value = '';
      editData.NAMA_MEMBER.value = '';
      editData.ALAMAT_MEMBER.value = '';
      editData.TELEPON_MEMBER.value = '';
      editData.TANGGAL_LAHIR_MEMBER.value = '';
      editData.EMAIL.value = '';
    }
    
    function closeAddDialog() {
      addDialog.value = false;
      addData.ID_MEMBER.value = '';
      addData.NAMA_MEMBER.value = '';
      addData.ALAMAT_MEMBER.value = '';
      addData.TELEPON_MEMBER.value = '';
      addData.TANGGAL_LAHIR_MEMBER.value = '';
      addData.EMAIL.value = '';
    }

    function deactiveMember() {
      api.put('/api/exp', {
        withCredentials: true
      })
      .then(() => {
        $q.notify({
          message: 'Successfully deactive Member',
          color: 'positive',
          icon: 'check_circle',
          position: 'top-right',
        });
        getMembers();
      })
      .catch(() => {
        $q.notify({
          message: 'Failed to deactive Member',
          color: 'negative',
          icon: 'cancel',
          position: 'top-right',
        });
      });
    }
    
    function deleteData(ID_MEMBER) {
      api.delete(
        '/api/member/' + ID_MEMBER,
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
        getMembers();
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
        deleteData(user.ID_MEMBER)
      })
    }
    
    function saveNewData() {
      api.post('/api/member',
        {
          NAMA_MEMBER: addData.NAMA_MEMBER.value,
          ALAMAT_MEMBER: addData.ALAMAT_MEMBER.value,
          TELEPON_MEMBER: addData.TELEPON_MEMBER.value,
          TANGGAL_LAHIR_MEMBER: addData.TANGGAL_LAHIR_MEMBER.value,
          EMAIL: addData.EMAIL.value,
        },
        { withCredentials: true }
      )
      .then(() => {
        $q.notify({
          message: 'Successfully add Member',
          color: 'positive',
          icon: 'check_circle',
          position: 'top-right',
        });
        getMembers();
      })
      .catch(() => {
        $q.notify({
          message: 'Failed to add Member',
          color: 'negative',
          icon: 'cancel',
          position: 'top-right',
        });
      });
      closeAddDialog();
    }
    
    function saveEditData() {
      $q.dialog({
        title: 'Confirm',
        message: 'Do you want to edit data ?',
        cancel: true,
        persistent: true,
        ok: {
          color: 'positive',
          label: 'Edit'
        }
      }).onOk(() => {
        api.put('/api/member/' + editData.ID_MEMBER.value,
        {
          NAMA_MEMBER: editData.NAMA_MEMBER.value,
          TANGGAL_LAHIR_MEMBER: editData.TANGGAL_LAHIR_MEMBER.value,
          ALAMAT_MEMBER: editData.ALAMAT_MEMBER.value,
          TELEPON_MEMBER: editData.TELEPON_MEMBER.value,
          EMAIL: editData.EMAIL.value,
        }, { withCredentials: true })
        .then(() => {
          $q.notify({
            message: 'Successfully update Member',
            color: 'positive',
            icon: 'check_circle',
            position: 'top-right'
          })
          getMembers()
        })
        .catch(() => {
          $q.notify({
            message: 'Failed to update Member',
            color: 'negative',
            icon: 'cancel',
            position: 'top-right'
          })
        })
        closeEditDialog()
      })
    }
    
    function printCard(member) {
      $q.dialog({
        title: 'Confirm',
        message: 'Do you want to print member card ?',
        cancel: true,
        persistent: true,
        ok: {
          color: 'positive',
          label: 'Yes'
        }
      }).onOk(() => {
        var myWindow = window.open("", "printWindow", "width=1200,height=700");
        var content = 
          `<!DOCTYPE html>
            <html>
              <head>
                <title>V-Card</title>

                <style>
                .card {
                  width: 500px;
                  background-color: #f5f5f5;
                  border-radius: 10px;
                  padding: 20px;
                  margin: 20px auto;
                  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                  font-family: Arial, sans-serif;
                }
                .card h2 {
                  font-size: 24px;
                  margin-top: 0;
                }
                .card p {
                  margin: 10px 0;
                  font-size: 16px;
                }
                .card .id {
                  color: #999;
                }
                </style>
              </head>
                
              <body>
                <div class="card">
                  <h2><b>Gofit</b></h2>
                  <p>Jl. Centralpark No. 10 Yogyakarta</p>
                  
                  <br>
                  <br>
                  
                  <h2><b>Member Card</b></h2>
                  <p>Member ID    : ${ member.ID_MEMBER }</p>
                  <p>Nama         : ${ member.NAMA_MEMBER }</p>
                  <p>Alamat       : ${ member.ALAMAT_MEMBER }</p>
                  <p>Telepon      : ${ member.TELEPON_MEMBER }</p>
                </div>
              </body>
            </html>
          `
        myWindow.document.write(content);
        myWindow.print()
      })
    }
    
    function reset(ID_MEMBER) {
      $q.dialog({
        title: 'Confirm',
        message: 'Do you want to reset password ?',
        cancel: true,
        persistent: true,
        ok: {
          color: 'negative',
          label: 'Yes'
        }
      }).onOk(() => {
        api.post('/api/member/' + ID_MEMBER,
          {},{ withCredentials: true }
        )
        .then(() => {
          console.log(response.data)
          $q.notify({
            message: 'Successfully reset password',
            color: 'positive',
            icon: 'check_circle',
            position: 'top-right',
          });
        })
        .catch(() => {
          $q.notify({
            message: 'Failed to reset password',
            color: 'negative',
            icon: 'cancel',
            position: 'top-right'
          })
        })
      })
    }
    
    onMounted(() => {
      getMembers();
      getExp();
    });
    
    return {
      columns,
      rows,
      deleteDataDialog,
      addData,
      addDialog,
      showAddDialog,
      editData,
      closeAddDialog,
      saveNewData,
      searchString,
      getMembers,
      getExp,
      expDialog,
      expired,
      expCol,
      showExp,
      showEditDialog,
      editDialog,
      closeEditDialog,
      saveEditData,
      printCard,
      reset,
      deactiveMember,
    };
  },
});
</script>