## [CodeSandbox version](https://codesandbox.io/p/sandbox/vue3-reactive-es6class-example-forked-pksyx8?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522cls79m4s600062a66cgfzu6pv%2522%252C%2522sizes%2522%253A%255B77.64192125189462%252C22.358078748105385%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522cls79m4s600022a668jta45g6%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522cls79m4s600032a66yq743zfo%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522cls79m4s600052a6665u1l96l%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522cls79m4s600022a668jta45g6%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522cls79m4s600012a66h09ikoaz%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FREADME.md%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%255D%252C%2522id%2522%253A%2522cls79m4s600022a668jta45g6%2522%252C%2522activeTabId%2522%253A%2522cls79m4s600012a66h09ikoaz%2522%257D%252C%2522cls79m4s600052a6665u1l96l%2522%253A%257B%2522id%2522%253A%2522cls79m4s600052a6665u1l96l%2522%252C%2522activeTabId%2522%253A%2522cls79vxsr000z2a66pfelafpx%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522UNASSIGNED_PORT%2522%252C%2522port%2522%253A0%252C%2522id%2522%253A%2522cls79vxsr000z2a66pfelafpx%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522path%2522%253A%2522%252F%2522%257D%255D%257D%252C%2522cls79m4s600032a66yq743zfo%2522%253A%257B%2522tabs%2522%253A%255B%255D%252C%2522id%2522%253A%2522cls79m4s600032a66yq743zfo%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)

# VUE3-REACTIVE-ES6CLASS-EXAMPLE

## Your questions:

-   How to mutate instance's properties via `this.` and track changes?
-   How to make reactive class (es6 class) instance in vue 3 basically?

## To get your answer consider two snippets:

### /src/classes/Counter.ts

In the first snippet we define `Counter` class that consists of:

-   `count` property
-   `increment()` method (mutating `count` via `this.count++`)
-   customized `constructor()` that makes possible mutating `this` directly from methods

```js
# /src/classes/Counter.ts

export class Counter {
    count: number;

    constructor() {
        this.count = 0;
        const reactiveThis = reactive(this);
        Object.keys(this).forEach((key) => {
            //@ts-ignore // these lines produce some type errors, just ignore them
            if (typeof this[key] == "function") {
                //@ts-ignore
                reactiveThis[key] = this[key].bind(reactiveThis);
            }
        });
        return reactiveThis;
    }

    increment() {
        this.count++;
    }
}
```

---

### /src/App.vue

```js
# /src/App.vue

<script setup lang="ts">
import { Counter } from "@/classes/Counter";
const instance = new Counter();
</script>

<template>
    <div class="count" :style="{ backgroundColor }"> {{ instance.count }} </div>
    <button @click="instance.increment()"> increment </button>
    <button @click="instance.count=69"> Mutate directly </button>
</template>

<style scoped></style>
```