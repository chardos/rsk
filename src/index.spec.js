const rsk = require('./index.js');
const fs = require('fs');
const makeDir = require('make-dir');
const tmpPath = `${process.cwd()}/tmp`

makeDir('tmp');
// jest.spyOn(fs, 'writeFile').mockReturnValue(Promise.resolve(null));

describe('When running rsk in the command line', () => {
  beforeEach(() => {
    process.argv.splice(2);
  });

  it('stateless functional component should match the snapshot', async () => {
    process.argv.push('sfc', 'potato', '--codeDirectory=tmp');
    await rsk();

    const output = fs.readFileSync(`${tmpPath}/components/Potato/index.js`);
    expect(output.toString()).toMatchSnapshot()
  });

  // it('class component should match the snapshot', async () => {
  //   process.argv.push('cc', 'potato');
  //   const output = await rsk();
  //   expect(output).toMatchSnapshot()
  // });
})