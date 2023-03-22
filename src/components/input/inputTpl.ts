export const inputTemplate: string = `
<div class="input-wrapper {{inputWrapper}}">
    <label for="{{id}}">{{label}}</label>
    <input 
        id="{{id}}" 
        name="{{name}}" 
        type="{{#if type}}{{type}}{{else}}text{{/if}}" 
        placeholder="{{placeholder}}"
        {{#if required}}required="{{required}}"{{/if}}
        {{#if pattern}}pattern="{{pattern}}"{{/if}}
        class="input {{className}}"
        {{#if readonly}}readonly{{/if}}
    />
</div>
`
