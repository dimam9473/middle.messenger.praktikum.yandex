export const profileTemplate = `
<div>
    <section class="form-wrapper form-wrapper--large">
        <div class="profile-header">
            {{{back}}}            
            {{{avatar}}}
            <form id="myUserForm">
                {{{fileUploader}}}
            </form>             
        </div>        
        <h2>Here will be Name Surname of user</h2>
        <form id="profile-form" class="inputs">
            {{{emailInput}}}
            {{{firstNameInput}}}
            {{{secondNameInput}}}
            {{{loginInput}}}
            {{{displayNameInput}}}
            {{{phoneInput}}}
            {{{oldPasswordInput}}}
            {{{newPasswordInput}}}
            {{{repeatPasswordInput}}}
        </form>

        <div class="actions">
            {{{changeData}}}
            {{{changePassword}}}
            {{{logout}}}
            {{{save}}}
            {{{cancel}}}
        </div>
    </section>
</div>
`
