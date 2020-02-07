/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import * as fs from "fs"
import * as path from 'path';
import * as net from 'net';
import * as child_process from "child_process";

import { workspace, Disposable, ExtensionContext, window, MessageOptions, env, Uri } from 'vscode';
import { LanguageClient, LanguageClientOptions, SettingMonitor, StreamInfo } from 'vscode-languageclient';

export function activate(context: ExtensionContext) {

	function createServer(): Promise<StreamInfo> {
		return new Promise((resolve, reject) => {
			var server = net.createServer((socket) => {
				console.log("Creating server");

				resolve({
					reader: socket,
					writer: socket
				});

				socket.on('end', () => console.log("Disconnected"));
			}).on('error', (err) => {
				// handle errors here
				throw err;
			});

			let javaExecutablePath = findJavaExecutable('java');
			if (javaExecutablePath == null) {
				const messageOptions:MessageOptions = {modal:false};
				window.showErrorMessage("Couldn't locate java in $JAVA_HOME or $PATH. ", messageOptions, "Install Java").then(select => {
					if(select === "Install Java"){
						env.openExternal(Uri.parse('https://' + "www.java.com/ja/download/manual.jsp"))
					}else{
						window.showErrorMessage("VDM++ language server can't launching.")
					}
				})
				return
			}
 			// grab a random port.
			server.listen(() => {
				// Start the child java process
				let options = { cwd: workspace.rootPath };

				let args = [
					'-jar',
					path.resolve(context.extensionPath, './', 'assets', 'vdmpp-language-server-1.0-SNAPSHOT.jar'),
					server.address().port.toString()
				]

				let process = child_process.spawn(javaExecutablePath, args, options);

				// Send raw output to a file
				if (!fs.existsSync(context.storagePath))
					fs.mkdirSync(context.storagePath);

				let logFile = context.storagePath + '/vscode-languageserver-java-example.log';
				let logStream = fs.createWriteStream(logFile, { flags: 'w' });

				process.stdout.pipe(logStream);
				process.stderr.pipe(logStream);

				console.log(`Storing log in '${logFile}'`);
			});					
		});
	};

	// Options to control the language client
	let clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'vdmpp' }],
		synchronize: {
			// Synchronize the setting section 'VdmppLanguageServer' to the server
			configurationSection: 'VdmppLanguageServer',
			// Notify the server about file changes to '.clientrc files contain in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.vdmpp')
		}
	}

	// Create the language client and start the client.
	let disposable = new LanguageClient('VdmppLanguageServer', 'VDM++ Language Server', createServer, clientOptions).start();

	// Push the disposable to the context's subscriptions so that the 
	// client can be deactivated on extension deactivation
	context.subscriptions.push(disposable);
}

// MIT Licensed code from: https://github.com/georgewfraser/vscode-javac
function findJavaExecutable(binname: string) {
	binname = correctBinname(binname);

	// First search each JAVA_HOME bin folder
	if (process.env['JAVA_HOME']) {
		let workspaces = process.env['JAVA_HOME'].split(path.delimiter);
		for (let i = 0; i < workspaces.length; i++) {
			let binpath = path.join(workspaces[i], 'bin', binname);
			if (fs.existsSync(binpath)) {
				return binpath;
			}
		}
	}

	// Then search PATH parts
	if (process.env['PATH']) {
		let pathparts = process.env['PATH'].split(path.delimiter);
		for (let i = 0; i < pathparts.length; i++) {
			let binpath = path.join(pathparts[i], binname);
			if (fs.existsSync(binpath)) {
				return binpath;
			}
		}
	}

	// Else return the binary name directly (this will likely always fail downstream) 
	return null;
}

function correctBinname(binname: string) {
	if (process.platform === 'win32')
		return binname + '.exe';
	else
		return binname;
}
