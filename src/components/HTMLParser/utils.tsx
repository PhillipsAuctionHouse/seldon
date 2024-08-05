import { DOMNode, domToReact } from 'html-react-parser';
import { Text, TextVariants } from '../Text';

export const options = {
  replace({ children, name }: { attribs: Record<string, string>; children: React.ReactNode; name: string }) {
    if (name === 'h1') {
      return <Text variant={TextVariants.display1}>{domToReact(children as DOMNode[])}</Text>;
    }

    if (name === 'h2') {
      return <Text variant={TextVariants.heading2}>{domToReact(children as DOMNode[])}</Text>;
    }

    if (name === 'h3') {
      return <Text variant={TextVariants.heading3}>{domToReact(children as DOMNode[])}</Text>;
    }

    if (name === 'h4') {
      return <Text variant={TextVariants.heading4}>{domToReact(children as DOMNode[])}</Text>;
    }

    if (name === 'h4') {
      return <Text variant={TextVariants.heading4}>{domToReact(children as DOMNode[])}</Text>;
    }

    if (name === 'blockquote') {
      return <Text variant={TextVariants.blockquote}>{domToReact(children as DOMNode[])}</Text>;
    }
  },
};
