#### 2.0.0
- `storeDirectory` now configurable
- No more `actions` and `reducers` folder. Reducers and actions go into `storeDirectory` folder under their own file, or folder if rails style.

#### 1.0.4
- Security updates
- Flakiness in tests gone

#### 1.0.3
- Fix bug where `rsk reducer` errors if no reducers imported in reducer index.

#### 1.0.2
- Add -v and --version options
- Fixed bug in `setup-store` where error occurred when if the reducer directory didn't exist

#### 1.0.1
- Add eslint to dependencies

#### 1.0.0
- Support `sfc` and `cc` templates in config.

#### 0.1.0
- Added `connect` command.
- Use a .rsk.js instead of .rsk

#### 0.0.11
- Fixed errors that weren't being logged properly

#### 0.0.10
- Fix error when `{style: 'rails'}`

#### 0.0.9
- `rsk setup-store` command
-  Logging warnings when dependencies missing

#### 0.0.8
- Better success messaging
- Added import statement to the sfc render

#### 0.0.7
- Support for existing actions and reducer files

#### 0.0.6
- Support for existing ducks files

#### 0.0.5
- Added configurable components directory

#### 0.0.4
- Component scaffolding added