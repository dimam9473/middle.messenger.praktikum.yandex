export const registerTemplate: string = `
<div class="form-layout">
    <section class="form-wrapper">
        {{{title}}}        
        <form>
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
