<template>
  <div>
    <header>Peacequiz</header>

    <form @submit.prevent="startQuiz">
      <label for="category">Select category</label>
      <select required v-model="selectedCategory" name="category">
        <option disabled value="" v-if="categories.length > 0">
          Category
        </option>
        <option disabled value="" v-else>Loading categories...</option>
        <option
          v-for="category in categories"
          :key="category.id"
          v-bind:value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      <br />
      <label for="quantity">Number of questions </label>
      <input
        v-model.number="amount"
        name="quantity"
        type="number"
        min="1"
        max="20"
      />
      <br />
      <label for="difficulty">Select difficulty</label>
      <select required v-model="selectedDifficulty" name="difficulty">
        <option disabled value="">Difficulty</option>
        <option value="any">Any Difficulty</option>
        <option value="hard">Hard</option>
        <option value="medium">Medium</option>
        <option value="easy">Easy</option>
      </select>
      <br />
      <input type="submit" value="Start"/>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: "",
      selectedDifficulty: "",
      amount: 10,
      categories: [],
    };
  },
  methods: {
    startQuiz: function () {
      this.$router.push({
        path: "game",
        query: {
          category: this.selectedCategory,
          difficulty: this.selectedDifficulty,
          amount: this.amount,
        },
      });
    },
  },
  mounted() {
    fetch(`https://opentdb.com/api_category.php`, {
      method: "get",
    })
      .then((response) => response.json())
      .then((json) => {
        this.categories = json.trivia_categories;
      });
  },
};
</script>

<style scoped>
header {
  color: #EEE;
  font-size: 10vw;
  background: #123;
  height: 30vh;
  display: grid;
  place-items: center;
  margin-bottom: 0.2em;
}

form {
  display: flex;
  flex-direction: column;
  margin-left: 10vw;
  margin-right: 10vw;
}
@media only screen and (min-width: 992px) {
  form {
    width: 30em;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>