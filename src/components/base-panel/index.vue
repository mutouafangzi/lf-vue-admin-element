<template>
  <div class="container">
    <header class="panel-header-wrap">
      <slot name="header"></slot>
    </header>
    <main class="panel-main-wrap">
      <slot name="body"></slot>
    </main>
    <footer class="panel-footer-wrap">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

