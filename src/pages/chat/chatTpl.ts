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
        <span id="chat_empty" class="chat--empty">Select chat</span>
        <div id="selected_chat" class="selected-chat hide">
            <div class="chat-header">
                header
            </div>
            <div class="chat-history hide">
                messages
            </div>
            <div class="message">
                {{{atachButton}}}
                {{{messageInput}}}
                {{{sendButton}}}
            </div>
        </div>
    </section>
</div>
`
