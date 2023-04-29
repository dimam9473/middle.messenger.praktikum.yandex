export const dropDownTemplate = `
<div class='dropdown {{className}}'>
    {{#if visible}}
        <ul class='options'>
            {{#each options}}
            {{{this}}}
            {{/each}}        
        </ul>
    {{/if}}
</div>
`
