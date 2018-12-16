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

  it('setup-store should create store.js and match the snapshot', async () => {
    process.argv.push('setup-store', '--codeDirectory=tmp');
    await rsk();
    const output = await fs.readFile(`${tmpPath}/store.js`);

    expect(output.toString()).toMatchSnapshot()
  });

  it('setup-store should create reducer/index.js and match the snapshot', async () => {
    process.argv.push('setup-store', '--codeDirectory=tmp');
    await rsk();
    const output = await fs.readFile(`${tmpPath}/reducers/index.js`);

    expect(output.toString()).toMatchSnapshot()
  });
})