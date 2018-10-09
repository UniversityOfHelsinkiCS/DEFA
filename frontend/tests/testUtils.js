// eslint-disable-next-line import/prefer-default-export
export const findText = (text, wrapper) => {
  let found = 0
  if (wrapper.text().includes(text)) found += 1
  wrapper.children().forEach(child => {
    found += findText(text, child)
  })
  return found
}
