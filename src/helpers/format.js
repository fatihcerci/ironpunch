export class Format {
  static Object = class {
    static isArray(obj) {
      return Array.isArray ? Array.isArray(obj) : toString.call(obj) === '[object Array]'
    }
  }
  static Date = class {
    static get REGULAR() {
      return "YYYY-MM-DD"
    }
    static get REGULAR_WITH_TIME_MIN() {
      return "YYYY-MM-DD hh:mm"
    }
    static get REGULAR_WITH_TIME_SEC() {
      return "YYYY-MM-DD hh:mm:ss"
    }
    static get REGULAR_LOCAL() {
      return "DD/MM/YYYY"
    }
    static get REGULAR_WITH_TIME_LOCAL() {
      return "DD/MM/YYYY hh:mm:ss"
    }
  }
  static Time = class {
    static get ONE_SECOND() {
      return 1000
    }
    static get ONE_MINUTE() {
      return 60000
    }
    static get FIVE_MINUTES() {
      return 300000
    }
  }
  static Money = class {
    static toLocale(number) {
      return new Intl.NumberFormat('tr-TR',
          { style: 'currency', currency: 'TRY', minimumFractionDigits: 2})
          .format(number)
          .replace('₺', '')
    }

    static toNumber(value, decimal) {
      if (Format.Object.isArray(value)) {
        return map(value, function(val) {
          return toNumber(val, decimal)
        })
      }

      value = value || 0

      if (typeof value === "number") return value

      decimal = decimal || ','

      let regex = new RegExp("[^0-9-" + decimal + "]", ["g"]),
        unformatted = parseFloat(
          ("" + value)
          .replace(/\((?=\d+)(.*)\)/, "-$1")
          .replace(regex, '')
          .replace(decimal, '.')
        )

      return !isNaN(unformatted) ? unformatted : 0
    }

  }

}
