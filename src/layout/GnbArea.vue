<template>
  <header id="nav">
    <div class="header">
      <div class="logo">Rewardit</div>
      <div class="nav-button-area">
        <button v-if="$route.name === 'main'" type="button">로그인</button>
      </div>
    </div>
  </header>
</template>
