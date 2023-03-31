export const registerTemplate = `
<div>
    <section class="form-wrapper">
        {{{title}}}        
        <form id="register-form">
            <div class="inputs">
                {{{emailInput}}}
                {{{loginInput}}}
                {{{firstNameInput}}}
                {{{secondNameInput}}}
                {{{phoneInput}}}
                {{{passwordInput}}}
                {{{repeatPasswordInput}}}
            </div>

            {{{button}}}
        </form>

        {{{link}}} 
    </section>
</div>
`
