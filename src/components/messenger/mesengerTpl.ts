export const messengerTemplate: string = `
<div class="{{#unless firstName}}messenger{{/unless}}">
    {{#if firstName}}
        <div id="selected_chat" class="selected-chat">
            <div class="messenger-header">
                <div>
                    <img src="{{avatarSrc}}" alt="avatar"/>
                    <b>{{firstName}}</b>
                </div>
                <span>...</span>
            </div>
            <div class="messenger-history">
                messages
            </div>
            <div class="message">
                {{{atachButton}}}
                {{{messageInput}}}
                {{{sendButton}}}
            </div>
        </div>
    {{else}}
        <span id="chat_empty" class="messenger--empty ">Select chat</span>
    {{/if}}
</div>
`
