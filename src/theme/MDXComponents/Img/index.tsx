import React from 'react';
import type {Props} from '@theme/MDXComponents/Img';
import ReliableImage from '../../../components/ReliableImage';

export default function MDXImg(props: Props): React.JSX.Element {
  return <ReliableImage key={props.src} {...props} />;
}
