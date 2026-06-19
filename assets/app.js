const styles = [
  { name: 'Boxing', tagline: 'Footwork, hands, elite cardio.', match: 92, curve: 'Fast start, deep mastery', fitness: 'High cardio, shoulders, core', defense: 86, beginner: 94, reasons: ['Strong cardio goals', 'Limited equipment', 'High confidence-building potential'] },
  { name: 'Muay Thai', tagline: 'The art of eight limbs.', match: 88, curve: 'Moderate', fitness: 'Full-body power and conditioning', defense: 91, beginner: 78, reasons: ['Wants striking variety', 'Likes intense workouts', 'Self-defense focused'] },
  { name: 'Kickboxing', tagline: 'High-energy striking fitness.', match: 84, curve: 'Beginner friendly', fitness: 'Fat loss, legs, coordination', defense: 82, beginner: 88, reasons: ['Fitness first', 'Home-workout friendly', 'Enjoys striking'] },
  { name: 'Brazilian Jiu-Jitsu', tagline: 'Grappling, control, submissions.', match: 81, curve: 'Slow burn', fitness: 'Functional strength and mobility', defense: 93, beginner: 80, reasons: ['Self-defense interest', 'Builds calm under pressure', 'Low equipment barrier'] },
  { name: 'Wrestling', tagline: 'Takedowns and relentless pressure.', match: 76, curve: 'Physically demanding', fitness: 'Explosive strength and grit', defense: 89, beginner: 67, reasons: ['Competition interest', 'Strength goals', 'Likes grappling'] },
  { name: 'MMA', tagline: 'Blend striking, wrestling, grappling.', match: 72, curve: 'Complex', fitness: 'Complete athletic development', defense: 95, beginner: 62, reasons: ['Competition interest', 'Gym access', 'Wants complete system'] }
];
const questions = [
  ['age', 'Age range', ['13-17', '18-29', '30-44', '45+']], ['fitness', 'Fitness level', ['New beginner', 'Lightly active', 'Consistent', 'Athlete']], ['weightLoss', 'Weight loss goal', ['Low', 'Medium', 'High']], ['muscle', 'Muscle gain goal', ['Low', 'Medium', 'High']], ['selfDefense', 'Self-defense interest', ['Low', 'Medium', 'High']], ['competition', 'Competition interest', ['None', 'Curious', 'Definitely']], ['equipment', 'Available equipment', ['None', 'Jump rope', 'Gloves', 'Full kit']], ['gym', 'Gym access', ['No', 'Maybe', 'Yes']], ['home', 'Home workout preference', ['Prefer home', 'Hybrid', 'Prefer gym']], ['days', 'Training days per week', ['2', '3', '4', '5+']], ['preference', 'Striking vs Grappling', ['Striking', 'Grappling', 'Both']], ['confidence', 'Confidence level', ['Nervous', 'Curious', 'Ready']], ['injuries', 'Injury limitations', ['None', 'Knees', 'Back', 'Shoulders']]
];
const achievements = ['First Workout', '7-Day Streak', '100 Jabs Practiced', 'First Shadowboxing Session', 'Roadmap Rookie', 'Mobility Master', 'Coach Check-in', 'Gear Ready'];
const skillTrees = { Boxing: ['Stance', 'Footwork', 'Jab', 'Cross', 'Hook', 'Defense', 'Combinations'], BJJ: ['Breakfall', 'Shrimp', 'Guard', 'Sweep', 'Armbar', 'Triangle'], MuayThai: ['Stance', 'Teep', 'Round kick', 'Knees', 'Clinch', 'Elbow'], MMA: ['Stance switch', 'Jab to shot', 'Sprawl', 'Ground control', 'Wall work', 'Transitions'] };
const workouts = [
  { day: 'Monday', title: 'Boxing fundamentals + core', blocks: ['Warmup: 5 min jump rope', 'Skill: stance, guard, 100 jabs', 'Strength: planks and pushups', 'Conditioning: 6 x 30 sec shadowboxing', 'Recovery: shoulder mobility'] },
  { day: 'Wednesday', title: 'Conditioning + shadowboxing', blocks: ['Warmup: hip flow', 'Skill: jab-cross exits', 'Strength: squats and dead bugs', 'Conditioning: 12 min intervals', 'Recovery: nasal breathing'] },
  { day: 'Friday', title: 'Technique drills', blocks: ['Warmup: dynamic footwork', 'Skill: combo ladder', 'Strength: lunges', 'Conditioning: finisher EMOM', 'Recovery: calves and wrists'] },
  { day: 'Saturday', title: 'Mobility and recovery', blocks: ['Warmup: walk', 'Skill: balance drills', 'Strength: carries', 'Conditioning: zone 2 cardio', 'Recovery: full-body stretch'] }
];
const gear = [['Boxing gloves', 49], ['Hand wraps', 12], ['Jump rope', 15], ['Mouthguard', 10], ['Rash guard', 29], ['Shin guards', 39]];
const gyms = [['Downtown Boxing Club', 'Boxing', 'Beginner classes', '$99/mo'], ['Northside BJJ Academy', 'BJJ', 'Intro grappling', '$119/mo'], ['Iron Tiger Muay Thai', 'Muay Thai', 'Fitness striking', '$139/mo']];
let step = Number(localStorage.getItem('ff_step') || 0);
let answers = JSON.parse(localStorage.getItem('ff_answers') || '{}');
let completedWorkouts = JSON.parse(localStorage.getItem('ff_completed_workouts') || '[]');
let xp = Number(localStorage.getItem('ff_xp') || 1240);
const $ = (id) => document.getElementById(id);
const tag = (text) => `<span class="tag">${text}</span>`;
function saveProgress() { localStorage.setItem('ff_answers', JSON.stringify(answers)); localStorage.setItem('ff_step', String(step)); localStorage.setItem('ff_completed_workouts', JSON.stringify(completedWorkouts)); localStorage.setItem('ff_xp', String(xp)); }
function announce(message) { const status = $('actionStatus'); if (status) status.textContent = message; }
function renderQuiz() {
  const done = Object.keys(answers).length >= questions.length;
  const q = questions[Math.min(step, questions.length - 1)];
  $('quiz').innerHTML = done
    ? `<p class="mini-label">Assessment complete</p><h3>Your roadmap is ready.</h3><p>Review your style matches below or restart the quiz to try different goals.</p><div class="actions"><a class="button primary" href="#results">View Results</a><button type="button" class="button ghost" data-reset-quiz>Retake Assessment</button></div>`
    : `<p class="mini-label">Question ${step + 1} of ${questions.length}</p><h3>${q[1]}</h3><div class="meter"><span style="width:${(step / questions.length) * 100}%"></span></div><div class="quiz-options">${q[2].map((option) => `<button type="button" data-answer="${option}">${option}</button>`).join('')}</div>`;
  $('answerPreview').textContent = Object.keys(answers).length ? JSON.stringify(answers, null, 2) : 'No answers yet.';
  document.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => {
    answers[q[0]] = button.dataset.answer;
    step += 1;
    saveProgress();
    announce(`Saved ${q[1]}: ${button.dataset.answer}`);
    if (Object.keys(answers).length >= questions.length) location.hash = 'results';
    renderQuiz();
  }));
  document.querySelectorAll('[data-reset-quiz]').forEach((button) => button.addEventListener('click', () => { answers = {}; step = 0; saveProgress(); announce('Assessment reset. Start again.'); renderQuiz(); location.hash = 'assessment'; }));
}
function renderMatches() { $('matches').innerHTML = styles.map((s, i) => `<article class="card"><p class="mini-label">${i === 0 ? 'Top match' : 'Recommended'}</p><h3>${s.name}</h3><p>${s.tagline}</p><div class="match-score">${s.match}% Match</div><div class="meter"><span style="width:${s.match}%"></span></div><p><strong>Learning curve:</strong> ${s.curve}</p><p><strong>Fitness:</strong> ${s.fitness}</p><p><strong>Self-defense:</strong> ${s.defense}% • <strong>Beginner:</strong> ${s.beginner}%</p><div class="tag-row">${s.reasons.map(tag).join('')}</div><button type="button" class="button ghost" data-style="${s.name}">Choose ${s.name}</button></article>`).join(''); document.querySelectorAll('[data-style]').forEach((button) => button.addEventListener('click', () => { localStorage.setItem('ff_style', button.dataset.style); announce(`${button.dataset.style} selected as your focus style.`); location.hash = 'plans'; })); }
function renderBadges() { $('badges').innerHTML = achievements.map((a, i) => `<button type="button" class="badge ${i < 4 ? 'unlocked' : ''}" data-badge="${a}">${i < 4 ? '✓' : '○'} ${a}</button>`).join(''); document.querySelectorAll('[data-badge]').forEach((button) => button.addEventListener('click', () => announce(`${button.dataset.badge}: ${button.classList.contains('unlocked') ? 'unlocked' : 'locked for later training'}.`))); }
function renderSkills() { $('skillTrees').innerHTML = Object.entries(skillTrees).map(([name, skills]) => `<article class="card"><h3>${name.replace('MuayThai', 'Muay Thai')}</h3><div class="skill-ladder">${skills.map((skill, i) => `<button type="button" data-skill="${skill}" class="skill-node ${i < 3 ? 'unlocked' : ''}">${skill}</button>${i < skills.length - 1 ? '<span class="arrow">↓</span>' : ''}`).join('')}</div></article>`).join(''); document.querySelectorAll('[data-skill]').forEach((button) => button.addEventListener('click', () => announce(`${button.dataset.skill}: ${button.classList.contains('unlocked') ? 'ready to practice today' : 'complete earlier nodes to unlock'}.`))); }
function renderPlans() { $('plansGrid').innerHTML = workouts.map((w) => `<article class="card"><p class="mini-label">${w.day}</p><h3>${w.title}</h3><ul>${w.blocks.map((b) => `<li>${b}</li>`).join('')}</ul><button type="button" class="button primary" data-workout="${w.day}">${completedWorkouts.includes(w.day) ? 'Completed ✓' : 'Mark Complete +50 XP'}</button></article>`).join(''); document.querySelectorAll('[data-workout]').forEach((button) => button.addEventListener('click', () => { if (!completedWorkouts.includes(button.dataset.workout)) { completedWorkouts.push(button.dataset.workout); xp += 50; saveProgress(); } announce(`${button.dataset.workout} workout complete. Current XP: ${xp}.`); renderPlans(); })); }
function renderCommerce() { $('gearGrid').innerHTML = gear.map(([name, price]) => `<article class="card"><h3>${name}</h3><p>Beginner-tested pick for safe, consistent training.</p><strong>$${price}</strong><br><button type="button" class="button ghost" data-gear="${name}">View recommendation</button></article>`).join(''); $('gymsGrid').innerHTML = gyms.map(([name, style, desc, price]) => `<article class="card"><h3>${name}</h3><p>${style} • ${desc} • ${price}</p><button type="button" class="button ghost" data-gym="${name}">Save gym</button></article>`).join(''); document.querySelectorAll('[data-gear]').forEach((button) => button.addEventListener('click', () => announce(`${button.dataset.gear} saved to your starter gear shortlist.`))); document.querySelectorAll('[data-gym]').forEach((button) => button.addEventListener('click', () => announce(`${button.dataset.gym} saved for future gym finder integrations.`))); }
$('menuButton').addEventListener('click', () => { const nav = $('navLinks'); nav.classList.toggle('open'); $('menuButton').setAttribute('aria-expanded', nav.classList.contains('open')); });
document.querySelectorAll('#navLinks a').forEach((link) => link.addEventListener('click', () => $('navLinks').classList.remove('open')));
$('upgradeButton').addEventListener('click', () => { const modal = $('upgradeModal'); if (typeof modal.showModal === 'function') modal.showModal(); else announce('Premium upgrade: AI coaching, custom roadmaps, and analytics are reserved for paid members.'); });
renderQuiz(); renderMatches(); renderBadges(); renderSkills(); renderPlans(); renderCommerce();
