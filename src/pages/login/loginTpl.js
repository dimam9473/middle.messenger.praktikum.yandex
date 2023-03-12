export const loginTemplate = `
<div class="form-layout">
    <section class="form-wrapper">
        {{> title/title title="Sign In"}}
        <form>
            <div class="inputs">
                {{> input/input id="login" name="login" label="Login" placeholder="Your login"}}
                {{> input/input id="password" name="password" label="Password" type="password" placeholder="1234"}}
            </div>
            {{> button/button id="enter" caption="Enter" class="button--green"}}
        </form>

        {{> link/link href="register" text="Create account?"}}
    </section>
</div>
`
