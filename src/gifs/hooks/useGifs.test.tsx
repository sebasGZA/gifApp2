import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import * as gifActions from "../actions/get-gifs-by-query.action";

describe('useGifs', () => {
    test('should return default values and methods', () => {
        const { result } = renderHook(useGifs)

        expect(result.current.gifs.length).toBe(0);
        expect(result.current.previousTerms.length).toBe(0);
        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handleTermClicked).toBeDefined();
    });

    test('should return a list of gifs', async () => {
        const { result } = renderHook(useGifs)

        await act(async () => {
            await result.current.handleSearch('sun');
        })

        expect(result.current.gifs.length).toBe(10);
    });

    test('should return a list of gifs when handleTermClicked is called', async () => {
        const { result } = renderHook(useGifs)

        await act(async () => {
            await result.current.handleTermClicked('sun');
        });

        expect(result.current.gifs.length).toBe(10)
    });

    test('should return a list of gifs from cache', async () => {
        const { result } = renderHook(useGifs);

        await act(async () => {
            await result.current.handleTermClicked('sun')
        })

        expect(result.current.gifs.length).toBe(10)

        vi.spyOn(gifActions, 'getGifsByQuery')
            .mockRejectedValue(new Error('This is my custom error'));

        await act(async () => {
            await result.current.handleTermClicked('sun')
        });
    });

    test('should not return more than 8 previous terms', async () => {
        const { result } = renderHook(useGifs);

        vi.spyOn(gifActions, 'getGifsByQuery')
            .mockResolvedValue([]);

        await act(async () => {
            await result.current.handleSearch('sun1')
        })

        await act(async () => {
            await result.current.handleSearch('sun2')
        })

        await act(async () => {
            await result.current.handleSearch('sun3')
        })

        await act(async () => {
            await result.current.handleSearch('sun4')
        })

        await act(async () => {
            await result.current.handleSearch('sun5')
        })

        await act(async () => {
            await result.current.handleSearch('sun6')
        })

        await act(async () => {
            await result.current.handleSearch('sun7')
        })

        await act(async () => {
            await result.current.handleSearch('sun8')
        })

        await act(async () => {
            await result.current.handleSearch('sun9')
        })

        expect(result.current.previousTerms.length).toBe(8)
    })
})
