export default function escapeTaggedTemplate(source) {
  return source
    .replaceAll('\\', '\\\\')
    .replaceAll('`', '\\`')
    .replaceAll('$', '\\$')
}
