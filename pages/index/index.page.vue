<template>
  <h1>Hello from Vercel - 9</h1>
  This page is:
  <ul>
    <li>Rendered to HTML.</li>
    <li>Interactive: <Counter /></li>
    <li>Uses Telefunc: <Hello /></li>
  </ul>
</template>

<script>
import Counter from './Counter.vue'
import Hello from './Hello.vue'
const components = { Counter, Hello }
export default { components }
</script>
