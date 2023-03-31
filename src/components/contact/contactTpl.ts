export const contactTemplate = `
<li class="contact-wrapper">
    <img src="{{avatarSrc}}" alt="avatar"/>
    <div class="user-info">
        <b class="first-name">{{firstName}}</b>
        <span class="last-message">{{lastMessage}}</span>
    </div>    
    <div class="chat-info">
        <span>{{time}}</span>
        <span class="unread-count">{{unreadCount}}</span>
    </div>
</li>
`
