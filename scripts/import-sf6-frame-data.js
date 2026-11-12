const fs = require('node:fs');
const https = require('node:https');
const path = require('node:path');

const SOURCE_REVISION = 'a8101eb02d079971ef7e194ac299b6b1bfcfe7c2';
const SOURCE_DATE = '2026-10-22';
const OFFICIAL_UPDATE_DATE = '2026-10-13';
const OFFICIAL_UPDATE_URL = 'https://www.streetfighter.com/6/buckler/en-us/information';
const SOURCE_FILE = `https://raw.githubusercontent.com/D4RKONION/FAT/${SOURCE_REVISION}/src/js/constants/framedata/SF6FrameData.json`;
const SOURCE_PAGE = `https://github.com/D4RKONION/FAT/blob/${SOURCE_REVISION}/src/js/constants/framedata/SF6FrameData.json`;
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'sf6-frame-data.js');

const CHARACTERS = {
  'A.K.I.': ['aki', 'A.K.I.'],
  Akuma: ['akuma', 'Akuma'],
  Alex: ['alex', 'Alex'],
  Arjun: ['arjun', 'Arjun'],
  Blanka: ['blanka', 'Blanka'],
  'C.Viper': ['c-viper', 'C. Viper'],
  Cammy: ['cammy', 'Cammy'],
  'Chun-Li': ['chun-li', 'Chun-Li'],
  'Dee Jay': ['deejay', 'Dee Jay'],
  Dhalsim: ['dhalsim', 'Dhalsim'],
  'E.Honda': ['e-honda', 'E. Honda'],
  Ed: ['ed', 'Ed'],
  Elena: ['elena', 'Elena'],
  Guile: ['guile', 'Guile'],
  Ingrid: ['ingrid', 'Ingrid'],
  Jamie: ['jamie', 'Jamie'],
  JP: ['jp', 'JP'],
  Juri: ['juri', 'Juri'],
  Ken: ['ken', 'Ken'],
  Kimberly: ['kimberly', 'Kimberly'],
  Lily: ['lily', 'Lily'],
  Luke: ['luke', 'Luke'],
  'M.Bison': ['m-bison', 'M. Bison'],
  Mai: ['mai', 'Mai'],
  Manon: ['manon', 'Manon'],
  Marisa: ['marisa', 'Marisa'],
  Rashid: ['rashid', 'Rashid'],
  Ryu: ['ryu', 'Ryu'],
  Sagat: ['sagat', 'Sagat'],
  Terry: ['terry', 'Terry'],
  Yasmine: ['yasmine', 'Yasmine'],
  Zangief: ['zangief', 'Zangief'],
};

function fetchJson(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          response.resume();
          if (redirects >= 5) return reject(new Error('Too many redirects while fetching frame data.'));
          return resolve(fetchJson(response.headers.location, redirects + 1));
        }

        if (response.statusCode !== 200) {
          response.resume();
          return reject(new Error(`Frame data source returned HTTP ${response.statusCode}.`));
        }

        let body = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => (body += chunk));
        response.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on('error', reject);
  });
}

function displayValue(value) {
  return value === null || value === undefined || value === '' ? '—' : String(value);
}

function activeFrames(startup, active) {
  const start = Number(startup);
  const duration = Number(active);
  if (Number.isFinite(start) && Number.isInteger(duration) && duration > 0) {
    return `${start}-${start + duration - 1}`;
  }
  return displayValue(active);
}

function convertMove(move, groupName, moveKey) {
  const groupPrefix = groupName === 'normal' ? '' : `[${groupName}] `;
  return {
    name: `${groupPrefix}${displayValue(move.moveName || moveKey)}`,
    input: displayValue(move.numCmd || move.plnCmd || move.ezCmd),
    startup: displayValue(move.startup),
    active: activeFrames(move.startup, move.active),
    recovery: displayValue(move.recovery),
    onBlock: displayValue(move.onBlock),
    onHit: displayValue(move.onHit),
    onCounterHit: displayValue(move.onPC),
    damage: Number.isFinite(Number(move.dmg)) ? Number(move.dmg) : null,
    notes: Array.isArray(move.extraInfo) ? move.extraInfo.join(' · ') : displayValue(move.extraInfo === undefined ? '' : move.extraInfo),
    moveType: displayValue(move.moveType),
    state: groupName,
  };
}

async function main() {
  const source = await fetchJson(SOURCE_FILE);
  const sourceNames = Object.keys(source);
  const expectedNames = Object.keys(CHARACTERS);
  const missingNames = expectedNames.filter((name) => !source[name]);
  const unexpectedNames = sourceNames.filter((name) => !CHARACTERS[name]);

  if (missingNames.length || unexpectedNames.length || sourceNames.length !== expectedNames.length) {
    throw new Error(`Roster mismatch. Missing: ${missingNames.join(', ') || 'none'}; unexpected: ${unexpectedNames.join(', ') || 'none'}.`);
  }

  const frameData = {};
  const characterNames = {};
  const moveCountByCharacter = {};

  for (const [sourceName, [characterId, displayName]] of Object.entries(CHARACTERS)) {
    const sourceMoves = source[sourceName].moves;
    if (!sourceMoves || typeof sourceMoves !== 'object' || Array.isArray(sourceMoves)) {
      throw new Error(`No move records found for ${sourceName}.`);
    }

    const moves = Object.entries(sourceMoves).flatMap(([groupName, groupMoves]) => {
      if (!groupMoves || typeof groupMoves !== 'object' || Array.isArray(groupMoves)) {
        throw new Error(`Invalid move group ${groupName} for ${sourceName}.`);
      }
      return Object.entries(groupMoves).map(([moveKey, move]) => convertMove(move, groupName, moveKey));
    });
    if (moves.some((move) => !move.name || move.name.endsWith('—'))) {
      throw new Error(`A move without a name was found for ${sourceName}.`);
    }

    frameData[characterId] = moves;
    characterNames[characterId] = displayName;
    moveCountByCharacter[characterId] = moves.length;
  }

  const meta = {
    sourceName: 'Frame Advantage Tool (FAT)',
    sourceUrl: SOURCE_PAGE,
    sourceRevision: SOURCE_REVISION,
    sourceDate: SOURCE_DATE,
    checkedAt: new Date().toISOString().slice(0, 10),
    officialUpdateDate: OFFICIAL_UPDATE_DATE,
    officialUpdateUrl: OFFICIAL_UPDATE_URL,
    patchNote: 'The upstream frame-data JSON does not include a numeric game patch identifier; this snapshot is pinned by commit and date.',
    characterCount: Object.keys(frameData).length,
    moveCount: Object.values(moveCountByCharacter).reduce((total, count) => total + count, 0),
    moveCountByCharacter,
    characterNames,
  };

  const output = `const SF6_FRAME_DATA_META = ${JSON.stringify(meta, null, 2)};\n\nconst SF6_FRAME_DATA = ${JSON.stringify(frameData, null, 2)};\n`;
  fs.writeFileSync(OUTPUT_PATH, output, 'utf8');
  process.stdout.write(`Updated ${OUTPUT_PATH} with ${meta.moveCount} moves for ${meta.characterCount} characters.\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
