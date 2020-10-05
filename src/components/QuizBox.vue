<template>
  <div>
    <p v-html="currentQuestion.question" :class="'question'">
      {{ currentQuestion.question }}
    </p>

    <div class="container">
      <button
        v-html="answer"
        v-for="answer in answers"
        v-bind:key="answer"
        v-on:click="selectAnswer(answer)"
        v-bind:class="[
          'alternative',
          answer === selectedAnswer
            ? isCorrectAnswer(selectedAnswer)
              ? 'correct-answer'
              : 'incorrect-answer'
            : isCorrectAnswer(answer) && selectedAnswer !== null
            ? 'correct-answer'
            : '',
          selectedAnswer !== null ? 'noHover' : '',
        ]"
        v-bind:disabled="selectedAnswer !== null"
      >
        {{ answer }}
      </button>
    </div>
    <button
      v-bind:class="['next']"
      v-on:click="next"
      v-bind:disabled="selectedAnswer === null"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: "QuizBox",
  props: {
    currentQuestion: Object,
    next: Function,
    correct: Function,
  },
  data() {
    return {
      selectedAnswer: null,
    };
  },
  watch: {
    currentQuestion: function () {
      this.selectedAnswer = null;
    },
  },
  methods: {
    selectAnswer: function (answer) {
      this.selectedAnswer = answer;
      if (this.isCorrectAnswer(answer)) {
        this.correct();
      }
    },
    isCorrectAnswer: function (answer) {
      return this.currentQuestion.correct_answer === answer;
    },
  },
  computed: {
    answers: function () {
      return [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer,
      ].sort(() => 0.5 - Math.random());
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

.question {
  font-size: larger;
}

.next:hover:enabled {
  background-color: rgb(100, 163, 100);
}
.next {
  background-color: rgb(120, 197, 120);
  color: white;
  padding: 1em 2em;
  text-align: center;
  text-decoration: none;
  border: none;
  display: inline-block;
  margin-top: 1em;
}

.next:disabled {
  color:white;
  background: #DED;
}

.noHover {
  pointer-events: none;
}

.container {
  display: grid;
  place-items: center;
}
.alternative:hover {
  border: 1px solid green;
  cursor: pointer;
}

.alternative {
  border: 1px solid white;
  padding-top: 1em;
  padding-bottom: 1em;
  width: 100%;
}

.incorrect-answer {
  background: lightcoral;
}

.correct-answer {
  background: lightgreen;
}
</style>
