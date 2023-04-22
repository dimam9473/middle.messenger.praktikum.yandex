export const inputTemplate = `

<div class="input-wrapper {{inputWrapper}}">    
    <label for="{{id}}" class="label">{{label}}</label>    
    <input 
        id="{{id}}" 
        name="{{name}}" 
        type="{{#if type}}{{type}}{{else}}text{{/if}}" 
        value="{{value}}"
        placeholder="{{placeholder}}"
        {{#if required}}required="{{required}}"{{/if}}
        {{#if pattern}}pattern="{{pattern}}"{{/if}}
        class="input {{className}}"
        {{#if readOnly}}readonly{{/if}}
    />            
    {{#if validationError}}<span class="error">{{validationError}}</span>{{/if}}
</div>
`
