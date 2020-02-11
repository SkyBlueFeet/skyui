import webpack from "webpack";

import ora from "ora";
import rimraf from "rimraf";
import chalk from "chalk";
import path from "path";

process.env.NODE_ENV = "production";

import client from "../example/build/webpack.client.config";
import server from "../example/build/webpack.server.config";

const spinner = ora("building for production...");
spinner.start();

function build(): Promise<unknown> {
    return new Promise((res, rej) => {
        rimraf(path.join("../dist", "../static"), err => {
            if (err) rej(err);
            webpack(client, (err, stats) => {
                if (err) rej(err);
                process.stdout.write(
                    stats.toString({
                        colors: true,
                        modules: false,
                        children: true, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
                        chunks: false,
                        chunkModules: false
                    }) + "\n\n"
                );
                webpack(server, (err, stats) => {
                    if (err) rej(err);
                    process.stdout.write(
                        stats.toString({
                            colors: true,
                            modules: false,
                            children: true, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
                            chunks: false,
                            chunkModules: false
                        }) + "\n\n"
                    );

                    if (stats.hasErrors()) {
                        console.log(chalk.red("  Build failed with errors.\n"));
                        process.exit(1);
                    }

                    console.log(chalk.cyan("  Build complete.\n"));
                    console.log(
                        chalk.green(
                            "  Tip: built files are meant to be served over an HTTP server.\n" +
                                "  Opening index.html over file:// won't work.\n"
                        )
                    );
                    spinner.stop();
                });
            });
        });
    });
}

export default build();
