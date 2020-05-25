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
    background: #f8f8f8 !important;
  font-family: "romeo", "Mitr", sans-serif !important;
}
.color-main {
  color: #00a8e8;
}
.color-dark {
  color: #212121;
}
.dropdown-item{
  border:0px !important;
  outline: none !important;
}
.dropdown-item:focus{
  background: #00a8e8 !important;
  border:0px !important;
  color:white !important;
}

.color-muted {
  color: #dddd;
}
.bg-white {
  background: white;
  width: 100%;
}
.color-white {
  color: white;
}
.bg-main {
  background: #00a8e8;
  color: white;
}
.image-avatar {
  width: 100%;
}
.color-dark-2 {
  color: #212121 !important;
  opacity: 0.7; /* Firefox */
}
.color-dark-3 {
  color: #7d7d82 !important;
}
@media only screen and (width: 1920px) {
  .image-avatar {
    width: 70% !important;
    margin-left: 15px !important;
  }
}
@media only screen and (width: 1600px) {
  .image-avatar {
    width: 70% !important;
    margin-left: 15px !important;
  }
}
select {
    display: block
 }
</style>
