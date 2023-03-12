export const profileTemplate = `
<div class="form-layout">
    <section class="form-wrapper form-wrapper--large">
        <div class="profile-header">
            {{> link/link href="chat" text="Back" class="back"}}
            <img src="#" alt="avatar">
        </div>        
        <h2>Name Surname</h2>
        <div class="inputs">
            {{> input/input id="email" name="email" label="Email" placeholder="mail@mail.com"}}
            {{> input/input id="first-name" name="first_name" label="First name" placeholder="First name"}}
            {{> input/input id="second-name" name="second_name" label="Second name" placeholder="Your second name"}}
            {{> input/input id="login" name="login" label="Login" placeholder="Your login"}}
            {{> input/input id="phone" name="phone" label="Phone" placeholder="+7-999-999-9999"}}
        </div>

        <div class="actions">
            {{> link/link href="#" text="Change data"}}
            {{> link/link href="#" text="Change password"}}
            {{> link/link href="/" text="Logout"}}
        </div>
    </section>
</div>
`
