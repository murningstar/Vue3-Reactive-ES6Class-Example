import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useSomeStore = defineStore("someStore", {
    state: () => ({
        myArr: [
            { value: 420 },
            { value: 1337 },
            { value: 69 },
            { value: 5051 },
        ],
    }),
    getters: {
        myArrFiltered: (state) => state.myArr.filter((el) => el.value > 1000), // [{ value: 1337 }]
    },
});
