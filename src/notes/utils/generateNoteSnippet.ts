const generateNoteSnippet = (html?: string) =>
  html?.replace(/(<([^>]+)>)/gi, '')?.substring?.(0, 200) || '';

export default generateNoteSnippet;
