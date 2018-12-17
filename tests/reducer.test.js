const rsk = require('../src/index.js');
const fs = require('fs-extra');
const makeDir = require('make-dir');
const del = require('del');
const tmpPath = `${process.cwd()}/tmp`;

describe('"reducer" command', () => {
  beforeEach(async () => {
    await makeDir('tmp');
    process.argv.splice(2);
  });

  afterEach(async () => {
    await del(`${tmpPath}/*`);
  })

  describe('When creating a new reducer', () => {
    describe('when style = "rails"', () => {
      it('the files should match snapshot', async () => {
        process.argv.push('setup-store', '--codeDirectory=tmp');
        await rsk();
        process.argv.splice(2);
        process.argv.push('reducer', 'sports', 'volleyball', 'soccer', '--codeDirectory=tmp');
        await rsk();
        const actionOutput = await fs.readFile(`${tmpPath}/actions/sports.js`);
        const reducerOutput = await fs.readFile(`${tmpPath}/reducers/sports.js`);
        
        expect([
          actionOutput.toString(),
          reducerOutput.toString()
        ]).toMatchSnapshot()
      })
    });
  })
})