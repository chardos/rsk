const rsk = require('./index.js');
const fs = require('fs');

describe('When running rsk in the command line', () => {
  beforeEach(() => {
    process.argv.splice(2);
  })

  it('stateless functional component should match the snapshot', async () => {
    jest.spyOn(fs, 'writeFile').mockReturnValue(Promise.resolve(3));
    process.argv.push('sfc', 'potato');
    console.log('process.argv', process.argv);
    const output = await rsk();
    console.log('output', output);
  })

  // it('class component should match the snapshot', () => {
  //   process.argv.push('cc', 'potato');
  //   console.log('process.argv', process.argv);
  //   rsk()
  // })
})