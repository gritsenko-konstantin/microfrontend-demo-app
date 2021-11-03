import { render } from '@testing-library/react';

import TioCommon from './tio-common';

describe('TioCommon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TioCommon />);
    expect(baseElement).toBeTruthy();
  });
});
