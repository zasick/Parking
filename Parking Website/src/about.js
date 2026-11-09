const profiles = [
  {
    name: 'Zach',
    role: 'Website Developer',
    bio: '12th grader at UAHS with around 5 years of experience (non-work) in IT. Taken 1.5 years worth of courses through UC-IT program and have done research on my own.'
  },
  {
    name: 'Eddie',
    role: 'Researcher',
    bio: '12th grader at Grandview High School taking computer science courses through the UC-IT program.'
  },
  {
    name: 'Elias',
    role: 'Prototype Developer',
    bio: '11th grader at Grandview Heights High School. My experiences with coding include some Java and HTML. I am currently taking programming and information technology classes. Some of my interests include app building and cybersecurity.'
  }
];

const profileGrid = document.getElementById('profileGrid');

function escapeHtml(value) {
  const element = document.createElement('span');
  element.textContent = value;
  return element.innerHTML;
}

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase();
}

function renderProfiles() {
  profileGrid.innerHTML = profiles.map(profile => `
    <article class="profile-card">
      <div class="profile-avatar" style="--avatar-color:#c7db4a">${escapeHtml(initials(profile.name))}</div>
      <div>
        <p class="profile-role">${escapeHtml(profile.role)}</p>
        <h3>${escapeHtml(profile.name)}</h3>
        <p class="profile-bio">${escapeHtml(profile.bio)}</p>
      </div>
    </article>
  `).join('');
}

renderProfiles();
