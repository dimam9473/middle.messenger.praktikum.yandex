export const loginTemplate: string = `
<div>
    <section class="form-wrapper">
        {{{title}}}
        <form id="login-form" name="login-form">
            <div class="inputs">
                {{{loginInput}}}
                {{{passwordInput}}}
            </div>
            {{{button}}}
        </form>

        {{{link}}}
    </section>
</div>
`
