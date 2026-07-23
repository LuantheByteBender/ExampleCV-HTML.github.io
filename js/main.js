/** Loads portfolio content from JSON and renders it directly. */
const projectsGrid = document.querySelector('#projects-grid');
const certificatesGrid = document.querySelector('#certificates-grid');

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const createTagList = (items, className) => {
  const list = createElement('ul', className);
  (Array.isArray(items) ? items : []).forEach((item) => list.append(createElement('li', '', item)));
  return list;
};

const githubIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.61.07-.61 1 .07 1.52 1.02 1.52 1.02.89 1.52 2.33 1.08 2.9.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.8c.85 0 1.7.11 2.5.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.9.68 1.81v2.68c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>`;

const createLink = (label, href, className, icon) => {
  if (!href) return null;
  const link = createElement('a', className);
  link.href = href;
  if (icon) {
    link.innerHTML = `${icon}<span>${label}</span>`;
  } else {
    link.textContent = label;
  }
  if (/^https?:\/\//i.test(href)) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
  return link;
};

const getVisualClass = (project) => /^visual-[a-z0-9-]+$/i.test(project.visualClass || '')
  ? project.visualClass
  : '';

const createProjectCard = (project, index) => {
  const card = createElement('article', 'project-card is-visible');
  card.dataset.category = project.category;
  const visual = createElement('div', `project-card-visual ${getVisualClass(project)}`);
  visual.setAttribute('role', 'img');
  visual.setAttribute('aria-label', `Abstract interface placeholder for ${project.title}`);
  visual.append(createElement('span', '', String(index + 1).padStart(2, '0')));
  const content = createElement('div', 'project-card-content');
  content.append(createElement('p', 'project-category', project.category));
  content.append(createElement('h3', '', project.title));
  content.append(createElement('p', '', project.description));
  content.append(createTagList(project.technologies, 'project-tags'));
  const actions = createElement('div', 'project-actions');
  const github = createLink('GitHub', project.github, 'project-link project-github-btn', githubIcon);
  const demo = createLink('Demo', project.demo, 'project-link project-demo-btn');
  if (github) actions.append(github);
  if (demo) actions.append(demo);
  content.append(actions);
  card.append(visual, content);
  return card;
};

if (projectsGrid) {
  fetch('data/projects.json')
    .then((response) => {
      if (!response.ok) throw new Error(`Unable to load projects (${response.status})`);
      return response.json();
    })
    .then((projects) => {
      if (!Array.isArray(projects)) throw new Error('Project data must be an array');
      projectsGrid.replaceChildren(...projects.map(createProjectCard));
    })
    .catch((error) => console.warn('Using the project markup fallback:', error));
}




const certificateIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 3h9l3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"/><path d="M14 3v4h4M8 11h5M8 14h4M15 18l1 4 2-1 2 1-1-4"/></svg>`;

const createCertificateCard = (certificate) => {
  const card = createElement('article', 'certificate-card is-visible');
  const media = createElement('div', 'certificate-card-media');

  if (certificate.image) {
    const image = document.createElement('img');
    image.src = certificate.image;
    image.alt = certificate.imageAlt || `${certificate.course} certificate`;
    image.loading = 'lazy';
    image.decoding = 'async';
    media.append(image);
  } else {
    media.classList.add('certificate-card-media-placeholder');
    media.innerHTML = certificateIcon;
    media.append(createElement('span', '', 'Certificate image'));
  }

  const content = createElement('div', 'certificate-card-content');
  const meta = [certificate.issuer, certificate.date].filter(Boolean).join(' · ');
  if (meta) content.append(createElement('p', 'certificate-meta', meta));
  content.append(createElement('h3', '', certificate.course || 'Untitled course'));
  if (certificate.description) content.append(createElement('p', 'certificate-description', certificate.description));
  if (certificate.skills?.length) content.append(createTagList(certificate.skills, 'project-tags'));

  const certificateLink = createLink(
    'View certificate',
    certificate.credentialUrl || certificate.image,
    'project-link certificate-link',
    certificateIcon
  );
  if (certificateLink) content.append(certificateLink);

  card.append(media, content);
  return card;
};

if (certificatesGrid) {
  fetch('data/certificates.json')
    .then((response) => {
      if (!response.ok) throw new Error(`Unable to load certificates (${response.status})`);
      return response.json();
    })
    .then((certificates) => {
      if (!Array.isArray(certificates)) throw new Error('Certificate data must be an array');
      if (!certificates.length) {
        certificatesGrid.append(createElement('p', 'certificates-empty', 'Certificates will be added here soon.'));
        return;
      }
      certificatesGrid.replaceChildren(...certificates.map(createCertificateCard));
    })
    .catch((error) => console.warn('Unable to render certificates:', error));
}
