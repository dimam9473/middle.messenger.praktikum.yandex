export const chatTemplate = `
<div class="chat-wrapper">
    <section class="menu">
        <div class="menu-header-wrapper">
            <div class='create-chat'>
                {{{chatNameInput}}}
                {{{createChat}}}
            </div>
            <div class="menu-header">
                {{{searchInput}}}
                {{{profile}}}
            </div>
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
