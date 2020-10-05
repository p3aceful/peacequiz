<template>
  <header>
      <div v-if="totalQuestions !== 0">{{ currentIndex + 1 }} / {{ totalQuestions }}</div>
  </header>
</template>

<script>
export default {
    props: {
        currentIndex: Number,
        totalQuestions: Number
    }
}
</script>

<style scoped>
 header {
     color: #EEE;
     font-size: 8vw;
     min-height: 25vw;
     background: #123;
     display: grid;
     place-items: center;
     margin-bottom: 15px;
 }
</style>