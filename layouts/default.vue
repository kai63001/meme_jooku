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
  margin: auto;
  padding: 0;
  height: 100%;
  /* overflow-x: hidden; */
}
body {
  overflow-x: hidden;
}
.tags-input input {
  border:none !important
}
.tags-input-badge{
  display: inline-block;
  background: #8338ec !important;
  color:white !important;
  padding:5px 10px;
  margin-bottom: 5px;
  font-size: 14px;
  text-align: center;
  margin-right: 6px;
  border-radius:25px
}
.color-main {
  color: #635dff;
}
.color-dark {
  color: #212121;
}
.dropdown-item {
  border: 0px !important;
  outline: none !important;
}
.dropdown-item:focus {
  background: #635dff !important;
  border: 0px !important;
  color: white !important;
}

.color-muted {
  color: #dddd;
}
.bg-white {
  background: white;
  width: 100%;
}
.color-white {
  color: white !important;
}
.bg-main {
  background: #635dff;
  color: white;
}
.image-avatar {
  max-width: 100%;
}
.color-dark-2 {
  color: #212121 !important;
  opacity: 0.7; /* Firefox */
}
.color-dark-3 {
  color: #7d7d82 !important;
}
.circular-chart {
  margin: 0 auto;
  display: block;
  max-width: 70%;
  position: absolute;
}
.circle2 {
  margin: 0 auto;
  /* stroke: #4cc790; */
  fill: none;
  stroke-width: 2.4;
  stroke-linecap: round;
}
.circle {
  margin: 0 auto;
  /* stroke: #4cc790; */
  fill: none;
  stroke-width: 2.4;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
}

@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}

textarea:hover,
input:hover,
textarea:active,
input:active,
textarea:focus,
input:focus,
button:focus,
button:active,
button:hover,
label:focus,
.btn:active,
.btn.active
{
    outline:0px !important;
    -webkit-appearance:none;
    box-shadow: none !important;
}
@media only screen and (min-width: 1920px) {
  .image-avatar {
    max-width: 70% !important;
    margin-left: 15px !important;
  }
  .circular-chart {
    max-width: 55%;
    /* top: -5% !important; */
    /* left: 26%; */
  }
}
@media only screen and (min-width: 1600px) {
  .circular-chart {
    max-width: 53%;
    /* top: -5%; */
    left: 30%;
  }
  .circular-chart-comment {
    max-width: 47%;
    top: -1.5%;
    left: 36%;
  }
  .image-avatar {
    max-width: 70% !important;
    margin-left: 15px !important;
  }
}
select {
  display: block;
}
</style>
