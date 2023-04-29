export const modalTemplate = `
<div>
    {{#if visible}}
        <div class='modal-wrapper'>
            {{{closeButton}}}
            {{{userNameInput}}}
            {{{actionButton}}}
        </div>
        <div class='backdrop'></div>
    {{/if}}
</div>
`
