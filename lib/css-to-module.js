import escapeTaggedTemplate from './escape-tag-template.js'

export default function cssToModule(css, tag, specifier) {
  return `import { ${tag} } from '${specifier}';
export default ${tag}\`${escapeTaggedTemplate(css)}\`;`
}
