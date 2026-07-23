/** Types concise role titles in the Hero without hiding the initial readable label. */
const roleElement = document.querySelector('.typed-role');
const roles = [ 'BSc IT Student' ,'Aspiring Software Developer', 'Aspiring AI Engineer'];

if (roleElement && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let roleIndex = 0;
  let characterIndex = roles[0].length;
  let deleting = false;
  const type = () => {
    const role = roles[roleIndex];
    roleElement.textContent = role.slice(0, characterIndex);
    if (!deleting && characterIndex === role.length) { deleting = true; window.setTimeout(type, 2200); return; }
    if (deleting && characterIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; window.setTimeout(type, 300); return; }
    characterIndex += deleting ? -1 : 1;
    window.setTimeout(type, deleting ? 45 : 82);
  };
  window.setTimeout(type, 1200);
}
