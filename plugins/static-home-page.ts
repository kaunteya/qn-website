import fs from 'fs';
import path from 'path';
import type {Plugin} from '@docusaurus/types';

/**
 * The home page (`/`) is a plain HTML/CSS/JS page living in `home/`, not a
 * Docusaurus route. This plugin wires it into both commands:
 *
 * - `docusaurus build`: copies `home/` into the build output.
 * - `docusaurus start`: serves `home/` before the dev server rewrites unknown
 *   URLs to the Docusaurus SPA shell (which would render a 404 at `/`).
 *
 * It deliberately lives outside `static/`: a `static/index.html` collides with
 * the dev server's own generated `index.html`.
 */
const homeDir = path.join(__dirname, '..', 'home');

function resolveHomeFile(url: string): string | null {
	const pathname = decodeURIComponent(url.split('?')[0]!.split('#')[0]!);
	const file = path.join(homeDir, pathname === '/' ? 'index.html' : pathname);
	if (!file.startsWith(homeDir + path.sep)) {
		return null; // Path traversal.
	}
	return fs.existsSync(file) && fs.statSync(file).isFile() ? file : null;
}

export default function staticHomePagePlugin(): Plugin {
	return {
		name: 'static-home-page',

		async postBuild({outDir}) {
			await fs.promises.cp(homeDir, outDir, {recursive: true});
		},

		configureWebpack(_config, isServer) {
			if (isServer) {
				return {};
			}
			return {
				devServer: {
					setupMiddlewares: (middlewares: any[]) => {
						middlewares.unshift({
							name: 'static-home-page',
							path: '/',
							middleware: (req: any, res: any, next: () => void) => {
								const file = resolveHomeFile(req.url);
								if (file) {
									res.sendFile(file);
								} else {
									next();
								}
							},
						});
						return middlewares;
					},
				},
				// webpack's Configuration type doesn't cover devServer options.
			} as ReturnType<NonNullable<Plugin['configureWebpack']>>;
		},
	};
}
