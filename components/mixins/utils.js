// import pair from "~/lib/pair_config.js";
import { mapGetters } from 'vuex'
import BigNumber from 'bignumber.js'
import moment from 'moment'

export default {
  data() {
    return {
      dateDisplayFormat: 'YYYY/MM/DD', // 显示用moment日期格式
      dateXHRFormat: 'YYYY-MM-DDTHH:mm:ss' // 调用接口moment日期格式
    }
  },
  computed: {
    ...mapGetters({
      signer: 'auth/signer',

      pairs: 'exchange/pairs',
      pair: 'exchange/pair',
      assets: 'exchange/assets',
      baseName: 'exchange/baseName',
      quoteName: 'exchange/quoteName',
      baseHash: 'exchange/baseHash',
      quoteHash: 'exchange/quoteHash',
      pairHash: 'exchange/pairHash',
      basePrecision: 'exchange/basePrecision',
      quotePrecision: 'exchange/quotePrecision'
    }),
    cookieName() {
      return this.$cookies.get('auth-username')
    },
    priceMatchedPrecision() {
      return this.quotePrecision - this.basePrecision
    },
    marketPairData() {
      const items = {}

      for (const index in this.pairs) {
        const pair = this.pairs[index]
        const item = items[pair.base.name]
        if (item) {
          items[pair.base.name].push(pair)
        } else {
          items[pair.base.name] = [pair]
        }
      }
      return items
    }
  },
  methods: {
    getMatchPair(baseHash, quoteHash) {
      let matchedPair = null
      for (const pair of this.pairs) {
        if (pair.base.id === baseHash && pair.quote.id === quoteHash) {
          matchedPair = pair
        }
      }

      return matchedPair
    },
    /* 科学计数法强制转换
     * @param { String | Number } num
     * @param { Number | Null } dp 小数点限制精度
     * @param { Number | Null } rm 小数点截取方式  Number | null 为空时为四舍五入
     * rm取值请参考链接 @see http://mikemcl.github.io/bignumber.js/#toFix
     * @return { NaN | Number}
     */
    toNonExponential(num, limitdp = null, rm = BigNumber.ROUND_FLOOR) {
      // 精度
      // 不出现科学计数法
      BigNumber.config({ EXPONENTIAL_AT: 1e9 })
      const checknum = new BigNumber(num)
      let dp = checknum.dp() // bignumber获取的dp
      const regx = `\\d*(\\.)(\\d*)$`
      const couldSplit = num.toString().match(new RegExp(regx))
      // console.log('couldSplit', couldSplit);
      if (couldSplit) {
        const z = num.toString().split('.')
        dp = z.length > 1 ? z[1].length : dp
        // 小数点后暂无输入
        if (dp === 0) {
          // console.log('原数字返回')
          return num
        }
        // console.log('dp', dp);
      }
      if (limitdp) {
        dp = dp > limitdp ? limitdp : dp
      }
      const correctVal = checknum.toFixed(dp, rm)
      return correctVal
    },
    // 使用moment规范显示日期
    formatDate(date, formatStr) {
      return moment(date).format(formatStr)
    }
  }
}
