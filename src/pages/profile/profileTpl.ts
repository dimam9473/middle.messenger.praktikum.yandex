export const profileTemplate: string = `
<div class="form-layout">
    <section class="form-wrapper form-wrapper--large">
        <div class="profile-header">
            {{{back}}}            
            <img src="#" alt="avatar">
        </div>        
        <h2>Here will be Name Surname of user</h2>
        <div class="inputs">
            {{{emailInput}}}
            {{{firstNameInput}}}
            {{{secondNameInput}}}
            {{{loginInput}}}
            {{{phoneInput}}}
        </div>

        <div class="actions">
            {{{changeData}}}
            {{{changePassword}}}
            {{{logout}}}
        </div>
    </section>
</div>
`
