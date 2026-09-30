import React, {type ReactNode} from 'react';
import {GuidePreferences} from '../components/GuidePreferences';

export default function Root({children}:{children:ReactNode}):ReactNode {
  return <GuidePreferences>{children}</GuidePreferences>;
}
