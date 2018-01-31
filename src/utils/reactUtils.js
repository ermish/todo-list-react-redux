export function focusAtEnd(el) {
  const element = el.target ? el.target : el

  if (document.activeElement !== element) {
    element.focus()
    const originalValue = element.value

    element.value = ''
    element.value = originalValue
  }
}
