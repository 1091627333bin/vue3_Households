<template>
  <div class="item">
    <slot name="main"></slot>
  </div>
</template>

<script setup>
</script>

<style lang="scss">
.item{
    height: 4.7rem;
    border:1px solid rgb(181, 181, 181);
    margin:0.25rem;
    background-color: rgba(203,203,203,0.708);
}
</style>