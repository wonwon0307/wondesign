#!/usr/bin/env node

declare const __PKG_VERSION__: string;

import { Command } from "commander";

import { Converter } from "./converter";

const program = new Command();
const converter = new Converter();

program
  .name("svg2tsx")
  .description("WonDesign SVG2TSX CLI to generate React components from SVGs")
  .version(__PKG_VERSION__)
  .option("-c, --config <path>", "path to config file")
  .option("--dry-run", "preview changes without writing any files")
  .action(() => {
    const opts = program.opts();

    return converter.run(opts.config, opts.dryRun);
  });

program.parse();
