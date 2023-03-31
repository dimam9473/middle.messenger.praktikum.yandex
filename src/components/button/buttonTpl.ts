export const buttonTpl = `
<button {{#if id}}id="{{id}}"{{/if}} type="{{#if type}}{{type}}{{else}}submit{{/if}}" class="button {{className}}">{{{caption}}}</button>
`
