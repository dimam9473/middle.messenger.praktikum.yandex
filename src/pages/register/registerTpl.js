export const registerTemplate = `
<div class="form-layout">
    <section class="form-wrapper">
        {{> title title="Register account"}}
        <form>
            <div class="inputs">
                {{> input id="email" name="email" label="Email" placeholder="mail@mail.com"}}
                {{> input id="login" name="login" label="Login" placeholder="Your login"}}
                {{> input id="first-name" name="first_name" label="First name" placeholder="First name"}}
                {{> input id="second-name" name="second_name" label="Second name" placeholder="Your second name"}}
                {{> input id="phone" name="phone" label="Phone" placeholder="+7-999-999-9999"}}
                {{> input id="password" name="password" label="Password" type="password" placeholder="1234"}}
                {{> input id="repeat-password" name="password-repeat" label="Repeat password" type="password" placeholder="1234"}}
            </div>

            {{> button id="create-account" caption="Create account" class="button--green"}}
        </form>

        {{> link href="/" text="Login"}}        
    </section>
</div>
`
