# Wu Yunheng Brand PR Portfolio

Bilingual brand PR and communications portfolio published at
[wuyunheng.com](https://wuyunheng.com/).

The site is a static React and Vite build deployed through GitHub Pages. Its
relative Vite base keeps assets working on the custom domain and on the
repository Pages path.

## Development

```bash
pnpm install --frozen-lockfile
pnpm run dev
```

## Production build

```bash
pnpm run build
```

The production build is written to `dist/`. The `public/CNAME` file is copied
into that directory so GitHub Pages retains the `wuyunheng.com` custom domain.

Pushes to `main` are deployed automatically by
`.github/workflows/deploy-pages.yml`. The workflow uses the committed pnpm
lockfile for deterministic dependency installation and verifies the generated
HTML and custom-domain file before deployment.
