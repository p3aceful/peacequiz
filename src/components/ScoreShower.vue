
<template>
    <div>
        <p>You only got {{ totalScore }} out of {{ totalQuestions }} correct! Cringe!</p>
        <button @click="reset">Give me more of the same!</button>
        <button @click="newQuiz">Give me a new peacequiz!</button>
    </div>
</template>

<script>
export default {
    props: {
        totalScore: Number,
        totalQuestions: Number,
        reset: Function,
        newQuiz: Function,
    }
}
</script>

<style>

</style>