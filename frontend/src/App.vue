<template>
  <header class="site-header">
    <RouterLink class="brand" to="/" aria-label="YB 首页">YB<span>／</span>STUDIO</RouterLink>
    <nav :key="$route.path" :class="{ 'nav-entry': ['/', '/showcase', '/custom', '/contact'].includes($route.path) }" aria-label="主导航">
      <RouterLink to="/">首页</RouterLink>
      <RouterLink to="/showcase">展示</RouterLink>
      <RouterLink to="/custom">定制</RouterLink>
      <RouterLink to="/contact">联系</RouterLink>
    </nav>
    <div :key="$route.path" :class="{ 'nav-entry': ['/', '/showcase', '/custom', '/contact'].includes($route.path) }" class="header-actions">
      <RouterLink class="header-note" to="/contact">联系劳资</RouterLink>
      <a class="header-note" href="https://pconfig.tkr-studio.com">弄台电脑</a>
    </div>
  </header>

  <RouterView />
</template>
