export function focusAtEnd(el) {
  var element = el.target ? el.target : el
  if(document.activeElement !== element){
    element.focus()
    var originalValue = element.value
    element.value = ''
    element.value = originalValue
  }
}
