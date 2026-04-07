import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";

describe('useCounter', () => {

    test('Should initialize with default value of 0', () => {
        const { result } = renderHook(() => useCounter());
        expect(result.current.counter).toBe(0);
    });

    test('Should initialize with default value of 10', () => {
        const { result } = renderHook(() => useCounter(10));
        expect(result.current.counter).toBe(10);
    });

    test('Should increment counter when handleAdd is called', () => {
        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.handleAdd();
        });

        expect(result.current.counter).toBe(1);
    });


    test('Should decrement counter when handleSubtract is called', () => {
        const { result } = renderHook(() => useCounter(2));

        act(() => {
            result.current.handleSubtract();
        });

        expect(result.current.counter).toBe(1);
    });

    test('Should reset counter when handleReset is called', () => {
        const { result } = renderHook(() => useCounter(2));

        act(() => {
            result.current.handleReset();
        });

        expect(result.current.counter).toBe(0);
    });
})