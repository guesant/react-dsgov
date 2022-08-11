import '@govbr-ds/core/dist/core.min.css';

import classNames from 'classnames';
import React, { useEffect, useImperativeHandle, useRef } from 'react';
import IMtProps from '../IMtProps';
import { useSpreadProps } from '../Util/useSpreadProps';
import { useMtProps } from '../Util/useMtProps';
import uniqueId from 'lodash.uniqueid';
import useCommonProperties from '../Util/useCommonProperties';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const core = require('@govbr-ds/core/dist/core-init');

export interface CheckboxProps  extends React.HTMLAttributes<HTMLInputElement>, IMtProps {
    /** Se o checkbox for inline, ou seja, não pula linha após. */
    inline?: boolean; 
    /** Estado do checkbox.  */
    state?: string;
    /** Se está desabilitado. */
    disabled?: boolean;
    /** Se está marcado ou não. Melhor usado para gerenciamento do estado. */
    checked?: boolean;
    /** Se está inicialmente marcado. */
    defaultChecked?: boolean;
    /* Nome do checkbox. */
    name?: string;
    /** Label do checkbox. */
    label?: string;
    /** Valor associado ao checkbox. */
    value?: string;

    /** Se possui estado indeterminado. */
    indeterminate?: boolean;
    /** Se é pai de um determinado grupo de checkboxes. */
    parentGroup?: string;
    /** Se é filho de um determinado grupo de checkboxes. */
    childOf?: string;
} 

export interface CheckboxRef extends HTMLInputElement {
    wrapper: HTMLDivElement,
    element: HTMLInputElement
}

const Checkbox = React.forwardRef<CheckboxRef, CheckboxProps>(
    ({className, id = uniqueId('checkbox_____'), children, inline, state, disabled, defaultChecked = false, checked, name, label, value, indeterminate = false, parentGroup, childOf, ...props}, ref) => {
        const mtProps = useMtProps(props);
        const spreadProps = useSpreadProps(props);

        const refElement = useRef(null);
        const refWrapper = useRef<HTMLDivElement>(null);
        const refInput = useRef<HTMLInputElement>(null);

        useCommonProperties<CheckboxRef>(ref, refInput, {
            get wrapper() {
                return refWrapper.current;
            },
            get element() {
                return refInput.current;
            }
        });

        useEffect(() => {
            if(refWrapper.current && !refElement.current) {
                refElement.current = new core.BRCheckbox('br-checkbox', refWrapper.current);
            }
            
        }, []);

        return (
            <div 
                {...(state === 'valid') && {valid: 'valid'}}
                {...(state === 'invalid') && {invalid: 'invalid'}}
                {...indeterminate && {indeterminate: 'indeterminate'}}
                ref={refWrapper}
                
                className={classNames(
                    'br-checkbox',
                    ...mtProps,
                    (inline && 'd-inline')
                )}
                
            >
                <input 
                    ref={refInput}
                    className={classNames(
                        className
                    )}
                    name={name}
                    type="checkbox"
                    id={id}
                    {...value && {value: value}}
                    {...typeof checked !== 'undefined' && {checked: checked}}
                    {...defaultChecked && {defaultChecked: defaultChecked}}
                    {...disabled && {disabled: 'disabled'}}
                    {...parentGroup && {'data-parent': parentGroup}}
                    {...childOf && {'data-child': childOf}}
                    {...spreadProps}
                />
                <label htmlFor={id}>{label}</label>
                {children}
            </div>
        );
    }
); 

Checkbox.displayName = 'Checkbox';

export default Checkbox;