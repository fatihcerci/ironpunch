const utility = () => {
  const DEFAULT_LOCALE = "tr-TR"
  /**
   * Capitalizes first letters of words in string.
   * @param {string} str String to be modified
   * @param {boolean=false} lower Whether all other letters should be lowercased
   * @return {string}
   * @usage
   *   capitalize('fix this string');     // -> 'Fix This String'
   *   capitalize('javaSCrIPT');          // -> 'JavaSCrIPT'
   *   capitalize('javaSCrIPT', true);    // -> 'Javascript'
   */
  const capitalize = (str, lower = false, locale = DEFAULT_LOCALE) =>
    (lower
      ? str.toLocaleLowerCase(locale ? locale : DEFAULT_LOCALE)
      : str
    ).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
      match.toLocaleUpperCase(DEFAULT_LOCALE)
    )


  const percentage = (percent, total) => {
    return ((percent/ 100) * total).toFixed(2)
  }

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const insert = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
  ]

  return {
    capitalize,
    percentage,
    sleep,
    insert
  }
}
export default utility
