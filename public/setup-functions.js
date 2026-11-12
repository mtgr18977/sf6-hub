// Setup functions for dynamically loaded content

function setupCalculators() {
  // Calculator 1: Total Frames
  const calc1Btn = document.getElementById('calc1-btn');
  const calc1Result = document.getElementById('calc1-result');
  if(calc1Btn) {
    calc1Btn.addEventListener('click', () => {
      const startup = parseInt(document.getElementById('calc1-startup').value) || 0;
      const active = parseInt(document.getElementById('calc1-active').value) || 0;
      const recovery = parseInt(document.getElementById('calc1-recovery').value) || 0;
      
      if(startup === 0 && active === 0 && recovery === 0) {
        alert(t('alert_fill_at_least_one'));
        return;
      }
      
      const total = startup + active + recovery;
      calc1Result.style.display = 'block';
      calc1Result.querySelector('div:nth-child(2)').textContent = `${total}f`;
      calc1Result.querySelector('div:nth-child(3)').textContent = `Soma: ${startup} + ${active} + ${recovery} = ${total} frames`;
    });
  }

  // Calculator 2: Punish Check
  const calc2Btn = document.getElementById('calc2-btn');
  const calc2Result = document.getElementById('calc2-result');
  if(calc2Btn) {
    calc2Btn.addEventListener('click', () => {
      const onBlock = parseInt(document.getElementById('calc2-onblock').value);
      const startup = parseInt(document.getElementById('calc2-startup').value);
      
      if(isNaN(onBlock) || isNaN(startup)) {
        alert(t('alert_fill_both'));
        return;
      }
      
      const gap = Math.abs(onBlock);
      const canPunish = startup <= gap;
      const frameWindow = gap - startup;
      
      calc2Result.style.display = 'block';
      
      if(canPunish) {
        if(frameWindow === 0) {
          calc2Result.style.background = 'rgba(254,240,138,0.1)';
          calc2Result.style.border = '1px solid rgba(254,240,138,0.3)';
          calc2Result.querySelector('div:nth-child(1)').textContent = t('calc2_result_tight');
          calc2Result.querySelector('div:nth-child(1)').style.color = '#fef08a';
          calc2Result.querySelector('div:nth-child(2)').textContent = t('calc2_result_tight_desc');
        } else {
          calc2Result.style.background = 'rgba(79,209,197,0.1)';
          calc2Result.style.border = '1px solid rgba(79,209,197,0.3)';
          calc2Result.querySelector('div:nth-child(1)').textContent = t('calc2_result_punishable');
          calc2Result.querySelector('div:nth-child(1)').style.color = '#4fd1c5';
          calc2Result.querySelector('div:nth-child(2)').textContent = t('calc2_result_punishable_desc').replace('{window}', frameWindow);
        }
      } else {
        calc2Result.style.background = 'rgba(252,165,165,0.1)';
        calc2Result.style.border = '1px solid rgba(252,165,165,0.3)';
        calc2Result.querySelector('div:nth-child(1)').textContent = t('calc2_result_not');
        calc2Result.querySelector('div:nth-child(1)').style.color = '#fca5a5';
        calc2Result.querySelector('div:nth-child(2)').textContent = t('calc2_result_not_desc').replace('{startup}', startup).replace('{gap}', gap);
      }
    });
  }

  // Calculator 3: Blockstring Gap
  const calc3Btn = document.getElementById('calc3-btn');
  const calc3Result = document.getElementById('calc3-result');
  if(calc3Btn) {
    calc3Btn.addEventListener('click', () => {
      const advantage = parseInt(document.getElementById('calc3-advantage').value);
      const startup = parseInt(document.getElementById('calc3-startup').value);
      
      if(isNaN(advantage) || isNaN(startup)) {
        alert(t('alert_fill_both'));
        return;
      }
      
      const gap = startup - advantage;
      calc3Result.style.display = 'block';
      calc3Result.querySelector('div:nth-child(2)').textContent = `${gap} frame(s)`;
      
      if(gap <= 0) {
        calc3Result.style.background = 'rgba(79,209,197,0.1)';
        calc3Result.style.border = '1px solid rgba(79,209,197,0.3)';
        calc3Result.querySelector('div:nth-child(2)').style.color = '#4fd1c5';
        calc3Result.querySelector('div:nth-child(3)').textContent = t('calc3_result_true');
      } else if(gap <= 2) {
        calc3Result.style.background = 'rgba(254,240,138,0.1)';
        calc3Result.style.border = '1px solid rgba(254,240,138,0.3)';
        calc3Result.querySelector('div:nth-child(2)').style.color = '#fef08a';
        calc3Result.querySelector('div:nth-child(3)').textContent = t('calc3_result_small');
      } else if(gap <= 4) {
        calc3Result.style.background = 'rgba(251,191,36,0.1)';
        calc3Result.style.border = '1px solid rgba(251,191,36,0.3)';
        calc3Result.querySelector('div:nth-child(2)').style.color = '#fbbf24';
        calc3Result.querySelector('div:nth-child(3)').textContent = t('calc3_result_moderate');
      } else {
        calc3Result.style.background = 'rgba(252,165,165,0.1)';
        calc3Result.style.border = '1px solid rgba(252,165,165,0.3)';
        calc3Result.querySelector('div:nth-child(2)').style.color = '#fca5a5';
        calc3Result.querySelector('div:nth-child(3)').textContent = t('calc3_result_large');
      }
    });
  }
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function safeExternalUrl(value, allowedHost) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === allowedHost ? url.href : '';
  } catch {
    return '';
  }
}

function setupCombos() {
  const comboCharSelect = document.getElementById('combo-character-select');
  const comboDiffFilter = document.getElementById('combo-difficulty-filter');
  const comboList = document.getElementById('combo-list');
  const comboCopyAll = document.getElementById('combo-copy-all');
  const comboSourceNote = document.getElementById('combo-source-note');
  const comboSourceLink = document.getElementById('combo-source-link');
  let currentCombos = [];

  // Populate character dropdown
  if(typeof SF6_COMBOS !== 'undefined' && comboCharSelect) {
    Object.keys(SF6_COMBOS).sort().forEach(charKey => {
      const option = document.createElement('option');
      option.value = charKey;
      option.textContent = SF6_COMBOS[charKey].character;
      comboCharSelect.appendChild(option);
    });
  }

  function updateSourceState(charData) {
    if (!comboSourceNote || !comboSourceLink) return;

    const sourceUrl = safeExternalUrl(charData?.communitySourceUrl || SF6_COMBO_DATA_META.sourceUrl, 'sf6combo.kagewebsite.com');
    comboSourceLink.href = sourceUrl || SF6_COMBO_DATA_META.sourceUrl;
    comboSourceLink.textContent = t('combos_source_link');

    if (!charData) {
      comboSourceNote.textContent = t('combos_source_initial');
      return;
    }

    const combos = Array.isArray(charData.combos) ? charData.combos : [];
    const communityCount = combos.filter((combo) => Boolean(combo.sourceUrl && combo.sourceDate)).length;
    const legacyCount = combos.length - communityCount;

    if (communityCount > 0 && legacyCount > 0) {
      comboSourceNote.textContent = t('combos_source_mixed')
        .replace('{community}', communityCount)
        .replace('{legacy}', legacyCount)
        .replace('{character}', charData.character);
    } else if (communityCount > 0) {
      comboSourceNote.textContent = t('combos_source_community')
        .replace('{count}', communityCount)
        .replace('{published}', charData.communityPublishedRouteCount || communityCount)
        .replace('{character}', charData.character)
        .replace('{date}', charData.communityLatestSourceDate || '');
    } else if (legacyCount > 0 && charData.communitySourceStatus === 'no-submissions') {
      comboSourceNote.textContent = t('combos_source_legacy_no_community')
        .replace('{count}', legacyCount)
        .replace('{character}', charData.character)
        .replace('{checkedAt}', charData.communitySourceCheckedAt || SF6_COMBO_DATA_META.checkedAt);
    } else if (legacyCount > 0) {
      comboSourceNote.textContent = t('combos_source_legacy')
        .replace('{count}', legacyCount)
        .replace('{character}', charData.character);
    } else if (charData.communitySourceStatus === 'no-submissions') {
      comboSourceNote.textContent = t('combos_source_empty_checked')
        .replace('{character}', charData.character)
        .replace('{checkedAt}', charData.communitySourceCheckedAt || SF6_COMBO_DATA_META.checkedAt);
    } else if (charData.communitySourceStatus === 'parse-incomplete') {
      comboSourceNote.textContent = t('combos_source_parse_error')
        .replace('{character}', charData.character)
        .replace('{count}', charData.communityPublishedRouteCount || 0);
    } else {
      comboSourceNote.textContent = t('combos_source_empty').replace('{character}', charData.character);
    }
  }

  function renderCombos() {
    const selectedChar = comboCharSelect?.value;
    const selectedDiff = comboDiffFilter?.value || '';
    const selectedCharacterData = selectedChar ? SF6_COMBOS[selectedChar] : null;

    updateSourceState(selectedCharacterData);
    if (comboCopyAll) comboCopyAll.disabled = true;

    if (!selectedChar || !selectedCharacterData) {
      comboList.textContent = t('combos_empty');
      currentCombos = [];
      return;
    }

    const charData = selectedCharacterData;
    if (!Array.isArray(charData.combos) || charData.combos.length === 0) {
      currentCombos = [];
      const notice = document.createElement('div');
      notice.className = 'data-coverage-message';
      notice.textContent = t('combos_unpublished').replace('{character}', charData.character);
      comboList.replaceChildren(notice);
      return;
    }

    let combos = charData.combos;
    if (selectedDiff) combos = combos.filter(combo => combo.difficulty === selectedDiff);
    currentCombos = combos;
    if (comboCopyAll) comboCopyAll.disabled = combos.length === 0;

    if (combos.length === 0) {
      comboList.textContent = t('combos_no_results');
      return;
    }

    comboList.innerHTML = '';
    combos.forEach((combo) => {
      const card = document.createElement('div');
      card.className = 'combo-card';
      
      const diffClass = combo.difficulty.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9-]/g, '');
      const sourceUrl = safeExternalUrl(combo.sourceUrl, 'sf6combo.kagewebsite.com');
      const sourceDate = currentLang === 'pt-BR' ? combo.sourceDateDisplayPt : combo.sourceDateDisplay;
      const verificationLabel = sourceUrl ? t('combo_community_badge') : t('combo_legacy_badge');
      const sourceCitation = sourceUrl
        ? `<a class="combo-source-citation" href="${escapeHtml(sourceUrl)}" target="_blank" rel="noopener noreferrer">${t('combo_source_citation').replace('{author}', escapeHtml(combo.sourceAuthor || 'community')).replace('{date}', escapeHtml(sourceDate || ''))}</a>`
        : `<span class="combo-source-citation">${t('combo_legacy_badge')}</span>`;
      
      card.innerHTML = `
        <div class="combo-header">
          <div class="combo-title">${escapeHtml(combo.combo)}</div>
          <span class="difficulty-badge ${diffClass}">${escapeHtml(combo.difficulty)}</span>
          <span class="badge">${verificationLabel}</span>
        </div>
        <div class="combo-notation">${escapeHtml(combo.notation)}</div>
        <div class="combo-info">
          <div class="combo-info-item">
            <strong>${t('combo_starter')}:</strong> ${escapeHtml(combo.starter)}
          </div>
          <div class="combo-info-item">
            <strong>${t('combo_damage')}:</strong> ${escapeHtml(combo.damage)}
          </div>
          <div class="combo-info-item">
            <strong>${t('combo_situation')}:</strong> ${escapeHtml(combo.situation)}
          </div>
        </div>
        <div class="combo-notes">${escapeHtml(combo.notes)}</div>
        <div class="combo-source-row">${sourceCitation}</div>
      `;

      card.addEventListener('click', () => {
        openComboModal(charData.character, combo);
      });
      card.querySelector('.combo-source-citation')?.addEventListener('click', (event) => event.stopPropagation());

      comboList.appendChild(card);
    });
  }

  if(comboCharSelect) {
    comboCharSelect.addEventListener('change', renderCombos);
    comboDiffFilter.addEventListener('change', renderCombos);

    const pendingCharacter = window.__pendingComboCharacter;
    if(pendingCharacter && SF6_COMBOS[pendingCharacter]) {
      comboCharSelect.value = pendingCharacter;
      window.__pendingComboCharacter = '';
      renderCombos();
    }
  }

  // Initialize combo modal
  setupComboModal();

  if(comboCopyAll) {
    comboCopyAll.addEventListener('click', async () => {
      if(currentCombos.length === 0) {
        alert(t('alert_select_char'));
        return;
      }

      const selectedChar = comboCharSelect.value;
      const charName = SF6_COMBOS[selectedChar].character;
      
      let text = `=== COMBOS: ${charName.toUpperCase()} ===\n\n`;
      
      currentCombos.forEach((combo) => {
        text += `[${combo.difficulty}] ${combo.combo}\n`;
        text += `${t('combo_notation')}: ${combo.notation}\n`;
        text += `${t('combo_starter')}: ${combo.starter} | ${t('combo_damage')}: ${combo.damage} | ${combo.situation}\n`;
        text += `${combo.notes}\n\n`;
      });

      try {
        await navigator.clipboard.writeText(text);
        const original = comboCopyAll.textContent;
        comboCopyAll.textContent = t('copy_success');
        setTimeout(() => comboCopyAll.textContent = original, 1500);
      } catch(err) {
        alert(t('copy_fail'));
      }
    });
  }
}

function setupFrameData() {
  const fdFilter = document.getElementById('fd-filter');
  const fdBody = document.getElementById('fd-body');
  const fdMsg = document.getElementById('fd-message');
  const fdResultCount = document.getElementById('fd-result-count');
  const fdTableContainer = document.getElementById('fd-table-container');
  const characterSearchAliases = {
    'c-viper': ['viper'],
    deejay: ['dj'],
    'e-honda': ['honda'],
    'm-bison': ['bison']
  };
  const fdSourceNote = document.getElementById('fd-source-note');
  const fdSourceLink = document.getElementById('fd-source-link');
  const fdOfficialLink = document.getElementById('fd-official-link');

  if (typeof SF6_FRAME_DATA_META !== 'undefined') {
    if (fdSourceNote) {
      fdSourceNote.textContent = t('fd_source_note')
        .replace('{sourceDate}', SF6_FRAME_DATA_META.sourceDate)
        .replace('{officialUpdateDate}', SF6_FRAME_DATA_META.officialUpdateDate);
    }
  if (fdSourceLink) {
    fdSourceLink.href = safeExternalUrl(SF6_FRAME_DATA_META.sourceUrl, 'github.com') || 'https://github.com';
    fdSourceLink.textContent = t('fd_source_link');
  }
  if (fdOfficialLink) {
    fdOfficialLink.href = safeExternalUrl(SF6_FRAME_DATA_META.officialUpdateUrl, 'www.streetfighter.com') || 'https://www.streetfighter.com/6/buckler/en-us/information';
    fdOfficialLink.textContent = t('fd_official_link');
  }
  }

  function normalize(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function getCharacterName(char) {
    if (typeof SF6_FRAME_DATA_META !== 'undefined' && SF6_FRAME_DATA_META.characterNames) {
      return SF6_FRAME_DATA_META.characterNames[char] || char;
    }
    return char.charAt(0).toUpperCase() + char.slice(1);
  }

  function renderFrameData(query) {
    if (typeof SF6_FRAME_DATA === 'undefined') return;

    const q = normalize(query);
    fdBody.replaceChildren();
    if (fdResultCount) fdResultCount.textContent = '';

    if (q === '') {
      fdMsg.style.display = 'block';
      fdTableContainer.style.display = 'none';
      fdMsg.textContent = t('fd_initial_msg');
      return;
    }

    const characterEntries = Object.entries(SF6_FRAME_DATA);
    const matchedCharacterIds = new Set();

    if (q.length >= 2) {
      for (const [char] of characterEntries) {
        const nameCandidates = [char, getCharacterName(char), ...(characterSearchAliases[char] || [])]
          .map(normalize);
        if (nameCandidates.some(name => name === q || name.startsWith(q) || (q.length >= 4 && name.includes(q)))) {
          matchedCharacterIds.add(char);
        }
      }
    }

    const isCharacterSearch = matchedCharacterIds.size > 0;
    const matches = [];

    for (const [char, moves] of characterEntries) {
      if (isCharacterSearch && !matchedCharacterIds.has(char)) continue;
      const charName = getCharacterName(char);

      for (const move of moves) {
        if (isCharacterSearch) {
          matches.push({ charName, move });
          continue;
        }

        const moveText = normalize(`${move.name} ${move.input} ${move.startup} ${move.active} ${move.onBlock} ${move.onHit} ${move.onCounterHit} ${move.recovery} ${move.damage} ${move.notes || ''}`);
        if (moveText.includes(q)) matches.push({ charName, move });
      }
    }

    if (matches.length === 0) {
      fdMsg.style.display = 'block';
      fdTableContainer.style.display = 'none';
      fdMsg.textContent = t('fd_no_data');
      return;
    }

    const MAX_ROWS = 500;
    const visibleMatches = matches.slice(0, MAX_ROWS);
    const fragment = document.createDocumentFragment();

    for (const { charName, move } of visibleMatches) {
      const tr = document.createElement('tr');
      tr.className = 'frame-data-row';
      tr.innerHTML = `
        <td>${escapeHtml(charName)}</td>
        <td>${escapeHtml(move.name)}</td>
        <td>${escapeHtml(move.input)}</td>
        <td>${escapeHtml(move.startup)}</td>
        <td>${escapeHtml(move.active)}</td>
        <td style="color:${getFrameColor(move.onBlock)}">${escapeHtml(move.onBlock)}</td>
        <td style="color:${getFrameColor(move.onHit)}">${escapeHtml(move.onHit)}</td>
        <td style="color:${getFrameColor(move.onCounterHit)}">${escapeHtml(move.onCounterHit)}</td>
        <td>${escapeHtml(move.recovery)}</td>
        <td>${escapeHtml(move.damage)}</td>
        <td class="fd-notes-cell">${escapeHtml(move.notes || '')}</td>
      `;
      tr.addEventListener('click', () => openFrameDataModal(charName, move));
      fragment.appendChild(tr);
    }

    fdBody.appendChild(fragment);
    fdMsg.style.display = 'none';
    fdTableContainer.style.display = 'block';

    if (fdResultCount) {
      if (matches.length > MAX_ROWS) {
        fdResultCount.textContent = t('fd_results_capped')
          .replace('{count}', visibleMatches.length)
          .replace('{total}', matches.length);
      } else if (isCharacterSearch) {
        const characterNames = [...matchedCharacterIds].map(getCharacterName).join(', ');
        fdResultCount.textContent = t('fd_character_results')
          .replace('{count}', matches.length)
          .replace('{characters}', characterNames);
      } else {
        fdResultCount.textContent = t('fd_results_count').replace('{count}', matches.length);
      }
    }
  }

  if(fdFilter){
    fdFilter.addEventListener('input', (e) => {
      renderFrameData(e.target.value.trim());
    });
  }

  // Initialize modal logic
  setupFrameDataModal();
}

// Helper function for frame advantage colors
function getFrameColor(val){
  if(val === '' || val === undefined || val === null || val === '—' || val === 'N/A') return 'inherit';
  const n = parseInt(val);
  if(isNaN(n)) return 'inherit';
  if(n > 0) return '#4fd1c5'; // Plus (Cyan)
  if(n < 0 && n >= -2) return '#e6eef6'; // Safe-ish (White/Light)
  if(n < -2) return '#fca5a5'; // Unsafe (Reddish)
  return 'inherit';
}

// Modal system for Frame Data explanations
function setupFrameDataModal() {
  const modal = document.getElementById('fd-modal');
  const modalClose = document.querySelector('.modal-close');

  if(modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if(modal) {
    modal.addEventListener('click', (e) => {
      if(e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    if(modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

function openFrameDataModal(character, move) {
  const modal = document.getElementById('fd-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalTbody = document.getElementById('modal-tbody');

  if(!modal || !modalTitle || !modalSubtitle || !modalTbody) return;

  modalTitle.textContent = `${character} — ${move.name}`;
  modalSubtitle.textContent = t('modal_fd_interpretation_detailed');
  
  modalTbody.innerHTML = '';
  
  // Build explanation rows
  const rows = [
    {
      field: t('modal_fd_field_char'),
      value: character,
      class: 'code',
      interpretation: t('modal_fd_interp_char').replace('{character}', character)
    },
    {
      field: t('modal_fd_field_move'),
      value: move.name,
      class: 'code',
      interpretation: move.notes || t('modal_fd_interp_move')
    },
    {
      field: t('modal_fd_field_input'),
      value: move.input,
      class: 'code',
      interpretation: interpretInput(move.input)
    },
    {
      field: t('modal_fd_field_startup'),
      value: move.startup,
      class: 'code hl-startup',
      interpretation: interpretStartup(move.startup)
    },
    {
      field: t('modal_fd_field_active'),
      value: move.active,
      class: 'code hl-active',
      interpretation: interpretActive(move.active)
    },
    {
      field: t('modal_fd_field_recovery'),
      value: move.recovery,
      class: 'code hl-recovery',
      interpretation: interpretRecovery(move.recovery)
    },
    {
      field: t('modal_fd_field_onblock'),
      value: move.onBlock,
      class: `code ${getFrameClass(move.onBlock)}`,
      interpretation: interpretOnBlock(move.onBlock)
    },
    {
      field: t('modal_fd_field_onhit'),
      value: move.onHit,
      class: `code ${getFrameClass(move.onHit)}`,
      interpretation: interpretOnHit(move.onHit)
    },
    {
      field: t('modal_fd_field_counter_hit'),
      value: move.onCounterHit,
      class: `code ${getFrameClass(move.onCounterHit)}`,
      interpretation: interpretOnHit(move.onCounterHit)
    },
    {
      field: t('modal_fd_field_damage'),
      value: move.damage,
      class: 'code',
      interpretation: t('modal_fd_field_damage')
    }
  ];

  if(move.notes && move.notes.trim() !== '') {
    rows.push({
      field: t('modal_fd_field_notes'),
      value: '',
      class: '',
      interpretation: move.notes,
      colspan: true
    });
  }

  rows.forEach(row => {
    const tr = document.createElement('tr');
    if(row.colspan) {
      tr.innerHTML = `
        <td>${escapeHtml(row.field)}</td>
        <td colspan="2">${escapeHtml(row.interpretation)}</td>
      `;
    } else {
      tr.innerHTML = `
        <td>${escapeHtml(row.field)}</td>
        <td class="${escapeHtml(row.class)}">${escapeHtml(row.value)}</td>
        <td>${escapeHtml(row.interpretation)}</td>
      `;
    }
    modalTbody.appendChild(tr);
  });

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function getFrameClass(val) {
  if(val === '' || val === undefined || val === 'N/A') return '';
  const n = parseInt(val);
  if(isNaN(n)) return '';
  if(n > 0) return 'hl-plus';
  if(n < 0) return 'hl-minus';
  return '';
}

function interpretInput(input) {
  const notations = {
    'QCF': 'Quarter Circle Forward (236)',
    'QCB': 'Quarter Circle Back (214)',
    'DP': 'Dragon Punch motion (623)',
    'HCF': 'Half Circle Forward (41236)',
    'HCB': 'Half Circle Back (63214)',
    '236': 'Quarter Circle Forward',
    '214': 'Quarter Circle Back',
    '623': 'Dragon Punch motion',
    'cr.': 'Crouching',
    'st.': 'Standing',
    'j.': 'Jumping',
    'LP': 'Light Punch',
    'MP': 'Medium Punch',
    'HP': 'Heavy Punch',
    'LK': 'Light Kick',
    'MK': 'Medium Kick',
    'HK': 'Heavy Kick',
    'P': 'Punch',
    'K': 'Kick',
    '5': 'Standing',
    '2': 'Crouching',
    '6': 'Forward',
    '4': 'Back'
  };

  let interpretation = `${t('modal_fd_field_input')}: ${input}`;
  
  for(const [key, desc] of Object.entries(notations)) {
    if(input.includes(key)) {
      interpretation += ` — ${desc}`;
      break;
    }
  }

  return interpretation;
}

function interpretStartup(startup) {
  if(!startup || startup === 'N/A' || startup === '—') return t('not_applicable');
  const frames = parseInt(startup);
  if(isNaN(frames)) return `${t('modal_fd_field_startup')}: ${startup} frames.`;
  
  let speed = '';
  if(frames <= 4) speed = t('speed_extra_fast');
  else if(frames <= 6) speed = t('speed_fast');
  else if(frames <= 10) speed = t('speed_moderate');
  else if(frames <= 15) speed = t('speed_slow');
  else speed = t('speed_extra_slow');

  return t('startup_desc').replace('{frames}', frames).replace('{speed}', speed);
}

function interpretActive(active) {
  if(!active || active === 'N/A' || active === '—') return t('not_applicable');
  
  // Handle ranges like "4-6" or "18-23"
  if(typeof active === 'string' && active.includes('-')) {
    const [start, end] = active.split('-').map(x => parseInt(x.trim()));
    if(!isNaN(start) && !isNaN(end)) {
      const duration = end - start + 1;
      return t('active_desc').replace('{duration}', duration).replace('{start}', start).replace('{end}', end);
    }
  }

  const frames = parseInt(active);
  if(!isNaN(frames)) {
    return t('active_simple').replace('{frames}', frames);
  }

  return `${t('modal_fd_field_active')}: ${active}.`;
}

function interpretRecovery(recovery) {
  if(!recovery || recovery === 'N/A' || recovery === '—') return t('not_applicable');
  const frames = parseInt(recovery);
  if(isNaN(frames)) return `${t('modal_fd_field_recovery')}: ${recovery} frames.`;

  let safety = '';
  if(frames <= 10) safety = t('safety_extra_fast');
  else if(frames <= 20) safety = t('safety_moderate');
  else if(frames <= 30) safety = t('safety_slow');
  else safety = t('safety_extra_slow');

  return t('recovery_desc').replace('{frames}', frames).replace('{safety}', safety);
}

function interpretOnBlock(onBlock) {
  if(!onBlock || onBlock === 'N/A' || onBlock === '—') {
    return t('onblock_knockdown');
  }

  const frames = parseInt(onBlock);
  if(isNaN(frames)) return `On Block: ${onBlock}.`;

  if(frames > 0) {
    return t('onblock_plus').replace('{frames}', frames);
  } else if(frames === 0) {
    return t('onblock_neutral');
  } else {
    const abs = Math.abs(frames);
    if(abs <= 2) {
      return t('onblock_safe').replace('{frames}', frames);
    } else if(abs <= 6) {
      return t('onblock_unsafe').replace('{frames}', frames);
    } else {
      return t('onblock_punishable').replace('{frames}', frames);
    }
  }
}

function interpretOnHit(onHit) {
  if(!onHit || onHit === 'N/A' || onHit === '—') {
    return t('onhit_knockdown');
  }

  const frames = parseInt(onHit);
  if(isNaN(frames)) return `On Hit: ${onHit}.`;

  if(frames > 0) {
    if(frames >= 10) {
      return t('onhit_huge').replace('{frames}', frames);
    } else {
      return t('onhit_plus').replace('{frames}', frames);
    }
  } else if(frames === 0) {
    return t('onhit_neutral');
  } else {
    return t('onhit_minus').replace('{frames}', frames);
  }
}

function setupGlossary() {
  const search = document.getElementById('search');
  const clear = document.getElementById('clear');
  const onlyCore = document.getElementById('onlyCore');
  const categoryFilter = document.getElementById('glossary-category-filter');
  const count = document.getElementById('glossary-count');
  const noResults = document.getElementById('glossary-no-results');
  const terms = Array.from(document.querySelectorAll('.glossary-term'));
  const categories = Array.from(document.querySelectorAll('.glossary-category'));
  const isPortuguese = currentLang === 'pt-BR';
  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  if (search && window.__pendingGlossaryQuery) {
    search.value = window.__pendingGlossaryQuery;
    window.__pendingGlossaryQuery = '';
  }

  function applyGlossaryFilter() {
    const query = normalize(search?.value.trim());
    const selectedCategory = categoryFilter?.value || '';
    const essentialsOnly = Boolean(onlyCore?.checked);
    let visibleCount = 0;

    terms.forEach(term => {
      const matchesQuery = !query || normalize(term.dataset.search || term.textContent).includes(query);
      const matchesCategory = !selectedCategory || term.dataset.category === selectedCategory;
      const matchesCore = !essentialsOnly || term.dataset.core === 'true';
      const visible = matchesQuery && matchesCategory && matchesCore;
      term.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    categories.forEach(category => {
      category.hidden = !category.querySelector('.glossary-term:not([hidden])');
    });

    if (count) {
      count.textContent = isPortuguese
        ? `${visibleCount} ${visibleCount === 1 ? 'termo encontrado' : 'termos encontrados'}`
        : `${visibleCount} ${visibleCount === 1 ? 'term found' : 'terms found'}`;
    }
    if (noResults) noResults.hidden = visibleCount !== 0;
    if (clear) clear.disabled = !search?.value && !selectedCategory && !essentialsOnly;
  }

  search?.addEventListener('input', applyGlossaryFilter);
  categoryFilter?.addEventListener('change', applyGlossaryFilter);
  onlyCore?.addEventListener('change', applyGlossaryFilter);
  clear?.addEventListener('click', () => {
    if (search) search.value = '';
    if (categoryFilter) categoryFilter.value = '';
    if (onlyCore) onlyCore.checked = false;
    applyGlossaryFilter();
    search?.focus();
  });

  document.querySelectorAll('.glossary-term button.copy').forEach(button => {
    button.addEventListener('click', async () => {
      const text = button.dataset.copy || button.closest('.glossary-term')?.querySelector('h4')?.textContent?.trim() || '';
      try {
        await navigator.clipboard.writeText(text);
        const original = button.textContent;
        button.textContent = t('copy_success');
        setTimeout(() => button.textContent = original, 1200);
      } catch (error) {
        alert(t('copy_fail'));
      }
    });
  });

  applyGlossaryFilter();
}

// Modal system for Combo details
function setupComboModal() {
  const modal = document.getElementById('combo-modal');
  const modalClose = document.querySelector('.modal-close-combo');

  if(modalClose) {
    modalClose.addEventListener('click', closeComboModal);
  }

  if(modal) {
    modal.addEventListener('click', (e) => {
      if(e.target === modal) closeComboModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeComboModal();
    }
  });

  function closeComboModal() {
    if(modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

function openComboModal(character, combo) {
  const modal = document.getElementById('combo-modal');
  const modalTitle = document.getElementById('combo-modal-title');
  const modalSubtitle = document.getElementById('combo-modal-subtitle');
  const modalTbody = document.getElementById('combo-modal-tbody');

  if(!modal || !modalTitle || !modalSubtitle || !modalTbody) return;

  modalTitle.textContent = `${character} — ${combo.combo}`;
  modalSubtitle.textContent = `${t('combo_full')} — ${combo.difficulty}`;
  
  modalTbody.innerHTML = '';
  
  // Build explanation rows
  const rows = [
    {
      field: t('modal_fd_field_char'),
      value: character,
      class: 'code',
      interpretation: t('modal_fd_interp_char').replace('{character}', character)
    },
    {
      field: t('combo_difficulty'),
      value: combo.difficulty,
      class: 'code',
      interpretation: getDifficultyInterpretation(combo.difficulty)
    },
    {
      field: t('combo_full'),
      value: combo.combo,
      class: 'code',
      interpretation: currentLang === 'pt-BR' ? 'Sequência completa do combo.' : 'Complete combo sequence.'
    },
    {
      field: t('combo_notation'),
      value: combo.notation,
      class: 'code hl-active',
      interpretation: currentLang === 'pt-BR' ? 'Notação numérica para entrada dos comandos.' : 'Numeric notation for command inputs.'
    },
    {
      field: t('combo_starter'),
      value: combo.starter,
      class: 'code',
      interpretation: `${currentLang === 'pt-BR' ? 'Golpe inicial' : 'Starter move'}: ${combo.starter}`
    },
    {
      field: t('combo_damage'),
      value: combo.damage,
      class: 'code hl-plus',
      interpretation: currentLang === 'pt-BR' ? 'Dano estimado do combo completo.' : 'Estimated damage of the complete combo.'
    },
    {
      field: t('combo_situation'),
      value: combo.situation,
      class: 'code',
      interpretation: getSituationInterpretation(combo.situation)
    },
    {
      field: t('combo_notes'),
      value: '',
      class: '',
      interpretation: combo.notes,
      colspan: true
    }
  ];

  rows.forEach(row => {
    const tr = document.createElement('tr');
    if(row.colspan) {
      tr.innerHTML = `
        <td>${escapeHtml(row.field)}</td>
        <td colspan="2">${escapeHtml(row.interpretation)}</td>
      `;
    } else {
      tr.innerHTML = `
        <td>${escapeHtml(row.field)}</td>
        <td class="${escapeHtml(row.class)}">${escapeHtml(row.value)}</td>
        <td>${escapeHtml(row.interpretation)}</td>
      `;
    }
    modalTbody.appendChild(tr);
  });

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function getDifficultyInterpretation(difficulty) {
  if (difficulty === 'Básico' || difficulty === 'Basic') return t('diff_basic_desc');
  if (difficulty === 'Intermediário' || difficulty === 'Intermediate') return t('diff_inter_desc');
  if (difficulty === 'Avançado' || difficulty === 'Advanced') return t('diff_adv_desc');
  return t('combo_difficulty');
}

function getSituationInterpretation(situation) {
  const map = {
    'Neutro': 'sit_neutral',
    'Neutral': 'sit_neutral',
    'Close range': 'sit_close',
    'Drive Rush': 'sit_dr',
    'Punish Counter': 'sit_pc',
    'Counter Hit': 'sit_ch',
    'Anti-air': 'sit_aa',
    'Corner': 'sit_corner',
    'Corner combo': 'sit_corner',
    'Mix-up': 'sit_mixup',
    'Okizeme': 'sit_okizeme',
    'Corner throw': 'sit_corner',
    'Corner okizeme': 'sit_okizeme',
    'Portal setup': 'sit_neutral',
    'Command grab': 'sit_close',
    'Release pressure': 'sit_close',
    'Air approach': 'sit_neutral',
    'Full resources': 'sit_neutral',
    'Corner install': 'sit_corner',
    'Jump-in': 'sit_neutral'
  };
  const key = map[situation];
  return key ? t(key) : `${t('combo_situation')}: ${situation}`;
}

function setupMatchupHelper() {
  const char1Select = document.getElementById('matchup-char1');
  const char2Select = document.getElementById('matchup-char2');
  const resultDiv = document.getElementById('matchup-result');
  const emptyDiv = document.getElementById('matchup-empty');
  const statsCopy = document.getElementById('matchup-stats-copy');
  const statsLink = document.getElementById('matchup-stats-link');
  const noteProvenance = document.getElementById('matchup-note-provenance');

  if (typeof SF6_MATCHUP_STATS_META !== 'undefined') {
    if (statsCopy) {
      statsCopy.textContent = t('matchup_stats_body')
        .replace('{period}', SF6_MATCHUP_STATS_META.latestPeriod)
        .replace('{checkedAt}', SF6_MATCHUP_STATS_META.checkedAt);
    }
    if (statsLink) {
      statsLink.href = SF6_MATCHUP_STATS_META.sourceUrl;
      statsLink.textContent = t('matchup_stats_link');
    }
  }

  // Use stable character IDs for data lookup; display names can contain punctuation or spaces.
  const characters = typeof SF6_COMBOS_DATA !== 'undefined'
    ? Object.entries(SF6_COMBOS_DATA).map(([id, data]) => ({ id, name: data.character })).sort((a, b) => a.name.localeCompare(b.name))
    : (typeof getAvailableCharacters === 'function'
      ? getAvailableCharacters().map(name => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), name }))
      : []);

  characters.forEach(({ id, name }) => {
    const option1 = document.createElement('option');
    option1.value = id;
    option1.textContent = name;
    char1Select.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = id;
    option2.textContent = name;
    char2Select.appendChild(option2);
  });

  function updateMatchup() {
    const char1 = char1Select.value;
    const char2 = char2Select.value;

    if (!char1 || !char2) {
      emptyDiv.textContent = t('matchup_empty');
      resultDiv.style.display = 'none';
      emptyDiv.style.display = 'block';
      return;
    }

    if (char1 === char2) {
      emptyDiv.textContent = t('matchup_same_char');
      emptyDiv.style.display = 'block';
      resultDiv.style.display = 'none';
      return;
    }

    const character1 = char1Select.options[char1Select.selectedIndex].textContent;
    const character2 = char2Select.options[char2Select.selectedIndex].textContent;
    const matchup = getMatchupData(char1, char2);

    if (!matchup) {
      emptyDiv.textContent = t('matchup_no_data')
        .replace('{yourCharacter}', character1)
        .replace('{opponent}', character2);
      emptyDiv.style.display = 'block';
      resultDiv.style.display = 'none';
      return;
    }

    document.getElementById('matchup-title').textContent = `${character1} vs ${character2}`;
    document.getElementById('matchup-rating').textContent = t('matchup_stats_external');

    const diffBadge = document.getElementById('matchup-difficulty-badge');
    diffBadge.textContent = t('matchup_notes_unverified_badge');
    diffBadge.className = 'badge';
    diffBadge.style.background = 'rgba(255, 255, 255, 0.06)';
    diffBadge.style.color = 'var(--muted)';
    diffBadge.style.border = '1px solid rgba(255, 255, 255, 0.12)';

    if (noteProvenance) {
      noteProvenance.textContent = t('matchup_note_provenance')
        .replace('{direction}', `${character1} vs ${character2}`);
    }

    // Populate lists
    const keyPointsList = document.getElementById('matchup-key-points');
    keyPointsList.innerHTML = matchup.keyPoints.map(point => `<li>${escapeHtml(point)}</li>`).join('');

    const tipsList = document.getElementById('matchup-tips');
    tipsList.innerHTML = matchup.tips.map(tip => `<li>${escapeHtml(tip)}</li>`).join('');

    const dangerousList = document.getElementById('matchup-dangerous');
    dangerousList.innerHTML = matchup.dangerousMoves.map(move => `<li>${escapeHtml(move)}</li>`).join('');

    const toolsList = document.getElementById('matchup-tools');
    toolsList.innerHTML = matchup.yourTools.map(tool => `<li>${escapeHtml(tool)}</li>`).join('');

    // Show result
    emptyDiv.style.display = 'none';
    resultDiv.style.display = 'block';
    
    // Smooth scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  if(char1Select) {
    char1Select.addEventListener('change', updateMatchup);
  }
  if(char2Select) {
    char2Select.addEventListener('change', updateMatchup);
  }
}
