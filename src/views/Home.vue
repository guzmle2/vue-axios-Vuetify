<template>
    <div>
        <v-layout :wrap="true">
            <v-flex xs12>
                <v-card>
                    <v-date-picker
                            v-model="date"
                            full-width
                            locale="es-ES"
                            :min="min"
                            :max="max"
                            @change="getDolar()">
                    </v-date-picker>
                </v-card>
                <v-card color="error" dark>
                    <v-card-text class="display-1 text-xs-center">
                        {{valor}}
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import axios from "axios";
    import {mapMutations} from "vuex";
    import moment from "moment";

    export default {
        data() {
            return {
                date: moment().format('YYYY-MM-DD'),
                min: moment().subtract(1, 'Y').format('YYYY-MM-DD'),
                max: moment().format('YYYY-MM-DD'),
                valor: null
            }
        },
        methods: {
            ...mapMutations([
                'showLoading',
                'hideLoading'
            ]),

            async getDolar() {
                console.log(this.date);
                const date = moment(this.date, 'YYYY-MM-DD').format('DD-MM-YYYY');
                this.showLoading({
                    title: 'Accediendo a información',
                    color: 'secondary'
                });
                try {


                    let datos = await axios.get(`https://mindicador.cl/api/dolar/${date}`);

                    if (datos.data.serie.length > 0) {
                        this.valor = await datos.data.serie[0].valor
                    } else {
                        this.valor = 'Sin resultados'
                    }

                } catch (error) {
                    // console.log(error);
                } finally {
                    this.hideLoading();
                }
            }
        },
        created() {
            this.getDolar()
        }
    }
</script>
