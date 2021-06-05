<template>
  <nav>
    <router-link :to="{ name: 'home' }"><h1>Where in the world ?</h1></router-link>
    <em class="fas fa-moon"></em>
    <span>Dark Mode</span>
  </nav>
  <router-view />
</template>