import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgMagnificentSevenProps {
  color?: string;
  height?: number | string;
  width?: number | string;
}

const SvgMagnificentSeven = memo(
  forwardRef((props: SvgMagnificentSevenProps, ref: Ref<SVGSVGElement>) => {
    const { height, width } = props;
    const title = 'SvgMagnificentSeven';
    const titleId = kebabCase(title);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 150 24"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <rect width={149} height={20} x={0.5} y={2} fill="#E8B237" rx={10} />
        <path
          fill="#000"
          d="M9.76 16V7.6h.984l3.768 6.348h-.528l3.72-6.348h.984L18.7 16h-1.152l-.012-6.588h.276L14.5 14.98h-.552l-3.336-5.568h.3V16zm10.189 0 3.804-8.4h1.188l3.816 8.4h-1.26L24.1 8.272h.48L21.185 16zm1.62-2.1.324-.96h4.728l.348.96zm12.116 2.196a5 5 0 0 1-1.788-.312 4.3 4.3 0 0 1-1.416-.9 4.3 4.3 0 0 1-.936-1.368 4.3 4.3 0 0 1-.336-1.716q0-.936.336-1.716t.936-1.356a4.2 4.2 0 0 1 1.428-.9 4.8 4.8 0 0 1 1.8-.324q.996 0 1.824.324t1.404.972l-.744.744a3.2 3.2 0 0 0-1.128-.732 3.5 3.5 0 0 0-1.308-.24q-.72 0-1.344.24-.612.24-1.068.672a3.1 3.1 0 0 0-.696 1.032q-.24.588-.24 1.284 0 .684.24 1.284.252.588.696 1.032.456.432 1.068.672t1.332.24q.672 0 1.284-.204.624-.216 1.152-.708l.684.912q-.624.528-1.464.804a5.6 5.6 0 0 1-1.716.264m2.028-1.224v-3.12h1.152v3.276zM39.163 16V7.6h.983l5.556 6.9h-.516V7.6h1.2V16h-.984l-5.556-6.9h.516V16zm9.738 0V7.6h1.2V16zm4.794-4.428h4.333v1.032h-4.332zm.12 4.428h-1.2V7.6h5.929v1.044h-4.728zm6.418 0V7.6h1.2V16zm7.47.096q-.96 0-1.776-.312a4.4 4.4 0 0 1-1.404-.9 4.4 4.4 0 0 1-.923-1.368 4.3 4.3 0 0 1-.337-1.716q0-.936.337-1.716.336-.78.935-1.356.6-.588 1.404-.9a4.8 4.8 0 0 1 1.777-.324q.972 0 1.788.336.827.324 1.403.972l-.78.756a3.05 3.05 0 0 0-1.08-.744 3.3 3.3 0 0 0-1.284-.252q-.708 0-1.32.24-.6.24-1.043.672a3.1 3.1 0 0 0-.697 1.032q-.24.588-.24 1.284t.24 1.296a3.12 3.12 0 0 0 1.74 1.692q.614.24 1.32.24.684 0 1.284-.24.6-.252 1.08-.768l.78.756q-.576.648-1.403.984a4.7 4.7 0 0 1-1.8.336m6.008-4.872h4.32v1.02h-4.32zm.108 3.732h4.896V16H72.62V7.6h5.928v1.044H73.82zM80.66 16V7.6h.983l5.556 6.9h-.516V7.6h1.2V16h-.984l-5.556-6.9h.516V16zm11.406 0V8.644h-2.88V7.6h6.948v1.044h-2.88V16zm11.045.096a5.8 5.8 0 0 1-1.836-.288q-.876-.3-1.38-.768l.444-.936q.48.42 1.224.696a4.4 4.4 0 0 0 1.548.276q.732 0 1.188-.168t.672-.456q.216-.3.216-.672a.9.9 0 0 0-.288-.696 2 2 0 0 0-.732-.42 7 7 0 0 0-.984-.288q-.54-.12-1.092-.276a5.3 5.3 0 0 1-.996-.42 2.1 2.1 0 0 1-.72-.672q-.276-.432-.276-1.104 0-.648.336-1.188.348-.552 1.056-.876.72-.336 1.824-.336.732 0 1.452.192t1.248.552l-.396.96q-.54-.36-1.14-.516a4.3 4.3 0 0 0-1.164-.168q-.708 0-1.164.18t-.672.48q-.204.3-.204.672 0 .444.276.708.288.264.732.42.456.156.996.288.54.12 1.08.276.552.156.996.408.456.252.732.672t.276 1.08q0 .636-.348 1.188-.348.54-1.08.876-.72.324-1.824.324m6.097-4.872h4.32v1.02h-4.32zm.108 3.732h4.896V16h-6.096V7.6h5.928v1.044h-4.728zM118.461 16l-3.696-8.4h1.296l3.396 7.752h-.744l3.42-7.752h1.2l-3.684 8.4zm7.036-4.776h4.32v1.02h-4.32zm.108 3.732h4.896V16h-6.096V7.6h5.928v1.044h-4.728zM132.444 16V7.6h.984l5.556 6.9h-.516V7.6h1.2V16h-.984l-5.556-6.9h.516V16z"
        />
      </svg>
    );
  }),
);

export default SvgMagnificentSeven;
