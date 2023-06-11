<template>
    <q-layout
        class="fit column justify-center"
        style="
        background-image: url('src/assets/background.jpg');
        background-size: cover;
        background-position: center;
        "
    >
        <div class="row justify-center">
            <q-card
                v-bind:style="$q.screen.lt.sm ? { width: '40%' } : { width: '25%' }"
            >
                <q-form @submit="loginProcess" class="q-gutter-md">
    
                    <q-card-section>
                        <Center>
                            <p style="font-family: 'Times New Roman', serif; font-weight: bold; font-size: 24px;">LOGIN</p>
                        </Center>

                        <br>
        
                        <q-input
                            class="q-mb-md"
                            outlined
                            v-model="loginData.email.value"
                            label="Email"
                            :rules="[
                                (val, rules) => rules.email(val) || 'Email kosong atau tidak sesuai',
                            ]"
                        >
                            <template v-slot:prepend>
                                <q-icon name="person" />
                            </template>
                        </q-input>
        
                        <q-input
                            :type="showPassword ? 'password' : 'text'"
                            class="q-mb-sm"
                            outlined
                            v-model="loginData.password.value"
                            label="Password"
                            :rules="[(val) => val.length > 0 || 'Password kosong']"
                        >
                            <template v-slot:prepend>
                                <q-icon name="lock" />
                            </template>
        
                            <template v-slot:append>
                                <q-icon
                                    :name="showPassword ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer"
                                    @click="showPassword = !showPassword"
                                />
                            </template>
                        </q-input>

                        <div class="row justify-center">
                            <q-btn
                                color="primary"
                                type="submit"
                                label="Login"
                            />
                        </div>
                    </q-card-section>
                </q-form>
            </q-card>
        </div>
    </q-layout>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';
  
export default defineComponent({
    name: 'LoginPage',
    setup() {
        const $q = useQuasar();
        const loginData = {
            email: ref(''),
            password: ref(''),
        };
        function loginProcess() {
            api.post('/api/login', {
                EMAIL: loginData.email.value,
                PASSWORD: loginData.password.value,
            })
            .then((response) => {
                $q.notify({
                    message: 'Berhasil Login sebagai ' + response.data.data.ROLE +  ' !',
                    color: 'positive',
                    icon: 'check_circle',
                    position: 'top-right',
                });
                localStorage.setItem('user', JSON.stringify(response.data.data));
                if (response.data.data['ROLE'] == 'admin') {
                    window.location.href = '#/admin';
                } else if (response.data.data['ROLE'] == 'kasir') {
                    window.location.href = '#/kasir';
                } else if (response.data.data['ROLE'] == 'mo') {
                    window.location.href = '#/mo';
                }
            })
            .catch(() => {
                $q.notify({
                    message: 'Email atau Password salah!',
                    color: 'negative',
                    icon: 'error',
                    position: 'top-right',
                });
            });
        }
        let showPassword = ref(true);
        return {
            loginData,
            loginProcess,
            showPassword,
        };
    },
});
</script>