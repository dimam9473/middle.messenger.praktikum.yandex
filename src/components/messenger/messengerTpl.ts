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
                <ul>
                    {{#each messages}}
                        {{{this}}}
                    {{/each}}        
                </ul>
            </div>
            <div class="messenger-footer">
                {{{atachButton}}}
                {{{messageInput}}}
                {{{sendButton}}}
            </div>
        </div>
    {{else}}
        <span id="chat_empty" class="messenger--empty ">Select chat</span>
    {{/if}}
    {{{modal}}}
</div>
`
