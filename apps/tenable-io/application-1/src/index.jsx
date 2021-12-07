import React from 'react';
import { TestComponent1 } from '@microfrontend-demo/design-system/components/test-component-1';
import { TestComponent2 } from '@microfrontend-demo/design-system/components/test-component-2';
import { TestComponent3 } from '@microfrontend-demo/design-system/components/test-component-3';
import { TestComponent4 } from '@microfrontend-demo/design-system/components/test-component-4';

const Page1 = () => {
    return (
        <>
            <p>Application 1</p>

            <TestComponent1 />
            <TestComponent2 />
            <TestComponent3 />
            <TestComponent4 />
        </>
    );
}

export {
    Page1
};
