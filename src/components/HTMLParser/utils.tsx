import { DOMNode, domToReact, attributesToProps, HTMLReactParserOptions } from 'html-react-parser';
import { Text, TextVariants } from '../Text';
import { Link, LinkVariants } from '../Link';

export const options = {
  replace({ attribs, children, name }: { attribs: Record<string, string>; children: React.ReactNode; name: string }) {
    if (name === 'h1') {
      return (
        <Text variant={TextVariants.heading1}>
          {domToReact(children as DOMNode[], options as HTMLReactParserOptions)}
        </Text>
      );
    }

    if (name === 'h2') {
      return (
        <Text variant={TextVariants.heading2}>
          {domToReact(children as DOMNode[], options as HTMLReactParserOptions)}
        </Text>
      );
    }

    if (name === 'h3') {
      return (
        <Text variant={TextVariants.heading3}>
          {domToReact(children as DOMNode[], options as HTMLReactParserOptions)}
        </Text>
      );
    }

    if (name === 'h4') {
      return (
        <Text variant={TextVariants.heading4}>
          {domToReact(children as DOMNode[], options as HTMLReactParserOptions)}
        </Text>
      );
    }

    if (name === 'blockquote') {
      return (
        <Text variant={TextVariants.blockquote}>
          {domToReact(children as DOMNode[], options as HTMLReactParserOptions)}
        </Text>
      );
    }

    if (name === 'p') {
      return (
        <Text variant={TextVariants.body1}>{domToReact(children as DOMNode[], options as HTMLReactParserOptions)}</Text>
      );
    }

    if (name === 'a') {
      const { class: className, ...rest } = attribs;
      const props = attributesToProps(rest);
      return (
        <Link variant={LinkVariants.link} {...props}>
          {domToReact(children as DOMNode[], options as HTMLReactParserOptions)}
        </Link>
      );
    }

    // Can add more cases as needed
  },
};
