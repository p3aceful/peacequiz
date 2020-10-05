<template>
  <div id="app">
    <Header
      v-bind:currentIndex="questionsAnswered"
      v-bind:totalQuestions="questions.length"
    />
    <main>
      <div v-if="questions.length === 0">Loading...</div>
      <div v-if="index !== questions.length">
        <QuizBox
          v-bind:currentQuestion="questions[index]"
          v-bind:next="next"
          v-bind:correct="correct"
        />
      </div>
      <ScoreShower
        v-if="index === questions.length && questions.length !== 0"
        v-bind:totalScore="correctCount"
        v-bind:totalQuestions="questions.length"
        :reset="resetQuiz"
        :newQuiz="newQuiz"
      />
    </main>
  </div>
</template>

<script>
import QuizBox from "../components/QuizBox.vue";
import ScoreShower from "../components/ScoreShower.vue";
import Header from "../components/Header.vue";

export default {
  name: "App",
  components: {
    QuizBox,
    ScoreShower,
    Header,
  },
  methods: {
    next: function () {
      if (this.index >= this.questions.length - 1) {
        this.index++;
      } else {
        this.index++;
        this.questionsAnswered++;
      }
    },
    correct: function () {
      this.correctCount++;
    },
    resetQuiz: function () {
      this.questions = [];
      this.fetchQuestions();
      this.index = 0;
      this.questionsAnswered = 0;
      this.correctCount = 0;
    },
    newQuiz: function() {
      this.$router.push('/');
    },
    fetchQuestions: async function () {
      
      const result = await fetch(
        `https://opentdb.com/api.php?amount=${this.amount}&category=${this.category}&type=multiple&difficulty=${this.difficulty}`,
        {
          method: "get",
        }
      )
        .then((response) => response.json())
        .then((json) => json.results);

      this.questions = result;
    },
    init: function () {
      const { category, amount, difficulty } = this.$route.query;
      this.category = category;
      this.amount = amount;
      this.difficulty = difficulty;
      if ([category, amount, difficulty].some((prop) => prop === undefined)) {
        this.$router.push("/");
      }
      this.$router.replace({ query: null });

      this.fetchQuestions();
    },
  },
  data() {
    return {
      index: 0,
      correctCount: 0,
      questionsAnswered: 0,
      questions: [],
      difficulty: "",
      category: "",
      amount: 0,
    };
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
html,
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@media only screen and (min-width: 992px) {
  main {
    margin-left: 25%;
    margin-right: 25%;
  }
}
</style>

