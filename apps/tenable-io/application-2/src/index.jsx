import React from 'react';
import { TestComponent5 } from '@microfrontend-demo/design-system/components/test-component-5';
import { TestComponent6 } from '@microfrontend-demo/design-system/components/test-component-6';
import { TestComponent7 } from '@microfrontend-demo/design-system/components/test-component-7';

const Page1 = () => {
    return (
        <>
            <p>Application 2</p>

            <TestComponent5 />
            <TestComponent6 />
            <TestComponent7 />
        </>
    );
}

export {
    Page1
};
