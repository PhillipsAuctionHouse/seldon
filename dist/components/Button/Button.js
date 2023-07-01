import { jsx as a } from "react/jsx-runtime";
import m from "../../node_modules/classnames/index.js";
import { px as t } from "../../utils/index.js";
const c = ({
  primary: n = !1,
  size: e = "medium",
  backgroundColor: s,
  label: r,
  id: o,
  ...u
}) => /* @__PURE__ */ a(
  "button",
  {
    "data-testid": o ? `button-${o}` : "button",
    type: "button",
    className: m(`${t}-button`, `${t}-button--${e}`, { [`${t}-button--secondary`]: !n }),
    style: { backgroundColor: s },
    ...u,
    children: r
  }
);
export {
  c as default
};
