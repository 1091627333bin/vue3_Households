<template>
  <div class="container">
    <div class="itemleft">
      <itemPage>
        <template #main>
          <One></One>
        </template>
      </itemPage>

      <itemPage>
        <template #main>
          <Two></Two>
        </template>
      </itemPage>
    </div>
    <div class="itemright">
      <itemPage>
        <template #main>
          <Three></Three>
        </template>
      </itemPage>

      <itemPage>
        <template #main>
          <Four></Four>
        </template>
      </itemPage>
    </div>
  </div>
</template>

<script setup>
import itemPage from '@/components/itemPage'
import One from '@/components/One'
import Two from '@/components/Two'
import Three from '@/components/Three'
import Four from '@/components/Four'
</script>

<style lang="scss">
.container {
  width: 100%;
  margin: 0 auto;
  // background-color: grey;
  display: flex;

  .itemleft,
  .itemright {
    flex: 1;
  }
}
</style>