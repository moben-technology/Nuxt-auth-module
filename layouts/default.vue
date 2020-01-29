<template>
  <div>
    <Navbar/>
    <nuxt/>
  </div>
</template>

<script>
    import Navbar from "~/components/common/Header";

    export default {
        components: {
            Navbar
        }
    }
</script>