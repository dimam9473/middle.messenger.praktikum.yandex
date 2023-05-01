export const contactTemplate = `
<li class="contact-wrapper">
    <img src="{{avatar}}" alt="avatar"/>
    <div class="user-info">
        <b class="title">{{title}}</b>
        <span class="last-message">{{lastMessage}}</span>
    </div>
    {{#if unreadCount}}
    <div class="chat-info">
        <span>{{time}}</span>
        <span class="unread-count">{{unreadCount}}</span>
    </div>
    {{/if}}
    {{{delete}}}
</li>
`
