const BREAK_LINE_REGEX = /<\/ul>|<li>|<br>/gim;
const HTML_TAGS_REGEX = /<.*?>/gim;

const generateNoteSnippet = (html?: string) =>
  html
    ?.replace(BREAK_LINE_REGEX, '\n')
    ?.replace(HTML_TAGS_REGEX, '')
    ?.substring?.(0, 200) || '';

export default generateNoteSnippet;
