const rsk = require('../src/index.js');
const fs = require('fs-extra');
const makeDir = require('make-dir');
const del = require('del');
const tmpPath = `${process.cwd()}/tmp`;

describe('When running rsk in the command line', () => {
  beforeEach(async () => {
    await makeDir('tmp');
    process.argv.splice(2);
  });

  afterEach(async () => {
    await del(`${tmpPath}/*`);
  })

  it('class component should match the snapshot', async () => {
    process.argv.push('cc', 'potato', '--codeDirectory=tmp');
    await rsk();
    const output = await fs.readFile(`${tmpPath}/components/Potato/index.js`);

    expect(output.toString()).toMatchSnapshot()
  });
})