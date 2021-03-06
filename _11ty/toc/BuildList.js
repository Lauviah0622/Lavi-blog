// Replace list copied from https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/
const _escText = text => {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const _buildLink = ({id, text, children}, flat) => {
  let nestedList = ''

  if (children.length > 0 && flat) {
    nestedList = children.map(c => _buildLink(c, flat))
  } else if (children.length > 0) {
    nestedList = BuildList(children)
  }

  if (id && text && flat) {
    return `<li data-header="${id}"><a href="#${id}">${_escText(text)}</a></li>${(
      nestedList || []
    ).join('')}`
  } else if (id && text) {
    return `<li data-header="${id}"><a href="#${id}">${_escText(text)}</a>${nestedList}</li>`
  } else {
    return nestedList
  }
}

const BuildList = (listItems, ul, flat) => {
  const listType = ul ? 'ul' : 'ol'
  const list = listItems
    .sort((a, b) => a.order - b.order)
    .map(li => _buildLink(li, flat))

  return list.length > 0 ? `<${listType}>${list.join('')}</${listType}>` : ''
}

module.exports = BuildList
