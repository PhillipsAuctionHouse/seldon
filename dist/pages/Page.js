import { jsxs as o, jsx as e } from "react/jsx-runtime";
import * as n from "react";
import a from "../components/Header/Header.js";
const h = () => {
  const [r, t] = n.useState();
  return /* @__PURE__ */ o("article", { children: [
    /* @__PURE__ */ e(
      a,
      {
        user: r,
        onLogin: () => t({ name: "Jane Doe" }),
        onLogout: () => t(void 0),
        onCreateAccount: () => t({ name: "Jane Doe" })
      }
    ),
    /* @__PURE__ */ o("section", { className: "storybook-page", children: [
      /* @__PURE__ */ e("h2", { children: "Pages in Storybook" }),
      /* @__PURE__ */ o("p", { children: [
        "We recommend building UIs with a",
        " ",
        /* @__PURE__ */ e("a", { href: "https://componentdriven.org", target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ e("strong", { children: "component-driven" }) }),
        " ",
        "process starting with atomic components and ending with pages."
      ] }),
      /* @__PURE__ */ e("p", { children: "Render pages with mock data. This makes it easy to build and review page states without needing to navigate to them in your app. Here are some handy patterns for managing page data in Storybook:" }),
      /* @__PURE__ */ o("ul", { children: [
        /* @__PURE__ */ e("li", { children: 'Use a higher-level connected component. Storybook helps you compose such data from the "args" of child component stories' }),
        /* @__PURE__ */ e("li", { children: "Assemble data in the page component from your services. You can mock these services out using Storybook." })
      ] }),
      /* @__PURE__ */ o("p", { children: [
        "Get a guided tutorial on component-driven development at",
        " ",
        /* @__PURE__ */ e("a", { href: "https://storybook.js.org/tutorials/", target: "_blank", rel: "noopener noreferrer", children: "Storybook tutorials" }),
        ". Read more in the",
        " ",
        /* @__PURE__ */ e("a", { href: "https://storybook.js.org/docs", target: "_blank", rel: "noopener noreferrer", children: "docs" }),
        "."
      ] }),
      /* @__PURE__ */ o("div", { className: "tip-wrapper", children: [
        /* @__PURE__ */ e("span", { className: "tip", children: "Tip" }),
        " Adjust the width of the canvas with the",
        " ",
        /* @__PURE__ */ e("svg", { width: "10", height: "10", viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ e("g", { fill: "none", fillRule: "evenodd", children: /* @__PURE__ */ e(
          "path",
          {
            d: "M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z",
            id: "a",
            fill: "#999"
          }
        ) }) }),
        "Viewports addon in the toolbar"
      ] })
    ] })
  ] });
};
export {
  h as default
};
