**Another use case that we were having is localisation related.**

Imagine situation, you implement completely new app that is going to have localisation.
You're using react-intl it has `<FormattedMessage/>` that takes mostly three props
`id`, it's an id of the string in your `fr.json` or any other JSON related to some language locale.
Then you have `defaultMessage` a fallback message in case this string in your language is not yet provided.
And `values` that basically an object of keys that will replace `{someValue}` inside of your translated string.
For example

```jsx
<FormattedMessage
  id="dashboard.helloMessage"
  defaultMessage="Hello, {username}"
  values={{
    username: props.username
  }}
/>
```

It's all cool, but there is a few problems.
First of all, when you create MVP you basically slap a lot of ids everywhere, relying mostly on your defaultMessage fallback.
But after you're done you have to go and MANUALLY create all those keys messages on the platform that we're using.
Sounds like a thing to automate? Sure, but in order to do that you had to create some JSON before you started to code, or
simultaneously, so you can easily iterate through its keys and add it all to the platform using its API.

**BUT.**
But doing that is super annoying, when in development, you better work out of your defaultMessages and don't care much about
these JSONs until it's already getting closer production.
Also, maintaining this JSON is super error prone, you can really miss a lot of keys and you will never know cause `defaultMessage`
will be there for you saving your day. Same applies to typos. Key maybe there in JSON, but message is not localised cause you have typo in `id` string.
So how can we not deal with JSON manually, but still enjoy automation and especially in the long run?

**AST!**
Again helps us here.
In essence we wrote one tool and one ESLint plugin in order to keep all usages of FormattedMessage statically analysable.
Firstly, about the tool.
In essence what it does it just goes through each and every JS and TS file using eslint-walk and estree-typescript parser 
finds the one that importing FormattedMessage, and ensures not calculated usages is there.
For example ....
