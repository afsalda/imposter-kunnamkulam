#!/usr/bin/env node
/**
 * Vercel CLI Deployment Script (Cross-Platform)
 * Usage: node deploy.cjs [project-path] [options]
 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const isWindows = os.platform() === 'win32';
const ALLOWED_COMMANDS = new Set(['vercel', 'npm', 'pnpm', 'yarn']);
function log(msg) { console.error(msg); }
function commandExists(cmd) {
  if (!ALLOWED_COMMANDS.has(cmd)) throw new Error(`Command not in whitelist: ${cmd}`);
  try {
    if (isWindows) { const r = spawnSync('where', [cmd], { stdio: 'ignore' }); return r.status === 0; }
    else { const r = spawnSync('sh', ['-c', `command -v "$1"`, '--', cmd], { stdio: 'ignore' }); return r.status === 0; }
  } catch { return false; }
}
function getCommandOutput(cmd, args) {
  try {
    const r = spawnSync(cmd, args, { encoding: 'utf8', stdio: ['pipe','pipe','ignore'], shell: isWindows });
    return r.status === 0 ? (r.stdout || '').trim() : null;
  } catch { return null; }
}
function detectPackageManager(projectPath) {
  if (fs.existsSync(path.join(projectPath, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(projectPath, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(projectPath, 'package-lock.json'))) return 'npm';
  if (commandExists('pnpm')) return 'pnpm';
  if (commandExists('yarn')) return 'yarn';
  if (commandExists('npm')) return 'npm';
  return null;
}
function runBuildIfNeeded(projectPath) {
  const pj = path.join(projectPath, 'package.json');
  if (!fs.existsSync(pj)) { log('No package.json, skipping build'); return true; }
  let pkg;
  try { pkg = JSON.parse(fs.readFileSync(pj, 'utf8')); } catch(e) { return true; }
  if (!pkg.scripts || !pkg.scripts.build) { log('No build script, skipping build'); return true; }
  log('\n========================================'); log('Running pre-deployment build...'); log('========================================\n');
  const pm = detectPackageManager(projectPath);
  if (!pm) { log('Error: No package manager found'); process.exit(1); }
  log(`Using package manager: ${pm}`);
  const nm = path.join(projectPath, 'node_modules');
  if (!fs.existsSync(nm)) {
    log('node_modules not found, installing dependencies first...\n');
    const installArgs = pm === 'yarn' ? [] : ['install'];
    const r = spawnSync(pm, installArgs, { cwd: projectPath, stdio: 'inherit', shell: isWindows });
    if (r.status !== 0) { log('\nError: Failed to install dependencies'); process.exit(1); }
    log('\nDependencies installed successfully');
  }
  const buildArgs = pm === 'npm' ? ['run', 'build'] : ['build'];
  log(`Executing: ${pm} ${buildArgs.join(' ')}\n`);
  const r = spawnSync(pm, buildArgs, { cwd: projectPath, stdio: 'inherit', shell: isWindows });
  if (r.status !== 0) { log('\n========================================'); log('Build FAILED!'); log('========================================\n'); process.exit(1); }
  log('\n========================================'); log('Build completed successfully!'); log('========================================');
  return true;
}
function doDeploy(projectPath) {
  log('\nStarting deployment...\n');
  log('Deployment environment: Production (Public)\n');
  log('========================================');
  const args = ['vercel', '--prod', '--yes'];
  log(`Executing: ${args.join(' ')}\n`);
  const result = spawnSync('vercel', ['--prod', '--yes'], {
    cwd: projectPath, encoding: 'utf8', stdio: ['inherit','pipe','pipe'],
    timeout: 300000, shell: isWindows
  });
  const output = (result.stdout || '') + (result.stderr || '');
  log(output);
  if (result.status !== 0) { log('\nDeployment failed'); process.exit(1); }
  const aliasedMatch = output.match(/Aliased:\s*(https:\/\/[a-zA-Z0-9.-]+\.vercel\.app)/i);
  const deploymentMatch = output.match(/Production:\s*(https:\/\/[a-zA-Z0-9.-]+\.vercel\.app)/i);
  const finalUrl = (aliasedMatch ? aliasedMatch[1] : null) || (deploymentMatch ? deploymentMatch[1] : null);
  log('\n========================================'); log('Deployment successful!'); log('========================================\n');
  if (finalUrl) { log(`Your site is live! Visit: ${finalUrl}\n`); console.log(JSON.stringify({ status: 'success', url: finalUrl })); }
  else { console.log(JSON.stringify({ status: 'success', message: 'Deployment successful' })); }
}
function main() {
  log('========================================'); log('Vercel CLI Project Deployment'); log('========================================\n');
  const projectPath = process.cwd();
  if (!fs.existsSync(projectPath) || !fs.statSync(projectPath).isDirectory()) { log(`Error: Project directory does not exist: ${projectPath}`); process.exit(1); }
  log(`Project path: ${projectPath}\n`);
  runBuildIfNeeded(projectPath);
  doDeploy(projectPath);
}
main();
