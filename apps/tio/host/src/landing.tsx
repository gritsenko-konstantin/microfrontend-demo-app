/*
import {
    TestComponent1,
    TestComponent2,
    TestComponent3,
    TestComponent4,
    TestComponent5,
    TestComponent6,
    TestComponent7
} from '@microfrontend-demo/design-system/components';
*/

import { TestComponent1 } from '@microfrontend-demo/design-system/components/test-component-1';
import { TestComponent2 } from '@microfrontend-demo/design-system/components/test-component-2';
import { TestComponent3 } from '@microfrontend-demo/design-system/components/test-component-3';
import { TestComponent4 } from '@microfrontend-demo/design-system/components/test-component-4';
import { TestComponent5 } from '@microfrontend-demo/design-system/components/test-component-5';
import { TestComponent6 } from '@microfrontend-demo/design-system/components/test-component-6';
import { TestComponent7 } from '@microfrontend-demo/design-system/components/test-component-7';

export function Landing() {
    return (
        <>
            <p>Landing Page</p>

            <TestComponent1 />
            <TestComponent2 />
            <TestComponent3 />
            <TestComponent4 />
            <TestComponent5 />
            <TestComponent6 />
            <TestComponent7 />
        </>
    );
}

export default Landing;
