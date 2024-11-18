# Contentstack implementation guides

## Available packages

- `contentstack-implementation-guide-angular`
- `contentstack-implementation-guide-astro`
- `contentstack-implementation-guide-next`
- `contentstack-implementation-guide-next-graphql`
- `contentstack-implementation-guide-next-middleware`
- `contentstack-implementation-guide-next-personalize`
- `contentstack-implementation-guide-next-ssg`
- `contentstack-implementation-guide-next-ssr`
- `contentstack-implementation-guide-nuxt`
- `contentstack-implementation-guide-nuxt-personalize`
- `contentstack-implementation-guide-nuxt-ssr`
- `contentstack-implementation-guide-php`
- `contentstack-implementation-guide-remix`
- `contentstack-implementation-guide-react`
- `contentstack-implementation-guide-sveltekit`

## Seed packages for stacks

- `contentstack-implementation-guides-seed`
- `contentstack-implementation-guides-p13n-seed`

### Import seed and create a stack

```bash
npm install -g @contentstack/cli
```

### Log in via the CLI

```bash
csdx auth:login
```

### Get your organization UID

In your Contentstack Organization dashboard find `Org admin` and copy your Organization ID (Example: `blt481c598b0d8352d9`).

### Create a new stack

Make sure to replace `<YOUR_ORG_ID>` with your actual Organization ID and run the below.

```bash
csdx cm:stacks:seed --repo "timbenniks/contentstack-implementation-guides-seed" --org "<YOUR_ORG_ID>" -n "Implementation Guide"

# For perosnalization
csdx cm:stacks:seed --repo "timbenniks/contentstack-implementation-guides-p13n-seed" --org "<YOUR_ORG_ID>" -n "Implementation Guide"
```

### Create a new delivery token.

Go to Settings > Tokens and create a delivery token. Select the `preview` scope and turn on `Create preview token`

## Maintenence

### Version bump packages

```bash
node version.js
```

### Publish all packages

```bash
node publish.js
```
