import { createApp } from './createApp'
import { host, port } from './config'

createApp().listen(port, host, () => {
  process.stdout.write('Гостевая книга слушает на http://' + host + ':' + port + '\n')
})
