<template>
    <v-container>
        <ListQuiz/>
    </v-container>
</template>

<script>
import ListQuiz from '../components/quiz/ListQuiz';

export default {
    name: 'QuizView',
    components: {
        ListQuiz
    }
}
</script>