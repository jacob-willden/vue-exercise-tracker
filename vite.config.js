import { readdirSync, readFile, writeFile } from 'fs';
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function getTableRows() {
	const parentPath = './dist/assets';
	let htmlRows = [];
	const fileNames = readdirSync(parentPath);
	for(let file of fileNames) {
		if(file.endsWith('.js')) {
			const name = `/assets/${file}`;
			const licenseURL = 'https://oss.oracle.com/licenses/upl/';
			const licenseName = 'UPL-1.0';
			const sourceURL = 'https://github.com/jacob-willden/poke-vue/blob/main/src/App.vue';
			const sourceName = 'App.vue';
			htmlRows += `<tr><td><a href="${name}">${name}</a></td><td><a href="${licenseURL}">${licenseName}</a></td><td><a href="${sourceURL}">${sourceName}</a></td></tr>`;
		}
	}
	return `<table id="jslicense-labels1"><tbody>${htmlRows}</tbody></table>`;
}

function scriptLicensesTable() {
	return {
		name: 'script-licenses-table',
		async closeBundle() {
			readFile(import.meta.dirname + '/dist/javascript/index.html', 'utf-8', (error, oldHTML) => {
				if(error) {
					console.error(error);
					return;
				}
				const regex = /\<table id=\"jslicense-labels1\">.*\<\/table>/;
				const newHTML = oldHTML.replace(regex, getTableRows());
				writeFile(import.meta.dirname + '/dist/javascript/index.html', newHTML, error => {
					if(error) console.error(error);
				});
			});
		}
	}
}

// https://vitejs.dev/config/
// https://github.com/vitejs/vite/issues/378#issuecomment-768816653
export default defineConfig({
	plugins: [vue(), scriptLicensesTable()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				javascript: resolve(__dirname, 'javascript/index.html')
			}
		}
	}
})
