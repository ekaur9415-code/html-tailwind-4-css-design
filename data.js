const appData = {
  stats: {
    applications: 18,
    interviews: 4,
    savedJobs: 12,
    profileViews: 89,
    totalCandidates: 14220,
    recruiters: 1201,
    pendingApprovals: 34,
    activeChats: 87,
  },
  jobs: [
    { id: 1, title: 'Senior Product Designer', company: 'Orbit Labs', location: 'Remote', level: 'Senior', salary: 160000, description: 'Lead product design initiatives across candidate and recruiter workflows.' },
    { id: 2, title: 'UX Researcher', company: 'Nova', location: 'New York', level: 'Senior', salary: 140000, description: 'Drive quantitative and qualitative research to improve funnel performance.' },
    { id: 3, title: 'Frontend Engineer', company: 'Arc Systems', location: 'Remote', level: 'Mid-Senior', salary: 120000, description: 'Build performant interfaces for recruitment workflows.' },
    { id: 4, title: 'Recruitment Operations Manager', company: 'TalentX', location: 'London', level: 'Senior', salary: 95000, description: 'Scale recruiter operations with data-driven decision making.' },
    { id: 5, title: 'Lead Product Designer', company: 'Plane', location: 'Berlin', level: 'Lead', salary: 170000, description: 'Own end-to-end user experience for enterprise hiring teams.' },
  ],
  candidates: [
    { id: 1, name: 'Morgan Chen', role: 'Senior UX Designer', location: 'Remote', years: 8, qualification: 'M.Des', age: 31, gender: 'Female', skills: ['Figma', 'Design Systems', 'Prototyping'] },
    { id: 2, name: 'Samir Patel', role: 'Data Analyst', location: 'Toronto', years: 6, qualification: 'B.Tech', age: 29, gender: 'Male', skills: ['SQL', 'BI', 'Python'] },
    { id: 3, name: 'Taylor M.', role: 'Product Designer', location: 'Berlin', years: 5, qualification: 'B.Des', age: 27, gender: 'Non-binary', skills: ['UI', 'UX', 'Research'] },
  ],
  recruiterQueue: [
    { company: 'TalentMint', submitted: '2026-04-11', status: 'Reviewing' },
    { company: 'HireWave', submitted: '2026-04-10', status: 'Pending' },
  ],
  activity: [
    'Applied to Vercel-like startup role',
    'Interview scheduled with Pulse AI',
    'Profile viewed by 5 recruiters',
  ],
};

const formatMoney = (num) => `$${Math.round(num / 1000)}k`;
const byId = (id) => document.getElementById(id);
const page = window.location.pathname.split('/').pop() || 'index.html';

function card(title, value) {
  return `<div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><p class="text-sm text-gray-500">${title}</p><p class="mt-2 text-3xl font-bold">${value}</p></div>`;
}

function renderIndex(main) {
  const links = [
    ['candidate-registration.html', 'Candidate Registration'], ['candidate-profile-setup.html', 'Profile Setup'],
    ['candidate-dashboard.html', 'Candidate Dashboard'], ['job-search.html', 'Job Search'], ['job-details.html', 'Job Details'],
    ['recruiter-signup.html', 'Recruiter Signup'], ['recruiter-dashboard-limited.html', 'Recruiter Dashboard (Limited)'],
    ['upgrade-access.html', 'Upgrade Access'], ['recruiter-dashboard-full.html', 'Recruiter Dashboard (Full)'],
    ['candidate-profile.html', 'Candidate Profile'], ['chat-interface.html', 'Chat Interface'], ['admin-dashboard.html', 'Admin Dashboard'],
    ['admin-messaging.html', 'Admin Messaging'], ['reporting-export.html', 'Reporting / Export'],
  ];
  main.innerHTML = `<section class="mb-8"><h1 class="text-3xl font-bold tracking-tight">RecruitFlow Design System Pages</h1><p class="mt-2 text-gray-600">Dynamic prototypes powered by <code>data.js</code>.</p></section><section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">${links.map(([href, label]) => `<a href="${href}" class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><h2 class="font-semibold">${label}</h2><p class="mt-2 text-sm text-gray-500">Open page</p></a>`).join('')}</section>`;
}

function renderCandidateDashboard(main) {
  main.innerHTML = `<section class="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">${card('Applications', appData.stats.applications)}${card('Interviews', appData.stats.interviews)}${card('Saved Jobs', appData.stats.savedJobs)}${card('Profile Views', appData.stats.profileViews)}</section><section class="grid gap-6 xl:grid-cols-3"><div class="xl:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h2 class="text-lg font-semibold">Recommended Jobs</h2><div class="mt-4 space-y-3">${appData.jobs.slice(0, 3).map(j => `<a href="job-details.html?id=${j.id}" class="block rounded-xl border border-gray-200 p-4 hover:bg-gray-50"><p class="font-medium">${j.title} · ${j.company}</p><p class="text-sm text-gray-500">${j.location} · ${formatMoney(j.salary)}</p></a>`).join('')}</div></div><div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h2 class="text-lg font-semibold">Recent Activity</h2><ul class="mt-4 space-y-3 text-sm text-gray-600">${appData.activity.map(a => `<li>${a}</li>`).join('')}</ul></div></section>`;
}

function renderJobSearch(main) {
  let currentPage = 1;
  let filtered = [...appData.jobs];
  const perPage = 2;
  const draw = () => {
    const total = Math.ceil(filtered.length / perPage);
    const jobs = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
    byId('job-list').innerHTML = jobs.map(j => `<a href="job-details.html?id=${j.id}" class="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><p class="font-semibold">${j.title} · ${j.company}</p><p class="text-sm text-gray-500">${j.location} · ${j.level} · ${formatMoney(j.salary)}</p></a>`).join('');
    byId('pages').innerHTML = `<button class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm" ${currentPage===1?'disabled':''} id="prev">Prev</button><span class="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-white">${currentPage}</span><button class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm" ${currentPage>=total?'disabled':''} id="next">Next</button>`;
    byId('prev')?.addEventListener('click',()=>{currentPage--;draw();});
    byId('next')?.addEventListener('click',()=>{currentPage++;draw();});
  };
  main.innerHTML = `<section class="grid gap-6 xl:grid-cols-4"><aside class="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-1"><h2 class="font-semibold">Filters</h2><input id="f-role" class="w-full rounded-xl border border-gray-300 px-3 py-2" placeholder="Role"><input id="f-location" class="w-full rounded-xl border border-gray-300 px-3 py-2" placeholder="Location"><button id="apply-filters" class="w-full rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white">Apply Filters</button></aside><div class="space-y-4 xl:col-span-3"><div id="job-list" class="space-y-4"></div><div id="pages" class="flex items-center gap-2"></div></div></section>`;
  byId('apply-filters').addEventListener('click', () => {
    const role = byId('f-role').value.toLowerCase();
    const location = byId('f-location').value.toLowerCase();
    filtered = appData.jobs.filter(j => j.title.toLowerCase().includes(role) && j.location.toLowerCase().includes(location));
    currentPage = 1;
    draw();
  });
  draw();
}

function renderJobDetails(main) {
  const id = Number(new URLSearchParams(window.location.search).get('id')) || 1;
  const job = appData.jobs.find(j => j.id === id) || appData.jobs[0];
  main.innerHTML = `<section class="grid gap-6 xl:grid-cols-3"><article class="xl:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h1 class="text-2xl font-bold">${job.title}</h1><p class="mt-2 text-sm text-gray-500">${job.company} · ${job.location} · Full-time</p><h2 class="mt-6 font-semibold">Job Description</h2><p class="mt-2 text-sm leading-6 text-gray-600">${job.description}</p><button id="interest" class="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700">Express Interest</button><p id="interest-msg" class="mt-3 text-sm text-emerald-600"></p></article><aside class="space-y-4"><div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><h3 class="font-semibold">Recruiter</h3><p class="mt-2 text-sm text-gray-600">Jordan Lee, Head of Design</p></div><div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><h3 class="font-semibold">Related Jobs</h3><ul class="mt-2 space-y-2 text-sm text-gray-600">${appData.jobs.filter(j=>j.id!==job.id).slice(0,2).map(j=>`<li><a class="hover:text-indigo-600" href="job-details.html?id=${j.id}">${j.title} · ${j.company}</a></li>`).join('')}</ul></div></aside></section>`;
  byId('interest').addEventListener('click', () => byId('interest-msg').textContent = 'Interest submitted successfully. Recruiter notified.');
}

function renderRecruiterFull(main) {
  main.innerHTML = `<section class="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><input id="loc" class="rounded-xl border border-gray-300 bg-white px-4 py-2.5" placeholder="Location"><input id="qual" class="rounded-xl border border-gray-300 bg-white px-4 py-2.5" placeholder="Qualification"><input id="age" class="rounded-xl border border-gray-300 bg-white px-4 py-2.5" placeholder="Age <="><input id="gender" class="rounded-xl border border-gray-300 bg-white px-4 py-2.5" placeholder="Gender"></section><section class="space-y-4"><div class="flex items-center justify-between"><h1 class="text-2xl font-bold">Candidate Directory</h1><button id="filter" class="rounded-xl bg-indigo-600 px-3 py-2 text-sm text-white">Apply</button></div><div id="candidate-grid" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3"></div></section>`;
  const draw = (list) => byId('candidate-grid').innerHTML = list.map(c => `<div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><p class="font-semibold">${c.name}</p><p class="text-sm text-gray-500">${c.role} · ${c.years} years</p><div class="mt-4 flex gap-2"><button class="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-white">Message</button><button class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm">Download CV</button></div></div>`).join('');
  draw(appData.candidates);
  byId('filter').addEventListener('click', () => {
    const loc = byId('loc').value.toLowerCase();
    const qual = byId('qual').value.toLowerCase();
    const age = Number(byId('age').value || 100);
    const gender = byId('gender').value.toLowerCase();
    draw(appData.candidates.filter(c => c.location.toLowerCase().includes(loc) && c.qualification.toLowerCase().includes(qual) && c.age <= age && c.gender.toLowerCase().includes(gender)));
  });
}

function renderChat(main, admin = false) {
  const key = admin ? 'admin-chat' : 'candidate-chat';
  const seed = admin ? ['User cannot access recruiter dashboard.', 'We reset account session, please retry.'] : ['Hi, I’m interested in the Senior UX role.', 'Great! Can you share your availability for interviews?'];
  const messages = JSON.parse(localStorage.getItem(key) || JSON.stringify(seed));
  const draw = () => {
    byId('msgs').innerHTML = messages.map((m, i) => `<div class="flex ${i%2?'justify-end':'justify-start'}"><div class="max-w-md rounded-2xl ${i%2?'rounded-br-md bg-indigo-600 text-white':'rounded-bl-md bg-gray-100'} px-4 py-2 text-sm">${m}<p class="mt-1 text-[11px] ${i%2?'text-indigo-100':'text-gray-500'}">${new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p></div></div>`).join('');
  };
  main.innerHTML = `<section class="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white shadow-sm"><div class="border-b border-gray-200 p-4"><h1 class="font-semibold">${admin ? 'Ticket #1042' : 'Conversation with Morgan Chen'}</h1></div><div id="msgs" class="space-y-4 p-4"></div><div class="border-t border-gray-200 p-4"><div class="flex gap-3"><input id="msg-input" class="flex-1 rounded-xl border border-gray-300 px-4 py-2.5" placeholder="Write a message..."><button id="send" class="rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white">Send</button></div></div></section>`;
  draw();
  byId('send').addEventListener('click', () => {
    const val = byId('msg-input').value.trim();
    if (!val) return;
    messages.push(val);
    localStorage.setItem(key, JSON.stringify(messages));
    byId('msg-input').value = '';
    draw();
  });
}

function renderAdminDashboard(main) {
  main.innerHTML = `<section class="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">${card('Total Candidates', appData.stats.totalCandidates.toLocaleString())}${card('Recruiters', appData.stats.recruiters.toLocaleString())}${card('Pending Approvals', appData.stats.pendingApprovals)}${card('Active Chats', appData.stats.activeChats)}</section><section class="grid gap-6 xl:grid-cols-3"><div class="xl:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h2 class="font-semibold">Recruiter Approval Queue</h2><table class="mt-4 w-full text-sm"><tr class="text-left text-gray-500"><th>Company</th><th>Submitted</th><th>Status</th></tr>${appData.recruiterQueue.map(r=>`<tr class="border-t border-gray-100"><td class="py-3">${r.company}</td><td>${r.submitted}</td><td><span class="rounded-full bg-amber-100 px-2 py-1 text-amber-700">${r.status}</span></td></tr>`).join('')}</table></div><div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h2 class="font-semibold">Chat Monitoring</h2><p class="mt-3 text-sm text-gray-600">Monitor flagged conversations and system alerts in near real-time.</p></div></section>`;
}

function renderReporting(main) {
  const sets = {
    candidates: [['A. Reed', 'Interview'], ['Morgan Chen', 'Applied']],
    recruiters: [['Orbit', 'Pro'], ['TalentMint', 'Starter']],
    jobs: [['UX Designer', '12'], ['Frontend Engineer', '8']],
  };
  const csv = (rows) => rows.map(r => r.join(',')).join('\n');
  const dl = (name, rows) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv(rows)], { type: 'text/csv' }));
    a.download = `${name}.csv`;
    a.click();
  };
  main.innerHTML = `<section class="space-y-6"><h1 class="text-2xl font-bold">Reporting / Export</h1><div class="grid gap-6 lg:grid-cols-3">${['Candidates','Recruiters','Job Offers'].map((t,i)=>`<div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><h2 class="font-semibold">${t}</h2><button data-exp="${i}" class="mt-4 rounded-xl border border-gray-300 px-3 py-2 text-sm">Export ${i===1?'Excel':'CSV'}</button></div>`).join('')}</div></section>`;
  document.querySelectorAll('[data-exp]').forEach((b) => b.addEventListener('click', () => {
    const key = ['candidates', 'recruiters', 'jobs'][Number(b.dataset.exp)];
    dl(key, sets[key]);
  }));
}

function wireSimpleForms() {
  document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const notice = document.createElement('p');
      notice.className = 'mt-3 text-sm text-emerald-600';
      notice.textContent = 'Saved successfully.';
      form.appendChild(notice);
      setTimeout(() => notice.remove(), 2500);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  if (!main) return;
  if (page === 'index.html') renderIndex(main);
  if (page === 'candidate-dashboard.html') renderCandidateDashboard(main);
  if (page === 'job-search.html') renderJobSearch(main);
  if (page === 'job-details.html') renderJobDetails(main);
  if (page === 'recruiter-dashboard-full.html') renderRecruiterFull(main);
  if (page === 'chat-interface.html') renderChat(main, false);
  if (page === 'admin-messaging.html') renderChat(main, true);
  if (page === 'admin-dashboard.html') renderAdminDashboard(main);
  if (page === 'reporting-export.html') renderReporting(main);
  wireSimpleForms();
});
