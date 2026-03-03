// Centralized static placeholder text utilities for deterministic stories/tests

export const LOREM_SHORT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;

export const LOREM_MEDIUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.`;

export const LOREM_LONG = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.\n\nProin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim.`;

export const LOREM_MULTIPARAGRAPH = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
  'Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.',
  'Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue.',
  'Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.',
];

export function paragraphs(count: number): string {
  if (count <= 0) return '';
  const base = LOREM_MULTIPARAGRAPH;
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(base[i % base.length]);
  }
  return result.join('\n\n');
}

// Deterministic ~100 line block (approximately; each line kept short for diff readability)
export const LOREM_HUGE = (() => {
  const lines: string[] = [];
  const seed = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed non risus. Suspendisse lectus tortor, dignissim sit amet.',
    'Cras elementum ultrices diam. Maecenas ligula massa.',
    'Varius a, semper congue, euismod non, mi.',
    'Proin porttitor orci nec nonummy molestie.',
    'Enim est eleifend mi, non fermentum diam nisl sit amet erat.',
    'Duis semper. Duis arcu massa, scelerisque vitae.',
    'Consequat in, pretium a, enim. Pellentesque congue.',
    'Ut in risus volutpat libero pharetra tempor.',
    'Cras vestibulum bibendum augue. Praesent egestas leo.',
    'Praesent blandit odio eu enim. Pellentesque sed dui.',
    'Ut augue blandit sodales. Vestibulum ante ipsum primis.',
    'In faucibus orci luctus et ultrices posuere cubilia.',
    'Mauris ac mauris sed pede pellentesque fermentum.',
    'Maecenas adipiscing ante non diam sodales hendrerit.',
    'Ut velit mauris, egestas sed, gravida nec, ornare ut.',
    'Aenean ut orci vel massa suscipit pulvinar.',
    'Nulla sollicitudin. Fusce varius ligula non tempus.',
    'Aliquam, nunc turpis ullamcorper nibh, in tempus sapien.',
    'Eros vitae ligula. Pellentesque rhoncus nunc et augue.',
    'Integer id felis. Curabitur aliquet pellentesque diam.',
    'Integer quis metus vitae elit lobortis egestas.',
    'Sed vel lectus. Donec odio tempus molestie porttitor.',
    'Phasellus rhoncus. Aenean id metus id velit pulvinar.',
    'Vestibulum fermentum tortor id mi. Pellentesque ipsum.',
    'Nulla non arcu lacinia neque faucibus fringilla.',
    'Sed auctor mauris quis pretium fermentum.',
    'Nibh urna hendrerit mauris, a pharetra ligula orci nec magna.',
    'Donec mattis. Sed molestie magna non pretium elementum.',
    'Ligula arcu rutrum lorem, a sagittis neque augue eget nunc.',
    'Curabitur eget sem sit amet tortor malesuada placerat.',
    'Integer sapien est iaculis in pretium quis viverra ac.',
    'Praesent eget sem vel leo ultrices bibendum.',
    'Aenean faucibus. Morbi dolor nulla malesuada eu.',
    'Pulvinar at mollis ac nulla. Curabitur auctor semper nulla.',
    'Donec varius orci eget risus. Duis nibh mi congue eu.',
    'Accumsan eleifend sagittis quis diam. Duis eget orci.',
    'Sit amet orci dignissim rutrum. Nam dui ligula.',
    'Fringilla a euismod sodales sollicitudin vel wisi.',
    'Morbi auctor lorem non justo. Nam lacus libero.',
    'Pretium at lobortis vitae ultricies et tellus.',
    'Donec aliquet tortor sed accumsan bibendum.',
    'Erat ligula aliquet magna vitae ornare odio.',
    'Metus a mi. Morbi ac orci et nisl hendrerit mollis.',
    'Suspendisse ut massa. Cras nec ante.',
    'Pellentesque a nulla. Cum sociis natoque penatibus.',
    'Et magnis dis parturient montes nascetur ridiculus mus.',
    'Quisque porta. Fusce suscipit varius mi.',
    'Cum sociis natoque penatibus et magnis.',
    'Donec quam felis ultricies nec pellentesque eu pretium quis.',
    'Nulla consequat massa quis enim. Donec pede justo.',
    'Fringilla vel aliquet nec vulputate eget arcu.',
    'In enim justo rhoncus ut imperdiet a venenatis vitae.',
    'Nullam dictum felis eu pede mollis pretium.',
    'Integer tincidunt. Cras dapibus.',
    'Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.',
    'Aenean leo ligula porttitor eu consequat vitae eleifend ac enim.',
    'Aliquam lorem ante dapibus in viverra quis feugiat a tellus.',
    'Phasellus viverra nulla ut metus varius laoreet.',
    'Quisque rutrum. Aenean imperdiet.',
    'Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.',
    'Nam eget dui. Etiam rhoncus.',
    'Maecenas tempus tellus eget condimentum rhoncus.',
    'Donec sodales sagittis magna. Sed consequat leo eget.',
    'Blandit consequat. Integer feugiat scelerisque varius morbi.',
    'Enim nunc faucibus a pellentesque sit amet porttitor eget.',
    'Eget dolor morbi non arcu risus quis varius quam.',
    'Quam quisque id diam vel quam elementum pulvinar.',
    'Et malesuada fames ac turpis egestas integer eget aliquet.',
    'Nunc congue nisi vitae suscipit tellus mauris a diam.',
    'Velit egestas dui id ornare arcu odio ut sem.',
    'Duis ut diam quam nulla porttitor massa id neque aliquam.',
    'Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper.',
    'Sit amet risus nullam eget felis eget nunc.',
    'Lobortis mattis aliquam faucibus purus in massa tempor.',
    'Vestibulum lorem sed risus ultricies tristique nulla.',
    'Quam adipiscing vitae proin sagittis nisl rhoncus mattis.',
    'Sit amet cursus sit amet dictum sit amet justo.',
    'Venenatis cras sed felis eget velit aliquet.',
    'A arcu cursus vitae congue mauris rhoncus.',
    'Tellus at urna condimentum mattis pellentesque id nibh tortor.',
    'Gravida cum sociis natoque penatibus et magnis dis.',
    'Parturient montes nascetur ridiculus mus mauris vitae.',
    'Ut sem nulla pharetra diam sit amet nisl suscipit.',
    'Velit euismod in pellentesque massa placerat duis ultricies lacus.',
    'Sit amet venenatis urna cursus eget nunc.',
    'Amet porttitor eget dolor morbi non arcu risus quis.',
    'Varius duis at consectetur lorem donec massa sapien faucibus.',
    'Interdum posuere lorem ipsum dolor sit amet consectetur.',
    'Dignissim cras tincidunt lobortis feugiat vivamus.',
    'Viverra nam libero justo laoreet sit amet cursus sit.',
    'Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum.',
    'Eget egestas purus viverra accumsan in nisl nisi scelerisque.',
    'Leo vel fringilla est ullamcorper eget nulla facilisi etiam.',
    'Integer malesuada nunc vel risus commodo viverra maecenas accumsan.',
    'Eget lorem dolor sed viverra ipsum nunc aliquet bibendum.',
    'Risus ultricies tristique nulla aliquet enim tortor at.',
    'Ut porttitor leo a diam sollicitudin tempor id eu nisl.',
    'Elit sed vulputate mi sit amet mauris commodo quis.',
    'Commodo quis imperdiet massa tincidunt nunc pulvinar sapien.',
    'Eu turpis egestas pretium aenean pharetra magna ac placerat.',
    'Tortor pretium viverra suspendisse potenti nullam ac tortor vitae.',
    'Purus gravida quis blandit turpis cursus in hac habitasse.',
    'Enim nunc faucibus a pellentesque sit amet porttitor eget (repeat).',
  ];
  // Guarantee at least 100 lines (seed already > 100 but safeguard)
  while (lines.length < 100) {
    lines.push(seed[lines.length % seed.length]);
  }
  return lines.join(' ');
})();
