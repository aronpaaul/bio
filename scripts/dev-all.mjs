import { spawn } from 'node:child_process'

const front = spawn('npm', ['run', 'dev'], { stdio: 'inherit', shell: true })
const api = spawn('npm', ['run', 'server'], { stdio: ['ignore', 'inherit', 'inherit'], shell: true })
const children = [front, api]

let stopping = false

function stopAll() {
  if (stopping) {
    return
  }
  stopping = true
  for (const child of children) {
    child.kill()
  }
}

for (const child of children) {
  child.on('exit', stopAll)
}

process.on('SIGINT', stopAll)
process.on('SIGTERM', stopAll)
