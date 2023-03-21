export const chatTemplate: string = `
<div class="chat-wrapper">
    <section class="menu">
        <div class="menu__header">
            {{{searchInput}}}
            {{{profile}}}
        </div>
        <ul class="contacts">
            {{#each contacts}}
                {{{this}}}
            {{/each}}
        </ul>
    </section>
    <section class="chat">
        {{{messenger}}}
    </section>
</div>
`
