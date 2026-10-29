'use strict';
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

// All personal notes and practice ticks stay in this browser. No analytics or backend.
const storage = {
  read(key, fallback) { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } },
  write(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } }
};
function mondayKey(date = new Date()) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - (d.getDay() + 6) % 7);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
const practiceInputs = [...document.querySelectorAll('[data-practice]')];
if (practiceInputs.length) {
  let week = mondayKey();
  let stored = storage.read('guoy1fu.practice', {});
  let ticks = stored && stored.week === week && Array.isArray(stored.ticks) ? stored.ticks.map(Boolean) : [false,false,false];
  function paintTicks() {
    practiceInputs.forEach((el, i) => { el.checked = !!ticks[i]; });
    document.getElementById('weekly-count').textContent = `${ticks.filter(Boolean).length} / 3`;
  }
  function refreshWeek() { const current = mondayKey(); if (current !== week) { week = current; ticks = [false,false,false]; paintTicks(); } }
  paintTicks();
  practiceInputs.forEach((input, i) => input.addEventListener('change', () => {
    const checked = input.checked;
    refreshWeek(); ticks[i] = checked;
    const saved = storage.write('guoy1fu.practice', {week,ticks});
    document.getElementById('storage-notice').textContent = saved ? 'Saved in this browser. Resets on Monday.' : 'Storage unavailable. Changes will not persist.';
    paintTicks();
  }));
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshWeek(); });
}

const timerStart = document.getElementById('timer-start');
if (timerStart) {
  const duration = 25 * 60;
  let seconds = duration, deadline = 0, running = false, interval;
  const display = document.getElementById('timer');
  const caption = document.getElementById('timer-caption');
  const paint = () => { display.textContent = `${String(Math.floor(seconds / 60)).padStart(2,'0')}:${String(seconds % 60).padStart(2,'0')}`; };
  function tick() {
    seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000)); paint();
    if (seconds === 0) { clearInterval(interval); running = false; timerStart.textContent = 'New session ↗'; caption.textContent = 'Session complete.'; }
  }
  timerStart.addEventListener('click', () => {
    if (running) { tick(); clearInterval(interval); running = false; timerStart.textContent = 'Resume ▷'; caption.textContent = 'Paused.'; return; }
    if (seconds === 0) seconds = duration;
    deadline = Date.now() + seconds * 1000; running = true; timerStart.textContent = 'Pause Ⅱ'; caption.textContent = 'Session in progress.';
    paint(); interval = setInterval(tick, 250);
  });
  document.getElementById('timer-reset').addEventListener('click', () => { clearInterval(interval); running = false; seconds = duration; paint(); timerStart.textContent = 'Start ▷'; caption.textContent = 'Ready.'; });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && running) tick(); });
}

const noteForm = document.getElementById('note-form');
if (noteForm) {
  const noteKey = 'guoy1fu.notes';
  let notes = storage.read(noteKey, []);
  if (!Array.isArray(notes)) notes = [];
  notes = notes.filter(n => n && typeof n.text === 'string' && typeof n.date === 'string' && Number.isFinite(Date.parse(n.date)));
  const container = document.getElementById('saved-notes');
  const exportButton = document.getElementById('export-notes');
  const status = document.getElementById('note-status');
  function renderNotes() {
    container.replaceChildren();
    notes.slice(0,3).forEach(note => {
      const article = document.createElement('article'); article.className = 'saved-note';
      const time = document.createElement('time'); time.dateTime = note.date; time.textContent = new Date(note.date).toLocaleString('en-GB',{dateStyle:'medium',timeStyle:'short'});
      const text = document.createElement('p'); text.textContent = note.text;
      article.append(time,text); container.append(article);
    });
    exportButton.hidden = notes.length === 0;
    exportButton.textContent = `Export ${notes.length} notes ↓`;
  }
  renderNotes();
  noteForm.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.getElementById('note-text');
    const text = input.value.trim();
    if (!text) { status.textContent = 'Add a note first.'; input.focus(); return; }
    const next = [{text,date:new Date().toISOString()},...notes];
    if (!storage.write(noteKey,next)) { status.textContent = 'Storage unavailable. Copy your note to keep it.'; return; }
    notes = next; input.value = ''; status.textContent = 'Saved in this browser.'; renderNotes();
  });
  exportButton.addEventListener('click', () => {
    const content = '# Music notes\n\n' + notes.map(n => `## ${new Date(n.date).toLocaleString('en-GB')}\n\n${n.text}`).join('\n\n---\n\n');
    const url = URL.createObjectURL(new Blob([content], {type:'text/markdown;charset=utf-8'}));
    const link = document.createElement('a'); link.href = url; link.download = `music-notes-${new Date().toISOString().slice(0,10)}.md`;
    document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url),1000);
    status.textContent = 'Exported.';
  });
}
