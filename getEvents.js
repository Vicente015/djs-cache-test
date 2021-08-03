const fs = require('fs')

async function main() {
  let events = []
  let eventsFile = await fs.readFileSync('./events.txt', 'utf-8')
  for (let event of eventsFile.split('\n')) {
    events.push(event)
  }
  events = JSON.stringify(events, null, 2)
  console.log(events)
  return events
}
main()