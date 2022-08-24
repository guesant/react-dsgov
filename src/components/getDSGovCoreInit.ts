let alreadySetup = false;

if(typeof self !== 'undefined' && typeof window !== 'undefined' && !alreadySetup) {
    if(typeof require !== 'undefined') {
        try {
            require('@govbr-ds/core/dist/core-init');
        } catch (e) {
            // ;
        }
        alreadySetup = true;
    }
}

export const getDSGovCoreInit = () =>
    import('@govbr-ds/core/dist/core-init').catch(() => import('@govbr-ds/core/dist/core')).catch(() => ({ then: () => { return; } }));
