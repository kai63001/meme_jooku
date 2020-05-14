<template>
  <div>
    <nuxt />
  </div>
</template>

<style>
@font-face {
  font-family: romeo;
  src: url("~assets/fonts/main.otf") format("opentype");
  font-display: swap;
}
html,
body {
  font-family: "romeo", "Mitr", sans-serif !important;
}
.color-main {
  color: #00a8e8;
}
.color-muted {
  color: #dddd;
}
.bg-white {
  background:white;
  width: 100%;
}
.color-white {
  color:white;
}
.bg-main {
  background: #00a8e8;
  color:white;
}
</style>
