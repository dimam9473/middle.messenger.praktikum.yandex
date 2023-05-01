export const messengerTemplate = `
<div class="messenger {{#unless firstName}}not-selected{{/unless}}">
    {{#if id}}
        <div id="selected-messenger" class="selected-messenger">
            <div class="messenger-header">
                <div>
                    <img src="{{avatarSrc}}" alt="avatar"/>
                    <b>{{title}}</b>
                </div>
                <div class='dropdown-wrapper'>
                    {{{showDropdown}}}
                    {{{dropdown}}}
                </div>
            </div>
            <div class="messenger-history">
                <ul class='messages'>
                    {{#each messages}}
                        {{{this}}}
                    {{/each}}        
                </ul>
            </div>
            <form id='send-message' class="messenger-footer">
                {{{atachButton}}}
                {{{messageInput}}}
                {{{sendButton}}}
            </form>
        </div>
    {{else}}
        <span id="chat_empty" class="messenger--empty ">Select chat</span>
    {{/if}}
    {{{modal}}}
</div>
`
