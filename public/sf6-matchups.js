// Matchup knowledge base for SF6
const SF6_MATCHUPS_DATA = {
  // Format: "char1-vs-char2": { ... }
  "ryu-vs-ken": {
    rating: "5-5",
    difficulty: { "pt-BR": "Equilibrado", "en": "Even" },
    keyPoints: {
      "pt-BR": [
        "Ambos têm fireball game forte — neutro equilibrado",
        "Ken tem melhor pressão close range com run",
        "Ryu tem melhor controle de espaço com cr.MK",
        "Cuidado com Jinrai Kick do Ken após bloqueio"
      ],
      "en": [
        "Both have strong fireball game — balanced neutral",
        "Ken has better close range pressure with run",
        "Ryu has better space control with cr.MK",
        "Watch out for Ken's Jinrai Kick after block"
      ]
    },
    tips: {
      "pt-BR": [
        "Use Parry para lidar com pressão do Ken",
        "Mantenha distância média com cr.MK e Hadoken",
        "Anti-air é crucial — Ken tem muitas opções de pulo"
      ],
      "en": [
        "Use Parry to deal with Ken's pressure",
        "Maintain medium distance with cr.MK and Hadoken",
        "Anti-air is crucial — Ken has many jump options"
      ]
    },
    dangerousMoves: ["Ken's Jinrai Kick", "Ken's DR st.MP"],
    yourTools: {
      "pt-BR": ["cr.MK poke", "Parry", "Anti-air Shoryuken"],
      "en": ["cr.MK poke", "Parry", "Anti-air Shoryuken"]
    }
  },
  "ryu-vs-guile": {
    rating: "4-6",
    difficulty: { "pt-BR": "Desvantagem", "en": "Disadvantage" },
    keyPoints: {
      "pt-BR": [
        "Guile controla o ritmo com Sonic Boom",
        "Difícil se aproximar contra Sonic Boom + Flash Kick",
        "Guile tem melhores normals no neutro",
        "Drive Rush é essencial para fechar distância"
      ],
      "en": [
        "Guile controls the rhythm with Sonic Boom",
        "Hard to approach against Sonic Boom + Flash Kick",
        "Guile has better normals in neutral",
        "Drive Rush is essential to close distance"
      ]
    },
    tips: {
      "pt-BR": [
        "Use Drive Rush para passar por Sonic Booms",
        "Pule Sonic Booms com timing e faça j.HK",
        "Pressione quando Guile não tem charge",
        "Parry pode absorver Sonic Boom mas gasta drive"
      ],
      "en": [
        "Use Drive Rush to get through Sonic Booms",
        "Jump over Sonic Booms with timing and use j.HK",
        "Press when Guile has no charge",
        "Parry can absorb Sonic Boom but consumes drive"
      ]
    },
    dangerousMoves: ["Sonic Boom", "Flash Kick", "Guile's st.HP"],
    yourTools: {
      "pt-BR": ["Drive Rush", "Jump-in timing", "cr.MK whiff punish"],
      "en": ["Drive Rush", "Jump-in timing", "cr.MK whiff punish"]
    }
  },
  "ken-vs-guile": {
    rating: "5-5",
    difficulty: { "pt-BR": "Equilibrado", "en": "Even" },
    keyPoints: {
      "pt-BR": [
        "Ken tem ferramentas para lidar com zoning",
        "Jinrai Kick passa por Sonic Boom",
        "Run permite se aproximar rápido",
        "Guile ainda controla neutro de longe"
      ],
      "en": [
        "Ken has tools to deal with zoning",
        "Jinrai Kick goes through Sonic Boom",
        "Run allows quick approach",
        "Guile still controls neutral from afar"
      ]
    },
    tips: {
      "pt-BR": [
        "Use Jinrai Kick para passar Sonic Boom",
        "Run > throw é forte contra Guile defensive",
        "Cuidado com Flash Kick após pressão",
        "Mix throw e shimmy após knockdown"
      ],
      "en": [
        "Use Jinrai Kick to pass Sonic Boom",
        "Run > throw is strong against defensive Guile",
        "Watch out for Flash Kick after pressure",
        "Mix throw and shimmy after knockdown"
      ]
    },
    dangerousMoves: ["Flash Kick", "Guile's cr.HP AA"],
    yourTools: {
      "pt-BR": ["Jinrai Kick", "Run pressure", "DR st.MP"],
      "en": ["Jinrai Kick", "Run pressure", "DR st.MP"]
    }
  },
  "luke-vs-jp": {
    rating: "6-4",
    difficulty: { "pt-BR": "Vantagem", "en": "Advantage" },
    keyPoints: {
      "pt-BR": [
        "Luke tem ferramentas para lidar com zoning do JP",
        "Flash Knuckle passa por Torbalan",
        "JP é frágil sob pressão",
        "Cuidado com Departure do JP"
      ],
      "en": [
        "Luke has tools to deal with JP's zoning",
        "Flash Knuckle goes through Torbalan",
        "JP is fragile under pressure",
        "Watch out for JP's Departure"
      ]
    },
    tips: {
      "pt-BR": [
        "Use Flash Knuckle para fechar gap",
        "Pressão constante é a chave",
        "Não deixe JP jogar o jogo dele",
        "Anti-air é crítico contra j.HP do JP"
      ],
      "en": [
        "Use Flash Knuckle to close gap",
        "Constant pressure is key",
        "Don't let JP play his game",
        "Anti-air is critical against JP's j.HP"
      ]
    },
    dangerousMoves: ["JP's Torbalan", "JP's Departure", "JP's j.HP"],
    yourTools: {
      "pt-BR": ["Flash Knuckle", "st.HP AA", "Drive Rush pressure"],
      "en": ["Flash Knuckle", "st.HP AA", "Drive Rush pressure"]
    }
  },
  "cammy-vs-zangief": {
    rating: "6-4",
    difficulty: { "pt-BR": "Vantagem", "en": "Advantage" },
    keyPoints: {
      "pt-BR": [
        "Cammy tem mobilidade para evitar grabs",
        "Spiral Arrow mantém Zangief longe",
        "Zangief tem dificuldade pegando Cammy",
        "Cuidado com lariat e SPD range"
      ],
      "en": [
        "Cammy has mobility to avoid grabs",
        "Spiral Arrow keeps Zangief away",
        "Zangief has trouble catching Cammy",
        "Watch out for lariat and SPD range"
      ]
    },
    tips: {
      "pt-BR": [
        "Use Spiral Arrow para manter distância",
        "Dive Kick para cruzar e escapar",
        "Não fique em grab range",
        "Poke com st.MK e cr.MK"
      ],
      "en": [
        "Use Spiral Arrow to maintain distance",
        "Dive Kick to cross up and escape",
        "Don't stay in grab range",
        "Poke with st.MK and cr.MK"
      ]
    },
    dangerousMoves: ["SPD (all ranges)", "Lariat", "st.HP"],
    yourTools: {
      "pt-BR": ["Spiral Arrow", "Dive Kick", "Mobility"],
      "en": ["Spiral Arrow", "Dive Kick", "Mobility"]
    }
  },
  "default": {
    rating: "5-5",
    difficulty: { "pt-BR": "Desconhecido", "en": "Unknown" },
    keyPoints: {
      "pt-BR": [
        "Priorize o controle de espaço e não ceda o centro da tela",
        "Use Drive Parry contra especiais e confirme o punish quando houver espaço",
        "Varie entre pokes, Drive Rush e agarrão para não ficar previsível",
        "Observe os hábitos do oponente antes de escolher uma resposta fixa"
      ],
      "en": [
        "Prioritize space control and do not give up the center of the screen",
        "Use Drive Parry against specials and confirm the punish when there is room",
        "Vary pokes, Drive Rush, and throws so you do not become predictable",
        "Watch the opponent's habits before committing to a fixed answer"
      ]
    },
    tips: {
      "pt-BR": [
        "Aprenda os golpes puníveis do oponente",
        "Identifique os melhores pokes de cada um",
        "Teste diferentes estratégias em treino",
        "Assista replays de top players"
      ],
      "en": [
        "Learn opponent's punishable moves",
        "Identify best pokes for each",
        "Test different strategies in training",
        "Watch top player replays"
      ]
    },
    dangerousMoves: {
        "pt-BR": ["Especiais do oponente", "Normals de alcance"],
        "en": ["Opponent specials", "Long range normals"]
    },
    yourTools: {
      "pt-BR": ["Seus melhores pokes", "Anti-airs", "Drive system"],
      "en": ["Your best pokes", "Anti-airs", "Drive system"]
    }
  }
};

let SF6_MATCHUPS = {};

function updateMatchupsLanguage() {
  const lang = (typeof currentLang !== 'undefined') ? currentLang : (localStorage.getItem('sf6-hub-lang') || 'pt-BR');
  SF6_MATCHUPS = {};
  
  for (const [key, data] of Object.entries(SF6_MATCHUPS_DATA)) {
    SF6_MATCHUPS[key] = {
      rating: data.rating,
      difficulty: data.difficulty[lang] || data.difficulty['en'],
      keyPoints: data.keyPoints[lang] || data.keyPoints['en'],
      tips: data.tips[lang] || data.tips['en'],
      dangerousMoves: Array.isArray(data.dangerousMoves) ? data.dangerousMoves : (data.dangerousMoves[lang] || data.dangerousMoves['en']),
      yourTools: Array.isArray(data.yourTools) ? data.yourTools : (data.yourTools[lang] || data.yourTools['en'])
    };
  }
}

updateMatchupsLanguage();

// Builds useful, character-specific guidance when a researched pair is not in the database yet.
// This avoids showing the same generic copy for every unresearched matchup.
const SF6_CHARACTER_PROFILES = {
  ryu: { pt: { style: 'fireball e controle de espaço', tools: ['Hadoken', 'cr.MK', 'Shoryuken'], threat: 'Drive Rush após Hadoken' }, en: { style: 'fireballs and space control', tools: ['Hadoken', 'cr.MK', 'Shoryuken'], threat: 'Drive Rush after Hadoken' } },
  ken: { pt: { style: 'pressão ofensiva e Drive Rush', tools: ['Jinrai Kick', 'Dragonlash', 'Shoryuken'], threat: 'Jinrai Kick e corrida para throw' }, en: { style: 'offense and Drive Rush pressure', tools: ['Jinrai Kick', 'Dragonlash', 'Shoryuken'], threat: 'Jinrai Kick and run throw' } },
  chunli: { pt: { style: 'controle de espaço e stance', tools: ['Kikoken', 'cr.MK', 'Hazanshu'], threat: 'stance mix-up após Drive Rush' }, en: { style: 'space control and stance pressure', tools: ['Kikoken', 'cr.MK', 'Hazanshu'], threat: 'stance mix-up after Drive Rush' } },
  guile: { pt: { style: 'zoneamento com carga', tools: ['Sonic Boom', 'Flash Kick', 'st.MP'], threat: 'Sonic Boom + Flash Kick' }, en: { style: 'charge-based zoning', tools: ['Sonic Boom', 'Flash Kick', 'st.MP'], threat: 'Sonic Boom + Flash Kick' } },
  zangief: { pt: { style: 'grabs e dano de perto', tools: ['Lariat', 'SPD', 'st.MP'], threat: 'SPD no alcance de agarrão' }, en: { style: 'close-range grabs and damage', tools: ['Lariat', 'SPD', 'st.MP'], threat: 'SPD at throw range' } },
  cammy: { pt: { style: 'mobilidade e whiff punish', tools: ['Cannon Strike', 'Spiral Arrow', 'st.MK'], threat: 'Cannon Strike e Drive Rush' }, en: { style: 'mobility and whiff punishing', tools: ['Cannon Strike', 'Spiral Arrow', 'st.MK'], threat: 'Cannon Strike and Drive Rush' } },
  juri: { pt: { style: 'mobilidade e pressão com estoques', tools: ['Fuhajin', 'Dive Kick', 'cr.MK'], threat: 'Drive Rush após armazenar Fuhajin' }, en: { style: 'mobility and stock-based pressure', tools: ['Fuhajin', 'Dive Kick', 'cr.MK'], threat: 'Drive Rush after storing Fuhajin' } },
  blanka: { pt: { style: 'mobilidade imprevisível e distância', tools: ['Blanka Ball', 'Rainbow Ball', 'st.MK'], threat: 'Blanka Ball com mudança de trajetória' }, en: { style: 'unpredictable mobility and range', tools: ['Blanka Ball', 'Rainbow Ball', 'st.MK'], threat: 'Blanka Ball trajectory changes' } },
  dhalsim: { pt: { style: 'zoneamento de longo alcance', tools: ['Yoga Fire', 'Yoga Float', 'anti-air'], threat: 'Yoga Teleport após bloquear' }, en: { style: 'long-range zoning', tools: ['Yoga Fire', 'Yoga Float', 'anti-air'], threat: 'Yoga Teleport after blocking' } }
};

function buildUnresearchedMatchup(char1, char2) {
  const lang = (typeof currentLang !== 'undefined') ? currentLang : (localStorage.getItem('sf6-hub-lang') || 'pt-BR');
  const pt = lang !== 'en';
  const p1 = SF6_CHARACTER_PROFILES[char1.toLowerCase()]?.[pt ? 'pt' : 'en'];
  const p2 = SF6_CHARACTER_PROFILES[char2.toLowerCase()]?.[pt ? 'pt' : 'en'];
  const name1 = char1.charAt(0).toUpperCase() + char1.slice(1);
  const name2 = char2.charAt(0).toUpperCase() + char2.slice(1);
  const a = p1 || { style: pt ? 'suas condições de vitória' : 'your win conditions', tools: pt ? ['melhores pokes', 'anti-air', 'Drive Rush'] : ['best pokes', 'anti-air', 'Drive Rush'], threat: pt ? 'mix-up após Drive Rush' : 'mix-up after Drive Rush' };
  const b = p2 || { style: pt ? 'pressão e controle de espaço' : 'pressure and space control', tools: pt ? ['normals de alcance', 'especiais', 'Drive Rush'] : ['long normals', 'specials', 'Drive Rush'], threat: pt ? 'pressão ofensiva' : 'offensive pressure' };
  return {
    rating: '5-5',
    difficulty: pt ? 'Em análise' : 'Under review',
    keyPoints: pt ? [
      `${name1} disputa o neutro usando ${a.style}`,
      `${name2} busca impor ${b.style}`,
      `Respeite ${b.threat} e procure o punish depois de bloquear`,
      `Ajuste o plano conforme distância, Drive Gauge e hábito do oponente`
    ] : [
      `${name1} contests neutral with ${a.style}`,
      `${name2} wants to impose ${b.style}`,
      `Respect ${b.threat} and look for the punish after blocking`,
      `Adapt to spacing, Drive Gauge, and the opponent's habits`
    ],
    tips: pt ? [`Use ${a.tools[0]} para iniciar o plano`, `Confirme ${a.tools[1]} no neutro`, `Guarde ${a.tools[2]} para responder à entrada`, `Treine o punish de ${b.threat}`] : [`Use ${a.tools[0]} to start your game plan`, `Confirm ${a.tools[1]} in neutral`, `Save ${a.tools[2]} to answer approaches`, `Practice punishing ${b.threat}`],
    dangerousMoves: [b.threat, ...b.tools],
    yourTools: a.tools
  };
}

// Helper function to get matchup data
function getMatchupData(char1, char2) {
  const key1 = `${char1.toLowerCase()}-vs-${char2.toLowerCase()}`;
  const key2 = `${char2.toLowerCase()}-vs-${char1.toLowerCase()}`;
  
  // Check if we have data for this matchup
  if (SF6_MATCHUPS[key1]) {
    return { ...SF6_MATCHUPS[key1], perspective: char1 };
  } else if (SF6_MATCHUPS[key2]) {
    // Reverse the matchup
    const reversed = { ...SF6_MATCHUPS[key2] };
    // Invert rating (6-4 becomes 4-6)
    if (reversed.rating !== "5-5") {
      const [a, b] = reversed.rating.split('-');
      reversed.rating = `${b}-${a}`;
      // Invert difficulty
      if (reversed.difficulty === "Advantage" || reversed.difficulty === "Vantagem") {
          reversed.difficulty = (localStorage.getItem('sf6-hub-lang') === 'en' ? "Disadvantage" : "Desvantagem");
      }
      else if (reversed.difficulty === "Disadvantage" || reversed.difficulty === "Desvantagem") {
          reversed.difficulty = (localStorage.getItem('sf6-hub-lang') === 'en' ? "Advantage" : "Vantagem");
      }
    }
    return { ...reversed, perspective: char1 };
  }
  
  // Keep every unresearched pair useful and specific instead of repeating one generic message.
  return { ...buildUnresearchedMatchup(char1, char2), perspective: char1 };
}

// Get all available characters from combos
function getAvailableCharacters() {
  if (typeof SF6_COMBOS_DATA !== 'undefined') {
    return Object.values(SF6_COMBOS_DATA).map(c => c.character).sort();
  }
  return [];
}
