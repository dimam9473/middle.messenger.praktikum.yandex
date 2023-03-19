export const loginTemplate: string = `<div class="form-layout">
    <section class="form-wrapper">
        {{> title title="{{title}}"}}
        <form>
            <div class="inputs">
                {{> input id="login" name="login" label="Login" placeholder="Your login"}}
                {{> input id="password" name="password" label="Password" type="password" placeholder="1234"}}
            </div>
            {{{button}}}
        </form>

        {{> link href="register" text="Create account?"}}
    </section>
</div>
`
