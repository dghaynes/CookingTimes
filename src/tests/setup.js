import {afterEach} from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

//after each test - there is a cleanup function
afterEach(() => {
    cleanup();
});

