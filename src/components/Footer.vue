<template>
    <v-footer app color="#6B4EE0" dark>
        <v-layout align-center justify-center>
            <router-link :to="{name:'about'}" style="text-decoration: none;">
                <span class="footstyle">A propos</span>
            </router-link>
        </v-layout>
    </v-footer>
</template>

<style>

.footstyle{
    color:white;
    text-align: center;
}
</style>