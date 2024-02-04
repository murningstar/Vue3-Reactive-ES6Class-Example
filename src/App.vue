<script setup lang="ts">
import { Counter } from "@/classes/Counter";
import { computed } from "vue";

const instance = new Counter();

const backgroundColor = computed(() =>
    instance.count > 0 ? "#41b883" : "#722121"
);
</script>

<template>
    <div class="count" :style="{ backgroundColor }">
        {{ instance.count }}
    </div>
    <button @click="instance.increment()">
        increment()
    </button>
    <button @click="instance.count=69">
        Mutate directly
    </button>
</template>

<style scoped>
.count {
    width: 420px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 100px;
    border: 5px solid #34495e;
}
button {
    width: 133.7px;
    margin-top: 5px;
    padding: 10px;
    background-color: #7ba2b6;
    border: 3px solid #34495e;
    border-radius: 3px;
    cursor: pointer;
}
button:hover {
    filter: brightness(1.1);
}
</style>
