<template>
  <v-app dark class="cybex page-orders">
    <!-- top navigator -->
    <appNav />
    <!-- end top navigator -->
    <!-- content start -->
    <v-content>
      <v-container fluid>
        <perfect-scrollbar :options="{ swipeEasing: false }">
          <nuxt />
        </perfect-scrollbar>
      </v-container>
    </v-content>
    <!-- content end -->
    <!-- footer start -->
    <appFooter />
    <!-- footer end -->
  </v-app>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar'
export default {
  components: {
    appNav: () => import('~/components/AppNavigation.vue'),
    appFooter: () => import('~/components/AppFooter.vue')
  },
  data() {
    return { ps: null }
  },

  mounted() {
    if (!this.ps) {
      this.ps = new PerfectScrollbar('html', { useBothWheelAxes: false })
    }
  },
  beforeDestroy() {
    this.ps.destroy()
  },
  head() {
    // todo 动态获取价格
    return {
      title: this.$t('title.orders')
    }
  }
}
</script>

<style lang="scss">
@import '~assets/style/orders';
@import '~assets/style/_vars/_colors';

.page-orders {
  .page-head-title {
    height: 96px;
    font-size: 24px;
    line-height: 1.17;
    letter-spacing: 0.3px;
    color: map-get($main, white);
    padding: 41px 0 27px 96px;
    margin-bottom: 16px;
    @include f-cybex-style(heavy);
  }
  .container {
    overflow-x: auto;
    height: 100%;
    width: 100%;
    min-height: 532px;
    padding: 0;
  }

  .content-container {
    height: 100%;
    max-width: 1280px;
    margin: 0 auto;
  }
}
.cybex.theme--dark {
  .asset-tabs {
    padding: 0 96px 16px 90px;
  }
}
</style>
