export default function handleError({ message, reason, column, line }) {
  /* c8 ignore next 2 */
  if (reason) {
    this.error(reason,{ column, line })
  } else {
    this.error(message)
  }
}
