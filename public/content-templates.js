// Content template generators for dynamic loading

const ContentTemplates = {
  frameCalculator: () => `
    <h2>${t('calc_title')}</h2>
    <p style="color:var(--muted);margin-top:0">${t('calc_subtitle')}</p>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:20px">
      
      <!-- Calculator 1: Frame Advantage -->
      <div style="background:rgba(0,0,0,0.2);padding:20px;border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
        <h3 style="margin:0 0 12px;font-size:16px;color:var(--accent)">${t('calc1_title')}</h3>
        <div style="display:flex;flex-direction:column;gap:12px">
          <div>
            <label style="display:block;font-size:13px;color:var(--muted);margin-bottom:4px">${t('calc1_startup')}</label>
            <input id="calc1-startup" type="number" placeholder="Ex: 4" style="width:100%;padding:8px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:inherit;font-size:14px"/>
          </div>
          <div>
            <label style="display:block;font-size:13px;color:var(--muted);margin-bottom:4px">${t('calc1_active')}</label>
            <input id="calc1-active" type="number" placeholder="Ex: 3" style="width:100%;padding:8px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:inherit;font-size:14px"/>
          </div>
          <div>
            <label style="display:block;font-size:13px;color:var(--muted);margin-bottom:4px">${t('calc1_recovery')}</label>
            <input id="calc1-recovery" type="number" placeholder="Ex: 7" style="width:100%;padding:8px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:inherit;font-size:14px"/>
          </div>
          <button id="calc1-btn" class="copy" style="width:100%;margin-top:8px">${t('calc1_btn')}</button>
          <div id="calc1-result" style="margin-top:8px;padding:12px;background:rgba(79,209,197,0.1);border-radius:8px;border:1px solid rgba(79,209,197,0.2);display:none">
            <div style="font-size:13px;color:var(--muted);margin-bottom:4px">${t('calc1_result_title')}</div>
            <div style="font-size:24px;font-weight:600;color:var(--accent)">—</div>
            <div style="font-size:12px;color:var(--muted);margin-top:8px">${t('calc1_result_desc')}</div>
          </div>
        </div>
      </div>

      <!-- Calculator 2: Punish Check -->
      <div style="background:rgba(0,0,0,0.2);padding:20px;border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
        <h3 style="margin:0 0 12px;font-size:16px;color:var(--accent)">${t('calc2_title')}</h3>
        <div style="display:flex;flex-direction:column;gap:12px">
          <div>
            <label style="display:block;font-size:13px;color:var(--muted);margin-bottom:4px">${t('calc2_onblock')}</label>
            <input id="calc2-onblock" type="number" placeholder="Ex: -6" style="width:100%;padding:8px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:inherit;font-size:14px"/>
          </div>
          <div>
            <label style="display:block;font-size:13px;color:var(--muted);margin-bottom:4px">${t('calc2_startup')}</label>
            <input id="calc2-startup" type="number" placeholder="Ex: 4" style="width:100%;padding:8px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:inherit;font-size:14px"/>
          </div>
          <button id="calc2-btn" class="copy" style="width:100%;margin-top:8px">${t('calc2_btn')}</button>
          <div id="calc2-result" style="margin-top:8px;padding:12px;border-radius:8px;display:none">
            <div style="font-size:14px;font-weight:600;margin-bottom:4px">—</div>
            <div style="font-size:12px;color:var(--muted)">—</div>
          </div>
        </div>
      </div>

      <!-- Calculator 3: Blockstring Gap -->
      <div style="background:rgba(0,0,0,0.2);padding:20px;border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
        <h3 style="margin:0 0 12px;font-size:16px;color:var(--accent)">${t('calc3_title')}</h3>
        <div style="display:flex;flex-direction:column;gap:12px">
          <div>
            <label style="display:block;font-size:13px;color:var(--muted);margin-bottom:4px">${t('calc3_advantage')}</label>
            <input id="calc3-advantage" type="number" placeholder="Ex: +2" style="width:100%;padding:8px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:inherit;font-size:14px"/>
          </div>
          <div>
            <label style="display:block;font-size:13px;color:var(--muted);margin-bottom:4px">${t('calc3_startup')}</label>
            <input id="calc3-startup" type="number" placeholder="Ex: 6" style="width:100%;padding:8px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:inherit;font-size:14px"/>
          </div>
          <button id="calc3-btn" class="copy" style="width:100%;margin-top:8px">${t('calc3_btn')}</button>
          <div id="calc3-result" style="margin-top:8px;padding:12px;border-radius:8px;display:none">
            <div style="font-size:13px;color:var(--muted);margin-bottom:4px">${t('calc3_result_title')}</div>
            <div style="font-size:24px;font-weight:600">—</div>
            <div style="font-size:12px;color:var(--muted);margin-top:8px">—</div>
          </div>
        </div>
      </div>

    </div>

    <div style="margin-top:20px;padding:16px;background:rgba(79,209,197,0.05);border-radius:10px;border:1px solid rgba(79,209,197,0.15)">
      <h4 style="margin:0 0 8px;font-size:14px;color:var(--accent)">${t('calc_tips_title')}</h4>
      <ul style="margin:8px 0;padding-left:20px;font-size:13px;color:var(--muted);line-height:1.6">
        <li>${t('calc_tips_1')}</li>
        <li>${t('calc_tips_2')}</li>
        <li>${t('calc_tips_3')}</li>
      </ul>
    </div>
  `,

  combos: () => `
    <h2>${t('combos_title')}</h2>
    <p style="color:var(--muted);margin-top:0">${t('combos_subtitle')}</p>

    <div style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap">
      <select id="combo-character-select" style="flex:1;min-width:200px;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:inherit;font-size:14px">
        <option value="">${t('combos_select_char')}</option>
      </select>
      <select id="combo-difficulty-filter" style="padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:inherit;font-size:14px">
        <option value="">${t('combos_all_diff')}</option>
        <option value="${t('combos_basic')}">${t('combos_basic')}</option>
        <option value="${t('combos_intermediate')}">${t('combos_intermediate')}</option>
        <option value="${t('combos_advanced')}">${t('combos_advanced')}</option>
      </select>
      <button id="combo-copy-all" class="copy" type="button" disabled style="padding:10px 16px">${t('combos_copy_all')}</button>
    </div>

    <div id="combo-list" style="display:grid;gap:12px">
      <div style="padding:40px;text-align:center;color:var(--muted);font-style:italic">
        ${t('combos_empty')}
      </div>
    </div>

    <div style="margin-top:20px;padding:16px;background:rgba(79,209,197,0.05);border-radius:10px;border:1px solid rgba(79,209,197,0.15)">
      <h4 style="margin:0 0 8px;font-size:14px;color:var(--accent)">${t('combos_how_to_title')}</h4>
      <ul style="margin:8px 0;padding-left:20px;font-size:13px;color:var(--muted);line-height:1.6">
        <li>${t('combos_how_to_1')}</li>
        <li>${t('combos_how_to_2')}</li>
        <li>${t('combos_how_to_3')}</li>
      </ul>
    </div>
  `,

  frameData: () => `
    <h2>${t('fd_title')}</h2>
    <p style="color:var(--muted);margin-top:0">${t('fd_subtitle')}</p>
    <p class="coverage-note">${t('fd_coverage').replace('{count}', Object.keys(SF6_FRAME_DATA).length)}</p>

    <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px">
      <input id="fd-filter" placeholder="${t('fd_search_placeholder')}" style="flex:1;padding:8px;border-radius:8px;border:1px solid rgba(255,255,255,0.04);background:transparent;color:inherit" />
    </div>

    <div id="fd-message" style="padding:20px;text-align:center;color:var(--muted);font-style:italic">
      ${t('fd_initial_msg')}
    </div>

    <div style="overflow:auto;margin-top:12px;display:none" id="fd-table-container">
      <table id="fd-table" style="width:100%;border-collapse:collapse;min-width:900px">
        <thead>
          <tr style="text-align:left;color:var(--muted);font-size:13px;border-bottom:1px solid rgba(255,255,255,0.03)">
            <th style="padding:8px">${t('fd_th_char')}</th>
            <th style="padding:8px">${t('fd_th_move')}</th>
            <th style="padding:8px">${t('fd_th_input')}</th>
            <th style="padding:8px">${t('fd_th_startup')}</th>
            <th style="padding:8px">${t('fd_th_active')}</th>
            <th style="padding:8px">${t('fd_th_onblock')}</th>
            <th style="padding:8px">${t('fd_th_onhit')}</th>
            <th style="padding:8px">${t('fd_th_recovery')}</th>
            <th style="padding:8px">${t('fd_th_notes')}</th>
          </tr>
        </thead>
        <tbody id="fd-body"></tbody>
      </table>
    </div>

    <div style="margin-top:20px;padding:16px;background:rgba(79,209,197,0.05);border-radius:10px;border:1px solid rgba(79,209,197,0.15)">
      <h4 style="margin:0 0 8px;font-size:14px;color:var(--accent)">${t('fd_how_to_title')}</h4>
      <ul style="margin:8px 0;padding-left:20px;font-size:13px;color:var(--muted);line-height:1.6">
        <li>${t('fd_how_to_1')}</li>
        <li>${t('fd_how_to_2')}</li>
        <li>${t('fd_how_to_3')}</li>
      </ul>
    </div>
  `,

  glossary: () => {
    const isPortuguese = currentLang === 'pt-BR';
    const terms = SF6_GLOSSARY_TERMS;
    const categories = [
      { id: 'fundamentals', label: isPortuguese ? 'Fundamentos' : 'Fundamentals' },
      { id: 'frames', label: isPortuguese ? 'Frames e combos' : 'Frames and combos' },
      { id: 'offense', label: isPortuguese ? 'Pressão e ofensiva' : 'Pressure and offense' },
      { id: 'defense', label: isPortuguese ? 'Defesa' : 'Defense' },
      { id: 'drive', label: isPortuguese ? 'Sistema Drive' : 'Drive System' },
      { id: 'notation', label: isPortuguese ? 'Notação' : 'Notation' }
    ];
    const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
    const categorySections = categories.map(category => {
      const categoryTerms = terms.filter(term => term.category === category.id);
      if (!categoryTerms.length) return '';
      const cards = categoryTerms.map(term => {
        const definition = isPortuguese ? term.pt.definition : term.en.definition;
        const example = isPortuguese ? term.pt.example : term.en.example;
        const searchText = [term.term, ...term.aliases, term.pt.definition, term.pt.example, term.en.definition, term.en.example].join(' ');
        const coreBadge = term.core ? `<span class="glossary-core-badge">${t('glossary_core_badge')}</span>` : '';
        const copyLabel = `${t('glossary_copy')} ${term.term}`;
        return `
          <article class="glossary-term" data-category="${category.id}" data-core="${term.core}" data-search="${escapeHTML(searchText)}">
            <div class="glossary-term-content">
              <h4>${escapeHTML(term.term)}</h4>
              <p>${escapeHTML(definition)}</p>
              <p class="glossary-example"><strong>${t('glossary_example_label')}:</strong> ${escapeHTML(example)}</p>
            </div>
            <div class="glossary-term-actions">
              ${coreBadge}
              <button class="copy glossary-copy" type="button" data-copy="${escapeHTML(term.term)}" aria-label="${escapeHTML(copyLabel)}">${t('glossary_copy')}</button>
            </div>
          </article>`;
      }).join('');
      return `
        <section class="glossary-category" data-glossary-category="${category.id}">
          <h3>${escapeHTML(category.label)}</h3>
          <div class="glossary-grid">${cards}</div>
        </section>`;
    }).join('');

    return `
      <h2>${t('glossary_title')}</h2>
      <p style="color:var(--muted);margin-top:0">${t('glossary_subtitle').replace('{count}', terms.length)}</p>

      <div class="glossary-toolbar">
        <div class="glossary-field">
          <label for="search">${t('glossary_search_label')}</label>
          <div class="glossary-search-row">
            <input id="search" type="search" placeholder="${t('glossary_search_placeholder')}" aria-label="${t('glossary_search_placeholder')}" autocomplete="off" />
            <button id="clear" type="button">${t('glossary_clear')}</button>
          </div>
        </div>
        <div class="glossary-field">
          <label for="glossary-category-filter">${t('glossary_category_label')}</label>
          <select id="glossary-category-filter">
            <option value="">${t('glossary_all_categories')}</option>
            ${categories.map(category => `<option value="${category.id}">${escapeHTML(category.label)}</option>`).join('')}
          </select>
        </div>
        <label class="glossary-core-toggle" for="onlyCore">
          <input id="onlyCore" type="checkbox" />
          <span>${t('glossary_only_core')}</span>
        </label>
      </div>

      <div class="glossary-meta">
        <p id="glossary-count" class="glossary-status" role="status" aria-live="polite"></p>
        <p class="glossary-status">${isPortuguese ? 'A busca considera definições em português e inglês.' : 'Search includes both English and Portuguese definitions.'}</p>
      </div>
      <p id="glossary-no-results" class="glossary-notice" role="status" hidden>${t('glossary_no_results')}</p>
      <div id="glossary-content">${categorySections}</div>
      <p class="glossary-source">${isPortuguese ? 'Definições resumidas para estudo; propriedades e dados específicos podem variar por personagem e patch. Referência comunitária: ' : 'Concise study definitions; move properties and exact data may vary by character and patch. Community reference: '}<a href="https://wiki.supercombo.gg/w/Street_Fighter_6" target="_blank" rel="noopener noreferrer">SuperCombo Wiki</a>.</p>
    `;
  },

  matchupHelper: () => `
    <h2>${t('matchup_title')}</h2>
    <p style="color:var(--muted);margin-top:0">${t('matchup_subtitle')}</p>

    <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:20px;align-items:center;margin:30px 0">
      <div>
        <label style="display:block;font-size:13px;color:var(--muted);margin-bottom:8px;text-align:center">${t('matchup_your_char')}</label>
        <select id="matchup-char1" style="width:100%;padding:12px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:inherit;font-size:15px;text-align:center">
          <option value="">${t('matchup_select')}</option>
        </select>
      </div>
      
      <div style="font-size:32px;color:var(--accent)">${t('matchup_vs')}</div>
      
      <div>
        <label style="display:block;font-size:13px;color:var(--muted);margin-bottom:8px;text-align:center">${t('matchup_opponent')}</label>
        <select id="matchup-char2" style="width:100%;padding:12px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:inherit;font-size:15px;text-align:center">
          <option value="">${t('matchup_select')}</option>
        </select>
      </div>
    </div>

    <div id="matchup-result" style="display:none">
      <div style="background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:24px;margin-top:20px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
          <h3 style="margin:0;font-size:20px;color:var(--text)" id="matchup-title">Matchup</h3>
          <div style="display:flex;gap:12px;align-items:center">
            <span id="matchup-rating" style="font-size:24px;font-weight:700;color:var(--accent)">5-5</span>
            <span id="matchup-difficulty-badge" class="badge">Even</span>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:24px">
          <div>
            <h4 style="margin:0 0 12px;font-size:16px;color:var(--accent)">${t('matchup_key_points')}</h4>
            <ul id="matchup-key-points" style="margin:0;padding-left:20px;color:var(--text);line-height:1.8"></ul>
          </div>

          <div>
            <h4 style="margin:0 0 12px;font-size:16px;color:var(--accent)">${t('matchup_tips')}</h4>
            <ul id="matchup-tips" style="margin:0;padding-left:20px;color:var(--text);line-height:1.8"></ul>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:24px">
          <div style="background:rgba(252,165,165,0.1);padding:16px;border-radius:10px;border:1px solid rgba(252,165,165,0.2)">
            <h4 style="margin:0 0 12px;font-size:15px;color:#fca5a5">${t('matchup_watch_out')}</h4>
            <ul id="matchup-dangerous" style="margin:0;padding-left:20px;color:var(--text);line-height:1.6;font-size:14px"></ul>
          </div>

          <div style="background:rgba(79,209,197,0.1);padding:16px;border-radius:10px;border:1px solid rgba(79,209,197,0.2)">
            <h4 style="margin:0 0 12px;font-size:15px;color:var(--accent)">${t('matchup_your_tools')}</h4>
            <ul id="matchup-tools" style="margin:0;padding-left:20px;color:var(--text);line-height:1.6;font-size:14px"></ul>
          </div>
        </div>
      </div>
    </div>

    <div id="matchup-empty" style="padding:60px 20px;text-align:center;color:var(--muted);font-style:italic">
      ${t('matchup_empty')}
    </div>

    <div style="margin-top:30px;padding:16px;background:rgba(79,209,197,0.05);border-radius:10px;border:1px solid rgba(79,209,197,0.15)">
      <h4 style="margin:0 0 8px;font-size:14px;color:var(--accent)">${t('matchup_about_title')}</h4>
      <ul style="margin:8px 0;padding-left:20px;font-size:13px;color:var(--muted);line-height:1.6">
        <li>${t('matchup_about_1')}</li>
        <li>${t('matchup_about_2')}</li>
        <li>${t('matchup_about_3')}</li>
        <li>${t('matchup_about_4')}</li>
      </ul>
    </div>
  `
};
