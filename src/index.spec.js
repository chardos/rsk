const rsk = require('./index.js');
const fs = require('fs');

jest.spyOn(fs, 'writeFile').mockReturnValue(Promise.resolve(null));

describe('When running rsk in the command line', () => {
  beforeEach(() => {
    process.argv.splice(2);
  })

  it('stateless functional component should match the snapshot', async () => {
    process.argv.push('sfc', 'potato');
    const output = await rsk();
    expect(output).toMatchSnapshot()
  })

  it('class component should match the snapshot', async () => {
    process.argv.push('cc', 'potato');
    console.log('process.argv', process.argv);
    const output = await rsk();
    expect(output).toMatchSnapshot()
  })

})