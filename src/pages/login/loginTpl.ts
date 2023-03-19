export const loginTemplate: string = `<div class="form-layout">
    <section class="form-wrapper">
        {{> title title="{{header}}"}}
        <form>
            <div class="inputs">
                {{{loginInput}}}
                {{{passwordInput}}}
            </div>
            {{{button}}}
        </form>

        {{> link href="register" text="Create account?"}}
    </section>
</div>
`
